module.exports = class AllDTO {
    constructor({
      cv_id,
      user_id,
      user_firstname,
      user_lastname,
      user_email,
      user_birthdate,
      user_address,
      user_role,
      occupation_name,
      occupation_description,
      skill_name,
      skill_description,
      skill_type,
      institution_name,
      institution_type,
      institution_address,
      event_begin,
      event_end,
      grade_name,
      grade_value
    }) {
      this.cv_id = cv_id;
      this.user_id = user_id;
      this.user_firstname = user_firstname;
      this.user_lastname = user_lastname;
      this.user_email = user_email;
      this.user_birthdate = user_birthdate;
      this.user_address = user_address;
      this.user_role = user_role;
      this.occupation_name = occupation_name;
      this.occupation_description = occupation_description;
      this.skill_name = skill_name;
      this.skill_description = skill_description;
      this.skill_type = skill_type;
      this.institution_name = institution_name;
      this.institution_type = institution_type;
      this.institution_address = institution_address;
      this.event_begin = event_begin;
      this.event_end = event_end;
      this.grade_name = grade_name;
      this.grade_value = grade_value;
    }
  };
  