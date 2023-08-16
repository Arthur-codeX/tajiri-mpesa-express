const mtoken = require("tajiri-mpesa-oauth");
const password = require("tajiri-mpesa-password");
const urls = require("./conf/urls");
const axios = require("axios");

const { mpesaFields } = require("./conf/fields");

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

  expressData = async (doc) => {
    for (let field_value of mpesaFields) {
      let field = field_value.toUpperCase();
      if (doc[field]) {
        this.conf[field] = doc[field];
      }
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
    try {
      let token = await mtoken(
        this.conf,
        this.environment,
        this.token_auth_type
      );
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
      return { error: false, data: res.data };
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          return {
            error: true,
            data: error.response.data,
          };
        }
        return { error: true, data: error.response };
      }

      return { error: true, data: error };
    }
  };

  stkQuery = async (id) => {
    if (id == null) {
      return {
        error: true,
        data: { errorMessage: "Transaction id required. As parameter" },
      };
    }

    try {
      let params = await password(this.conf);
      let token = await mtoken(
        this.conf,
        this.environment,
        this.token_auth_type
      );

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
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          return {
            error: true,
            data: error.response.data,
          };
        }
        return { error: true, data: error.response };
      }

      return { error: true, data: error };
    }
  };
}

module.exports = MpesaExpress;
