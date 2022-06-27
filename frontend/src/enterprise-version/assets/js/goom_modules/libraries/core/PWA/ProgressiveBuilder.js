import Coreclasses from './bootstrap';
class ProgressiveBuilder{
	constructor(){
	  this.serviceWorker = null;
	  this.coreClasses = Coreclasses;
	  this.initialize();
	}
    initialize(){
       console.log('Registering service worker');
       navigator.serviceWorker.
         register('/sw.js', {scope: '/'}).then(function() {
          console.log('Service worker registered!');
         });
       console.log('Registered service worker');
       var deferredPrompt;
	   window.addEventListener('beforeinstallprompt', function(event) {
		  console.log('beforeinstallprompt fired');
		  event.preventDefault();
		  deferredPrompt = event;
		  return false;
		});

       //show install banner
	   if (deferredPrompt) {
	    deferredPrompt.prompt();
	    deferredPrompt.userChoice.then(function(choiceResult) {
	      console.log(choiceResult.outcome);
	      if (choiceResult.outcome === 'dismissed') {
	        console.log('User cancelled installation');
	      } else {
	        console.log('User added to home screen');
	      }
	    });

	    deferredPrompt = null;
	  }
	}

	run(){
	  Object.values(this.coreClasses).map(function(item) {
        let classInstance = item;
        classInstance.attachEvents();
      });
	}
}

export default ProgressiveBuilder;