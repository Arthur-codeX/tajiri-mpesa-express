# tajiri-mpesa-express

This is a simple package for performing stk push and stk query

## tajiri-mpesa-express

## NPM

npm install tajiri-mpesa-express

### YARN

yarn add tajiri-mpesa-express

## Description

This is a simple package for generating mpesa password and time stamp.

### Usage: Mpesa Stk Push

<mark> using Promises</mark>

```javascript
const mpesaExpress = require("tajiri-mpesa-express");

const environment = "sandbox"; // If your Application is live set this to live

//const environment="live" :

// Use your Application Configuration Values

const conf = {
  BUSINESS_SHORT_CODE: 174379,

  TRANSACTION_TYPE: "CustomerPayBillOnline",

  AMOUNT: 1,

  PHONE_NUMBER: 254708374149,

  CALLBACK_URL: "https://mydomain.com/path",

  ACCOUNT_REFERENCE: "CompanyXLTD",

  TRANSACTION_DESCRIPTION: "Payment of some X",

  CONSUMER_KEY: "jvW9G4WkCAzzfGTEvwCqQzRGXChAAOxU",

  CONSUMER_SECRET: "avCac8rxczEEMA47",

  PASS_KEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
};

let Mpesa = new mpesaExpress(conf, environment);

//The default Conf file will be used

Mpesa.stkPush()
.then((res) => {
  if (res.error) {
    //error
    console.log(res);
  } else {
    console.log(res);
  }
});

// For the stkPush1 i will use the set credentials ie conf

const PHONE = 254708374149;

const AMOUNT = 5;

const TRANSACTION_DESCRIPTION = "my description";

const ACCOUNT_REFERENCE = "payment of X";

//If You leave them blank. The default from the conf will be used
// If you dont pass object property the default from the config will be used.
// Mpesa.stkPush({PHONE_NUMBER:"xxxxxxxxxxxx",AMOUNT:23})
// The new phone number will be used in this case.
// The new amount will be used.
// Note the config object fields and the case.

Mpesa.stkPush({
  BUSINESS_SHORT_CODE: 174379,
  TRANSACTION_TYPE: "CustomerPayBillOnline",
  AMOUNT: 1,
  PHONE_NUMBER: 254708374149,
  CALLBACK_URL: "https://mydomain.com/path",
  ACCOUNT_REFERENCE: "CompanyXLTD",
  TRANSACTION_DESCRIPTION: "Payment of some X",
  CONSUMER_KEY: "jvW9G4WkCAzzfGTEvwCqQzRGXChAAOxU",
  CONSUMER_SECRET: "avCac8rxczEEMA47",
  PASS_KEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
})
.then((res) => {
  if (res.error) {
    //error
    console.log(res);
  } else {
    console.log(res);
  }
});
```

> Note that you don't have to pass all the object properties. You can pass only the required ones the rest will be picked from the config.

<mark>using Async Await</mark>

```javascript
const mpesaExpress = require("tajiri-mpesa-express");

const environment = "sandbox"; // If your Application is live set this to live

// The default environment is sandbox

//const environment="live" :

// Use your Application Configuration Values

const conf = {
  BUSINESS_SHORT_CODE: 174379,

  TRANSACTION_TYPE: "CustomerPayBillOnline",

  AMOUNT: 1,

  PHONE_NUMBER: 254708374149,

  CALLBACK_URL: "https://mydomain.com/path",

  ACCOUNT_REFERENCE: "CompanyXLTD",

  TRANSACTION_DESCRIPTION: "Payment of some X",

  CONSUMER_KEY: "jvW9G4WkCAzzfGTEvwCqQzRGXChAAOxU",

  CONSUMER_SECRET: "avCac8rxczEEMA47",

  PASS_KEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
};

let Mpesa = new mpesaExpress(conf, environment);

//The default Conf file will be used

async function stkPush1() {
  try {
    let res = await Mpesa.stkPush();

    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// For the stkPush1 i will use the set credentials ie conf

// You can also set Phone, Amount and leave the rest

//ie stkPush1(PHONE,AMOUNT)

// The default values will be used.

// You could also set them to null and the default values will be used

// Mpesa.stkPush()=== Mpesa.stkPush(null,null,null,null)

const PHONE = 254708374149;

const AMOUNT = 5;

const TRANSACTION_DESCRIPTION = "my description";

const ACCOUNT_REFERENCE = "payment of X";

//Stk Push While Setting PHONE,AMOUNT, TRANSACTION_DESCRIPTION and ACCOUNT_REFERENCE

//Set the fields to null to use the conf defaults.

//If You leave them blank. The default from the conf will be used

async function stkPush2() {
  let res = await Mpesa.stkPush({
    BUSINESS_SHORT_CODE: 174379,
    TRANSACTION_TYPE: "CustomerPayBillOnline",
    AMOUNT: 1,
    PHONE_NUMBER: 254708374149,
    CALLBACK_URL: "https://mydomain.com/path",
    ACCOUNT_REFERENCE: "CompanyXLTD",
    TRANSACTION_DESCRIPTION: "Payment of some X",
    CONSUMER_KEY: "jvW9G4WkCAzzfGTEvwCqQzRGXChAAOxU",
    CONSUMER_SECRET: "avCac8rxczEEMA47",
    PASS_KEY:
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
  });

  if (res.error) {
    //error
    console.log(res);
  } else {
    console.log(res);
  }
}

stkPush1();

stkPush2();
```

<mark>return</mark>

```javascript

{

MerchantRequestID: '53783-104832510-1',

CheckoutRequestID: 'ws_CO_08062022023429368728829146',

ResponseCode: '0',

ResponseDescription: 'Success. Request accepted for processing',

CustomerMessage: 'Success. Request accepted for processing'

}

```

---

### Usage: Mpesa Stk Query

<mark> using Promises</mark>

```javascript
const conf = {
  BUSINESS_SHORT_CODE: 174379,

  TRANSACTION_TYPE: "CustomerPayBillOnline",

  AMOUNT: 1,

  PHONE_NUMBER: 254708374149,

  CALLBACK_URL: "https://mydomain.com/path",

  ACCOUNT_REFERENCE: "CompanyXLTD",

  TRANSACTION_DESCRIPTION: "Payment of some X",

  CONSUMER_KEY: "jvW9G4WkCAzzfGTEvwCqQzRGXChAAOxU",

  CONSUMER_SECRET: "avCac8rxczEEMA47",

  PASS_KEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
};

let CheckoutRequestID = "ws_CO_08062022015515431728829146";

// The checkout request ID is required.

// You get this from the stkPush

Mpesa.stkQuery(CheckoutRequestID)

  .then((res) => {
    console.log(res);
  })

  .catch((e) => {
    console.log(e);
  });
```

<mark>using Async Await</mark>

```javascript
const conf = {
  BUSINESS_SHORT_CODE: 174379,

  TRANSACTION_TYPE: "CustomerPayBillOnline",

  AMOUNT: 1,

  PHONE_NUMBER: 254708374149,

  CALLBACK_URL: "https://mydomain.com/path",

  ACCOUNT_REFERENCE: "CompanyXLTD",

  TRANSACTION_DESCRIPTION: "Payment of some X",

  CONSUMER_KEY: "jvW9G4WkCAzzfGTEvwCqQzRGXChAAOxU",

  CONSUMER_SECRET: "avCac8rxczEEMA47",

  PASS_KEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
};

let CheckoutRequestID = "ws_CO_08062022015515431728829146";

// The checkout request ID is required.

// You get this from the stkPush

async function stkQuery() {
  try {
    let res = await Mpesa.stkQuery(CheckoutRequestID);

    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

stkQuery();
```

<mark>Sample SUCCESS response</mark>

```javascript

{
  error: false,
  data: {
    MerchantRequestID: '36052-118331891-1',
    CheckoutRequestID: 'ws_CO_16082023131931524728829146',
    ResponseCode: '0',
    ResponseDescription: 'Success. Request accepted for processing',
    CustomerMessage: 'Success. Request accepted for processing'
  }
}




```

<mark>Sample ERROR response</mark>

```javascript

{
  error: true,
  data: {
    requestId: '55944-116787588-1',
    errorCode: '400.002.02',
    errorMessage: 'Bad Request - Invalid PhoneNumber'
  }
}




```

---

> **the default environment is sandbox**

>

> For the stkPush1 i will use the set credentials ie conf

> You can also set Phone, Amount and leave the rest

> ie stkPush1({PHONE_NUMBER:"2344",AMOUNT:23})

> The default values will be used.

> You could also set them to null and the default values will be used

> Mpesa.stkPush()=== Mpesa.stkPush(null,null,null,null)

## References

> get the application credentials from daraja

[daraja]](https://developer.safaricom.co.ke/)
