# minipass

A _very_ minimal implementation of a [PassThrough
stream](https://nodejs.org/api/stream.html#stream_class_stream_passthrough)

[It's very
fast](https://docs.google.com/spreadsheets/d/1oObKSrVwLX_7Ut4Z6g3fZW-AX1j1-k6w-cDsrkaSbHM/edit#gid=0)
for objects, strings, and buffers.

Supports pipe()ing (including multi-pipe() and backpressure
transmission), buffering data until either a `data` event handler or
`pipe()` is added (so you don't lose the first chunk), and most other
cases where PassThrough is a good idea.

There is a `read()` method, but it's much more efficient to consume
data from this stream via `'data'` events or by calling `pipe()` into
some other stream.  Calling `read()` requires the buffer to be
flattened in some cases, which requires copying memory.

There is also no `unpipe()` method.  Once you start piping, there is
no stopping it!

If you set `objectMode: true` in the options, then whatever is written
will be emitted.  Otherwise, it'll do a minimal amount of Buffer
copying to ensure proper Streams semantics when `read(n)` is called.

This is not a `through` or `through2` stream.  It doesn't transform
the data, it just passes it right through.  If you want to transform
the data, extend the class, and override the `write()` method.  Once
you're done transforming the data however you want, call
`super.write()` with the transform output.

For some examples of streams that extend MiniPass in various ways, check
out:

- [minizlib](http://npm.im/minizlib)
- [fs-minipass](http://npm.im/fs-minipass)
- [tar](http://npm.im/tar)
- [minipass-collect](http://npm.im/minipass-collect)
- [minipass-flush](http://npm.im/minipass-flush)
- [minipass-pipeline](http://npm.im/minipass-pipeline)
- [tap](http://npm.im/tap)
- [tap-parser](http://npm.im/tap)
- [treport](http://npm.im/tap)

## Differences from Node.js Streams

There are several things that make Minipass streams different from (and in
some ways superior to) Node.js core streams.

### Timing

Minipass streams are designed to support synchronous use-cases.  Thus, data
is emitted as soon as it is available, always.  It is buffered until read,
but no longer.  Another way to look at it is that Minipass streams are
exactly as synchronous as the logic that writes into them.

This can be surprising if your code relies on `PassThrough.write()` always
providing data on the next tick rather than the current one, or being able
to call `resume()` and not have the entire buffer disappear immediately.

However, without this synchronicity guarantee, there would be no way for
Minipass to achieve the speeds it does, or support the synchronous use
cases that it does.  Simply put, waiting takes time.

This non-deferring approach makes Minipass streams much easier to reason
about, especially in the context of Promises and other flow-control
mechanisms.

### No High/Low Water Marks

Node.js core streams will optimistically fill up a buffer, returning `true`
on all writes until the limit is hit, even if the data has nowhere to go.
Then, they will not attempt to draw more data in until the buffer size dips
below a minimum value.

Minipass streams are much simpler.  The `write()` method will return `true`
if the data has somewhere to go (which is to say, given the timing
guarantees, that the data is already there by the time `write()` returns).

If the data has nowhere to go, then `write()` returns false, and the data
sits in a buffer, to be drained out immediately as soon as anyone consumes
it.

### Emit `end` When Asked

If you do `stream.on('end', someFunction)`, and the stream has already
emitted `end`, then it will emit it again.

To prevent calling handlers multiple times who would not expect multiple
ends to occur, all listeners are removed from the `'end'` event whenever it
is emitted.

## USAGE

```js
const MiniPass = require('minipass')
const mp = new MiniPass(options) // optional: { encoding }
mp.write('foo')
mp.pipe(someOtherStream)
mp.end('bar')
```

### simple "are you done yet" promise

```js
mp.promise().then(() => {
  // stream is finished
}, er => {
  // stream emitted an error
})
```

### collecting

```js
mp.collect().then(all => {
  // all is an array of all the data emitted
  // encoding is supported in this case, so
  // so the result will be a collection of strings if
  // an encoding is specified, or buffers/objects if not.
  //
  // In an async function, you may do
  // const data = await stream.collect()
})
```

### collecting into a single blob

This is a bit slower because it concatenates the data into one chunk for
you, but if you're going to do it yourself anyway, it's convenient this
way:

```js
mp.concat().then(onebigchunk => {
  // onebigchunk is a string if the stream
  // had an encoding set, or a buffer otherwise.
})
```

### iteration

You can iterate over streams synchronously or asynchronously in
platforms that support it.

Synchronous iteration will end when the currently available data is
consumed, even if the `end` event has not been reached.  In string and
buffer mode, the data is concatenated, so unless multiple writes are
occurring in the same tick as the `read()`, sync iteration loops will
generally only have a single iteration.

To consume chunks in this way exactly as they have been written, with
no flattening, create the stream with the `{ objectMode: true }`
option.

```js
const mp = new Minipass({ objectMode: true })
mp.write('a')
mp.write('b')
for (let letter of mp) {
  console.log(letter) // a, b
}
mp.write('c')
mp.write('d')
for (let letter of mp) {
  console.log(letter) // c, d
}
mp.write('e')
mp.end()
for (let letter of mp) {
  console.log(letter) // e
}
for (let letter of mp) {
  console.log(letter) // nothing
}
```

Asynchronous iteration will continue until the end event is reached,
consuming all of the data.

```js
const mp = new Minipass({ encoding: 'utf8' })

// some source of some data
let i = 5
const inter = setInterval(() => {
  if (i --> 0)
    mp.write(Buffer.from('foo\n', 'utf8'))
  else {
    mp.end()
    clearInterval(inter)
  }
}, 100)

// consume the data with asynchronous iteration
async function consume () {
  for await (let chunk of mp) {
    console.log(chunk)
  }
  return 'ok'
}

consume().then(res => console.log(res))
// logs `foo\n` 5 times, and then `ok`
```
