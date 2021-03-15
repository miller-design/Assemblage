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
			// playIcon: null,
		}
	}

	mount() {

		const videos = this.element.querySelectorAll('.video-js')

		videos.forEach((video) => {

			if(video.classList.contains('js-autoplay')) {
				this.backgroundVideo(video)
			}
		})
	}

	backgroundVideo(video) {

		if (video) {
			let player = videojs(video.id, {
				autoplay: true,
				muted: true,
				loop: true,
				liveui: false,
				liveTracker: false,
				fluid: false,
				fullscreenToggle: false,
			});

			player.addClass('is-loaded')

			player.ready(function() {
				player.tech_.off('dblclick')
			})
		}
	}
}

// Export ES6 module
export default Video;