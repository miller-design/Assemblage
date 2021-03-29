// import GIA dependancy
import Component from 'gia/Component'


// Extend the GIA component
class TopNav extends Component {

	// setup
	constructor(element) {
		super(element)


		global.scrollEvents.push(this.hideBar.bind(this))
	}

	mount() {



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
		}
  }

	hideBar(currentScrollY) {

    if(currentScrollY > window.innerHeight && global.scrollDirection === 'down') {
			this.setState({isHidden: true})
			document.body.classList.remove('header-is-visible')
    } else if (currentScrollY < window.innerHeight || this.state.isHidden && global.scrollDirection === 'up') {
			this.setState({isHidden: false})
			document.body.classList.add('header-is-visible')
    }

		if(currentScrollY > (window.innerHeight + 100) && !document.body.classList.contains('header-is-pinned')) {
			document.body.classList.add('header-is-pinned')
		} else if(currentScrollY < window.innerHeight && document.body.classList.contains('header-is-pinned')) {
			document.body.classList.remove('header-is-pinned')
		}
  }
}

// Export ES6 module
export default TopNav;
