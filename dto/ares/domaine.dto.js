module.exports = class AresDomainePaysage {
    constructor(data) {
      this.code_interne_domaine_paysage = data.code_interne_domaine_paysage;
      this.numero_domaine_decret = data.numero_domaine_decret;
      this.domaine_paysage = data.domaine_paysage;
      this.secteur_paysage = data.secteur_paysage;
      this.date_modification = data.date_modification;
      this.explication_modification = data.explication_modification;
      this.actif = data.actif;
    }
}
  