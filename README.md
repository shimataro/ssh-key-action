# Install SSH Key

[![Build][image-build]][link-build]
[![Windows][image-verify-windows]][link-verify-windows]
[![macOS][image-verify-macos]][link-verify-macos]
[![Ubuntu][image-verify-ubuntu]][link-verify-ubuntu]
[![Docker container (Ubuntu)][image-verify-docker-container-ubuntu]][link-verify-docker-container-ubuntu]
[![Docker container (CentOS)][image-verify-docker-container-centos]][link-verify-docker-container-centos]
[![Docker container (Alpine Linux)][image-verify-docker-container-alpine]][link-verify-docker-container-alpine]
[![Release][image-release]][link-release]
[![License][image-license]][link-license]
[![Stars][image-stars]][link-stars]

This action installs SSH key in `~/.ssh`.

Useful for SCP, SFTP, and `rsync` over SSH in deployment script.

tested on:

* [all available virtual machines](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources) (Windows Server 2022/2019, macOS Monterey/Big Sur, and Ubuntu 22.04/20.04)
* [Docker container (Ubuntu)](https://hub.docker.com/_/ubuntu) / requires `openssh-client` package; `apt install -y openssh-client`
* [Docker container (CentOS)](https://quay.io/repository/centos/centos) / requires `openssh-clients` package; `yum install -y openssh-clients`
* [Docker container (Alpine Linux)](https://hub.docker.com/_/alpine) / requires `openssh-client` package; `apk add openssh-client`

## Usage

Add your SSH key to your product secrets by clicking `Settings` - `Secrets` - `Add a new secret` beforehand.

PEM(RSA), PKCS8, and RFC4716(OpenSSH) formats are OK.

```yaml
runs-on: ubuntu-latest
steps:
- name: Install SSH key
  uses: shimataro/ssh-key-action@v2
  with:
    key: ${{ secrets.SSH_KEY }}
    name: id_rsa # optional
    known_hosts: ${{ secrets.KNOWN_HOSTS }}
    config: ${{ secrets.CONFIG }} # ssh_config; optional
    if_key_exists: fail # replace / ignore / fail; optional (defaults to fail)
- name: rsync over SSH
  run: rsync -r ./foo/ user@remote:bar/
```

See [Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions) for details.

**NOTE:**

* Server key of `github.com` will be always set to `known_hosts`.
* SSH keys will be removed at the end of workflow.

### Install multiple keys

If you want to install multiple keys, call this action multiple times.
It is useful for port forwarding.

**NOTE:** When this action is called multiple times, **the contents of `known_hosts` and `config` will be appended**. `key` must be saved as different name, by using `name` option.

```yaml
runs-on: ubuntu-latest
steps:
- name: Install SSH key of bastion
  uses: shimataro/ssh-key-action@v2
  with:
    key: ${{ secrets.SSH_KEY_OF_BASTION }}
    name: id_rsa-bastion
    known_hosts: ${{ secrets.KNOWN_HOSTS_OF_BASTION }}
    config: |
      Host bastion
        HostName xxx.xxx.xxx.xxx
        User user-of-bastion
        IdentityFile ~/.ssh/id_rsa-bastion
- name: Install SSH key of target
  uses: shimataro/ssh-key-action@v2
  with:
    key: ${{ secrets.SSH_KEY_OF_TARGET }}
    name: id_rsa-target
    known_hosts: ${{ secrets.KNOWN_HOSTS_OF_TARGET }} # will be appended to existing .ssh/known_hosts
    config: |                                         # will be appended to existing .ssh/config
      Host target
        HostName yyy.yyy.yyy.yyy
        User user-of-target
        IdentityFile ~/.ssh/id_rsa-target
        ProxyCommand ssh -W %h:%p bastion
- name: SCP via port-forwarding
  run: scp ./foo/ target:bar/
```

## Q&A

### SSH failed even though key has been installed.

Check below:

* `Host key verification failed.`:
    * Set `known_hosts` parameter correctly (use `ssh-keyscan` command).

### I want to replace/ignore key if exists.

Use `if_key_exists` parameter.

* `replace`: replaces key
* `ignore`: does nothing
* `fail`: fails (default)

### How do I use encrypted SSH key?

This action doesn't support encrypted key directly.
Here are some solutions:

* decrypting key beforehand: best bet, and works on any VM
* `sshpass` command: next best bet, but not supported on Windows
* `expect` command: be careful not to expose passphrase to console
* `SSH_ASKPASS` environment variable: might be troublesome

### Which one is the best way for transferring files, "direct SCP/SFTP/rsync" or "SCP/SFTP/rsync via bastion"?

I recommend **rsync via bastion**.

```bash
rsync -r -e "ssh bastion ssh" ./foo/ target:bar/
```

It has some advantages over other methods:

* "Rsync via bastion" doesn't require to update workflow files and `secrets` even if it is necessary to transfer files to multiple servers.
    * Other methods require to update `known_hosts` if servers have changed.
* Rsync:
    * is fastest of all.
    * does **NOT** break files even if disconnected during transferring.
    * can remove files that don't exist on server.
* SCP is [deprecated by OpenSSH](https://www.openssh.com/txt/release-8.0) due to outdated and inflexible protocol.
* Using bastion is more secure because:
    * it is not necessarily to expose SSH port on servers to public.
        * Address filtering is less effective.
        * Because Azure address range is [very wide](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners#ip-addresses-of-github-hosted-runners).
        * And will be updated continuously.
    * if security incident ―e.g., private key leaked― occurs, it's OK just to remove `authorized_keys` on bastion.

### I want to omit `known_hosts`.

First of all, you have to understand that it is NOT secure to SSH with no `known_hosts` and using `StrictHostKeyChecking=no` option.

Why do you want to omit it?
If the reason is **"I'm not understanding about the function of `known_hosts`"** or **"It's bother to fetch server key"**, you should not omit.
If **"It is hard to prefetch server key because the server will be created dynamically"**, you can use bastion server.

**"`known_hosts` is unnecessary because I'm using secure method for SSH, such as SSHFP and signed server key."** — OK, here is a special value to omit `known_hosts`.
You should use it ONLY IF you are using secure methods...
It is `known_hosts: unnecessary`.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

[image-build]: https://github.com/shimataro/ssh-key-action/workflows/Build/badge.svg?event=push&branch=v2
[link-build]: https://github.com/shimataro/ssh-key-action/actions/workflows/build.yml
[image-verify-windows]: https://github.com/shimataro/ssh-key-action/workflows/Windows/badge.svg?event=push&branch=v2
[link-verify-windows]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-windows.yml
[image-verify-macos]: https://github.com/shimataro/ssh-key-action/workflows/macOS/badge.svg?event=push&branch=v2
[link-verify-macos]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-macos.yml
[image-verify-ubuntu]: https://github.com/shimataro/ssh-key-action/workflows/Ubuntu/badge.svg?event=push&branch=v2
[link-verify-ubuntu]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-ubuntu.yml
[image-verify-docker-container-ubuntu]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-container-ubuntu.yml/badge.svg?event=push&branch=v2
[link-verify-docker-container-ubuntu]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-container-ubuntu.yml
[image-verify-docker-container-centos]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-container-centos.yml/badge.svg?event=push&branch=v2
[link-verify-docker-container-centos]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-container-centos.yml
[image-verify-docker-container-alpine]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-container-alpine.yml/badge.svg?event=push&branch=v2
[link-verify-docker-container-alpine]: https://github.com/shimataro/ssh-key-action/actions/workflows/verify-on-container-alpine.yml
[image-release]: https://img.shields.io/github/release/shimataro/ssh-key-action.svg
[link-release]: https://github.com/shimataro/ssh-key-action/releases
[image-license]: https://img.shields.io/github/license/shimataro/ssh-key-action.svg
[link-license]: ./LICENSE
[image-stars]: https://img.shields.io/github/stars/shimataro/ssh-key-action.svg
[link-stars]: https://github.com/shimataro/ssh-key-action/stargazers
