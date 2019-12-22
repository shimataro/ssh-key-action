# Install SSH key

[![Build][image-build]][link-build]
[![Connection test][image-connection-test]][link-connection-test]
[![Release][image-release]][link-release]
[![License][image-license]][link-license]

This action installs SSH key into `~/.ssh`.

Useful for SCP, SFTP, and `rsync` over SSH in deployment script.

## Usage

Add your SSH key to your product secrets by clicking `Settings` - `Secrets` - `Add a new secret` beforehand.

```yaml
runs-on: ubuntu-latest
steps:
- name: Install SSH key
  uses: shimataro/ssh-key-action@v1
  with:
    private-key: ${{ secrets.SSH_KEY }}
    public-key: ${{ secrets.SSH_KEY_PUBLIC }}
    name: id_rsa # optional
    known-hosts: ${{ secrets.KNOWN_HOSTS }} # known_hosts; optional
    config: ${{ secrets.CONFIG }} # ssh_config; optional
- name: Install packages
  run: apt install openssh-client rsync
- name: rsync over ssh
  run: rsync ./foo/ user@remote:bar/
```

See [Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions) for details.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

[image-build]: https://github.com/shimataro/ssh-key-action/workflows/Build/badge.svg
[link-build]: https://github.com/shimataro/ssh-key-action
[image-connection-test]: https://github.com/shimataro/ssh-key-action/workflows/Connection%20test/badge.svg
[link-connection-test]: https://github.com/shimataro/ssh-key-action
[image-release]: https://img.shields.io/github/release/shimataro/ssh-key-action.svg
[link-release]: https://github.com/shimataro/ssh-key-action/releases
[image-license]: https://img.shields.io/github/license/shimataro/ssh-key-action.svg
[link-license]: ./LICENSE
