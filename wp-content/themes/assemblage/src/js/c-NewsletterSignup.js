// import GIA dependancy
import Component from 'gia/Component'
import getComponentFromElement from 'gia/getComponentFromElement'

// Extend the GIA component
class NewsletterSignup extends Component {

	// setup
	constructor(element) {
		super(element)

		this.options = {
			inModal: false
		}

		this.form = this.element.querySelector('form')
		this.input = this.form.querySelector("input[type='email']")
		this.submitBtn = this.form.querySelector('input[type="submit"]')
		this.formError = false
		this.formErrorMessage
		this.myTimeVar = []
		this.inModal = this.options.inModal
	}

	mount() {

		const eventBase = (target) => {

			this.fakePlaceholder(target)
		}

		this.input.addEventListener('keyup', eventBase)
		this.input.addEventListener('focus', eventBase)
		this.input.addEventListener('blur', eventBase)
	}

	getLabel(el) {
		const elID = el.getAttribute('name')
    // divs are nested so need to get back to parent el
		return el.parentElement.parentElement.querySelector("label[for=" + elID + "]")
  }

	fakePlaceholder(_this) {
    const activeLabel = _this.target
    const label = this.getLabel(activeLabel)

		if(activeLabel.value.length === 0 && activeLabel != document.activeElement) {
			label.classList.remove('js-fake-placeholder--active')
		} else {
			label.classList.add('js-fake-placeholder--active')
		}
  }

	clearTimeouts() {

		this.myTimeVar.forEach((timer) => {
			clearTimeout(timer)
		})
	}

	setModalCookie() {

		if(this.inModal) {

			const modalEl = document.querySelector('.js-site-modal')
			const giaComponent = getComponentFromElement(modalEl)

			setTimeout(() => {
				giaComponent.submitModal()
			}, 1200)
		}
	}
}

// Export ES6 module
export default NewsletterSignup
