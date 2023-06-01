
class SuccessResponse {
    constructor(data, code = 200) {
        this.statusCode = code;
        this.result = data;
    }
}

class SuccessArrayResponse {
    constructor(data, count, code = 200) {
        this.statusCode = code;
        this.count = count;
        this.results = data;
    }
}

module.exports = {SuccessResponse, SuccessArrayResponse}