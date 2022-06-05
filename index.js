const time = require("tajiri-mpesa-time");
const token = require("tajiri-mpesa-oauth");
const urls = require("./conf/urls");
const axios = require("axios");

class Express {
  constructor(conf, payload, environment = "sandbox", auth_type = "Bearer") {
    this.stkPushUrl = urls[environment].stkPush;
  }

  stkPush = async () => {
    let token = await token(conf);
    let time = await time();
    let res = await axios({
      method: "POST",
      headers: {
        Authorization: `${auth_type} ${token.access_token}`,
      },
      url: this.stkPushUrl,
      data: {},
    });
  };

  stkQuery = () => {};
}

module.exports = Express;
