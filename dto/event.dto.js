module.exports = class EventDTO {
    constructor({event_id, event_begin, event_end,event_type, occupation_id, institution_id}) {
      this.event_id = event_id;
      this.event_begin = event_begin;
      this.event_end = event_end;
      this.event_type = event_type;
      this.occupation_id = occupation_id;
      this.institution_id = institution_id;
    }
  }
  