# varuint-ravencoin

[![abstract-encoding](https://img.shields.io/badge/abstract--encoding-compliant-brightgreen.svg?style=flat-square)](https://github.com/mafintosh/abstract-encoding)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

encode/decode number as [ravencoin variable length integer](https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer)

| value | storage length (bytes) |
|:------:|:--------------:|
| [0, 0xfd) | 1 |
| [0xfd, 0xffff] | 3 |
| [0x010000, 0xffffffff] | 5 |
| [0x0100000000, 0x1fffffffffffff] | 9 |

## License

MIT
