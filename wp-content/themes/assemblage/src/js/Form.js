import Component from 'gia/Component'
import SlimSelect from 'slim-select'


// Wrapper for global Javascript dependencies
// Enable/disable on per bage basis with options on body tag
class Form extends Component {

	constructor(element) {

		super(element)

	}

	mount() {

		const select = new SlimSelect({
			select: '.wpcf7-select',
			showSearch: false,
			showContent: 'down',
			hideSelectedOption: true,
		})

		// setting first option as placeholder
		select.data.data[0].placeholder = true
	}
}

// Export ES6 module
export default Form;
