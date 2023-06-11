var { Request, Response } = require('express');
var gradeService = require('../services/grade.service');
const { SuccessResponse, SuccessArrayResponse } = require('../utils/success.response');


var gradeController = {
    getAll : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { grades, count } = await gradeService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(grades, count));
    },
    getById : async (req,res) => {
        const grade = await gradeService.getById(req.params.id);
        if(!grade) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(grade);
    },
    getByAuthor : async (req,res) => {
        const grade = await gradeService.getByAuthor(req.params.id);
        if(!grade){
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(grade));
    },
    create : async (req,res) => {
        try {
            const grade = await gradeService.create(req.body);
            res.location('/grade/' + grade.id);
            res.status(201).json(new SuccessResponse(grade, 201));

        }
        catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }
}

module.exports = gradeController;