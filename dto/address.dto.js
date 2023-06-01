module.exports = class AddressDTO {
    constructor({address_id, address_street, address_number, address_box, address_city, address_postalcode}) {
      this.address_id = address_id;
      this.address_street = address_street;
      this.address_number = address_number;
      this.address_box = address_box;
      this.address_city = address_city;
      this.address_postalcode = address_postalcode;
    }
  }