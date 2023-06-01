var { Request, Response } = require('express');
var occupationService = require('../services/occupation.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var occupationController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { occupations, count } = await occupationService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(occupations, count));
    },
    getById : async (req,res) => {
        const occupation = await occupationService.getById(req.params.id);
        if(!occupation) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(occupation);
    },
    getByAuthor : async (req,res) => {
        const occupation = await occupationService.getByAuthor(req.params.id);
        if(!occupation){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(occupation));
    },
    create : async (req,res) => {
        console.log("occupation", req.body);
        try {
            const occupation = await occupationService.create(req.body);
            res.location('/occupation/' + occupation.id);
            res.status(201).json(new SuccessResponse(occupation, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }
}

module.exports = occupationController;