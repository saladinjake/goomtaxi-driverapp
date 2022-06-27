import AdminModel from "../models/AdminModel"
export default class AdminApiController{
	constructor(){

	}
	attachEvents(){
	  console.log("called admin controller")
	  return	AdminModel.runEndpoints()
	}
}