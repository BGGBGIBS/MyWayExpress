const auth0Service = require('../services/auth0.service');

const auth0Controller = {
  register: async (req, res) => {
    try {
      const newUser = await auth0Service.register(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const authResult = await auth0Service.login(email, password);
      res.status(200).json(authResult);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erreur lors de la connexion', error });
    }
  },

  logout: (req, res) => {
    auth0Service.logout();
    res.status(200).json({ message: 'Déconnexion réussie' });
  },

  getToken: async (req, res) => {
    try {
      const token = await auth0Service.getToken();
      console.log("CONTROLLER TOKEN : ", token);
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erreur lors de la récupération du token', error });
    }
  },
};

module.exports = auth0Controller;
