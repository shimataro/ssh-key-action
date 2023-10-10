"use strict";var Lt=Object.create;var W=Object.defineProperty;var Ft=Object.getOwnPropertyDescriptor;var Vt=Object.getOwnPropertyNames;var Gt=Object.getPrototypeOf,Kt=Object.prototype.hasOwnProperty;var v=(e,t)=>()=>(e&&(t=e(e=0)),t);var O=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ue=(e,t)=>{for(var r in t)W(e,r,{get:t[r],enumerable:!0})},Ce=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Vt(t))!Kt.call(e,i)&&i!==r&&W(e,i,{get:()=>t[i],enumerable:!(n=Ft(t,i))||n.enumerable});return e};var T=(e,t,r)=>(r=e!=null?Lt(Gt(e)):{},Ce(t||!e||!e.__esModule?W(r,"default",{value:e,enumerable:!0}):r,e)),ke=e=>Ce(W({},"__esModule",{value:!0}),e);var J=O(B=>{"use strict";Object.defineProperty(B,"__esModule",{value:!0});B.toCommandProperties=B.toCommandValue=void 0;function Wt(e){return e==null?"":typeof e=="string"||e instanceof String?e:JSON.stringify(e)}B.toCommandValue=Wt;function Jt(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{}}B.toCommandProperties=Jt});var Be=O(E=>{"use strict";var Ht=E&&E.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),zt=E&&E.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Yt=E&&E.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Ht(t,e,r);return zt(t,e),t};Object.defineProperty(E,"__esModule",{value:!0});E.issue=E.issueCommand=void 0;var Qt=Yt(require("os")),Ne=J();function je(e,t,r){let n=new oe(e,t,r);process.stdout.write(n.toString()+Qt.EOL)}E.issueCommand=je;function Xt(e,t=""){je(e,{},t)}E.issue=Xt;var Me="::",oe=class{constructor(t,r,n){t||(t="missing.command"),this.command=t,this.properties=r,this.message=n}toString(){let t=Me+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let r=!0;for(let n in this.properties)if(this.properties.hasOwnProperty(n)){let i=this.properties[n];i&&(r?r=!1:t+=",",t+=`${n}=${er(i)}`)}}return t+=`${Me}${Zt(this.message)}`,t}};function Zt(e){return Ne.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function er(e){return Ne.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}});function V(){return H>z.length-16&&(De.default.randomFillSync(z),H=0),z.slice(H,H+=16)}var De,z,H,se=v(()=>{De=T(require("crypto")),z=new Uint8Array(256),H=z.length});var Ie,$e=v(()=>{Ie=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i});function tr(e){return typeof e=="string"&&Ie.test(e)}var q,G=v(()=>{$e();q=tr});function rr(e,t=0){let r=(g[e[t+0]]+g[e[t+1]]+g[e[t+2]]+g[e[t+3]]+"-"+g[e[t+4]]+g[e[t+5]]+"-"+g[e[t+6]]+g[e[t+7]]+"-"+g[e[t+8]]+g[e[t+9]]+"-"+g[e[t+10]]+g[e[t+11]]+g[e[t+12]]+g[e[t+13]]+g[e[t+14]]+g[e[t+15]]).toLowerCase();if(!q(r))throw TypeError("Stringified UUID is invalid");return r}var g,U,K=v(()=>{G();g=[];for(let e=0;e<256;++e)g.push((e+256).toString(16).substr(1));U=rr});function nr(e,t,r){let n=t&&r||0,i=t||new Array(16);e=e||{};let o=e.node||Le,s=e.clockseq!==void 0?e.clockseq:ae;if(o==null||s==null){let h=e.random||(e.rng||V)();o==null&&(o=Le=[h[0]|1,h[1],h[2],h[3],h[4],h[5]]),s==null&&(s=ae=(h[6]<<8|h[7])&16383)}let c=e.msecs!==void 0?e.msecs:Date.now(),l=e.nsecs!==void 0?e.nsecs:ce+1,a=c-ue+(l-ce)/1e4;if(a<0&&e.clockseq===void 0&&(s=s+1&16383),(a<0||c>ue)&&e.nsecs===void 0&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");ue=c,ce=l,ae=s,c+=122192928e5;let u=((c&268435455)*1e4+l)%4294967296;i[n++]=u>>>24&255,i[n++]=u>>>16&255,i[n++]=u>>>8&255,i[n++]=u&255;let d=c/4294967296*1e4&268435455;i[n++]=d>>>8&255,i[n++]=d&255,i[n++]=d>>>24&15|16,i[n++]=d>>>16&255,i[n++]=s>>>8|128,i[n++]=s&255;for(let h=0;h<6;++h)i[n+h]=o[h];return t||U(i)}var Le,ae,ue,ce,Fe,Ve=v(()=>{se();K();ue=0,ce=0;Fe=nr});function ir(e){if(!q(e))throw TypeError("Invalid UUID");let t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=t&255,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=t&255,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=t&255,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=t&255,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=t&255,r}var Y,le=v(()=>{G();Y=ir});function or(e){e=unescape(encodeURIComponent(e));let t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}function Q(e,t,r){function n(i,o,s,c){if(typeof i=="string"&&(i=or(i)),typeof o=="string"&&(o=Y(o)),o.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let l=new Uint8Array(16+i.length);if(l.set(o),l.set(i,o.length),l=r(l),l[6]=l[6]&15|t,l[8]=l[8]&63|128,s){c=c||0;for(let a=0;a<16;++a)s[c+a]=l[a];return s}return U(l)}try{n.name=e}catch{}return n.DNS=sr,n.URL=ar,n}var sr,ar,fe=v(()=>{K();le();sr="6ba7b810-9dad-11d1-80b4-00c04fd430c8",ar="6ba7b811-9dad-11d1-80b4-00c04fd430c8"});function ur(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),Ge.default.createHash("md5").update(e).digest()}var Ge,Ke,We=v(()=>{Ge=T(require("crypto"));Ke=ur});var cr,Je,He=v(()=>{fe();We();cr=Q("v3",48,Ke),Je=cr});function lr(e,t,r){e=e||{};let n=e.random||(e.rng||V)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){r=r||0;for(let i=0;i<16;++i)t[r+i]=n[i];return t}return U(n)}var ze,Ye=v(()=>{se();K();ze=lr});function fr(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),Qe.default.createHash("sha1").update(e).digest()}var Qe,Xe,Ze=v(()=>{Qe=T(require("crypto"));Xe=fr});var dr,et,tt=v(()=>{fe();Ze();dr=Q("v5",80,Xe),et=dr});var rt,nt=v(()=>{rt="00000000-0000-0000-0000-000000000000"});function hr(e){if(!q(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}var it,ot=v(()=>{G();it=hr});var st={};Ue(st,{NIL:()=>rt,parse:()=>Y,stringify:()=>U,v1:()=>Fe,v3:()=>Je,v4:()=>ze,v5:()=>et,validate:()=>q,version:()=>it});var at=v(()=>{Ve();He();Ye();tt();nt();ot();G();K();le()});var ft=O(b=>{"use strict";var pr=b&&b.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),mr=b&&b.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ct=b&&b.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&pr(t,e,r);return mr(t,e),t};Object.defineProperty(b,"__esModule",{value:!0});b.prepareKeyValueMessage=b.issueFileCommand=void 0;var ut=ct(require("fs")),de=ct(require("os")),gr=(at(),ke(st)),lt=J();function vr(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw new Error(`Unable to find environment variable for file command ${e}`);if(!ut.existsSync(r))throw new Error(`Missing file at path: ${r}`);ut.appendFileSync(r,`${lt.toCommandValue(t)}${de.EOL}`,{encoding:"utf8"})}b.issueFileCommand=vr;function yr(e,t){let r=`ghadelimiter_${gr.v4()}`,n=lt.toCommandValue(t);if(e.includes(r))throw new Error(`Unexpected input: name should not contain the delimiter "${r}"`);if(n.includes(r))throw new Error(`Unexpected input: value should not contain the delimiter "${r}"`);return`${e}<<${r}${de.EOL}${n}${de.EOL}${r}`}b.prepareKeyValueMessage=yr});var ht=O(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});D.checkBypass=D.getProxyUrl=void 0;function _r(e){let t=e.protocol==="https:";if(dt(e))return;let r=(()=>t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY)();if(r)return new URL(r)}D.getProxyUrl=_r;function dt(e){if(!e.hostname)return!1;let t=e.hostname;if(wr(t))return!0;let r=process.env.no_proxy||process.env.NO_PROXY||"";if(!r)return!1;let n;e.port?n=Number(e.port):e.protocol==="http:"?n=80:e.protocol==="https:"&&(n=443);let i=[e.hostname.toUpperCase()];typeof n=="number"&&i.push(`${i[0]}:${n}`);for(let o of r.split(",").map(s=>s.trim().toUpperCase()).filter(s=>s))if(o==="*"||i.some(s=>s===o||s.endsWith(`.${o}`)||o.startsWith(".")&&s.endsWith(`${o}`)))return!0;return!1}D.checkBypass=dt;function wr(e){let t=e.toLowerCase();return t==="localhost"||t.startsWith("127.")||t.startsWith("[::1]")||t.startsWith("[0:0:0:0:0:0:0:1]")}});var vt=O(I=>{"use strict";var gi=require("net"),Or=require("tls"),he=require("http"),pt=require("https"),Er=require("events"),vi=require("assert"),br=require("util");I.httpOverHttp=Sr;I.httpsOverHttp=xr;I.httpOverHttps=Rr;I.httpsOverHttps=Ar;function Sr(e){var t=new P(e);return t.request=he.request,t}function xr(e){var t=new P(e);return t.request=he.request,t.createSocket=mt,t.defaultPort=443,t}function Rr(e){var t=new P(e);return t.request=pt.request,t}function Ar(e){var t=new P(e);return t.request=pt.request,t.createSocket=mt,t.defaultPort=443,t}function P(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||he.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(n,i,o,s){for(var c=gt(i,o,s),l=0,a=t.requests.length;l<a;++l){var u=t.requests[l];if(u.host===c.host&&u.port===c.port){t.requests.splice(l,1),u.request.onSocket(n);return}}n.destroy(),t.removeSocket(n)})}br.inherits(P,Er.EventEmitter);P.prototype.addRequest=function(t,r,n,i){var o=this,s=pe({request:t},o.options,gt(r,n,i));if(o.sockets.length>=this.maxSockets){o.requests.push(s);return}o.createSocket(s,function(c){c.on("free",l),c.on("close",a),c.on("agentRemove",a),t.onSocket(c);function l(){o.emit("free",c,s)}function a(u){o.removeSocket(c),c.removeListener("free",l),c.removeListener("close",a),c.removeListener("agentRemove",a)}})};P.prototype.createSocket=function(t,r){var n=this,i={};n.sockets.push(i);var o=pe({},n.proxyOptions,{method:"CONNECT",path:t.host+":"+t.port,agent:!1,headers:{host:t.host+":"+t.port}});t.localAddress&&(o.localAddress=t.localAddress),o.proxyAuth&&(o.headers=o.headers||{},o.headers["Proxy-Authorization"]="Basic "+new Buffer(o.proxyAuth).toString("base64")),C("making CONNECT request");var s=n.request(o);s.useChunkedEncodingByDefault=!1,s.once("response",c),s.once("upgrade",l),s.once("connect",a),s.once("error",u),s.end();function c(d){d.upgrade=!0}function l(d,h,j){process.nextTick(function(){a(d,h,j)})}function a(d,h,j){if(s.removeAllListeners(),h.removeAllListeners(),d.statusCode!==200){C("tunneling socket could not be established, statusCode=%d",d.statusCode),h.destroy();var F=new Error("tunneling socket could not be established, statusCode="+d.statusCode);F.code="ECONNRESET",t.request.emit("error",F),n.removeSocket(i);return}if(j.length>0){C("got illegal response body from proxy"),h.destroy();var F=new Error("got illegal response body from proxy");F.code="ECONNRESET",t.request.emit("error",F),n.removeSocket(i);return}return C("tunneling connection has established"),n.sockets[n.sockets.indexOf(i)]=h,r(h)}function u(d){s.removeAllListeners(),C(`tunneling socket could not be established, cause=%s
`,d.message,d.stack);var h=new Error("tunneling socket could not be established, cause="+d.message);h.code="ECONNRESET",t.request.emit("error",h),n.removeSocket(i)}};P.prototype.removeSocket=function(t){var r=this.sockets.indexOf(t);if(r!==-1){this.sockets.splice(r,1);var n=this.requests.shift();n&&this.createSocket(n,function(i){n.request.onSocket(i)})}};function mt(e,t){var r=this;P.prototype.createSocket.call(r,e,function(n){var i=e.request.getHeader("host"),o=pe({},r.options,{socket:n,servername:i?i.replace(/:.*$/,""):e.host}),s=Or.connect(0,o);r.sockets[r.sockets.indexOf(n)]=s,t(s)})}function gt(e,t,r){return typeof e=="string"?{host:e,port:t,localAddress:r}:e}function pe(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t];if(typeof n=="object")for(var i=Object.keys(n),o=0,s=i.length;o<s;++o){var c=i[o];n[c]!==void 0&&(e[c]=n[c])}}return e}var C;process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?C=function(){var e=Array.prototype.slice.call(arguments);typeof e[0]=="string"?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:C=function(){};I.debug=C});var _t=O((_i,yt)=>{yt.exports=vt()});var Ot=O(p=>{"use strict";var Tr=p&&p.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Pr=p&&p.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),ne=p&&p.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Tr(t,e,r);return Pr(t,e),t},m=p&&p.__awaiter||function(e,t,r,n){function i(o){return o instanceof r?o:new r(function(s){s(o)})}return new(r||(r=Promise))(function(o,s){function c(u){try{a(n.next(u))}catch(d){s(d)}}function l(u){try{a(n.throw(u))}catch(d){s(d)}}function a(u){u.done?o(u.value):i(u.value).then(c,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(p,"__esModule",{value:!0});p.HttpClient=p.isHttps=p.HttpClientResponse=p.HttpClientError=p.getProxyUrl=p.MediaTypes=p.Headers=p.HttpCodes=void 0;var X=ne(require("http")),me=ne(require("https")),wt=ne(ht()),Z=ne(_t()),x;(function(e){e[e.OK=200]="OK",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.ResourceMoved=302]="ResourceMoved",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.SwitchProxy=306]="SwitchProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout"})(x=p.HttpCodes||(p.HttpCodes={}));var y;(function(e){e.Accept="accept",e.ContentType="content-type"})(y=p.Headers||(p.Headers={}));var k;(function(e){e.ApplicationJson="application/json"})(k=p.MediaTypes||(p.MediaTypes={}));function qr(e){let t=wt.getProxyUrl(new URL(e));return t?t.href:""}p.getProxyUrl=qr;var Ur=[x.MovedPermanently,x.ResourceMoved,x.SeeOther,x.TemporaryRedirect,x.PermanentRedirect],Cr=[x.BadGateway,x.ServiceUnavailable,x.GatewayTimeout],kr=["OPTIONS","GET","DELETE","HEAD"],Mr=10,Nr=5,te=class e extends Error{constructor(t,r){super(t),this.name="HttpClientError",this.statusCode=r,Object.setPrototypeOf(this,e.prototype)}};p.HttpClientError=te;var re=class{constructor(t){this.message=t}readBody(){return m(this,void 0,void 0,function*(){return new Promise(t=>m(this,void 0,void 0,function*(){let r=Buffer.alloc(0);this.message.on("data",n=>{r=Buffer.concat([r,n])}),this.message.on("end",()=>{t(r.toString())})}))})}};p.HttpClientResponse=re;function jr(e){return new URL(e).protocol==="https:"}p.isHttps=jr;var ge=class{constructor(t,r,n){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=t,this.handlers=r||[],this.requestOptions=n,n&&(n.ignoreSslError!=null&&(this._ignoreSslError=n.ignoreSslError),this._socketTimeout=n.socketTimeout,n.allowRedirects!=null&&(this._allowRedirects=n.allowRedirects),n.allowRedirectDowngrade!=null&&(this._allowRedirectDowngrade=n.allowRedirectDowngrade),n.maxRedirects!=null&&(this._maxRedirects=Math.max(n.maxRedirects,0)),n.keepAlive!=null&&(this._keepAlive=n.keepAlive),n.allowRetries!=null&&(this._allowRetries=n.allowRetries),n.maxRetries!=null&&(this._maxRetries=n.maxRetries))}options(t,r){return m(this,void 0,void 0,function*(){return this.request("OPTIONS",t,null,r||{})})}get(t,r){return m(this,void 0,void 0,function*(){return this.request("GET",t,null,r||{})})}del(t,r){return m(this,void 0,void 0,function*(){return this.request("DELETE",t,null,r||{})})}post(t,r,n){return m(this,void 0,void 0,function*(){return this.request("POST",t,r,n||{})})}patch(t,r,n){return m(this,void 0,void 0,function*(){return this.request("PATCH",t,r,n||{})})}put(t,r,n){return m(this,void 0,void 0,function*(){return this.request("PUT",t,r,n||{})})}head(t,r){return m(this,void 0,void 0,function*(){return this.request("HEAD",t,null,r||{})})}sendStream(t,r,n,i){return m(this,void 0,void 0,function*(){return this.request(t,r,n,i)})}getJson(t,r={}){return m(this,void 0,void 0,function*(){r[y.Accept]=this._getExistingOrDefaultHeader(r,y.Accept,k.ApplicationJson);let n=yield this.get(t,r);return this._processResponse(n,this.requestOptions)})}postJson(t,r,n={}){return m(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,k.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,k.ApplicationJson);let o=yield this.post(t,i,n);return this._processResponse(o,this.requestOptions)})}putJson(t,r,n={}){return m(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,k.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,k.ApplicationJson);let o=yield this.put(t,i,n);return this._processResponse(o,this.requestOptions)})}patchJson(t,r,n={}){return m(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[y.Accept]=this._getExistingOrDefaultHeader(n,y.Accept,k.ApplicationJson),n[y.ContentType]=this._getExistingOrDefaultHeader(n,y.ContentType,k.ApplicationJson);let o=yield this.patch(t,i,n);return this._processResponse(o,this.requestOptions)})}request(t,r,n,i){return m(this,void 0,void 0,function*(){if(this._disposed)throw new Error("Client has already been disposed.");let o=new URL(r),s=this._prepareRequest(t,o,i),c=this._allowRetries&&kr.includes(t)?this._maxRetries+1:1,l=0,a;do{if(a=yield this.requestRaw(s,n),a&&a.message&&a.message.statusCode===x.Unauthorized){let d;for(let h of this.handlers)if(h.canHandleAuthentication(a)){d=h;break}return d?d.handleAuthentication(this,s,n):a}let u=this._maxRedirects;for(;a.message.statusCode&&Ur.includes(a.message.statusCode)&&this._allowRedirects&&u>0;){let d=a.message.headers.location;if(!d)break;let h=new URL(d);if(o.protocol==="https:"&&o.protocol!==h.protocol&&!this._allowRedirectDowngrade)throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");if(yield a.readBody(),h.hostname!==o.hostname)for(let j in i)j.toLowerCase()==="authorization"&&delete i[j];s=this._prepareRequest(t,h,i),a=yield this.requestRaw(s,n),u--}if(!a.message.statusCode||!Cr.includes(a.message.statusCode))return a;l+=1,l<c&&(yield a.readBody(),yield this._performExponentialBackoff(l))}while(l<c);return a})}dispose(){this._agent&&this._agent.destroy(),this._disposed=!0}requestRaw(t,r){return m(this,void 0,void 0,function*(){return new Promise((n,i)=>{function o(s,c){s?i(s):c?n(c):i(new Error("Unknown error"))}this.requestRawWithCallback(t,r,o)})})}requestRawWithCallback(t,r,n){typeof r=="string"&&(t.options.headers||(t.options.headers={}),t.options.headers["Content-Length"]=Buffer.byteLength(r,"utf8"));let i=!1;function o(l,a){i||(i=!0,n(l,a))}let s=t.httpModule.request(t.options,l=>{let a=new re(l);o(void 0,a)}),c;s.on("socket",l=>{c=l}),s.setTimeout(this._socketTimeout||3*6e4,()=>{c&&c.end(),o(new Error(`Request timeout: ${t.options.path}`))}),s.on("error",function(l){o(l)}),r&&typeof r=="string"&&s.write(r,"utf8"),r&&typeof r!="string"?(r.on("close",function(){s.end()}),r.pipe(s)):s.end()}getAgent(t){let r=new URL(t);return this._getAgent(r)}_prepareRequest(t,r,n){let i={};i.parsedUrl=r;let o=i.parsedUrl.protocol==="https:";i.httpModule=o?me:X;let s=o?443:80;if(i.options={},i.options.host=i.parsedUrl.hostname,i.options.port=i.parsedUrl.port?parseInt(i.parsedUrl.port):s,i.options.path=(i.parsedUrl.pathname||"")+(i.parsedUrl.search||""),i.options.method=t,i.options.headers=this._mergeHeaders(n),this.userAgent!=null&&(i.options.headers["user-agent"]=this.userAgent),i.options.agent=this._getAgent(i.parsedUrl),this.handlers)for(let c of this.handlers)c.prepareRequest(i.options);return i}_mergeHeaders(t){return this.requestOptions&&this.requestOptions.headers?Object.assign({},ee(this.requestOptions.headers),ee(t||{})):ee(t||{})}_getExistingOrDefaultHeader(t,r,n){let i;return this.requestOptions&&this.requestOptions.headers&&(i=ee(this.requestOptions.headers)[r]),t[r]||i||n}_getAgent(t){let r,n=wt.getProxyUrl(t),i=n&&n.hostname;if(this._keepAlive&&i&&(r=this._proxyAgent),this._keepAlive&&!i&&(r=this._agent),r)return r;let o=t.protocol==="https:",s=100;if(this.requestOptions&&(s=this.requestOptions.maxSockets||X.globalAgent.maxSockets),n&&n.hostname){let c={maxSockets:s,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(n.username||n.password)&&{proxyAuth:`${n.username}:${n.password}`}),{host:n.hostname,port:n.port})},l,a=n.protocol==="https:";o?l=a?Z.httpsOverHttps:Z.httpsOverHttp:l=a?Z.httpOverHttps:Z.httpOverHttp,r=l(c),this._proxyAgent=r}if(this._keepAlive&&!r){let c={keepAlive:this._keepAlive,maxSockets:s};r=o?new me.Agent(c):new X.Agent(c),this._agent=r}return r||(r=o?me.globalAgent:X.globalAgent),o&&this._ignoreSslError&&(r.options=Object.assign(r.options||{},{rejectUnauthorized:!1})),r}_performExponentialBackoff(t){return m(this,void 0,void 0,function*(){t=Math.min(Mr,t);let r=Nr*Math.pow(2,t);return new Promise(n=>setTimeout(()=>n(),r))})}_processResponse(t,r){return m(this,void 0,void 0,function*(){return new Promise((n,i)=>m(this,void 0,void 0,function*(){let o=t.message.statusCode||0,s={statusCode:o,result:null,headers:{}};o===x.NotFound&&n(s);function c(u,d){if(typeof d=="string"){let h=new Date(d);if(!isNaN(h.valueOf()))return h}return d}let l,a;try{a=yield t.readBody(),a&&a.length>0&&(r&&r.deserializeDates?l=JSON.parse(a,c):l=JSON.parse(a),s.result=l),s.headers=t.message.headers}catch{}if(o>299){let u;l&&l.message?u=l.message:a&&a.length>0?u=a:u=`Failed request: (${o})`;let d=new te(u,o);d.result=s.result,i(d)}else n(s)}))})}};p.HttpClient=ge;var ee=e=>Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{})});var Et=O(A=>{"use strict";var we=A&&A.__awaiter||function(e,t,r,n){function i(o){return o instanceof r?o:new r(function(s){s(o)})}return new(r||(r=Promise))(function(o,s){function c(u){try{a(n.next(u))}catch(d){s(d)}}function l(u){try{a(n.throw(u))}catch(d){s(d)}}function a(u){u.done?o(u.value):i(u.value).then(c,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(A,"__esModule",{value:!0});A.PersonalAccessTokenCredentialHandler=A.BearerCredentialHandler=A.BasicCredentialHandler=void 0;var ve=class{constructor(t,r){this.username=t,this.password=r}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return we(this,void 0,void 0,function*(){throw new Error("not implemented")})}};A.BasicCredentialHandler=ve;var ye=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Bearer ${this.token}`}canHandleAuthentication(){return!1}handleAuthentication(){return we(this,void 0,void 0,function*(){throw new Error("not implemented")})}};A.BearerCredentialHandler=ye;var _e=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return we(this,void 0,void 0,function*(){throw new Error("not implemented")})}};A.PersonalAccessTokenCredentialHandler=_e});var xt=O($=>{"use strict";var bt=$&&$.__awaiter||function(e,t,r,n){function i(o){return o instanceof r?o:new r(function(s){s(o)})}return new(r||(r=Promise))(function(o,s){function c(u){try{a(n.next(u))}catch(d){s(d)}}function l(u){try{a(n.throw(u))}catch(d){s(d)}}function a(u){u.done?o(u.value):i(u.value).then(c,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty($,"__esModule",{value:!0});$.OidcClient=void 0;var Br=Ot(),Dr=Et(),St=ie(),Oe=class e{static createHttpClient(t=!0,r=10){let n={allowRetries:t,maxRetries:r};return new Br.HttpClient("actions/oidc-client",[new Dr.BearerCredentialHandler(e.getRequestToken())],n)}static getRequestToken(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");return t}static getIDTokenUrl(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_URL;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");return t}static getCall(t){var r;return bt(this,void 0,void 0,function*(){let o=(r=(yield e.createHttpClient().getJson(t).catch(s=>{throw new Error(`Failed to get ID Token. 
 
        Error Code : ${s.statusCode}
 
        Error Message: ${s.result.message}`)})).result)===null||r===void 0?void 0:r.value;if(!o)throw new Error("Response json body do not have ID Token field");return o})}static getIDToken(t){return bt(this,void 0,void 0,function*(){try{let r=e.getIDTokenUrl();if(t){let i=encodeURIComponent(t);r=`${r}&audience=${i}`}St.debug(`ID token url is ${r}`);let n=yield e.getCall(r);return St.setSecret(n),n}catch(r){throw new Error(`Error message: ${r.message}`)}})}};$.OidcClient=Oe});var xe=O(_=>{"use strict";var Ee=_&&_.__awaiter||function(e,t,r,n){function i(o){return o instanceof r?o:new r(function(s){s(o)})}return new(r||(r=Promise))(function(o,s){function c(u){try{a(n.next(u))}catch(d){s(d)}}function l(u){try{a(n.throw(u))}catch(d){s(d)}}function a(u){u.done?o(u.value):i(u.value).then(c,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(_,"__esModule",{value:!0});_.summary=_.markdownSummary=_.SUMMARY_DOCS_URL=_.SUMMARY_ENV_VAR=void 0;var Ir=require("os"),be=require("fs"),{access:$r,appendFile:Lr,writeFile:Fr}=be.promises;_.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY";_.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";var Se=class{constructor(){this._buffer=""}filePath(){return Ee(this,void 0,void 0,function*(){if(this._filePath)return this._filePath;let t=process.env[_.SUMMARY_ENV_VAR];if(!t)throw new Error(`Unable to find environment variable for $${_.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);try{yield $r(t,be.constants.R_OK|be.constants.W_OK)}catch{throw new Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`)}return this._filePath=t,this._filePath})}wrap(t,r,n={}){let i=Object.entries(n).map(([o,s])=>` ${o}="${s}"`).join("");return r?`<${t}${i}>${r}</${t}>`:`<${t}${i}>`}write(t){return Ee(this,void 0,void 0,function*(){let r=!!t?.overwrite,n=yield this.filePath();return yield(r?Fr:Lr)(n,this._buffer,{encoding:"utf8"}),this.emptyBuffer()})}clear(){return Ee(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:!0})})}stringify(){return this._buffer}isEmptyBuffer(){return this._buffer.length===0}emptyBuffer(){return this._buffer="",this}addRaw(t,r=!1){return this._buffer+=t,r?this.addEOL():this}addEOL(){return this.addRaw(Ir.EOL)}addCodeBlock(t,r){let n=Object.assign({},r&&{lang:r}),i=this.wrap("pre",this.wrap("code",t),n);return this.addRaw(i).addEOL()}addList(t,r=!1){let n=r?"ol":"ul",i=t.map(s=>this.wrap("li",s)).join(""),o=this.wrap(n,i);return this.addRaw(o).addEOL()}addTable(t){let r=t.map(i=>{let o=i.map(s=>{if(typeof s=="string")return this.wrap("td",s);let{header:c,data:l,colspan:a,rowspan:u}=s,d=c?"th":"td",h=Object.assign(Object.assign({},a&&{colspan:a}),u&&{rowspan:u});return this.wrap(d,l,h)}).join("");return this.wrap("tr",o)}).join(""),n=this.wrap("table",r);return this.addRaw(n).addEOL()}addDetails(t,r){let n=this.wrap("details",this.wrap("summary",t)+r);return this.addRaw(n).addEOL()}addImage(t,r,n){let{width:i,height:o}=n||{},s=Object.assign(Object.assign({},i&&{width:i}),o&&{height:o}),c=this.wrap("img",null,Object.assign({src:t,alt:r},s));return this.addRaw(c).addEOL()}addHeading(t,r){let n=`h${r}`,i=["h1","h2","h3","h4","h5","h6"].includes(n)?n:"h1",o=this.wrap(i,t);return this.addRaw(o).addEOL()}addSeparator(){let t=this.wrap("hr",null);return this.addRaw(t).addEOL()}addBreak(){let t=this.wrap("br",null);return this.addRaw(t).addEOL()}addQuote(t,r){let n=Object.assign({},r&&{cite:r}),i=this.wrap("blockquote",t,n);return this.addRaw(i).addEOL()}addLink(t,r){let n=this.wrap("a",t,{href:r});return this.addRaw(n).addEOL()}},Rt=new Se;_.markdownSummary=Rt;_.summary=Rt});var At=O(w=>{"use strict";var Vr=w&&w.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Gr=w&&w.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Kr=w&&w.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Vr(t,e,r);return Gr(t,e),t};Object.defineProperty(w,"__esModule",{value:!0});w.toPlatformPath=w.toWin32Path=w.toPosixPath=void 0;var Wr=Kr(require("path"));function Jr(e){return e.replace(/[\\]/g,"/")}w.toPosixPath=Jr;function Hr(e){return e.replace(/[/]/g,"\\")}w.toWin32Path=Hr;function zr(e){return e.replace(/[/\\]/g,Wr.sep)}w.toPlatformPath=zr});var ie=O(f=>{"use strict";var Yr=f&&f.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Qr=f&&f.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Tt=f&&f.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Yr(t,e,r);return Qr(t,e),t},Pt=f&&f.__awaiter||function(e,t,r,n){function i(o){return o instanceof r?o:new r(function(s){s(o)})}return new(r||(r=Promise))(function(o,s){function c(u){try{a(n.next(u))}catch(d){s(d)}}function l(u){try{a(n.throw(u))}catch(d){s(d)}}function a(u){u.done?o(u.value):i(u.value).then(c,l)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(f,"__esModule",{value:!0});f.getIDToken=f.getState=f.saveState=f.group=f.endGroup=f.startGroup=f.info=f.notice=f.warning=f.error=f.debug=f.isDebug=f.setFailed=f.setCommandEcho=f.setOutput=f.getBooleanInput=f.getMultilineInput=f.getInput=f.addPath=f.setSecret=f.exportVariable=f.ExitCode=void 0;var S=Be(),N=ft(),L=J(),qt=Tt(require("os")),Xr=Tt(require("path")),Zr=xt(),Ut;(function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"})(Ut=f.ExitCode||(f.ExitCode={}));function en(e,t){let r=L.toCommandValue(t);if(process.env[e]=r,process.env.GITHUB_ENV||"")return N.issueFileCommand("ENV",N.prepareKeyValueMessage(e,t));S.issueCommand("set-env",{name:e},r)}f.exportVariable=en;function tn(e){S.issueCommand("add-mask",{},e)}f.setSecret=tn;function rn(e){process.env.GITHUB_PATH||""?N.issueFileCommand("PATH",e):S.issueCommand("add-path",{},e),process.env.PATH=`${e}${Xr.delimiter}${process.env.PATH}`}f.addPath=rn;function Re(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw new Error(`Input required and not supplied: ${e}`);return t&&t.trimWhitespace===!1?r:r.trim()}f.getInput=Re;function nn(e,t){let r=Re(e,t).split(`
`).filter(n=>n!=="");return t&&t.trimWhitespace===!1?r:r.map(n=>n.trim())}f.getMultilineInput=nn;function on(e,t){let r=["true","True","TRUE"],n=["false","False","FALSE"],i=Re(e,t);if(r.includes(i))return!0;if(n.includes(i))return!1;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}f.getBooleanInput=on;function sn(e,t){if(process.env.GITHUB_OUTPUT||"")return N.issueFileCommand("OUTPUT",N.prepareKeyValueMessage(e,t));process.stdout.write(qt.EOL),S.issueCommand("set-output",{name:e},L.toCommandValue(t))}f.setOutput=sn;function an(e){S.issue("echo",e?"on":"off")}f.setCommandEcho=an;function un(e){process.exitCode=Ut.Failure,Ct(e)}f.setFailed=un;function cn(){return process.env.RUNNER_DEBUG==="1"}f.isDebug=cn;function ln(e){S.issueCommand("debug",{},e)}f.debug=ln;function Ct(e,t={}){S.issueCommand("error",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.error=Ct;function fn(e,t={}){S.issueCommand("warning",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.warning=fn;function dn(e,t={}){S.issueCommand("notice",L.toCommandProperties(t),e instanceof Error?e.toString():e)}f.notice=dn;function hn(e){process.stdout.write(e+qt.EOL)}f.info=hn;function kt(e){S.issue("group",e)}f.startGroup=kt;function Mt(){S.issue("endgroup")}f.endGroup=Mt;function pn(e,t){return Pt(this,void 0,void 0,function*(){kt(e);let r;try{r=yield t()}finally{Mt()}return r})}f.group=pn;function mn(e,t){if(process.env.GITHUB_STATE||"")return N.issueFileCommand("STATE",N.prepareKeyValueMessage(e,t));S.issueCommand("save-state",{name:e},L.toCommandValue(t))}f.saveState=mn;function gn(e){return process.env[`STATE_${e}`]||""}f.getState=gn;function vn(e){return Pt(this,void 0,void 0,function*(){return yield Zr.OidcClient.getIDToken(e)})}f.getIDToken=vn;var yn=xe();Object.defineProperty(f,"summary",{enumerable:!0,get:function(){return yn.summary}});var _n=xe();Object.defineProperty(f,"markdownSummary",{enumerable:!0,get:function(){return _n.markdownSummary}});var Ae=At();Object.defineProperty(f,"toPosixPath",{enumerable:!0,get:function(){return Ae.toPosixPath}});Object.defineProperty(f,"toWin32Path",{enumerable:!0,get:function(){return Ae.toWin32Path}});Object.defineProperty(f,"toPlatformPath",{enumerable:!0,get:function(){return Ae.toPlatformPath}})});var An={};Ue(An,{main:()=>$t});module.exports=ke(An);var R=T(require("fs")),qe=T(require("path")),M=T(ie());var Nt=T(require("fs")),jt=T(require("path")),Te=T(ie()),wn="backup-suffix";function Bt(e){if(!Nt.existsSync(e))return"";let t=`.bak-${Date.now()}`;return Te.saveState(wn,t),t}function Dt(){return jt.resolve(On(),".ssh")}function On(){let e=En(),t=process.env[e];if(t===void 0)throw Error(`${e} is not defined`);return t==="/github/home"?"/root":t}function En(){return process.platform==="win32"?"USERPROFILE":"HOME"}var It=["github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk="];try{$t()}catch(e){e instanceof Error&&M.setFailed(e)}function $t(){let e=M.getInput("key",{required:!0}),t=M.getInput("name"),r=M.getInput("known_hosts",{required:!0}),n=M.getInput("config"),i=M.getInput("if_key_exists"),o=Dt(),s=Bt(o);R.mkdirSync(o,{recursive:!0,mode:448});let c=[{name:"known_hosts",contents:Pe(Rn(r).join(`
`),!0,!0),options:{mode:420,flag:"a"},mustNotExist:!1}];xn(qe.join(o,t),i)&&c.push({name:t,contents:Pe(e,!1,!0),options:{mode:256,flag:"wx"},mustNotExist:!0}),n!==""&&c.push({name:"config",contents:Pe(n,!0,!0),options:{mode:420,flag:"a"},mustNotExist:!1});let l=[];for(let a of c){let u=qe.join(o,a.name);Sn(u,s,a.mustNotExist)&&l.push(a.name),R.writeFileSync(u,a.contents,a.options)}console.log(`SSH key has been stored to ${o} successfully.`),l.length>0&&console.log(`Following files are backed up in suffix "${s}"; ${l.join(", ")}`)}function Sn(e,t,r){if(t===""||!R.existsSync(e))return!1;let n=`${e}${t}`;return R.renameSync(e,n),r||R.copyFileSync(n,e),!0}function Pe(e,t,r){let n=e;return e.length===0?"":(t&&!n.startsWith(`
`)&&(n=`
${n}`),r&&!n.endsWith(`
`)&&(n=`${n}
`),n)}function xn(e,t){if(!R.existsSync(e))return!0;switch(t){case"replace":return!0;case"ignore":return!1;default:throw new Error('SSH key is already installed. Set "if_key_exists" to "replace" or "ignore" in order to avoid this error.')}}function Rn(e){return e==="unnecessary"?It:It.concat(e)}0&&(module.exports={main});
//# sourceMappingURL=main.js.map
