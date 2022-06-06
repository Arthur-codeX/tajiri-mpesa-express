const time = require("tajiri-mpesa-time");
const token = require("tajiri-mpesa-oauth");
const password = require("tajiri-mpesa-password");
const urls = require("./conf/urls");
const axios = require("axios");

class MpesaExpress {
  constructor(
    conf,
    environment = "sandbox",
    auth_type = "Bearer",
    token_auth_type = "Basic"
  ) {
    this.stkPushUrl = urls[environment].stkPush;
    this.auth_type = auth_type;
    this.token_auth_type = token_auth_type;
    this.conf = conf;
    if (this.conf.GMT === null || this.conf.GMT === undefined) {
      this.conf.GMT = 3;
    }
  }

  expressData = () => {
    let params = password(conf, conf.GMT);
    return {
      BusinessShortCode: this.conf.BUSINESS_SHORT_CODE,
      password: params.password,
      Timestamp: params.time,
      TransactionType: this.conf.TRANSACTION_TYPE,
      Amount: this.conf.AMOUNT,
      PartyA: this.conf.PHONE_NUMBER,
      PartyB: this.conf.BUSINESS_SHORT_CODE,
      PhoneNumber: this.conf.PHONE_NUMBER,
      CallBackURL: this.conf.CALLBACK_URL,
      AccountReference: this.conf.ACCOUNT_REFERENCE,
      TransactionDesc: this.conf.TRANSACTION_DESCRIPTION,
    };
  };

  stkPush = async () => {
    let token = await token(this.conf, this.token_auth_type);
    let payload = this.expressData();
    let res = await axios({
      method: "POST",
      headers: {
        Authorization: `${this.auth_type} ${token.access_token}`,
      },
      url: this.stkPushUrl,
      data: payload,
    });
    return res.data;
  };

  stkQuery = async () => {};
}

module.exports = MpesaExpress;
