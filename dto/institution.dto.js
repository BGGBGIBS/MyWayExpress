module.exports = class InstitutionDTO {
  constructor({institution_id, institution_name, institution_type, institution_address}) {
    this.institution_id = institution_id;
    this.institution_name = institution_name;
    this.institution_type = institution_type;
    this.institution_address = institution_address;
  }
}