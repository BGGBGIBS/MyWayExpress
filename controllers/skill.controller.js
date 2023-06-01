var { Request, Response } = require('express');
var skillService = require('../services/skill.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var skillController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { skills, count } = await skillService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(skills, count));
    },
    getById : async (req,res) => {
        const skill = await skillService.getById(req.params.id);
        if(!skill) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(skill);
    },
    getByAuthor : async (req,res) => {
        const skill = await skillService.getByAuthor(req.params.id);
        if(!skill){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(skill));
    },
    create : async (req,res) => {
        console.log("skill", req.body);
        try {
            const skill = await skillService.create(req.body);
            res.location('/skill/' + skill.id);
            res.status(201).json(new SuccessResponse(skill, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }
}

module.exports = skillController;