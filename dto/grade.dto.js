module.exports = class GradeDTO {
    constructor({grade_id, grade_name, grade_value, scale_id}) {
      this.grade_id = grade_id;
      this.grade_name = grade_name;
      this.grade_value = grade_value;
      this.scale_id = scale_id;
    }
  }
  