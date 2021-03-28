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
				document.body.classList.add('burger-menu-active')
				disablePageScroll(this.element)
			} else {
				this.element.classList.remove('is-active')
				document.body.classList.remove('burger-menu-active')
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

			item.addEventListener('mouseover', () => {

				if(!imgCreated) {
					imgElement = document.createElement('img')
					imgElement.src = imageUrl
					imgElement.classList.add('c-BurgerMenu__featured-image')
					this.imageArea.append(imgElement)
					imgCreated = true
				}

				imgElement.classList.add('is-active')
				// generating random co-ordinates for each hover
				imgElement.style.top = (window.screen.height / 2) * Math.random() + 'px';
  			imgElement.style.right = (window.screen.width / 2) * Math.random() + 'px';
			})

			item.addEventListener('mouseleave', () => {

				if(imgCreated) {
					imgElement.classList.remove('is-active')
				}
			})
		})
	}
}

// Export ES6 module
export default BurgerMenu;
