'use strict';

class AbstractSubject {
  constructor() {
    }

  static authenticateUser() {}

  static authorizeUser() {}
  static fetchDataInterventions(url = '/interventions') {}

  static fetchDataRedFlags(url = '/red-flags') {}
  static getById() {}

  static submitFormData() {}

  static deleteOneRecord() {}
  static updateOneLocation() {}
  static updateOneComment() {}
  static updateOneStatus() {}

}



let ProxyPatternsInit = {
    AbstractSubject
}
export default ProxyPatternsInit;

