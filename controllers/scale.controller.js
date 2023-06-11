var { Request, Response } = require('express');
var scaleService = require('../services/scale.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var scaleController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { scales, count } = await scaleService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(scales, count));
    },
    getById : async (req,res) => {
        const scale = await scaleService.getById(req.params.id);
        if(!scale) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(scale);
    },
    getByAuthor : async (req,res) => {
        const scale = await scaleService.getByAuthor(req.params.id);
        if(!scale){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(scale));
    },
    create : async (req,res) => {
        try {
            const scale = await scaleService.create(req.body);
            res.location('/scale/' + scale.id);
            res.status(201).json(new SuccessResponse(scale, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }
}

module.exports = scaleController;