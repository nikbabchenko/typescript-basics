

/**
 *  UTILS  AND TEMPLATES
 */

type ImageSlide = string;
type Slide = ImageSlide | ITextSlide;

 // Images for Simple slider
 const images: ImageSlide[] = Array(7)
 .fill(1)
 .map((i, index) => `${index + 1}.jpeg`); // [1.jpeg, 2.jpeg ...]


// Simple Slider Template
const simpleSliderTemplate = (source: string) => `
   <img src="${source}" alt="" />
`;

const createDOMElFromString = (domstring: string): HTMLElement => {
 const html = new DOMParser().parseFromString(domstring, "text/html");
 return <HTMLElement>html.body.firstChild;
};

// Slider Classes
abstract class BaseSlider {
 protected imagePath = "./assets/";

 public currentIndex = 0;
 public el: HTMLElement;
 protected slides: HTMLElement[] = [];

 // TODO: add union type for slides
 abstract addSlides(slides: Slide[]): void;

 constructor(selector: string, private showButtons: boolean = true) {
   this.el = document.querySelector(selector);
 }

 public next(): void {
  if (++this.currentIndex > this.slides.length - 1) this.currentIndex = 0;
  this.showSlide(this.currentIndex);
 }

 public previous(): void {
   if (--this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
   this.showSlide(this.currentIndex);
 }

 protected showSlide(index: number): void {
   this.slides.forEach((item, i) => {
     if (index === i) {
       item.classList.remove("is-hidden");
       return;
     }

     item.classList.add("is-hidden");
   });
 }

 private addButtons(): void {
   const buttonsContainer = document.createElement("div");
   buttonsContainer.classList.add("navigation");
   buttonsContainer.classList.add("has-text-centered");
   buttonsContainer.innerHTML = `
       <button class="prev button is-info">Previous</button>
       <button class="next button is-info">Next</button>
     `;

   const prevButton = buttonsContainer.querySelector(".prev");
   const nextButton = buttonsContainer.querySelector(".next");
   prevButton.addEventListener("click", () => this.previous());
   nextButton.addEventListener("click", () => this.next());

   this.el.appendChild(buttonsContainer);
 }

 public render(): void {
   this.slides.forEach((item, index) => {
     item.classList.add('fadeIn'); // adds fadeIn animation
     if (index !== 0) {
       item.classList.add("is-hidden");
     }

     this.el.appendChild(item);
   });
   if (this.showButtons) {
     this.addButtons();
   }
 }
}

class SimpleSlider extends BaseSlider {
 constructor(selector: string, showButtons = true) {
   super(selector, showButtons);
 }

 addSlides(images: ImageSlide[]) {
   if (Array.isArray(images)) {
     const createSlideElement = (image: ImageSlide) => {
       const imgString: string = simpleSliderTemplate(this.imagePath + image);
       return createDOMElFromString(imgString);
     };

     this.slides = images.map(slide => createSlideElement(slide));
   }
 }
}

enum TextSlideCssClass {
  isPrimary = "is-primary",
  isSuccess = "is-success",
  isInfo = "is-info",
}

// Text Slide interface
interface ITextSlide {
  title: string;
  subtitle: string;
  baseClass?: TextSlideCssClass;
 }

class TextSlide implements ITextSlide {
  title: string;
  subtitle: string;
  baseClass?: TextSlideCssClass;
  
  public constructor(init: ITextSlide) {
    Object.assign(this, init);
  }
}

const textSlides: TextSlide[] = [
 new TextSlide ({
   title: 'Angular',
   subtitle: 'is awesome'
 }),
 new TextSlide ({
   title: 'Typescript',
   subtitle: 'is awesome',
   baseClass: TextSlideCssClass.isInfo
 }),
 new TextSlide ({
   title: 'Lorem Ipsum',
   subtitle: 'dolorem',
   baseClass: TextSlideCssClass.isSuccess
 })
];
 
const textSliderTemplate = (textSlide: ITextSlide) => `
<section class="hero is-medium ${
 textSlide.baseClass ? textSlide.baseClass : TextSlideCssClass.isPrimary
} is-bold">
   <div class="hero-body">
   <div class="container">
       <h1 class="title">
       ${textSlide.title}
       </h1>
       <h2 class="subtitle">
       ${textSlide.subtitle}
       </h2>
   </div>
   </div>
</section>`;

class TextSlider extends BaseSlider {
 addSlides(slides: ITextSlide[]) {
  if (Array.isArray(images)) {
    const createSlideElement = (slide: ITextSlide) => {
      const elementHtml: string = textSliderTemplate(slide);
      return createDOMElFromString(elementHtml);
    };

    this.slides = slides.map(source => createSlideElement(source));
  }
 }
}


class AutomaticSlider extends TextSlider {
 constructor(selector: string) {
  super(selector, false);
 }

 public render(): void {
   setInterval(this.next.bind(this), 1000);
   super.render();
 }
}


const simpleSlider = new SimpleSlider('.simple-slider');
simpleSlider.addSlides(images);
simpleSlider.render();

const textSlider = new TextSlider('.text-slider');
textSlider.addSlides(textSlides);
textSlider.render();

const automaticSlider = new AutomaticSlider('.automatic-slider');
automaticSlider.addSlides(textSlides);
automaticSlider.render();

