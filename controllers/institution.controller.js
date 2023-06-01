var { Request, Response } = require('express');
var institutionService = require('../services/institution.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var institutionController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { institutions, count } = await institutionService.getAll(offset, limit);
        console.log("INSTITUTIONS : ", institutions);
        res.status(200).json(new SuccessArrayResponse(institutions, count));
    },
    getById : async (req,res) => {
        const institution = await institutionService.getById(req.params.id);
        if(!institution) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(institution);
    },
    getByAuthor : async (req,res) => {
        const institution = await institutionService.getByAuthor(req.params.id);
        if(!institution){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(institution));
    },
    create : async (req,res) => {
        console.log("institution", req.body);
        try {
            const institution = await institutionService.create(req.body);
            res.location('/institution/' + institution.id);
            res.status(201).json(new SuccessResponse(institution, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }
}

module.exports = institutionController;