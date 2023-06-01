const axios = require("axios");
const AresInstitutionDTO = require("../dto/ares/institutions.dto");
const AresEtudeDTO = require("../dto/ares/grade.dto");
const AresPasserelleDTO = require("../dto/ares/passerelle.dto");
const { AresDataset } = require("../dto/ares/dataset.dto");
const AresDomainePaysage = require("../dto/ares/domaine.dto");
const { SummaryAresDataset, AresDatasetSummary } = require("../dto/ares/summary.dataset.dto");
const AresURL = `https://ares-digitalwallonia.opendatasoft.com/api/records/1.0/search`;
const ARESURL = `https://ares-digitalwallonia.opendatasoft.com/api/v2/catalog/datasets`;
var aresService = {
    getAllDatasets: async (offset, limit) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];
            while(true){

                const aresUrl = `${ARESURL}?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                
                const response = await axios.get(aresUrl);
                
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
            return {
                datasets: records.map(record => new AresDatasetSummary(record.dataset)),
                count
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des datasets');
        }
    },
    getAllDatasetsID: async (offset, limit) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];
            while(true){

                const aresUrl = `${ARESURL}?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                
                const response = await axios.get(aresUrl);
                
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;              
            }
            return {
                datasets: records.map(record => new SummaryAresDataset(record.dataset)),
                count
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des datasets');
        }
    },
    
    getAllDomainesPaysage: async (offset, limit) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];

            while(true){

                const aresUrl = `${ARESURL}/domaine_paysage/records?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                
                const response = await axios.get(aresUrl);
                
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
            return {
                domaines: records.map(record => new AresDomainePaysage(record.record.fields)),
                count: totalRecords
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des domaines paysages');
        }
    },

    getAllGrades: async (offset, limit) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];
    
            while (true) {
                const aresUrl = `${ARESURL}/ares-referentiel-des-grades-academiques/records?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                const response = await axios.get(aresUrl);
    
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
    
            return {
                grades: records.map(record => new AresEtudeDTO(record.record.fields)),
                count: totalRecords
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des grades');
        }
    },

    getAllPasserelles: async (offset, limit) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];
    
            while (true) {
                const aresUrl = `${ARESURL}/ares-referentiel-des-passerelles/records?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                const response = await axios.get(aresUrl);
    
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
    
            return {
                count: totalRecords,
                passerelles: records.map(record => new AresPasserelleDTO(record.record.fields)),
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des passerelles');
        }
    },
    getAllPasserellesForBac: async (offset, limit, ba_id) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];
    
            while (true) {
                const aresUrl = `${ARESURL}/ares-referentiel-des-passerelles/records?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                const response = await axios.get(aresUrl);
    
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
            // console.log("BAIDSERVICE : ",ba_id);
            const filtered_records = records.filter(record => record.record.fields.code_etudes_bachelier === ba_id);
            // console.log("FILTERED : ", filtered_records);

            return {
                count: filtered_records.length,
                passerelles: filtered_records.map(record => new AresPasserelleDTO(record.record.fields)),
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des passerelles');
        }
    },
    getAllInstitutions: async (offset, limit) => {
        try {
            const recordsPerPage = limit;
            let totalRecords = 0;
            let records = [];
    
            while (true) {
                const aresUrl = `${ARESURL}/ares-referentiel-des-etablissements/records?limit=${recordsPerPage}&offset=${offset}&timzone=UTC`;
                const response = await axios.get(aresUrl);
    
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
    
                totalRecords += newRecords.length;
    
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
    
            return {
                institutions: records.map(record => new AresInstitutionDTO(record.record.fields)),
                count: totalRecords
            };
        } catch (error) {
            console.error(error);
            throw new Error('Erreur lors de la récupération des institutions');
        }
    }
    
}

module.exports = aresService;