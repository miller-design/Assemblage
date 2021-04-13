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
		this.IssuePanel
		this.IssuePanelContent
		this.overlay = document.querySelector('.js-overlay')
		this.EditorsDataLoaded = false
		this.TableDataLoaded = false
	}

	mount() {

		if(!document.querySelector('.js-issue-panel')) {
			this.createPanel()
		}

		this.overlay.addEventListener('click', () => {

			this.setState({
				panelIsActive: false
			})
		})

		this.tableTrigger.addEventListener('click', (e) => {
			const data = e.target.getAttribute('data-term-id')
			const number = e.target.getAttribute('data-number')

			if(!this.TableDataLoaded) {
				this.contentsTableAjax(data, number)
				this.TableDataLoaded = true
				this.EditorsDataLoaded = false
			} else {
				this.panelState()
			}
		})

		this.editorTrigger.addEventListener('click', (e) => {

			const data = e.target.getAttribute('data-term-id')
			const number = e.target.getAttribute('data-number')

			if(!this.EditorsDataLoaded) {
				this.editorsLetterAjax(data, number)
				this.EditorsDataLoaded = true
				this.TableDataLoaded = false
			} else {
				this.panelState()
			}
		})
	}

	panelState() {

		this.setState({
			panelIsActive: !this.state.panelIsActive
		})
	}

	stateChange(stateChanges) {

		if('panelIsActive' in stateChanges) {

			if(this.state.panelIsActive) {
				this.IssuePanel.classList.add('is-active')
				this.overlay.classList.add('is-active')
				disablePageScroll(this.IssuePanel)
			} else {
				this.IssuePanel.classList.remove('is-active')
				this.overlay.classList.remove('is-active')
				// ensure back to top after closed
				setTimeout(() => {
					this.IssuePanel.scrollTop = 0
				}, 1000)
				enablePageScroll(this.IssuePanel)
			}
		}
  }

	createPanel() {

		const panel = document.createElement('div')
		panel.classList.add('js-issue-panel')
		panel.classList.add('l-Panel')
		panel.style.setProperty("--panel-bg-color", this.options.panelBg)
		document.body.appendChild(panel)

		const panelHeader = document.createElement("div")
		panelHeader.classList.add('l-Panel__header')

		const closeIcon = document.createElement("span")
		closeIcon.innerHTML = 'Close'
		closeIcon.classList.add('l-Panel__close')
		closeIcon.classList.add('js-issue-panel-close')

		const panelContent = document.createElement("div")
		panelContent.classList.add('l-Panel__content')
		panelContent.classList.add('js-issue-panel-content')
		panelHeader.appendChild(closeIcon)
		panel.appendChild(panelHeader)
		panel.appendChild(panelContent)

		this.IssuePanel = panel
		this.IssuePanelContent = panelContent

		closeIcon.addEventListener('click', this.panelState.bind(this))
	}

	editorsLetterAjax(activeTermId, activeTermNumber, fadeContentIn = false) {

		const self = this
		const panelElement = this.IssuePanelContent

		// vanilla ajax request
		var request = new XMLHttpRequest()
		request.open('POST', assemblage.ajaxurl, true)
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				// if it worked, insert the el before the link text
				// reinit components and add a class to target CSS :hover show/hide

				panelElement.innerHTML = this.response
				const closeLink = panelElement.querySelector('.js-read-issue')
				closeLink.addEventListener('click', self.panelState.bind(self))

				if(!fadeContentIn) {
					self.panelState()
				} else {
					setTimeout(() => {
						panelElement.classList.remove('fade-out')
					}, 300)
				}

			} else {
				// Response error
				console.log('response error')
			}
		}
		request.onerror = function () {
			console.log('Connection error')
			// Connection error
		}

		request.send('action=load_editors_letter&nonce=' + assemblage.nonce + '&term=' + activeTermId + '&number=' + activeTermNumber)
	}

	contentsTableAjax(activeTermId, activeTermNumber) {

		const self = this
		const panelElement = this.IssuePanelContent

		// vanilla ajax request
		var request = new XMLHttpRequest()
		request.open('POST', assemblage.ajaxurl, true)
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				// if it worked, insert the el before the link text
				// reinit components and add a class to target CSS :hover show/hide

				panelElement.innerHTML = this.response
				const letterLink = panelElement.querySelector('.js-trigger-letter')
				letterLink.addEventListener('click', () => {
					panelElement.classList.add('fade-out')
					self.IssuePanel.scrollTop = 0
					self.EditorsDataLoaded = true
					self.TableDataLoaded = false
					self.editorsLetterAjax(activeTermId, activeTermNumber, true)
				})
				self.panelState()

			} else {
				// Response error
				console.log('response error')
			}
		}
		request.onerror = function () {
			console.log('Connection error')
			// Connection error
		}

		request.send('action=load_content_list&nonce=' + assemblage.nonce + '&term=' + activeTermId + '&number=' + activeTermNumber)
	}
}

// Export ES6 module
export default IssueHeader;
