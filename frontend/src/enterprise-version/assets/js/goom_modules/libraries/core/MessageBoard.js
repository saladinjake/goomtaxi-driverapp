'use strict';
class MessageBoard {
  static displayMsg(msg) {
    let msgBoard = document.getElementById('msg');

    setTimeout(() => {
      msgBoard.style.opacity = 1;
      msgBoard.innerHTML = msg;
      msgBoard.style.display = 'block';
    }, 2000);

    setTimeout(() => {
      msgBoard.innerHTML = '';
      msgBoard.style.display = 'none';
      msgBoard.style.opacity = 0;
    }, 5000);
  }
}

export default MessageBoard;
