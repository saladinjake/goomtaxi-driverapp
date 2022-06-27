


import SOSModel from '../models/SOSModel';
import $ from 'jquery';
const SUCCESS_URL= './sos-history';
const POST_URL = process.env.DEPLOY_BACK_URL+"/sos";
const notification_url = process.env.DEPLOY_BACK_URL+"/notifications";
export default class SOS{
	constructor(){}


	seeAllSOSNotifications(){

	}

	static index(){
		
	}

	
	attachEvents(){
	  if (document.getElementById('sos-page')) {
			$("#show-map").hide();
			 $(document).ready(function() {
				// get location button functionality
				$("#get-location-btn").click(function(event){
					event.preventDefault();
					$("#hide-on-click").hide();
					$("#show-map").show();
					$("#location-lat-long").val("Finding location. Please wait...");
					// check if browser supports the geolocation api
					if(navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(SOS.success);			// if geolocation supported, call function
					} else {
						$("#location-lat-long").val('Your browser doesn\'t support the geolocation api.');
					}
				
				});
			});

			  document.getElementById("cancle-sos").addEventListener("click", function(e){
                window.location.href="./dashboard"
            })

	  }

	  if(document.getElementById("view-sos")){
         this.indexController()
	  }

	}


	static render(items) {

    const recordItems = document.getElementById('fetched-data-sos');
  
    if (items.length === 0) {
      recordItems.innerHTML = 'No records Yet';
      recordItems.style.textAlign = 'center';
      recordItems.style.fontSize = '32px';
      recordItems.style.font = 'bold';
    } else {
      items.forEach((item) => {
        const eachRecord = `
           <tr>
          
               <td><a href="#">${item.user_id}</a></td>
                <td>${item.location}</td>
                 <td>${item.updated_at}</td>
                 <td>${item.created_at}</td>
                   <td>
                      <span class="label label-success">Completed</span>
                    </td>
                                                    <td>
                                                             <a data-subject="${item.subject}" data-category="${item.category}" data-location="${item.location}" data-description="${item.comment}" data-points="-1" data-type="General Enquiries" class="table-action-btn read_more md-trigger" href="./record.html"  title=${item.reportType} class="comment" id=${item.id} onclick="getId(this)"><i class="md md-chevron-right"></i></a>
             
                                                            
                                                     </td>
                                                </tr>

       
    `;

        recordItems.innerHTML += eachRecord;
      });
    }
  }



	indexController(){
       let that = this;
    let dataPromise = SOSModel.getAllUserSOS();
    dataPromise
      .then(data => {
      	// let newData = data[0].data[0].redFlags
        SOS.render(data);
      })
      .catch(err => console.log(err));
	}


	// function to get lat/long and plot on a google map
	static success(position) {
			var latitude		= position.coords.latitude;				// set latitude variable
			var longitude		= position.coords.longitude;			// set longitude variable
			
			var mapcanvas		= document.createElement('div');		// create div to hold map
			mapcanvas.id = 'map';										// give this div an id of 'map'
			mapcanvas.style.height = '400px';							// set map height
			mapcanvas.style.width = '100%';								// set map width
			
			document.querySelector('#map-container').appendChild(mapcanvas);	// place new div within the 'map-container' div
			
			var coords = new google.maps.LatLng(latitude,longitude);	// set lat/long object for new map
  
			var options = {												// set options for map
				zoom: 15,
				center: coords,
				mapTypeControl: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById("map"), options);	// create new map using settings above

			var marker = new google.maps.Marker({						// place a marker at our lat/long
				position:	coords,
				map:		map
			});
			
			var latLongResponse	= 'Latitude: ' + latitude + ' / Longitude: ' + longitude;	// build string containing lat/long
			SOS.getAddress(latitude,longitude);							// geocode the lat/long into an address

			//$("#location-lat-long").val(latLongResponse);									// write lat/long string to input field
			
		}
		
		
		
static launch_toast(address) {
    var x = document.getElementById("toast")
    x.className = "show";
    document.getElementById('desc').innerHTML= "Your address"  + ' has been sent';
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
		

	// function to process address data
	static processAddress(address) {
			//$("#location-address").val(address);									// write address to field
			var spokenResponse = "S O S response at " + address;						// build string to speak
			//SOS.speakText(spokenResponse);
			 const me = JSON.parse(localStorage.getItem('userToken'));

            const sosRequest = {
            	address,
            	user_id: me.user.id,
            	location:address,
            	status: "completed"
            };

            SOS.launch_toast(address);



 //            var notify = '<div id="app"><div class="notification">notification</div>' +
 // '<div class="pop"><div class="cl"><i class="fas fa-times"></i></div><div class="message">' + 'Your address at ' +  address ' has been sent.</div>' +
 //  '</div></div>';
               
				fetch(POST_URL, {
			      method: 'POST',
			      headers: {
			        'Access-Control-Allow-Headers': 'x-access-token',
			        'Accept': 'application/json',
			        'Content-Type': 'application/json',
			        'x-access-token': me.token,
			      },
			      mode: 'cors',
			      body: JSON.stringify(sosRequest),
			    })
		      .then(response => response.json())
		      .then(data => {
		        if (data.status === 422) {
		        	console.log("field required")
		          MessageBoard.displayMsg( data.error);
		        } else if (data.status === 200) {
		          console.log("success..")
		          MessageBoard.displayMsg("Notification has been sent to you");
		          
		        } else {
		        	console.log(data.error)
		          //MessageBoard.displayMsg(data.error);
		          //Router.redirect('login.html');
		        }
		      })
		      .catch(error => {
		        throw error;
		      });											// speak the address
	}


	static beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

		

	// function to geocode a lat/long
	static getAddress(myLatitude,myLongitude) {
			
		var geocoder	= new google.maps.Geocoder();							// create a geocoder object
		var location	= new google.maps.LatLng(myLatitude, myLongitude);		// turn coordinates into an object
 			
		geocoder.geocode({'latLng': location}, function (results, status) {
			if(status == google.maps.GeocoderStatus.OK) {						// if geocode success
					SOS.processAddress(results[0].formatted_address);

					let user =JSON.parse(localStorage.getItem('userToken'));
					let data = {};
			        data.address = results[0].formatted_address;
			        data.location = myLatitude + " ," + myLongitude;
			        data.user_id = user.user.id;
			        data.notification_count = user.user.notification_count + 1;
			        document.getElementById("notifyCount").innerHTML = data.notification_count;
                    SOS.beep();
			       return SOSModel.saveSOSRequest(user)					// if address found, pass to processing function
			} else {
				  alert("Geocode failure: " + status);								// alert any other error(s)
				  return false;
			}
		});
	}


	// function to speak a response
	static speakText(response) {
			
			// setup synthesis
			var msg = new SpeechSynthesisUtterance();
			var voices = window.speechSynthesis.getVoices();
			msg.voice = voices[2];					// Note: some voices don't support altering params
			msg.voiceURI = 'native';
			msg.volume = 1;							// 0 to 1
			msg.rate = 1;							// 0.1 to 10
			msg.pitch = 2;							// 0 to 2
			msg.text = response;
			msg.lang = 'en-US';
			
			speechSynthesis.speak(msg);
		}
}