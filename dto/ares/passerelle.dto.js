
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
