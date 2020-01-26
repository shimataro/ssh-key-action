# Install SSH Key

[![Build][image-build]][link-build]
[![Windows][image-verify-windows]][link-verify-windows]
[![macOS][image-verify-macos]][link-verify-macos]
[![Ubuntu][image-verify-ubuntu]][link-verify-ubuntu]
[![Ubuntu 16.04][image-verify-ubuntu1604]][link-verify-ubuntu1604]
[![Release][image-release]][link-release]
[![License][image-license]][link-license]
[![Stars][image-stars]][link-stars]

This action installs SSH key in `~/.ssh`.

Useful for SCP, SFTP, and `rsync` over SSH in deployment script.

**Works on all [virtual environment](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources) -- Windows, macOS, Ubuntu and Ubuntu 16.04.**

## Usage

Add your SSH key to your product secrets by clicking `Settings` - `Secrets` - `Add a new secret` beforehand.

**NOTE:** OPENSSH format (key begins with `-----BEGIN OPENSSH PRIVATE KEY-----`) may not work due to OpenSSH version on VM. Please use PEM format (begins with `-----BEGIN RSA PRIVATE KEY-----`) instead.

```yaml
runs-on: ubuntu-latest
steps:
- name: Install SSH key
  uses: shimataro/ssh-key-action@v1
  with:
    private-key: ${{ secrets.SSH_KEY }}
    name: id_rsa # optional
    known-hosts: ${{ secrets.KNOWN_HOSTS }} # known_hosts; optional
    config: ${{ secrets.CONFIG }} # ssh_config; optional
- name: rsync over ssh
  run: rsync ./foo/ user@remote:bar/
```

See [Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions) for details.

### Install multiple keys

If you want to install multiple keys, call this action multiple times.
It is useful for port forwarding.

**NOTE:**  When this action is called multiple times, **the contents of `known-hosts` and `config` will be appended**. `private-key` must be saved as different name, by using `name` option.

```yaml
runs-on: ubuntu-latest
steps:
- name: Install SSH key of bastion
  uses: shimataro/ssh-key-action@v1
  with:
    private-key: ${{ secrets.SSH_KEY_OF_BASTION }}
    name: id_rsa-bastion
    known-hosts: ${{ secrets.KNOWN_HOSTS_OF_BASTION }}
    config: |
      Host bastion
        HostName xxx.xxx.xxx.xxx
        User user-of-bastion
        IdentityFile ~/.ssh/id_rsa-bastion
- name: Install SSH key of target
  uses: shimataro/ssh-key-action@v1
  with:
    private-key: ${{ secrets.SSH_KEY_OF_TARGET }}
    name: id_rsa-target
    known-hosts: ${{ secrets.KNOWN_HOSTS_OF_TARGET }} # will be appended!
    config: |                                         # will be appended!
      Host target
        HostName yyy.yyy.yyy.yyy
        User user-of-target
        IdentityFile ~/.ssh/id_rsa-target
        ProxyCommand ssh -W %h:%p bastion
- name: SCP via port-forwarding
  run: scp ./foo/ target:bar/
```

## FAQ

### SSH failed even though key has been installed.

Check belows:

* `Load key "/HOME/.ssh/id_rsa": invalid format`:
    * OPENSSH format (key begins with `-----BEGIN OPENSSH PRIVATE KEY-----`) may not work.
    * Use PEM format (begins with `-----BEGIN RSA PRIVATE KEY-----`).
* `Host key verification failed.`:
    * Set `known-hosts` option or use `ssh -o StrictHostKeyChecking=no`.
    * The former is **HIGHLY** recommended for security reason.
    * I'm planning to make `known-hosts` required in v2.

### How do I use encrypted SSH key?

This action doesn't support encrypted key directly.
Here are some methods:

* decrypting key beforehand: best bet, and works any VM
* `sshpass` command: next best bet, but not supported in Windows
* `expect` command: please be careful not to expose passphrase to console
* `SSH_ASKPASS` environment variable: it may be troublesome

### Which one is the best way for transferring files, "direct SCP/SFTP/rsync" or "SCP/SFTP/rsync via bastion"?

I recommend **rsync via bastion**.
It has some advantages over other methods:

* You only need to use this action **only once** even if it is necessary to transfer to multiple servers.
    * Other methods require to use it multiple times in order to connect to each servers.
    * Of course, it is necessary to install bastion public key on servers, and server keys on bastion. But you don't have to update workflow files and `secrets` even if number of servers changed.
* `rsync`:
    * is faster than others.
    * will **NOT** break files even if disconnected during sending.
    * can remove files that don't exist in server.
* SCP is [deprecated by OpenSSH](https://www.openssh.com/txt/release-8.0) due to outdated and inflexible protocol.
* Using bastion is more secure because:
    * it is not necessarily to expose SSH port on servers to public.
    * it requires to shutdown only bastion when security incident ―e.g., private key leaked, GitHub jacked― occurs.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

[image-build]: https://github.com/shimataro/ssh-key-action/workflows/Build/badge.svg?event=push&branch=v1
[link-build]: https://github.com/shimataro/ssh-key-action
[image-verify-windows]: https://github.com/shimataro/ssh-key-action/workflows/Windows/badge.svg?event=push&branch=v1
[link-verify-windows]: https://github.com/shimataro/ssh-key-action
[image-verify-macos]: https://github.com/shimataro/ssh-key-action/workflows/macOS/badge.svg?event=push&branch=v1
[link-verify-macos]: https://github.com/shimataro/ssh-key-action
[image-verify-ubuntu]: https://github.com/shimataro/ssh-key-action/workflows/Ubuntu/badge.svg?event=push&branch=v1
[link-verify-ubuntu]: https://github.com/shimataro/ssh-key-action
[image-verify-ubuntu1604]: https://github.com/shimataro/ssh-key-action/workflows/Ubuntu%2016.04/badge.svg?event=push&branch=v1
[link-verify-ubuntu1604]: https://github.com/shimataro/ssh-key-action
[image-release]: https://img.shields.io/github/release/shimataro/ssh-key-action.svg
[link-release]: https://github.com/shimataro/ssh-key-action/releases
[image-license]: https://img.shields.io/github/license/shimataro/ssh-key-action.svg
[link-license]: ./LICENSE
[image-stars]: https://img.shields.io/github/stars/shimataro/ssh-key-action.svg
[link-stars]: https://github.com/shimataro/ssh-key-action/stargazers
