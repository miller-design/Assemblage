// import GIA dependancy
import Component from 'gia/Component'
var Flickity = require('flickity')


// Extend the GIA component
class ImageSlider extends Component {

	// setup
	constructor(element) {
		super(element)

		this.ref = {
			slider: null,
			slide: [],
		}

		this.slider
	}

	mount() {

		console.log(this.element)

		this.slider = new Flickity(this.ref.slider, {
			cellAlign: 'left',
			freeScroll: false,
			contain: true,
			adaptiveHeight: false,
			autoPlay: false,
			lazyLoad: true,
			percentPosition: true,
			prevNextButtons: false,
			pageDots: false,
			setGallerySize: true,
			imagesLoaded: true,
			friction: 0.25,
			selectedAttraction: 0.015,
		})
	}
}

// Export ES6 module
export default ImageSlider;
