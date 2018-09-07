Get SPDX license text.
> See available [license types].

```bash
# install as console app
$ npm install -g extra-license

# install as node.js package
$ npm install extra-license
```


### console

```bash
$ elicense [type] [options]
# type: license type (mit/isc/...)
# options:
# -y | --year: license year
# -f | --fullname: author name
# -e | --email: author email
# -p | --project: project details
# Environment variables:
# ELICENSE: license type
# ELICENSE_YEAR: license year
# ELICENSE_FULLNAME: author name
# ELICENSE_EMAIL: author email
# ELICENSE_PROJECT: project details


# get mit license
$ elicense

# get artistic-2.0 license
$ elicense "artistic license"

# get isc license with fullname
$ elicense isc --fullname "Jehangir Ratanji Dadabhoy Tata"

# save mit license with year, fullname
$ elicense -y 2017 -f "Megasthenes" > LICENSE

# save isc license  with environment variables
$ ELICENSE=isc
$ ELICENSE_YEAR=2017
$ ELICENSE_FULLNAME=Megasthenes
$ elicense > LICENSE
```


### package

```javascript
const elicense = require('extra-license');
// elicense.corpus: Map {id => {id, title, nickname, description, permissions, conditions, limitations}}
// elicense.load(): true (corpus loaded)
// elicense(<type>, [options])
// -> text

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
```


[license types]: https://github.com/nodef/extra-license/tree/master/assets
