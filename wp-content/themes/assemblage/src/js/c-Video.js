// import GIA dependancy
import Component from 'gia/Component'
import eventbus from 'gia/eventbus'
import videojs from 'video.js'

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
				videoDurationLabel.innerHTML = this.secondsToHms(player.duration())
			})

			this.VideoObject = player
		}
	}


	secondsToHms(d) {

		d = Number(d)
		var h = Math.floor(d / 3600)
		var m = Math.floor(d % 3600 / 60)
		var s = Math.floor(d % 3600 % 60)

		var hDisplay = h > 0 ? h + ":" : ""
		var mDisplay = m > 0 ? m + ":" : ""
		var sDisplay = m <= 0 ? 0 + ":" + s : ""

		return hDisplay + mDisplay + sDisplay;
  }
}

// Export ES6 module
export default Video;