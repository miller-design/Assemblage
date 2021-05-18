// import GIA dependancy
import Component from 'gia/Component'
import videojs from 'video.js'
import timeConverter from './helpers/timeConverter'

// Extend the GIA component
class Video extends Component {

	// setup
	constructor(element) {
		super(element)

		this.options = {
			// someOption: " ",
		}

		this.ref = {
			videoPlayer: null,
			playIcon: null,
		}

		this.VideoObject
	}

	mount() {
		this.videoSetup(this.ref.videoPlayer)

		this.ref.playIcon.addEventListener('click', () => {
			this.VideoObject.play()
		})
	}

	videoSetup(video) {

		if (video) {
			const videoDurationLabel = document.querySelector('.js-video-duration')
			let player = videojs(video.id, {
				autoplay: false,
				muted: false,
				loop: false,
				controls: true,
				liveui: false,
				liveTracker: false,
				fluid: true,
				fullscreenToggle: true,
			});

			player.addClass('is-loaded')

			player.on('loadedmetadata', () => {
				videoDurationLabel.innerHTML = timeConverter.secondsToHms(player.duration())
			})

			this.VideoObject = player
		}
	}
}

// Export ES6 module
export default Video;