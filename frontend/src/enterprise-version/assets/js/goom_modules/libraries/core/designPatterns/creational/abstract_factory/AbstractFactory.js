'use strict';
import IReporterWebsiteLogin from '../../../Login';
import IReporterWebsiteSignUp from '../../../SignUp';
import IReporterWebsiteHomeRecords from '../../../../frontend/controllers/Home';
import IReporterWebsiteInterventionsRecords from '../../../../frontend/controllers/Interventions';
import IReporterRedFlagRecords from '../../../../frontend/controllers/Redflag';
class AbstractFactoryAuthControllers {
    constructor() {
    }

    createLoginCoreController () {
    }

    createSignUpCoreController () {
    }
}

class ConcreteFactoryAuthControllers extends AbstractFactoryAuthControllers {
    constructor() {
        super()
       
    }

    createLoginCoreController () {
       
        return new IReporterWebsiteLogin()
    }

    createSignUpCoreController () {
        
        return new IReporterWebsiteSignUp()
    }
}

class AbstractFactoryDataRecordControllers {
    constructor() {
    }

    createHomeRecords () {
    }

    createInterventionsRecords () {
    }

    createRedFlagRecords () {
    }
}

class ConcreteFactoryDataRecordControllers extends AbstractFactoryDataRecordControllers {
    constructor() {
        super()
        
    }

    createHomeRecords () {
        return new IReporterWebsiteHomeRecords();
    }

    createInterventionsRecords () {
        return new IReporterWebsiteInterventionsRecords();
    }

    createRedFlagRecords () {
        return new IReporterRedFlagRecords();
    }
}

//the products are in seperate files i imported for simplicity

function initializeAbstractionsWithFactoryMachines() {
    var AuthFactory = new ConcreteFactoryAuthControllers()
    
    
    var DataRecordFactory = new ConcreteFactoryDataRecordControllers()
   

    return {authFactory: AuthFactory, dataFactory:  DataRecordFactory}
}

const AbFactory = initializeAbstractionsWithFactoryMachines();
export default AbFactory;