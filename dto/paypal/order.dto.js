class PaypalOrderDTO {
    constructor(id, status, links) {
        this.id = id;
        this.status = status;
        this.links = links;
    }
}

class Link {
    constructor(href, rel, method) {
        this.href = href;
        this.rel = rel;
        this.method = method;
    }
}
