/**
 *  UTILS  AND TEMPLATES
 */
// Images for Simple slider
const images = Array(7)
    .fill(1)
    .map((i, index) => `${index + 1}.jpeg`); // [1.jpeg, 2.jpeg ...]
// Simple Slider Template
const simpleSliderTemplate = (source) => `
   <img src="${source}" alt="" />
`;
const createDOMElFromString = (domstring) => {
    const html = new DOMParser().parseFromString(domstring, "text/html");
    return html.body.firstChild;
};
// Slider Classes
class BaseSlider {
    constructor(selector, showButtons = true) {
        this.showButtons = showButtons;
        this.imagePath = "./assets/";
        this.currentIndex = 0;
        this.slides = [];
        this.el = document.querySelector(selector);
    }
    // TODO: next and previous methods need to be fixed
    // when slides index > slides.length you can see empty slide
    next() {
        this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
        this.showSlide(this.currentIndex);
    }
    previous() {
        this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
        this.showSlide(this.currentIndex);
    }
    showSlide(index) {
        this.slides.forEach((item, i) => {
            if (index === i) {
                item.classList.remove("is-hidden");
                return;
            }
            item.classList.add("is-hidden");
        });
    }
    addButtons() {
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
    render() {
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
    constructor(selector, showButtons = true) {
        super(selector, showButtons);
    }
    addSlides(images) {
        if (Array.isArray(images)) {
            const sliderTemplate = (source) => {
                const imgString = simpleSliderTemplate(this.imagePath + source);
                return createDOMElFromString(imgString);
            };
            this.slides = images.map(source => sliderTemplate(source));
        }
    }
}
// TODO: add class TextSlide that implements ITextSlide
var TextSlideClassEnum;
(function (TextSlideClassEnum) {
    TextSlideClassEnum["primary"] = "is-primary";
    TextSlideClassEnum["success"] = "is-success";
    TextSlideClassEnum["info"] = "is-info";
})(TextSlideClassEnum || (TextSlideClassEnum = {}));
class TextSlide {
    constructor(title, subtitle, baseClass) {
        this.title = title;
        this.subtitle = subtitle;
        this.baseClass = baseClass;
    }
}
// TODO: add elements to textSlides
const textSlides = [
    new TextSlide('Angular', 'is awesome'),
    new TextSlide('Typescript', 'is awesome', TextSlideClassEnum.info),
    new TextSlide('Lorem Ipsum', 'dolorem', TextSlideClassEnum.success),
];
const textSliderTemplate = (textSlide) => `
<section class="hero is-medium ${textSlide.baseClass ? textSlide.baseClass : "is-primary"} is-bold">
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
// should extend abstract class BaseSlider
class TextSlider extends BaseSlider {
    constructor(selector, showButtons = true) {
        super(selector, showButtons);
    }
    // TODO: finish the method addSlides
    // use textSliderTemplate
    addSlides(slide) {
        const sliderTemplate = (source) => createDOMElFromString(textSliderTemplate(source));
        this.slides = slide.map(sliderTemplate);
    }
}
class AutomaticSlider extends TextSlider {
    // TODO: automatic slider should be the descendant of the SimpleSlider or
    // TextSlider but with automatic slideshow and without buttons
    constructor(selector, showButtons = false) {
        super(selector, showButtons);
        setInterval(() => this.next(), 500);
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
//# sourceMappingURL=main.js.map