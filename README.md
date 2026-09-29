Get [SPDX license] text.
> See available [license types].
<br>


## Console

```bash
# Get MIT license
$ xlicense

# Get Artistic-2.0 license
$ xlicense "artistic license"

# Get ISC license with fullname
$ xlicense isc --fullname "Jehangir Ratanji Dadabhoy Tata"

# Save MIT license with year, fullname
$ xlicense -y 2017 -n "Megasthenes" > LICENSE

# Save isc license with environment variables
$ XLICENSE=isc
$ XLICENSE_YEAR=2017
$ XLICENSE_FULLNAME=Megasthenes
$ xlicense > LICENSE

# Search "disclose-source" licences
$ xlicense search "disclose-source"

# Search "document-changes", show "conditions", "limitations"
$ xlicense search "document-changes" -f "conditions,limitations"
```

<br>


### Reference

```bash
$ xlicense [command] [text] [options]
# Commands:
# - get: get license text (default)
# - search: search license properties
# Text: search text (mit/isc/...)
# Options:
# -y | --year: license year
# -n | --fullname: author name
# -e | --email: author email
# -p | --project: project details
# -u | --projecturl: project url
# -f | --filter: filter properties
# Environment variables:
# XLICENSE: license type
# XLICENSE_YEAR: license year
# XLICENSE_FULLNAME: author name
# XLICENSE_EMAIL: author email
# XLICENSE_PROJECT: project details
# XLICENSE_PROJECTURL: project url
# XLICENSE_FILTER: filter properties
```
<br>


## package

```ts
import * as xlicense from "jsr:@nodef/extra-license";

xlicense.load();
/* Load corpus first */

await xlicense.license();
// MIT License
//
// Copyright (c) [year] [fullname]
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// ...

await xlicense.license('isc', {year: 2017, fullname: 'Megasthenes'});
// ISC License
//
// Copyright (c) 2018, Megasthenes
//
// Permission to use, copy, modify, and/or distribute this software for any
// ...

xlicense.searchLicense('network-use-disclose');
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

await xlicense.getLicense('isc', {year: 2017, fullname: 'Megasthenes'});
// ISC License
//
// Copyright (c) 2017, Megasthenes
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// ...
```

<br>

### Reference

```javascript
import * as xlicense from "jsr:@nodef/extra-license";

// xlicense.corpus
// -> Map {id => {id, title, nickname, description, permissions, conditions, limitations}}
xlicense.loadLicense()
// -> true (corpus loaded)
xlicense.searchLicense(text)
// -> [{properties}]
xlicense.getLicense(id, [options])
// -> license
xlicense.license(text, [options])
// -> license
```
<br>


[![nodef](https://merferry.glitch.me/card/extra-decompress.svg)](https://nodef.github.io)
> All license texts obtained from [choosealicense.com].

![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-license)

[SPDX license]: https://spdx.org/licenses/
[license types]: https://github.com/nodef/extra-license/tree/master/assets
[choosealicense.com]: https://github.com/github/choosealicense.com
