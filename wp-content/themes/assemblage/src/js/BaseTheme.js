import Component from 'gia/Component'
import 'lazysizes'  // always load lazysizes, requires no further config
import getComponentFromElement from 'gia/getComponentFromElement'


// Wrapper for global Javascript dependencies
// Enable/disable on per bage basis with options on body tag
class BaseTheme extends Component {

	constructor(element) {

		super(element)

		// (https://github.com/eduardoboucas/include-media-export) - adding media queries to this module that will become accessible by: global.base.mediaQuery
		this.mediaQuery = require('../../node_modules/include-media-export/dist/include-media-1.0.2.min.js')

		this.latestKnownScrollY = 0
		this.lastScrollTop = 0

		// create global object of this special component instance
		global.base = getComponentFromElement(document.body)
	}



	mount() {

		this.initScrollHandler()
		this.initResizeHandler()
	}

	initScrollHandler() {

		this.latestKnownScrollY = 0
		let tick = false  // Track whether call is currently in process

		window.addEventListener('scroll', () => {

			this.latestKnownScrollY = window.scrollY
			// needs to be out of the timeout to ensure result is accurate
			this.scrollDirection(this.latestKnownScrollY)

			if (!tick) {
				setTimeout(() => {
					global.scrollEvents.forEach((scrollHandler) => {
						scrollHandler(this.latestKnownScrollY)
					})
					tick = false
				}, 100)
			}
			tick = true
		})
	}


	initResizeHandler() {

		let forLastExec
		let delay = 100 // delay between calls
		let throttled = false // are we currently throttled?

		// window.resize event listener
		window.addEventListener('resize', () => {

			// only run if we're not throttled
			if (!throttled) {

				// actual callback action
				global.resizeEvents.forEach((resizeHandler) => {
					resizeHandler()
				})
				// we're throttled!
				throttled = true
				// set a timeout to un-throttle
				setTimeout(() => {
					throttled = false
				}, delay)
			}

			clearTimeout(forLastExec);

			// this is messy!
			forLastExec = setTimeout(() => {
				global.resizeEvents.forEach((resizeHandler) => {
					resizeHandler()
				})
			}, delay)
		})
	}

	scrollDirection(currentScrollY) {

		global.scrollDirection = (currentScrollY < this.lastScrollTop) ? 'up' : 'down'
    this.lastScrollTop = currentScrollY
	}
}

// Export ES6 module
export default BaseTheme;
