// Function overloading

function nextSlide(slide: string): string;
function nextSlide(slide: {title: string, subtitle: string}): {title: string, subtitle: string};

function nextSlide(slide): any {
    if (typeof slide == "object") {
        const {title, subtitle} = slide;
        console.log('--title', title);
        console.log('--subtitle', subtitle);
        return slide;
    }

    if (typeof slide === 'string') {
        console.log('--next slide is', slide);
        return slide;
    }
}

nextSlide('/image.jpg');
nextSlide({title: 'Hero title', subtitle: 'Hero subtitle'});