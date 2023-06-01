class Attachment {
    constructor(id, title, mimetype, url) {
      this.id = id;
      this.title = title;
      this.mimetype = mimetype;
      this.url = url;
    }
  }
  
class Field {
    constructor(name, description, annotations, label, type) {
      this.name = name;
      this.description = description;
      this.annotations = annotations;
      this.label = label;
      this.type = type;
    }
  }

  class DatasetMeta {
    constructor(metaData) {
      this.title = metaData.title;
      this.description = metaData.description;
      this.theme = metaData.theme;
      this.keyword = metaData.keyword;
      this.license = metaData.license;
      this.license_url = metaData.license_url;
      this.language = metaData.language;
      this.metadata_languages = metaData.metadata_languages;
      this.timezone = metaData.timezone;
      this.modified = metaData.modified;
      this.modified_updates_on_metadata_change = metaData.modified_updates_on_metadata_change;
      this.modified_updates_on_data_change = metaData.modified_updates_on_data_change;
      this.data_processed = metaData.data_processed;
      this.metadata_processed = metaData.metadata_processed;
      this.geographic_reference = metaData.geographic_reference;
      this.geographic_reference_auto = metaData.geographic_reference_auto;
      this.territory = metaData.territory;
      this.geometry_types = metaData.geometry_types;
      this.bbox = metaData.bbox;
      this.publisher = metaData.publisher;
      this.references = metaData.references;
      this.records_count = metaData.records_count;
      this.attributions = metaData.attributions;
      this.source_domain = metaData.source_domain;
      this.source_domain_title = metaData.source_domain_title;
      this.source_domain_address = metaData.source_domain_address;
      this.source_dataset = metaData.source_dataset;
      this.shared_catalog = metaData.shared_catalog;
      this.federated = metaData.federated;
      this.oauth_scope = metaData.oauth_scope;
      this.parent_domain = metaData.parent_domain;
    }
  }


module.exports = class AresDataset {
    constructor(datasetData) {
      this.dataset_id = datasetData.dataset_id;
      this.dataset_uid = datasetData.dataset_uid;
      this.has_records = datasetData.has_records;
      this.features = datasetData.features;
      this.visibility = datasetData.visibility;
      this.attachments = datasetData.attachments.map(attachmentData => new Attachment(
        attachmentData.id,
        attachmentData.title,
        attachmentData.mimetype,
        attachmentData.url
      ));
      this.alternative_exports = datasetData.alternative_exports;
      this.data_visible = datasetData.data_visible;
      this.fields = datasetData.fields.map(fieldData => new Field(
        fieldData.name,
        fieldData.description,
        fieldData.annotations,
        fieldData.label,
        fieldData.type
      ));
      this.metas = new DatasetMeta(datasetData.metas.default);
    }
  }
