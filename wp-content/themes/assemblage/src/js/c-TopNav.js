// import GIA dependancy
import Component from 'gia/Component'
import { disablePageScroll, enablePageScroll, addFillGapTarget } from 'scroll-lock';
import eventbus from 'gia/eventbus'

// Extend the GIA component
class TopNav extends Component {

	// setup
	constructor(element) {
		super(element)

		this.ref = {
			subscribeTrigger: null
		}


		global.scrollEvents.push(this.hideBar.bind(this))
		this.subscribePanel = document.querySelector('.js-subscribe-panel')
		this.closePanel = document.querySelector('.js-subscribe-close')
		this.overlay = document.querySelector('.js-overlay')
	}

	mount() {

		this.ref.subscribeTrigger.addEventListener('click', this.triggerSubscribe.bind(this))
		this.closePanel.addEventListener('click', this.triggerSubscribe.bind(this))
		this.overlay.addEventListener('click', () => {
			this.setState({
				subscribeActive: false
			})
		})
		eventbus.on('newsletterSubmitted', this.triggerSubscribe.bind(this))
	}

	triggerSubscribe() {

		this.setState({
			subscribeActive: !this.state.subscribeActive
		})
	}

	stateChange(stateChanges) {

		if('isShrunk' in stateChanges ) {

			if(this.state.isShrunk) {
				this.element.classList.add('c-TopNav--shrunk')
			} else {
				this.element.classList.remove('c-TopNav--shrunk')
      }
		} else if('isHidden' in stateChanges) {

			if(this.state.isHidden) {
				this.element.classList.add('c-TopNav--is-pinned')
			} else {
				this.element.classList.remove('c-TopNav--is-pinned')
			}
		} else if('subscribeActive' in stateChanges) {

			if(this.state.subscribeActive) {
				this.subscribePanel.classList.add('is-active')
				this.overlay.classList.add('is-active')
				disablePageScroll(this.subscribePanel)
			} else {
				this.subscribePanel.classList.remove('is-active')
				this.overlay.classList.remove('is-active')
				enablePageScroll(this.subscribePanel)
			}
		}
  }

	hideBar(currentScrollY) {

    if(currentScrollY > 100 && global.scrollDirection === 'down') {
			this.setState({isHidden: true})
			document.body.classList.remove('header-is-visible')
    } else if (currentScrollY < 100 || this.state.isHidden && global.scrollDirection === 'up') {
			this.setState({isHidden: false})
			document.body.classList.add('header-is-visible')
    }

		if(currentScrollY > (100 + 100) && !document.body.classList.contains('header-is-pinned')) {
			document.body.classList.add('header-is-pinned')
		} else if(currentScrollY < 100 && document.body.classList.contains('header-is-pinned')) {
			document.body.classList.remove('header-is-pinned')
		}
  }
}

// Export ES6 module
export default TopNav;
