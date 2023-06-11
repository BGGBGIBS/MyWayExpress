var { Request, Response } = require('express');
var eventService = require('../services/event.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var eventController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { events, count } = await eventService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(events, count));
    },
    getById : async (req,res) => {
        const event = await eventService.getById(req.params.id);
        if(!event) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(event);
    },
    getByAuthor : async (req,res) => {
        const event = await eventService.getByAuthor(req.params.id);
        if(!event){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(event));
    },
    create : async (req,res) => {
        try {
            const event = await eventService.create(req.body);
            res.location('/event/' + event.id);
            res.status(201).json(new SuccessResponse(event, 201));
        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }
}

module.exports = eventController;