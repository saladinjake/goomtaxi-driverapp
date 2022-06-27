export default class InactivityLockScreen{
    constructor(){
      this.time= null;


    }

    attachEvents(){
      // let that= this;
      // if(!JSON.parse(localStorage.getItem('userToken'))){
      //   widow.location.href="index.html"
      // }

      // window.onload = function() {
      //     that.inactivityTime(); 
      //   }
      
    }
    inactivityTime(){
   //   if(JSON.parse(localStorage.getItem('userToken'))){
   //    const user = JSON.parse(localStorage.getItem('userToken'));
   //    let linkOfApi =  'http://localhost:12000/profile/update/'+ user.user.id;
  
   //    fetch(linkOfApi, {
   //      method: 'GET',
   //      headers: {
   //        'Accept': 'application/json',
   //        'Content-Type': 'application/json',
   //        'x-access-token': user.token,
   //      },
   //      mode: 'cors',
        
   //    })
   //      .then(response => response.json())
   //      .then(data => {
       
   //        // if (data) {
   //        //   let userRecord = data.data[0].userInfo[0];
   //        //   let profilePic =  document.getElementById('');
   //        //   profilePic.src = '';

   //        // }
   //      }).catch(e => console.log(e));
        
   //      if(document.getElementById('lock-screen')){
   //         document.getElementById('relogin').addEventListener('click', (e)=>{
   //          e.preventDefault();
   //        })
   //      }
        
      

   //   window.addEventListener('load', InactivityLockScreen.resetTimer, true);
   //      var events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
   //      events.forEach(function(name) {
   //               document.addEventListener(name, InactivityLockScreen.resetTimer, true); 
   //      });
   //   }
   // }

   //  logout() {
   //     location.replace("http://localhost:4001/index.html");
   //  }

   //  resetTimer() {
   //      clearTimeout(time);
   //      this.time = setTimeout(logout, 3000)
       
   //  }
    
}