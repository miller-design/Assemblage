// import GIA dependancy
import Component from 'gia/Component'


// Extend the GIA component
class ProgressBar extends Component {

	// setup
	constructor(element) {
		super(element)

		this.ref = {
			progressBar: null,
		}

		this.progressBarEl = this.ref.progressBar
	}

	mount() {

		this.updateProgressBar()
		window.addEventListener('scroll', this.updateProgressBar.bind(this))
		window.addEventListener('scroll', this.hideBar.bind(this))
		window.addEventListener('resize', this.updateProgressBar.bind(this))
	}

	stateChange(stateChanges) {

		if('isActive' in stateChanges) {

			if(this.state.isActive) {
				this.element.classList.add('c-ProgressBar--is-pinned')
			} else {
				this.element.classList.remove('c-ProgressBar--is-pinned')
			}
		}
  }

	hideBar() {
		let currentScrollY = window.pageYOffset

    if(currentScrollY > (window.innerHeight + 100)) {
			this.setState({isActive: true})
    } else {
			this.setState({isActive: false})
    }
  }

	updateProgressBar() {

		let scrollTop = document.documentElement["scrollTop"] || document.body["scrollTop"]
		let scrollBottom = (document.documentElement["scrollHeight"] || document.body["scrollHeight"]) - document.documentElement.clientHeight
		let scrollPercent = scrollTop / scrollBottom * 100 + "%"
		this.progressBarEl.style.setProperty("--scroll-var", scrollPercent)
	}
}

// Export ES6 module
export default ProgressBar;
