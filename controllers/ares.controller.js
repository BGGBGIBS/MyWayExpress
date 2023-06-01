const aresService = require("../services/ares.service");
const { SuccessResponse, SuccessArrayResponse} = require("../utils/success.response");


aresController = {
    getAllDatasets : async (req,res) => {
        const { offset, limit } = req.pagination;
        // console.log(req.pagination);

        const { datasets, count } = await aresService.getAllDatasets(offset, limit);
        // console.log("DATASETS : ", datasets);
        res.status(200).json(new SuccessArrayResponse(datasets, count));
    },
    getAllDatasetsID : async (req,res) => {
        const { offset, limit } = req.pagination;

        const { datasets, count } = await aresService.getAllDatasetsID(offset, limit);
        // console.log("DATASETS : ", datasets);
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
        // console.log("GRADES : ", grades);
        res.status(200).json(new SuccessArrayResponse(grades, count));
    },
    getAllInstitutions : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { institutions, count } = await aresService.getAllInstitutions(offset, limit);
        // console.log("INSTITUTIONS : ", institutions);
        res.status(200).json(new SuccessArrayResponse(institutions, count));
    },
    getAllPasserelles : async (req, res) => {
        const { offset, limit } = req.pagination;

        const { passerelles, count } = await aresService.getAllPasserelles(offset, limit);
        // console.log("PASSERELLES : ", passerelles);
        res.status(200).json(new SuccessArrayResponse(passerelles, count));
    },
    getAllPasserellesForBac : async (req, res) => {
        const { offset, limit } = req.pagination;
        // console.log(req.params);
        const { passerelles, count } = await aresService.getAllPasserellesForBac(offset, limit, req.params.ba_id);
        // console.log("PASSERELLES : ", passerelles);
        res.status(200).json(new SuccessArrayResponse(passerelles, count));
    }
}

module.exports = aresController;