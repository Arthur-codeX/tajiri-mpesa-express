const live_base_url = "https://api.safaricom.co.ke";
const sand_box_base_url = "https://sandbox.safaricom.co.ke";

const stk_base = "mpesa/stkpush/v1/processrequest";

const live = {
  stkPush: `${live_base_url}/${stk_base}`,
};

const sandbox = {
  stkPush: `${sand_box_base_url}/${stk_base}`,
};

const urls = {
  live: live,
  sandbox: sandbox,
};

module.exports = urls;
