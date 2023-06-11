var { Request, Response } = require('express');
var userService = require('../services/user.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var userController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { users, count } = await userService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(users, count));
    },
    getById : async (req,res) => {
        const user = await userService.getById(req.params.id);
        if(!user) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(user);
    },
    getByAuthor : async (req,res) => {
        const user = await userService.getByAuthor(req.params.id);
        if(!user){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(user));
    },
    create : async (req,res) => {
        try {
            const user = await userService.create(req.body);
            res.location('/user/' + user.id);
            res.status(201).json(new SuccessResponse(user, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const user = await userService.getById(id);
        if (!user) {
          res.sendStatus(404);
          return;
        }
        await userService.deleteById(id);
        res.sendStatus(204);
      },
      
}

module.exports = userController;