// class Link {
//   constructor(rel, href) {
//     this.rel = rel;
//     this.href = href;
//   }
// }

// class Record {
//   constructor(id, timestamp, size, fields, links) {
//     this.id = id;
//     this.timestamp = timestamp;
//     this.size = size;
//     this.fields = fields;
//     this.links = links.map(link => new Link(link.rel, link.href));
//   }
// }

// class AresPasserelle {
//   constructor(total_count, links, records) {
//     this.total_count = total_count;
//     this.links = links.map(link => new Link(link.rel, link.href));
//     this.records = records.map(record => new Record(record.record.id, record.record.timestamp, record.record.size, record.record.fields, record.links));
//   }
// }
module.exports = class AresPasserelle {
  constructor(data) {
    this.code_etudes_bachelier = data.code_etudes_bachelier;
    this.intitule_des_etudes_bachelier = data.intitule_des_etudes_bachelier;
    this.code_etudes_master = data.code_etudes_master;
    this.intitule_des_etudes_master = data.intitule_des_etudes_master;
    this.credits_ects_min = data.credits_ects_min;
    this.credits_ects_max = data.credits_ects_max;
  }
}
