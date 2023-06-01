class AresDatasetSummary {
    constructor(dataset) {
        this.dataset_id = dataset.dataset_id;
        this.urls = dataset.attachments.map(attachment => ({id: attachment.id, url: attachment.url}));
    }
}
class SummaryAresDataset{
    constructor(datasetData){
      this.dataset_id = datasetData.dataset_id;
    }
}

module.exports = { AresDatasetSummary, SummaryAresDataset };