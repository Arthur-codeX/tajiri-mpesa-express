// const MpesaExpress = require("./../index");

// const sandboxConf = {};

// const liveConf = {};

require("dotenv").config();

const MpesaExpress = require("./../index");
// console.log(process.env.PAYBILL);
const conf = {
  BUSINESS_SHORT_CODE: process.env.PAYBILL,
  TRANSACTION_TYPE: "CustomerPayBillOnline",
  AMOUNT: 1,
  PHONE_NUMBER: "XXXXXXXXXXXXXXX",
  CALLBACK_URL: process.env.EXPRESS_CALL_BACK,
  CTB_CONFIRMATION_URL: process.env.EXPRESS_CALL_BACK,
  ACCOUNT_REFERENCE: "MAZI LIMITED",
  TRANSACTION_DESCRIPTION: "Swap Station Payment",
  CONSUMER_KEY: process.env.CONSUMER_KEY,
  CONSUMER_SECRET: process.env.CONSUMER_SECRET,
  PASS_KEY: process.env.PASS_KEY,
  RESPONSE_TYPE: "Completed",
};

let Mpesa = new MpesaExpress(conf, "live");

const stkPush = async () => {
  let res = await Mpesa.stkPush({
    ACCOUNT_REFERENCE: "Mazi Limited for test transaction",
  });
  console.log(res);
};

stkPush();
