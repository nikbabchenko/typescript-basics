// ======
//  UTILS
// ======

class LoopArray<T> {
  private array: T[];
  private currentIndex: number;

  constructor(array: T[]) {
    this.array = array || [];
    this.currentIndex = 0;
  }

  public push(...elements: T[]): void {
    this.array.push(...elements);
  }

  public forEach(f: (element: T, index: number) => void): void {
    this.array.forEach(f);
  }

  public getCurrentElement(): T {
    return this.array[this.currentIndex];
  }

  public shiftCurrentIndex(isForward: boolean): boolean {
    if (isForward) {
      if (this.currentIndex == this.array.length - 1) {
        this.currentIndex = 0;
        return true;
      }

      this.currentIndex++;
      return false;
    }

    if (this.currentIndex == 0) {
      this.currentIndex = this.array.length - 1;
      return true;
    }

    this.currentIndex--;
    return false;
  }
}

const getImageSlides = (): ISlide[] => Array(7).fill(1).map((_, index) => new ImageSlide(`${index + 1}.jpeg`));

const getTextSlides = (): ISlide[] => {
  const textSlides: ITextSlide[] = [
    {
      title: 'Angular',
      subtitle: 'is awesome',
    },
    {
      title: 'Typescript',
      subtitle: 'is awesome',
      baseClass: TextMetadata.Info,
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'dolorem',
      baseClass: TextMetadata.Success,
    },
    {
      title: 'PEPEGA',
      subtitle: 'B1TCH WHY YOU DONT READ MY MESSAGE I SENT IT 3 TIMES?!?!?!',
      baseClass: TextMetadata.Info,
    },
  ];
  return textSlides.map(textData => new TextSlide(textData.title, textData.subtitle, textData.baseClass));
}

// =======
// SLIDERS
// =======

class SlideItem {
  public isActive: boolean;
  public element: HTMLElement;

  constructor(public slide: ISlide) {
    this.isActive = false;
    this.element = this.createDOMElFromString(slide.createTeamplate());
  }

  public activate(): void {
    this.isActive = true;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  private createDOMElFromString = (domstring: string): HTMLElement => {
    const html = new DOMParser().parseFromString(domstring, "text/html");
    return <HTMLElement>html.body.firstChild;
  };
}

abstract class BaseSlider {
  private slides: LoopArray<SlideItem> = new LoopArray<SlideItem>([]);

  public el: HTMLElement;

  constructor(selector: string, private showButtons: boolean = true) {
    this.el = document.querySelector(selector);
  }

  public addSlides(slides: ISlide[]): void {
    if (Array.isArray(slides)) {
      this.slides.push(...slides.map(slide => new SlideItem(slide)));
    }
  }

  public render(): void {
    this.slides.forEach((item, index) => {
      item.element.classList.add('fadeIn');
      if (index !== 0) {
        item.element.classList.add("is-hidden");
      } else {
        item.activate();
      }

      this.el.appendChild(item.element);
    });
    if (this.showButtons) {
      this.addButtons();
    }
  }

  protected shiftAndShow(isForward: boolean): void {
    this.slides.getCurrentElement().deactivate();
    this.slides.shiftCurrentIndex(isForward);
    this.showSlide();
  }

  private next(): void {
    this.shiftAndShow(true);
  }

  private previous(): void {
    this.shiftAndShow(false);
  }

  private showSlide(): void {
    this.slides.getCurrentElement().activate();
    this.slides.forEach(item => {
      if (item.isActive) {
        item.element.classList.remove("is-hidden");
        return;
      }

      item.element.classList.add("is-hidden");
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
}

class SimpleSlider extends BaseSlider {
  constructor(selector: string, showButtons = true) {
    super(selector, showButtons);
  }
}

class ConcreteImageSlider extends SimpleSlider {
  constructor() {
    super('.simple-slider', true);

    this.addSlides(getImageSlides())
  }
}

class TextSlider extends BaseSlider {
  constructor(selector: string) {
    super(selector, true);
  }
}

class ConcreteTextSlider extends TextSlider {
  constructor() {
    super('.text-slider');

    this.addSlides(getTextSlides());
  }
}

class AutomaticSlider extends BaseSlider {
  constructor(selector: string) {
    super(selector, false);
  }

  render(): void {
    super.render();
    setInterval(() => { this.autoMove(); }, 1000);
  }

  private autoMove(): void {
    this.shiftAndShow(true);
  }
}

class ConcreteAutomaticSlider extends AutomaticSlider {
  constructor() {
    super('.automatic-slider');
    this.addSlides(getImageSlides());
    this.addSlides(getTextSlides());
  }
}

// ======
// SLIDES
// ======

interface ISlide {
  createTeamplate(): string;
}

interface IImageSlide {
  imagePath: string;
}

class ImageSlide implements IImageSlide, ISlide {
  public imagePath: string;

  constructor(public imageName: string) {
    const imageFolderPath: string = "./assets/";

    this.imagePath = imageFolderPath + imageName;
  };

  createTeamplate(): string {
    return this.simpleSliderTemplate(this.imagePath);
  }

  private simpleSliderTemplate = (source: string) => `
  <img src="${source}" alt="" />
`;
}

enum TextMetadata {
  Primary = "is-primary",
  Success = "is-success",
  Info = "is-info",
}

interface ITextSlide {
  title: string;
  subtitle: string;
  baseClass?: TextMetadata;
}

class TextSlide implements ITextSlide {
  private textSliderTemplate = (textSlide: ITextSlide): string => `
<section class="hero is-medium ${
    textSlide.baseClass
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

  public baseClass: TextMetadata;

  constructor(public title: string, public subtitle: string, baseClass: TextMetadata) {
    this.baseClass = baseClass ? baseClass : TextMetadata.Primary;
  }

  createTeamplate(): string {
    return this.textSliderTemplate(this);
  }
}

// ============
// KINDA main()
// ============

new ConcreteImageSlider().render();
new ConcreteTextSlider().render();
new ConcreteAutomaticSlider().render();
