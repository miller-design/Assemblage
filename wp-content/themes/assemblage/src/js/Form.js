import Component from 'gia/Component'
import SlimSelect from 'slim-select'


// Wrapper for global Javascript dependencies
// Enable/disable on per bage basis with options on body tag
class Form extends Component {

	constructor(element) {

		super(element)

	}

	mount() {

		// setting up first empty option with the needed data attributes from slim select
		const selectTag = this.element.querySelector('select')
		const firstOption = selectTag.querySelector('option:nth-child(1)')
		firstOption.setAttribute('data-placeholder', 'true')
		firstOption.removeAttribute('value')

		const select = new SlimSelect({
			select: '.wpcf7-select',
			showSearch: false,
			showContent: 'down',
			hideSelectedOption: true,
			placeholder: 'Nature of Enquirey*',
		})

		this.placeholders()

		document.addEventListener( 'wpcf7mailsent', (event) => {
			this.resetAllLables()
		}, false );
	}

	placeholders() {
		const inputs = this.element.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea')
		const inputsArray = Array.from(inputs)

		inputsArray.forEach((input) => {

			const parentElement = input.parentElement.parentElement
			const label = parentElement.querySelector('label')

			input.addEventListener('keyup', () => {
				this.activateLabel(label, input)
			})

			// acticate when input is focused
			input.addEventListener('focus', () => {
				this.activateLabel(label, input)
			})

			// when input is not the active element
			input.addEventListener('blur', () => {
				this.activateLabel(label, input)
			})
		})
	}

	activateLabel(label, input) {

		if(input.value.length != 0 || input === document.activeElement) {
			label.classList.add('js-fake-placeholder')
		} else {
			label.classList.remove('js-fake-placeholder')
		}
	}

	resetAllLables() {

		const inputs = this.element.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea')
		const inputsArray = Array.from(inputs)

		inputsArray.forEach((input) => {

			const parentElement = input.parentElement.parentElement
			const label = parentElement.querySelector('label')

			if(label.classList.contains('js-fake-placeholder')) {
				label.classList.remove('js-fake-placeholder')
			}
		})
	}

}

// Export ES6 module
export default Form;
