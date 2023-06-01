const axios = require('axios');

ares = {

    fetchAllData: (baseUrl) => {
        return async (req, res, next) => {
            const recordsPerPage = 100;
            let totalRecords = 0;
            let offset = 0;
            let records = [];
            
            while (true) {
                const url = `${baseUrl}${req.path}/records?limit=${recordsPerPage}&offset=${offset}&timezone=UTC`;
                const response = await axios.get(url);
                
                const newRecords = response.data.records;
                records = [...records, ...newRecords];
                
                totalRecords += newRecords.length;
                
                if (newRecords.length < recordsPerPage) {
                    break;
                }
                
                offset += recordsPerPage;
            }
            
            req.records = records;
            req.totalRecords = totalRecords;
            
            next();
        }
    }
}