'use strict';
function GateKeeperForAdmin() {
  const checkIfAdminTokenExists = () => {

  if(localStorage.getItem('userToken')){
    const admin = JSON.parse(localStorage.getItem('userToken'));
    if (!admin.user.isAdmin) {
      window.location.href = './';
    }

   }else{
   	window.location.href = './';
   }
  };
  return checkIfAdminTokenExists();
}

export default GateKeeperForAdmin;
