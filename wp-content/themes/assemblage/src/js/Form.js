import Component from 'gia/Component'


// Wrapper for global Javascript dependencies
// Enable/disable on per bage basis with options on body tag
class Form extends Component {

	constructor(element) {

		super(element)

	}

	mount() {

		$(".wpcf7 .form-control").focus(function(){
			$(this).parent().parent().addClass('active');
		}).blur(function(){
			var cval = $(this).val()
			if(cval.length < 1) {$(this).parent().parent().removeClass('active');
			}
		})
	}
}

// Export ES6 module
export default Form;
