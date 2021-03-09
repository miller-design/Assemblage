// import GIA dependancy
import Component from 'gia/Component'
import eventbus from 'gia/eventbus'

// Extend the GIA component
class Burger extends Component {

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
		const burgerTrigger = this.element

		burgerTrigger.addEventListener("click", this.triggerStateChange.bind(this))
		eventbus.on("resetBurgerState", this.triggerStateChange.bind(this))
	}

	triggerStateChange() {

		this.setState({
			BurgerTriggerState: !this.state.BurgerTriggerState,
		})
	}

	stateChange(stateChanges) {

		if ('BurgerTriggerState' in stateChanges) {

			const trigger = this.element

			eventbus.emit("MainMenuTriggered")
			// eventbus.emit("OverlayTriggered")

			if (this.state.BurgerTriggerState) {
				trigger.classList.add('is-active')
			} else {
				trigger.classList.remove('is-active')
			}
		}
	}
}

// Export ES6 module
export default Burger;
