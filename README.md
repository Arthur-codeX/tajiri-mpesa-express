# tajiri-mpesa-password

## Mpesa Password Generator

> npm

[npm]](https://www.npmjs.com/package/tajiri_mpesa_oauth)

## tajiri-mpesa-password

## NPM

npm install tajiri-mpesa-password

## Description

This is a simple package for generating mpesa password and time stamp.

[npm](https://www.npmjs.com/package/tajiri-mpesa-password)

### Installing

npm install tajiri-mpesa-password

### Usage

    const  pass = require("tajiri-mpesa-password");

const conf = {

BUSINESS_SHORT_CODE: 34546456,

PASS_KEY: "dsadnaskljnjsdnjfnsdjgnfkgdngdf",

};

/\*\*

- [Generate the mpesa key and time stamp]

- @param {[object]} conf [Pass A object containg: {

BUSINESS_SHORT_CODE: 34546456,

PASS_KEY: "dsadnaskljnjsdnjfnsdjgnfkgdngdf",

}; ]

- @param {[date]} time [This is the mpesa time.

Should be based on daraja format. This is created automatically but you can pass it]

- @return {[number]} gmt [This is the gmt ofset in hours.]

- \*\*/

console.log(pass(conf));

## References

> get the application credentials from daraja

[daraja]](https://developer.safaricom.co.ke/)
const pass = require("tajiri-mpesa-password");

const conf = {
BUSINESS_SHORT_CODE: 34546456,
PASS_KEY: "dsadnaskljnjsdnjfnsdjgnfkgdngdf",
};

/\*\*

- [Generate the mpesa key and time stamp]
- @param {[object]} conf [Pass A object containg: {
  BUSINESS_SHORT_CODE: 34546456,
  PASS_KEY: "dsadnaskljnjsdnjfnsdjgnfkgdngdf",
  }; ]

- @param {[date]} time [This is the mpesa time.
  Should be based on daraja format. This is created automatically but you can pass it]
- @return {[number]} gmt [This is the gmt ofset in hours.]
- \*\*/

console.log(pass(conf));
