const axios = require("axios");
const AresInstitutionDTO = require("../dto/ares/institutions.dto");
const AresEtudeDTO = require("../dto/ares/grade.dto");
const AresPasserelleDTO = require("../dto/ares/passerelle.dto");
const { AresDataset } = require("../dto/ares/dataset.dto");
const AresDomainePaysage = require("../dto/ares/domaine.dto");
const {
  SummaryAresDataset,
  AresDatasetSummary,
} = require("../dto/ares/summary.dataset.dto");
const AresURL = `https://ares-digitalwallonia.opendatasoft.com/api/records/1.0/search`;
const ARESURL = `https://ares-digitalwallonia.opendatasoft.com/api/v2/catalog/datasets`;
var aresService = {
  getAllDatasets: async (offset, limit) => {
    try {
      const baseUrl = `${ARESURL}/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);

      return {
        datasets: records.map(
          (record) => new AresDatasetSummary(record.dataset)
        ),
        count: records.length,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des datasets");
    }
  },

  getAllDatasetsID: async (offset, limit) => {
    try {
      const baseUrl = `${ARESURL}/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);
      return {
        datasets: records.map(
          (record) => new SummaryAresDataset(record.dataset)
        ),
        count: records.length,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des datasets");
    }
  },
  fetchAllRecords: async (baseUrl, offset, limit) => {
    const recordsPerPage = limit;
    let records = [];
    let newRecords = [];
    do {
      const url = `${baseUrl}?limit=${recordsPerPage}&offset=${offset}&timezone=UTC`;
      const response = await axios.get(url);
      newRecords = response.data.records;
      records = [...records, ...newRecords];
      offset += recordsPerPage;
    } while (newRecords.length === recordsPerPage);

    return records;
  },

  getAllDomainesPaysage: async (offset, limit) => {
    try {
      const baseUrl = `${ARESURL}/domaine_paysage/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);

      return {
        domaines: records.map(
          (record) => new AresDomainePaysage(record.record.fields)
        ),
        count: records.length,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des domaines paysages");
    }
  },

  getAllGrades: async (offset, limit) => {
    try {
      const baseUrl = `${ARESURL}/ares-referentiel-des-grades-academiques/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);

      return {
        grades: records.map((record) => new AresEtudeDTO(record.record.fields)),
        count: records.length,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des grades");
    }
  },

  getAllPasserelles: async (offset, limit) => {
    try {
      const baseUrl = `${ARESURL}/ares-referentiel-des-passerelles/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);

      return {
        count: records.length,
        passerelles: records.map(
          (record) => new AresPasserelleDTO(record.record.fields)
        ),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des passerelles");
    }
  },

  getAllPasserellesForBac: async (offset, limit, ba_id) => {
    try {
      const baseUrl = `${ARESURL}/ares-referentiel-des-passerelles/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);

      const filtered_records = records.filter(
        (record) => record.record.fields.code_etudes_bachelier === ba_id
      );

      return {
        count: filtered_records.length,
        passerelles: filtered_records.map(
          (record) => new AresPasserelleDTO(record.record.fields)
        ),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des passerelles");
    }
  },

  getAllInstitutions: async (offset, limit) => {
    try {
      const baseUrl = `${ARESURL}/ares-referentiel-des-etablissements/records`;
      const records = await aresService.fetchAllRecords(baseUrl, offset, limit);

      return {
        institutions: records.map(
          (record) => new AresInstitutionDTO(record.record.fields)
        ),
        count: records.length,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des institutions");
    }
  },
};

module.exports = aresService;
