const aresService = require("../services/ares.service");
const { SuccessResponse, SuccessArrayResponse} = require("../utils/success.response");


aresController = {
    getAllDatasets : async (req,res) => {
        const { offset, limit } = req.pagination;
        const { datasets, count } = await aresService.getAllDatasets(offset, limit);
        res.status(200).json(new SuccessArrayResponse(datasets, count));
    },
    getAllDatasetsID : async (req,res) => {
        const { offset, limit } = req.pagination;
        const { datasets, count } = await aresService.getAllDatasetsID(offset, limit);
        res.status(200).json(new SuccessArrayResponse(datasets, count));
    },
    getAllDomainesPaysage: async(req, res) => {
        const { offset, limit } = req.pagination;
        const { domaines, count } = await aresService.getAllDomainesPaysage(offset, limit);
        res.status(200).json(new SuccessArrayResponse(domaines, count));
    },
    getAllGrades : async (req, res) => {
        const { offset, limit } = req.pagination;
        const { grades, count } = await aresService.getAllGrades(offset, limit);
        res.status(200).json(new SuccessArrayResponse(grades, count));
    },
    getAllInstitutions : async (req, res) => {
        const { offset, limit } = req.pagination;
        const { institutions, count } = await aresService.getAllInstitutions(offset, limit);
        res.status(200).json(new SuccessArrayResponse(institutions, count));
    },
    getAllPasserelles : async (req, res) => {
        const { offset, limit } = req.pagination;
        const { passerelles, count } = await aresService.getAllPasserelles(offset, limit);
        res.status(200).json(new SuccessArrayResponse(passerelles, count));
    },
    getAllPasserellesForBac : async (req, res) => {
        const { offset, limit } = req.pagination;
        const { passerelles, count } = await aresService.getAllPasserellesForBac(offset, limit, req.params.ba_id);
        res.status(200).json(new SuccessArrayResponse(passerelles, count));
    }
}

module.exports = aresController;