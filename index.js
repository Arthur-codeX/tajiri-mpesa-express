const mtoken = require("tajiri-mpesa-oauth");
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
    this.environment = environment;
    this.stkPushUrl = urls[environment].stkPush;
    this.stkQueryUrl = urls[environment].stkQuery;
    this.auth_type = auth_type;
    this.token_auth_type = token_auth_type;
    this.conf = conf;
  }

  expressData = async (
    PHONE,
    AMOUNT,
    TRANSACTION_DESCRIPTION,
    ACCOUNT_REFERENCE
  ) => {
    if (TRANSACTION_DESCRIPTION != null) {
      this.conf.TRANSACTION_DESCRIPTION = TRANSACTION_DESCRIPTION;
    }
    if (ACCOUNT_REFERENCE != null) {
      this.conf.ACCOUNT_REFERENCE = ACCOUNT_REFERENCE;
    }

    if (PHONE != null) {
      this.conf.PHONE_NUMBER = PHONE;
    }

    if (AMOUNT != null) {
      this.conf.AMOUNT = AMOUNT;
    }

    let params = await password(this.conf);
    return {
      BusinessShortCode: this.conf.BUSINESS_SHORT_CODE,
      Password: params.password,
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

  stkPush = async (
    PHONE = null,
    AMOUNT = null,
    TRANSACTION_DESCRIPTION = null,
    ACCOUNT_REFERENCE = null
  ) => {
    let token = await mtoken(this.conf, this.environment, this.token_auth_type);
    let payload = await this.expressData(
      PHONE,
      AMOUNT,
      TRANSACTION_DESCRIPTION,
      ACCOUNT_REFERENCE
    );
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

  stkQuery = async (id) => {
    if (id == null) {
      throw new Error("!!!! CheckoutRequestID Required");
    }

    let params = await password(this.conf);
    let token = await mtoken(this.conf, this.environment, this.token_auth_type);

    let payload = {
      BusinessShortCode: this.conf.BUSINESS_SHORT_CODE,
      Password: params.password,
      Timestamp: params.time,
      CheckoutRequestID: id,
    };

    let res = await axios({
      method: "POST",
      headers: {
        Authorization: `${this.auth_type} ${token.access_token}`,
      },
      url: this.stkQueryUrl,
      data: payload,
    });
    return res.data;
  };
}

module.exports = MpesaExpress;
