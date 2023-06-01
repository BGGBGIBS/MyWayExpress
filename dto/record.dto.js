module.exports = class RecordDTO {
    constructor({record_id, user__id, event_id, skill_id, grade_id}) {
      this.record__id = record_id;
      this.user__id = user__id;
      this.event_id = event_id;
      this.skill_id = skill_id;
      this.grade_id = grade_id;
    }
  }
  