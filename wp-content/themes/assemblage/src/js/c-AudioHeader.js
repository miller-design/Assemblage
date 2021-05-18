// import GIA dependancy
import Component from 'gia/Component'
import videojs from 'video.js'
import timeConverter from './helpers/timeConverter'

// Extend the GIA component
class AudioHeader extends Component {

	// setup
	constructor(element) {
		super(element)

		this.options = {
			// someOption: " ",
		}

		this.ref = {
			audioPlayer: null,
			audioLength: null,
			audioWrapper: null,
		}

		this.AudioObject
		this.playerStatus
	}

	mount() {
		this.playerSetup(this.ref.audioPlayer)
	}

	stateChange(stateChanges) {

		if ('stuck' in stateChanges) {

			console.log(stateChanges)
		}
	}

	triggerStickyPlayerListener() {

		window.addEventListener('scroll', this.stickyPlayer.bind(this))
	}

	playerSetup(audioPlayer) {

		if (audioPlayer) {

			let player = videojs(audioPlayer.id, {
				autoplay: false,
				muted: false,
				loop: false,
				controls: true,
				liveui: false,
				liveTracker: false,
				fluid: false,
				fullscreenToggle: false,
			});

			// player.addClass('is-loaded')
			player.on('loadedmetadata', () => {
				this.ref.audioLength.innerHTML = timeConverter.secondsToHms(player.duration())
			})

			player.on('play', () => {
				this.setState({playing : true})
			})

			player.on('pause', () => {
				this.setState({playing : false})
			})

			this.AudioObject = player
			this.triggerStickyPlayerListener()
		}
	}

	stickyPlayer() {
		const scrollY = window.scrollY
		const footerHeight = document.querySelector('footer').offsetHeight
		const contentOffset = (document.querySelector('main').offsetHeight - window.innerHeight) - footerHeight

		if(scrollY >= window.innerHeight) {

			if(!this.state.stuck) {
				this.ref.audioWrapper.style.opacity = '0'
				this.setState({stuck: true})
				setTimeout(() => {
					this.element.classList.add('is-fixed')
					this.ref.audioWrapper.style.opacity = '1'
				}, 400)
			}

		} else {

			if(this.state.stuck) {
				this.ref.audioWrapper.style.opacity = '0'
				this.setState({stuck: false})
				setTimeout(() => {
					this.element.classList.remove('is-fixed')
					this.ref.audioWrapper.style.opacity = '1'
				}, 600)
			}

		}

		if(scrollY >= contentOffset && this.state.stuck) {
			this.element.classList.add('is-hidden')
		} else if(scrollY < contentOffset && this.state.stuck) {
			this.element.classList.remove('is-hidden')
		}
	}
}

// Export ES6 module
export default AudioHeader;