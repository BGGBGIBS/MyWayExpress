const axios = require('axios');
const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

const auth0Service = {
  register: async (toAdd) => {
    try {
      const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}dbconnections/signup`, {
        client_id: AUTH0_CLIENT_ID,
        email: toAdd.email,
        password: toAdd.password,
        connection: 'Username-Password-Authentication',
      });

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  login: async (user_email, user_password) => {
    try {
      const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}oauth/ro`, {
        grant_type: 'password',
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: AUTH0_AUDIENCE,
        username: user_email,
        password: user_password,
        connection: 'Username-Password-Authentication',
        scope: 'openid',
      });
      console.log("LOGIN DATA : ", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },

  getToken: async () => {
    try {
      const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}oauth/token`, {
        grant_type: 'client_credentials',
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: AUTH0_AUDIENCE,
      });

      return response.data.access_token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = auth0Service;
