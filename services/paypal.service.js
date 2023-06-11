const fetch = require("node-fetch");
var { CLIENT_ID, APP_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";
const paypalService = {
  postToken: async () => {
    const token = await paypalService.generateClientToken();
    return token;
  },
  postOrders: async () => {
    const order = await paypalService.createOrder();
    return order;
  },
  postOrdersID: async (orderID) => {
    try {
      const captureData = await paypalService.capturePayment(orderID);
      return captureData;
    }  catch (err) {
        console.error("ERROR : ", err.message);
        throw new Error('Failed to post orders ID: ' + err.message);
      }
  },

  // call the create order method
  createOrder: async () => {
    const purchaseAmount = "100.00"; // TODO: pull prices from a database
    const accessToken = await paypalService.generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: purchaseAmount,
            },
          },
        ],
      }),
    });

    return paypalService.handleResponse(response);
  },

  // capture payment for an order
  capturePayment: async (orderId) => {
    const accessToken = await paypalService.generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return paypalService.handleResponse(response);
  },

  // generate access token
  generateAccessToken: async () => {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const jsonData = await paypalService.handleResponse(response);
    return jsonData.access_token;
  },

  // generate client token
  generateClientToken: async () => {
    const accessToken = await paypalService.generateAccessToken();
    const response = await fetch(`${base}/v1/identity/generate-token`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": "en_US",
        "Content-Type": "application/json",
      },
    });
    const jsonData = await paypalService.handleResponse(response);
    return jsonData;
  },

  handleResponse: async (response) => {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
  },
};

module.exports = paypalService;
