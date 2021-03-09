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

		}
	}

	mount() {

		this.setState({ menuOpen: false })
		eventbus.on('MainMenuTriggered', this.toggleStateChange.bind(this))
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
				this.closeMenu()
				enablePageScroll(this.element)
      }
		}
  }

	closeMenu() {
    this.setState({ menuOpen: false })
    this.element.classList.remove('is-active')
  }
}

// Export ES6 module
export default BurgerMenu;
