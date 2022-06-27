
const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

class PwaSubscription{
	constructor(){

	}

	addSubscriptionPlan(){
       //run().catch(error => console.error(error));
	}
	attachEvents(){
	 
	  this.addSubscriptionPlan()
	  
	}
    
    // Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
	urlBase64ToUint8Array(base64String) {
	  const padding = '='.repeat((4 - base64String.length % 4) % 4);
	  const base64 = (base64String + padding)
	    .replace(/\-/g, '+')
	    .replace(/_/g, '/');

	  const rawData = window.atob(base64);
	  const outputArray = new Uint8Array(rawData.length);

	  for (let i = 0; i < rawData.length; ++i) {
	    outputArray[i] = rawData.charCodeAt(i);
	  }
	  return outputArray;
	}

}




export default PwaSubscription;