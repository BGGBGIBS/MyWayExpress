const paypalService = require('../services/auth0.service');

const paypalController = {
  postToken: async (req, res) => {
    try {
      const token = await paypalService.postToken();
      console.log("CONTROLLER TOKEN : ", token);
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erreur lors de la récupération du token', error });
    }
  },
  postOrders: async (req, res) => {
    try {
      const token = await paypalService.postOrders();
      console.log("CONTROLLER POST ORDERS : ", token);
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erreur lors de la récupération du token', error });
    }
  },
  postOrdersID: async (req, res) => {
    try {
      const token = await paypalService.postOrdersID();
      console.log("CONTROLLER POST ORDERS ID : ", token);
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erreur lors de la récupération du token', error });
    }
  },
};

module.exports = paypalController;
