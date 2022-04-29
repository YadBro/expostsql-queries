<div id="header" align="center">
  <img src="https://github.com/YadBro/tes/blob/master/LOGO.jpg?raw=true" width="200"/>
</div>

# What is this?

This is a package module for querying the postgresql database in Framework [EXPRESSjs](http://expressjs.com/)

There are 4 CRUD queries in this package.

- [selectAll](#selectAll) = Select all rows from a table.
- [selectOneById](#selectOneById) = Select single data in your table database.
- [save](#save) = insert or update a row in a table.
- [remove](#remove) = remove a row from a table.

# Installation

Use npm, make sure your npm is up to date.
To install this package, run the following command:

```
npm install expostsql-queries
```

# Usage / Examples

( = ) is detail information\
( : ) is default value

```javascript
import { SetUp } from "expostsql-queries";
import express from "express";

/*
Set Up your database postgresql
*  @param {string} dbname = your database name
*  @param {number} port = your port postgresql : 5432
*  @param {string} user = your username postgresql : postgres
*  @param {string} password = your password postgresql
*/
const client = new SetUp("b34s_chapter2", 5432, "postgres", "mypassword");

const table_name = "tb_project";
```

### selectAll

Select all rows in your table database

- @param {string} table_name = your table name database
- @param {()} callback
- @param {boolean} stop = stopping the client requiring : false

```javascript
// READ
client.selectAll(
  table,
  (data) => {
    console.log(data);
  },
  true
);
```

### selectOneById

Select single data in your table database

- @param {string} table_name = your table name database
- @param {number} id = your id database
- @param {()} callback
- @param {boolean} stop = stopping the client requiring : false

```javascript
// GET SINGLE DATA
client.save(
  table_name,
  [
    {
      name: "NEW DATA",
      start_date: "2022-08-12",
      end_date: "2022-08-13",
      description: "ANJAY 99 baru",
      image: "tes_baru99.jpg",
      technologies: "{nodeJsTechnology, reactJsTechnology}",
    },
  ],
  true
);
```

### save

Create or Update your field database

- @param {string} table_name = your table name database
- @param {()} callback
- @param {boolean} = stop stopping the client requiring : false

```javascript
// CREATE OR UPDATE

/// CREATE
client.save(table_name, [
  {
    name: "NEW DATA",
    start_date: "2022-08-12",
    end_date: "2022-08-13",
    description: "ANJAY 99 baru",
    image: "tes_baru99.jpg",
    technologies: "{nodeJsTechnology, reactJsTechnology}",
  },
]);

/// UPDATE
client.save(
  table_name,
  [
    {
      id: 1,
      name: "NEW DATA",
      start_date: "2022-08-12",
      end_date: "2022-08-13",
      description: "ANJAY 99 baru",
      image: "tes_baru99.jpg",
      technologies: "{nodeJsTechnology, reactJsTechnology}",
    },
  ],
  true
);
```

### remove

Remove your field database

- @param {string} table_name = your table name database
- @param {number} id = your id database
- @param {boolean} stop = stopping the client requiring : false

```javascript
// REMOVING DATA
client.remove(table_name, 9, true);
```

## License

Copyright © 2022 Yadi Apriyadi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##

[POSTGRESQL](https://www.postgresql.org/)

[EXPRESSJS](http://expressjs.com/)

[pg](https://github.com/brianc/node-postgres)

[node-postgresql](https://node-postgres.com/)
