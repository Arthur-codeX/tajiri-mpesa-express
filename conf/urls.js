const live_base_url = "https://api.safaricom.co.ke";
const sand_box_base_url = "https://sandbox.safaricom.co.ke";

const stk_base = "mpesa/stkpush/v1/processrequest";
const stk_query = "mpesa/stkpushquery/v1/query";

const live = {
  stkPush: `${live_base_url}/${stk_base}`,
  stkQuery: `${live_base_url}/${stk_query}`,
};

const sandbox = {
  stkPush: `${sand_box_base_url}/${stk_base}`,
  stkQuery: `${sand_box_base_url}/${stk_query}`,
};

const urls = {
  live: live,
  sandbox: sandbox,
};

module.exports = urls;
