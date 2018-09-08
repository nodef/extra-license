Get [SPDX license] text.
> See available [license types].

```bash
# install as console app
$ npm install -g extra-license

# install as node.js package
$ npm install extra-license
```


### console

```bash
$ elicense [command] [text] [options]
# Commands:
# - get: get license text (default)
# - search: search license properties
# Text: search text (mit/isc/...)
# Options:
# -y | --year: license year
# -n | --fullname: author name
# -e | --email: author email
# -p | --project: project details
# -f | --filter: filter properties
# Environment variables:
# ELICENSE: license type
# ELICENSE_YEAR: license year
# ELICENSE_FULLNAME: author name
# ELICENSE_EMAIL: author email
# ELICENSE_PROJECT: project details
# ELICENSE_FILTER: filter properties


# get mit license
$ elicense

# get artistic-2.0 license
$ elicense "artistic license"

# get isc license with fullname
$ elicense isc --fullname "Jehangir Ratanji Dadabhoy Tata"

# save mit license with year, fullname
$ elicense -y 2017 -n "Megasthenes" > LICENSE

# save isc license with environment variables
$ ELICENSE=isc
$ ELICENSE_YEAR=2017
$ ELICENSE_FULLNAME=Megasthenes
$ elicense > LICENSE

# search "disclose-source" licences
$ elicense search "disclose-source"

# search "document-changes", show "conditions", "limitations"
$ elicense search "document-changes" -f "conditions,limitations"
```


### package

```javascript
const elicense = require('extra-license');
// elicense.corpus: Map {id => {id, title, nickname, description, permissions, conditions, limitations}}
// elicense.load(): true (corpus loaded)
// elicense.search(<text>): [{properties}]
// elicense.get(<id>, [options]): license
// elicense(<text>, [options])
// -> license


elicense.load();
/* load corpus first */

await elicense();
// MIT License
//
// Copyright (c) [year] [fullname]
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// ...

await elicense('isc', {year: 2017, fullname: 'Megasthenes'});
// ISC License
//
// Copyright (c) 2018, Megasthenes
//
// Permission to use, copy, modify, and/or distribute this software for any
// ...

elicense.search('network-use-disclose');
// [ { id: 'agpl-3.0',
//     title: 'GNU Affero General Public License v3.0',
//     nickname: 'GNU AGPLv3',
//     description:
//      'Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.',
//     permissions:
//      'commercial-use modifications distribution patent-use private-use',
//     conditions:
//      'include-copyright document-changes disclose-source network-use-disclose same-license',
//     limitations: 'liability warranty' }, ... ]

await elicense.get('agpl-3.0', {year: 2017, fullname: 'Megasthenes'});
// GNU AFFERO GENERAL PUBLIC LICENSE
//                        Version 3, 19 November 2007
//
//  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
//  Everyone is permitted to copy and distribute verbatim copies
//  of this license document, but changing it is not allowed.
//
//                             Preamble
// ...
```


[![Merferry](https://i.imgur.com/EYm1X2y.jpg)](https://merferry.github.io)
> All license texts obtained from [choosealicense.com].

[SPDX license]: https://spdx.org/licenses/
[license types]: https://github.com/nodef/extra-license/tree/master/assets
[choosealicense.com]: https://github.com/github/choosealicense.com
