const paypalService = require("../services/paypal.service");

const paypalController = {
  postToken: async (req, res) => {
    try {
    const token= await paypalService.postToken();
    console.log(token);
      res.status(200).json(token);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération du token", error });
    }
  },
  postOrders: async (req, res) => {
    try {
      const order = await paypalService.postOrders();
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Erreur lors de l'enregistrement de la transaction", error });
    }
  },
  postOrdersID: async (req, res) => {
    const { orderID } = req.params;
    try {
      const captureData = await paypalService.postOrdersID(orderID);
      res.status(200).json(captureData);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Erreur lors de la récupération de la transaction", error });
    }
  },
};

module.exports = paypalController;
