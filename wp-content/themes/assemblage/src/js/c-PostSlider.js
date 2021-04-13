// import GIA dependancy
import Component from 'gia/Component'
// var Flickity = require('flickity')
var Flickity = require('flickity-imagesloaded')


// Extend the GIA component
class PostSlider extends Component {

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

		this.slider = new Flickity(this.ref.slider, {
			cellAlign: 'left',
			freeScroll: false,
			contain: true,
			adaptiveHeight: false,
			autoPlay: false,
			lazyLoad: 4,
			percentPosition: true,
			prevNextButtons: false,
			pageDots: false,
			setGallerySize: true,
			imagesLoaded: true,
		})
	}
}

// Export ES6 module
export default PostSlider;
