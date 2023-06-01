module.exports = class AresGrade {
    constructor(record) {
        this.gradeAcademique = record.grade_academique;
        this.codeGradeAcademique = record.code_grade_academique;
        this.typeFinalite = record.type_finalite;
        this.cycle = record.cycle;
        this.titreDelivre = record.titre_delivre_a_l_issue_des_etudes;
        this.typeEtablissement = record.type_d_etablissement;
        this.domainePaysage = record.domaine_paysage;
        this.codeEtudes = record.code_etudes;
        this.intituleEtudes = record.intitule_des_etudes_titre_delivre_a_l_issue_des_etudes;
    }
}
module.exports = class AresEtude {
    constructor(data) {
      this.code_etudes = data.code_etudes;
      this.intitule_des_etudes_titre_delivre_a_l_issue_des_etudes = data.intitule_des_etudes_titre_delivre_a_l_issue_des_etudes;
      this.type_d_etablissement = data.type_d_etablissement;
      this.cycle = data.cycle;
      this.domaine_paysage = data.domaine_paysage;
      this.code_grade_academique = data.code_grade_academique;
      this.grade_academique = data.grade_academique;
      this.type_finalite = data.type_finalite;
      this.finalite = data.finalite;
      this.orientation = data.orientation;
      this.titre_delivre_a_l_issue_des_etudes = data.titre_delivre_a_l_issue_des_etudes;
    }
  }
  