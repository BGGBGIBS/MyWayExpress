module.exports = class UserDTO {
    constructor({user_id, user_firstname, user_lastname,user_email, user_birthdate, user_address, user_role, user_password}) {
      this.user_id = user_id;
      this.user_firstname = user_firstname;
      this.user_lastname = user_lastname;
      this.user_email = user_email;
      this.user_birthdate = user_birthdate;
      this.user_address = user_address;
      this.user_role = user_role;
      this.user_password = user_password
    }
  }
  