// import GIA dependancy
import Component from 'gia/Component'
import eventbus from 'gia/eventbus'

import { disablePageScroll, enablePageScroll, addFillGapTarget } from 'scroll-lock';

// Extend the GIA component
class BurgerMenu extends Component {

	// setup
	constructor(element) {
		super(element)

		this.options = {
			// someOption: " ",
		}

		this.ref = {
			imageArea: null,
			closeTrigger: null,
			hoverLinks: [],
		}

		this.closeBtn = this.ref.closeTrigger
		this.hoverTriggers = this.ref.hoverLinks
		this.imageArea = this.ref.imageArea
	}

	mount() {
		// set initial state
		this.setState({ menuOpen: false })
		// Attach the listeners
		eventbus.on('MainMenuTriggered', this.toggleStateChange.bind(this))
		this.closeBtn.addEventListener("click", () => {
			this.toggleStateChange()
			eventbus.emit('resetBurgerState')
		})

		this.hoverStateSetup()
	}

	toggleStateChange() {

		this.setState({
			menuOpen: !this.state.menuOpen,
		})
	}

	stateChange(stateChanges) {

		if('menuOpen' in stateChanges ) {

			if(this.state.menuOpen) {
				this.element.classList.add('is-active')
				disablePageScroll(this.element)
			} else {
				this.element.classList.remove('is-active')
				enablePageScroll(this.element)
      }
		}
  }

	closeMenu() {
    this.setState({ menuOpen: false })
  }

	hoverStateSetup() {

		this.hoverTriggers.forEach((item) => {
			const imageUrl = item.getAttribute('data-img-src')
			let imgCreated = false
			let imgElement
			let timeOutArray = []
			let timeOutVar

			// for generating random co-ordinates try something like below:
			// img.style.top = document.body.clientHeight * Math.random() + 'px';
  		// img.style.left = document.body.clientWidth * Math.random() + 'px';

			item.addEventListener('mouseover', () => {

				if(!imgCreated) {
					imgElement = document.createElement('img')
					imgElement.src = imageUrl
					imgElement.classList.add('c-BurgerMenu__featured-image')
					this.imageArea.append(imgElement)
					imgCreated = true
				}

				timeOutArray.forEach((timer) => {
					clearTimeout(timer)
				})

				imgElement.classList.add('is-active')
			})

			item.addEventListener('mouseleave', () => {

				if(imgCreated) {

					timeOutVar = timeOutArray.push(setTimeout(() => {
						imgElement.classList.remove('is-active')
					}, 300))
				}
			})
		})
	}
}

// Export ES6 module
export default BurgerMenu;
