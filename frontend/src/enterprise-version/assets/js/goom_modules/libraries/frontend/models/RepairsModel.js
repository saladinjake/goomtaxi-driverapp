import ApiBotServices from '../../backend/services/postgres_api_bot';
export default class MechModel{
	constructor(){}

	static saveRepairs(){
       return ApiBotServices.saveRepairs()
	}

	static getUsersRepairs(){
       return ApiBotServices.getUsersRepairs()
	}
    
     static updateOneRecord(record){
     	return ApiBotServices.updateOneRecord(record)
     }
	
}