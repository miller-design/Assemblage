// import GIA dependancy
import Component from 'gia/Component'
import eventbus from 'gia/eventbus'

// Extend the GIA component
class AjaxLoadMore extends Component {

	// setup
	constructor(element) {
		super(element)

		this.options = {
			loadposts: null,
			loadterms: null,
			ajaxCall: '',
			postsPerPage: '',
			paged: '',
			maxPages: '',
			termSlug: '',
		}

		this.ref = {
			contentArea: null
		}

		this.canBeLoaded = true
	}

	mount() {

		if(this.options.loadposts) {
			this.ajaxLoadMorePostsScroll()
		}

		if(this.options.loadterms) {
			this.ajaxLoadMoreTermsScroll()
		}
	}

	ajaxLoadMorePostsScroll() {

		const bottomOffset = 1000
		const self = this
		const AjaxScroll = () => {

			// need this to monitor height as new elements get added
			const targetHeight = self.element.getBoundingClientRect().height

			if(window.pageYOffset > ( targetHeight - bottomOffset ) && self.canBeLoaded === true) {

				self.canBeLoaded = false
				// vanilla ajax request
				var request = new XMLHttpRequest()
				request.open('POST', assemblage.ajaxurl, true)
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
				request.onload = function () {
					if (this.status >= 200 && this.status < 400) {

						if(this.response != 'empty') {
							self.options.paged++
							self.canBeLoaded = true
							self.ref.contentArea.insertAdjacentHTML('beforeend', this.response)

							if(self.options.paged >= self.options.maxPages) {
								self.canBeLoaded = false
							}
						}
					} else {
						// Response error
						console.log('response error')
					}
				}
				request.onerror = function () {
					console.log('Connection error')
					// Connection error
				}

				request.send('action=' + self.options.ajaxCall + '&nonce=' + assemblage.nonce + '&postsPerPage=' + self.options.postsPerPage + '&paged=' + self.options.paged + '&termSlug=' + self.options.termSlug)
			}
		}

		window.addEventListener('scroll', AjaxScroll)
	}

	ajaxLoadMoreTermsScroll() {

		const bottomOffset = 1000
		const self = this
		const AjaxScroll = () => {

			// need this to monitor height as new elements get added
			const targetHeight = self.element.getBoundingClientRect().height

			if(window.pageYOffset > ( targetHeight - bottomOffset ) && self.canBeLoaded === true) {

				self.canBeLoaded = false
				// vanilla ajax request
				var request = new XMLHttpRequest()
				request.open('POST', assemblage.ajaxurl, true)
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
				request.onload = function () {
					if (this.status >= 200 && this.status < 400) {

						if(this.response != 'empty') {
							self.options.paged++
							self.canBeLoaded = true
							self.ref.contentArea.insertAdjacentHTML('beforeend', this.response)
							if(self.options.paged >= self.options.maxPages) {
								self.canBeLoaded = false
							}
						}

					} else {
						// Response error
						console.log('response error')
					}
				}
				request.onerror = function () {
					console.log('Connection error')
					// Connection error
				}

				request.send('action=' + self.options.ajaxCall + '&nonce=' + assemblage.nonce + '&postsPerPage=' + self.options.postsPerPage + '&paged=' + self.options.paged)
			}
		}

		window.addEventListener('scroll', AjaxScroll)
	}
}

// Export ES6 module
export default AjaxLoadMore;
