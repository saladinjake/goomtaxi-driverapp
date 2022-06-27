export default class Carousel {
  constructor ( element, args) {
    this.element = element;
    this.args = args;
    this.slidesContainer = element.getElementsByClassName('slidesx')[0]
    this.slideContainerSize = this.slidesContainer.offsetWidth
    this.slideCount = this.slidesContainer.getElementsByClassName('slidex').length;
    this.currentSlide = 1;
    this.init()
  }

  init () {
    const prevBtn = this.element.getElementsByClassName('prev')[0]
    const nextBtn = this.element.getElementsByClassName('next')[0]

    prevBtn.addEventListener('click', this.previous.bind(this), false)
    nextBtn.addEventListener('click', this.next.bind(this), false)

    this.element.getElementsByClassName('slidesx')[0].style.transitionDuration = this.args.transitionDuration
  }

  previous () {                
    if(this.currentSlide > 1) {
      const prevMarginString = this.slidesContainer.style.left
        const prevMarginValue = prevMarginString ? parseInt(prevMarginString.replace("px", "")) : 0
      this.slidesContainer.style.left = prevMarginValue+this.pas+"px"
      this.currentSlide--;
    }
  }

  next () {
    if(this.currentSlide < this.slideCount -1) {
      const prevMarginString = this.slidesContainer.style.left
      const prevMarginValue = prevMarginString ? parseInt(prevMarginString.replace("px", "")) : 0

      this.slidesContainer.style.left = prevMarginValue-this.pas+"px"
      this.currentSlide++;
    }
  }


  get pas () {
    return this.slideContainerSize / this.slideCount;
  }
}
