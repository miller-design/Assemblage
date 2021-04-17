// import GIA dependancy
import Component from 'gia/Component'
import { disablePageScroll, enablePageScroll, addFillGapTarget } from 'scroll-lock';


// Extend the GIA component
class IssueHeader extends Component {

	// setup
	constructor(element) {
		super(element)

		this.options = {
			panelBg: '',
		}

		this.ref = {
			tableTrigger: null,
			editorTrigger: null
		}

		this.tableTrigger = this.ref.tableTrigger
		this.editorTrigger = this.ref.editorTrigger
		this.editorPanel = document.querySelector('.js-editors-panel')
		this.editorPanelClose = document.querySelector('.js-editors-close')
		this.editorPanelReadLink = document.querySelector('.js-read-issue')
		this.tablePanel = document.querySelector('.js-contents-panel')
		this.tablePanelClose = document.querySelector('.js-contents-close')
		this.tableLetterTrigger = document.querySelector('.js-trigger-letter')
		this.overlay = document.querySelector('.js-overlay')
	}

	mount() {

		this.overlay.addEventListener('click', () => {

			this.setState({
				editorPanel: false,
				contentsPanel: false,
			})
		})

		this.tableTrigger.addEventListener('click', (e) => {
			this.setState({contentsPanel: true})
		})

		this.tablePanelClose.addEventListener('click', (e) => {
			this.setState({
				editorPanel: false,
				contentsPanel: false,
			})
		})

		this.tableLetterTrigger.addEventListener('click', (e) => {
			this.setState({editorPanel: true})
		})

		this.editorTrigger.addEventListener('click', (e) => {
			this.setState({editorPanel: true})
		})

		this.editorPanelClose.addEventListener('click', (e) => {
			this.setState({
				editorPanel: false,
				contentsPanel: false,
			})
		})

		this.editorPanelReadLink.addEventListener('click', (e) => {
			this.setState({
				editorPanel: false,
				contentsPanel: false,
			})
		})
	}

	stateChange(stateChanges) {

		if('editorPanel' in stateChanges) {
			if(this.state.editorPanel) {
				this.editorPanel.classList.add('is-active')
				this.overlay.classList.add('is-active')
				disablePageScroll(this.editorPanel)
			} else {
				this.editorPanel.classList.remove('is-active')
				this.overlay.classList.remove('is-active')
				setTimeout(() => {
					this.editorPanel.scrollTop = 0
				}, 1000)
				enablePageScroll(this.editorPanel)
			}
		}

		if('contentsPanel' in stateChanges) {
			if(this.state.contentsPanel) {
				this.tablePanel.classList.add('is-active')
				this.overlay.classList.add('is-active')
				disablePageScroll(this.tablePanel)
			} else {
				this.tablePanel.classList.remove('is-active')
				this.overlay.classList.remove('is-active')
				setTimeout(() => {
					this.tablePanel.scrollTop = 0
				}, 1000)
				enablePageScroll(this.tablePanel)
			}
		}
  }
}

// Export ES6 module
export default IssueHeader;
