import ApiBotServices from '../../backend/services/postgres_api_bot';
export default class SOSModel{
	constructor(){}

	static saveSOSRequest(user){
       return ApiBotServices.saveSOSRequest(user)
	}

	static getAllUserSOS(){
		return ApiBotServices.getAllUsersSOS();
	}
}