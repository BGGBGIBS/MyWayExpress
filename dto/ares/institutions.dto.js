module.exports = class AresInstitution {
  constructor(data) {
    this.type_d_etablissement = data.type_d_etablissement;
    this.actif = data.actif;
    this.ndegfase_etablissement = data.ndegfase_etablissement;
    this.nom_usuel_etablissement = data.nom_usuel_etablissement;
    this.nom_court_etablissement = data.nom_court_etablissement;
    this.adresse_etablissement = data.adresse_etablissement;
    this.complement_adresse_etablissement = data.complement_adresse_etablissement;
    this.code_postal_etablissement = data.code_postal_etablissement;
    this.localite_etablissement = data.localite_etablissement;
    this.commune_etablissement = data.commune_etablissement;
    this.bassin_etablissement = data.bassin_etablissement;
    this.arrondissement_administratif_etablissement = data.arrondissement_administratif_etablissement;
    this.arrondissement_judiciaire_etablissement = data.arrondissement_judiciaire_etablissement;
    this.province_etablissement = data.province_etablissement;
    this.region_etablissement = data.region_etablissement;
    this.latitude_etablissement = data.latitude_etablissement;
    this.longitude_etablissement = data.longitude_etablissement;
    this.url_du_site_web = data.url_du_site_web;
    this.nom_du_po_usuel = data.nom_du_po_usuel;
    this.forme_juridique = data.forme_juridique;
    this.organe_de_representation = data.organe_de_representation;
    this.reseau_officiel_libre = data.reseau_officiel_libre;
    this.reseau_subventionne_organise = data.reseau_subventionne_organise;
    this.type_organisateur = data.type_organisateur;
    this.communaute = data.communaute;
    this.caractere_confessionnel = data.caractere_confessionnel;
    this.date_ouverture_etablissement = data.date_ouverture_etablissement;
    this.date_fermeture_etablissement = data.date_fermeture_etablissement;
    this.point_geographique = data.point_geographique;
  }
}