import ApiBotServices from '../../backend/services/postgres_api_bot';
class HomeModel{
	constructor(){

	}

	static dashboard(){
	 return ApiBotServices.dashboard()
	}
}

export default HomeModel;