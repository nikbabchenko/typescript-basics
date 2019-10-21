/**
 *  UTILS  AND TEMPLATES
 */

// Images for Simple slider
const images: string[] = Array(7)
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
  abstract addSlides(slides: string[] | ITextSlide[]): void;

  constructor(selector: string, private showButtons: boolean = true) {
    this.el = document.querySelector(selector);
  }

  private nextIndex(distance: number): number {
    return (
      (this.currentIndex + distance + this.slides.length) % this.slides.length
    );
  }

  public next(): void {
    this.currentIndex = this.nextIndex(1);
    this.showSlide(this.currentIndex);
  }

  public previous(): void {
    this.currentIndex = this.nextIndex(-1);
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
      item.classList.add("fadeIn"); // adds fadeIn animation
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

  addSlides(images: string[]) {
    if (Array.isArray(images)) {
      const sliderTemplate = (source: string) => {
        const imgString: string = simpleSliderTemplate(this.imagePath + source);
        return createDOMElFromString(imgString);
      };

      this.slides = images.map(source => sliderTemplate(source));
    }
  }
}

const textSlides: ITextSlide[] = [
  {
    title: "Angular",
    subtitle: "is awesome"
  },
  {
    title: "Typescript",
    subtitle: "is awesome",
    baseClass: "is-info"
  },
  {
    title: "Lorem Ipsum",
    subtitle: "dolorem",
    baseClass: "is-success"
  }
];
// Text Slide interface
interface ITextSlide {
  title: string;
  subtitle: string;
  // TODO: add named enum for classes
  baseClass?: "is-primary" | "is-success" | "is-info";
}

const textSliderTemplate = (textSlide: ITextSlide) => `
<section class="hero is-medium ${
  textSlide.baseClass ? textSlide.baseClass : "is-primary"
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
  constructor(selector: string, showButtons = true) {
    super(selector, showButtons);
  }

  addSlides(slides: ITextSlide[]) {
    if (Array.isArray(images)) {
      const sliderTemplate = (source: ITextSlide) => {
        const imgString: string = textSliderTemplate(source);
        return createDOMElFromString(imgString);
      };

      this.slides = slides.map(source => sliderTemplate(source));
    }
  }
}

class AutomaticSlider extends TextSlider {
  constructor(selector: string, showButtons = false) {
    super(selector, showButtons);
  }

  public render(): void {
    super.render();
    let t = this;
    setInterval(function tick() {
      t.next();
    }, 2000);
  }
}

const simpleSlider = new SimpleSlider(".simple-slider");
simpleSlider.addSlides(images);
simpleSlider.render();

const textSlider = new TextSlider(".text-slider");
textSlider.addSlides(textSlides);
textSlider.render();

const automaticSlider = new AutomaticSlider(".automatic-slider");
automaticSlider.addSlides(textSlides);
automaticSlider.render();
