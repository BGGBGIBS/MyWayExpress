var { Request, Response } = require('express');
var recordService = require('../services/record.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var recordController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { records, count } = await recordService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(records, count));
    },
    getById : async (req,res) => {
        const record = await recordService.getById(req.params.id);
        if(!record) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(record);
    },
    getByUserId : async (req,res) => {
        const record = await recordService.getByUserId(req.params.id);
        if(!record){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessArrayResponse(record));
    },
    create : async (req,res) => {
        try {
            const record = await recordService.create(req.body);
            // res.location('/record/' + record.id);
            res.status(201).json(new SuccessResponse(record, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    },
    createAll : async (req,res) => {
        console.log("record", req.body);
        try {
            const record = await recordService.createAll(req.body);
            // res.location('/record/' + record.id);
            res.status(201).json(new SuccessResponse(record, 201));

        }
        catch(err){
            console.error(err);
            res.sendStatus(500)
        }
    }
}

module.exports = recordController;