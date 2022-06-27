'use strict';
class IReporterWebsiteImageViewer {
  attachEvents() {
    this.tableImagePreviewer();
  }

  tableImagePreviewer() {
    // Get the modal
    let modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let i, j;
    let img_evidence = document.getElementsByClassName('img-evidence');
    for (i = 0; i < img_evidence.length; i++) {
      img_evidence[i].addEventListener('click', function() {
        let modalImg = document.getElementById('img01');
        let captionText = document.getElementById('caption');
        let img = this;

        modal.style.display = 'block';
        modalImg.src = this.getAttribute('src');
        captionText.innerHTML = this.getAttribute('alt') || 'no alt given';
        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName('close')[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = 'none';
        };
      });
    }
  }
}

export default IReporterWebsiteImageViewer;
