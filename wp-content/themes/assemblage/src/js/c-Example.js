/**
 *  Example component using GIA syntax
 * 	See https://github.com/giantcz/gia
 *  and the article on CSS Tricks https://css-tricks.com/a-minimal-javascript-setup/#article-header-id-6
 *  Any questions please ask Duncan or Jack
 */

// import GIA dependancy
import Component from 'gia/Component'

// Extend the GIA component
class Example extends Component {

	// setup
	constructor(element) {
		super(element)

		// set default options if required, these can be overridden by setting options in your html, eg.
		// <div class="c-Example" g-component="Example" g-options='{"someOption": "customValue"}'>
		this.options = {
			someOption: "defaultValue",
			transition: "swipe"
		}

		// use refs to quickly select elements with the component, eg: <h1 class="c-Example__title" g-ref="title">Six</h1>
		// you need to define them below:
		this.ref = {
			title: null, // looks for single element
			slide: [], // looks for multiple elements
			expandToggle: null
		}

		// you can also define varibale that can be used within this class
		this.isNewVariable
		// you can also define varibale and assign a value to it
		this.elementTitle = this.ref.title
		this.trigger = this.ref.expandToggle
	}

	// mount is equivalent to $('document').ready and will only fire if your component is on the page
	// add event listeners here
	mount() {

		// console.log("The Example component is on the page")
		// console.log(this.element) // DOM element

		// GIA has a state manager easily track the state of each component instance
		// this.setState({ expanded: false })
		// console.log('Is the Example Component Expanded? ' + this.state.expanded)

		// add click event to the button, this event will trigger the triggerStateChange method to set the new state
		// the clever bit is bind(this) (now 'this' is available in the method)
		// see... https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
		this.trigger.addEventListener('click', this.triggerStateChange.bind(this))

		// add your method for scroll event to the global scroll variable
		global.scrollEvents.push(this.myCustomScrollMethod.bind(this))

		// add your method for scroll event to the global resize variable
		global.resizeEvents.push(this.myCustomResizeMethod.bind(this))
	}

	triggerStateChange() {

		// when this method is triggered it will set the state of isExpanded to true
		// and then when its triggered again it would then set the state to false
		this.setState({
			isExpanded: !this.state.isExpanded
		})
	}

	stateChange(stateChanges) {

		// this stateChange is a gia method that is updated when ever setState is triggred (https://github.com/giantcz/gia#methods)
		// you can check for anystates by doing the below:
		if ('isExpanded' in stateChanges) {

			if (this.state.isExpanded) {
				// if the state is true then the method below gets triggered.
				// console.log('is state is true')
				this.expandMethod('c-Example--expanded')
			} else {
				// console.log('is state is false')
				this.retractMethod('c-Example--expanded')
			}
		}
	}

	expandMethod(expandClass) {

		// look... this is still in scope!
		// console.log(this.element)
		// console.log(this.ref.title)

		// add the expanded class
		this.element.classList.add(expandClass)
		// change the button text
		this.trigger.textContent = 'Contract'
	}

	retractMethod(retractClass) {

		// look... this is still in scope!
		// console.log(this.element)
		// console.log(this.ref.title)

		// add the expanded class
		this.element.classList.remove(retractClass)
		// change the button text
		this.trigger.textContent = 'Expand'
	}

	myCustomScrollMethod(lastScrollPosition) {

		console.log(lastScrollPosition)
		// this method is being called by the global scrollEvent
		console.log('my component title scrolled', this.elementTitle)
	}

	myCustomResizeMethod() {

		// this method is being called by the global resizeEvent
		console.log('my component title resized', this.elementTitle)

		// access breakpoints with the following methods
		if (global.base.mediaQuery.greaterThan('small')) {
			console.log('larger that small screen active')
		}

		if (global.base.mediaQuery.lessThan('small')) {
			console.log('small screen active')
		}

		if (global.base.mediaQuery.getActive() == 'xlarge') {
			console.log('xlarge is the active breakpoint')
		}
	}
}

// Export ES6 module
export default Example
