# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.7.0] - 2024-02-11

### Others

* Update to Node.js v20 (thanks [@princemaple](https://github.com/princemaple))
* drop old containers; Ubuntu 16.04, and CentOS 7

## [2.6.1] - 2023-10-13

### Fixed

* JSON parse error on exit, if `if_key_exists`=`fail` and key exists

## [2.6.0] - 2023-10-11

### Others

* back up and restore files when exist (thanks [@bambeusz](https://github.com/bambeusz))
* remove `macos-10.15` and `ubuntu-18.04` virtual environment

## [2.5.1] - 2023-03-25

### Hotfix

* update github.com key: <https://github.blog/2023-03-23-we-updated-our-rsa-ssh-host-key/> (thanks [@phlax](https://github.com/phlax))

## [2.5.0] - 2022-12-24

### Added

* remove SSH directory at the end of workflow

## [2.4.0] - 2022-11-03

### Added

* always set server key of `github.com` to `known_hosts`

### Fixed

* usage of `rsync` in README

### Others

* add `windows-2022`, and `macos-11` (thanks [@ViacheslavKudinov](https://github.com/ViacheslavKudinov))
* add `macos-12`, `ubuntu-22.04`, and `CentOS 8 Stream (Docker container)`
* drop `ubuntu-16.04`, and `CentOS 8 (Docker container)`
* [update Node.js version to 16](https://github.blog/changelog/2022-09-22-github-actions-all-actions-will-begin-running-on-node16-instead-of-node12/) (thanks [@duddu](https://github.com/duddu))

## [2.3.1] - 2021-08-01

### Security

* Fix [CVE-2021-33502](https://github.com/advisories/GHSA-px4h-xg32-q955)

### Others

* add `windows-2016` virtual environment
* [remove `ubuntu-16.04` virtual environment](https://github.blog/changelog/2021-04-29-github-actions-ubuntu-16-04-lts-virtual-environment-will-be-removed-on-september-20-2021/)

## [2.3.0] - 2021-03-21

### Added

* `if_key_exists` parameter
* `known_hosts: unnecessary`
* Support Alpine Linux Docker container

## [2.2.0] - 2021-02-27

### Added

* Support Ubuntu/CentOS Docker container (thanks [@kujaomega](https://github.com/kujaomega))
* Support PKCS8/RFC4716 formats (thanks [@tats-u](https://github.com/tats-u))

### Changed

* Bundle dependencies (thanks [@tats-u](https://github.com/tats-u))

### Fixed

* comments in README (thanks [@KimSoungRyoul](https://github.com/KimSoungRyoul))

## [2.1.0] - 2020-08-15

### Changed

* Append LF to `known_hosts` / `config` (thanks [@jacktuck](https://github.com/jacktuck))

### Fixed

* Typo (thanks [@psbss](https://github.com/psbss))

## [2.0.3] - 2020-06-06

### Added

* Ubuntu 20.04

### Changed

* Add short note on how to convert OPENSSH to PEM format by [@shadow1runner](https://github.com/shadow1runner)

## [2.0.2] - 2020-04-12

### Security

* update [minimist](https://www.npmjs.com/package/minimist) to 1.2.5 ([CVE-2020-7598](https://github.com/advisories/GHSA-vh95-rmgr-6w4m))

## [2.0.1] - 2020-03-14

### Security

* update [acorn](https://www.npmjs.com/package/acorn) to 7.1.1 ([GHSA-7fhm-mqm4-2wp7](https://github.com/advisories/GHSA-7fhm-mqm4-2wp7))

## [2.0.0] - 2020-02-08

### Changed

* rename `private-key` to `key`
* rename `known-hosts` to `known_hosts`
* make `known_hosts` required

## [1.6.5] - 2020-02-08

### Others

* update version of [Checkout](https://github.com/marketplace/actions/checkout) action

## [1.6.4] - 2020-01-27

### Fixed

* `node_modules/.bin` error (thanks [@george3447](https://github.com/george3447))

## [1.6.3] - 2020-01-27

### Others

* add Q&A

## [1.6.2] - 2020-01-25

### Others

* some updates

## [1.6.1] - 2020-01-19

### Fixed

* Some bugfixes

## [1.6.0] - 2020-01-18

### Changed

* `public-key` is no longer necessarily

## [1.5.0] - 2019/12/30

### Changed

* Append contents of `config` and `known_hosts` when called multiple times.

## [1.4.0] - 2019/12/22

### Added

* `config` option

## [1.3.0] - 2019/09/29

### Added

* `known-hosts` option

## [1.2.0] - 2019/09/22

### Fixed

* CI trigger
* example code in [README](README.md)

### Others

* Install only `dependencies` packages.

## [1.1.0] - 2019/09/19

### Others

* Support Visual Studio Code officially.
* Use GitHub Actions for build test.

## [1.0.0] - 2019/09/18

* First release.

[Unreleased]: https://github.com/shimataro/ssh-key-action/compare/v2.7.0...HEAD
[2.7.0]: https://github.com/shimataro/ssh-key-action/compare/v2.6.1...v2.7.0
[2.6.1]: https://github.com/shimataro/ssh-key-action/compare/v2.6.0...v2.6.1
[2.6.0]: https://github.com/shimataro/ssh-key-action/compare/v2.5.1...v2.6.0
[2.5.1]: https://github.com/shimataro/ssh-key-action/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/shimataro/ssh-key-action/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/shimataro/ssh-key-action/compare/v2.3.1...v2.4.0
[2.3.1]: https://github.com/shimataro/ssh-key-action/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/shimataro/ssh-key-action/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/shimataro/ssh-key-action/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/shimataro/ssh-key-action/compare/v2.0.3...v2.1.0
[2.0.3]: https://github.com/shimataro/ssh-key-action/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/shimataro/ssh-key-action/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/shimataro/ssh-key-action/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/shimataro/ssh-key-action/compare/v1.6.5...v2.0.0
[1.6.5]: https://github.com/shimataro/ssh-key-action/compare/v1.6.4...v1.6.5
[1.6.4]: https://github.com/shimataro/ssh-key-action/compare/v1.6.3...v1.6.4
[1.6.3]: https://github.com/shimataro/ssh-key-action/compare/v1.6.2...v1.6.3
[1.6.2]: https://github.com/shimataro/ssh-key-action/compare/v1.6.1...v1.6.2
[1.6.1]: https://github.com/shimataro/ssh-key-action/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/shimataro/ssh-key-action/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/shimataro/ssh-key-action/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/shimataro/ssh-key-action/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/shimataro/ssh-key-action/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/shimataro/ssh-key-action/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/shimataro/ssh-key-action/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/shimataro/ssh-key-action/compare/8deacc95b1ee5732107e56baa4c8aac4c386ef7e...v1.0.0
