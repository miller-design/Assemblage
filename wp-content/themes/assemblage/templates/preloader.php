<style>
	.site-preloader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		z-index: 1001;
		transition:
			400ms opacity 1000ms cubic-bezier(0.25, 1, 0.5, 1),
			400ms visibility 1000ms cubic-bezier(0.25, 1, 0.5, 1);
	}

	.site-is-loaded .site-preloader {
		opacity: 0;
		visibility: hidden;
	}

	.site-preloader__inner {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.site-preloader__animation-text {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		align-content: center;
		padding: var(--site-margin);
		position: relative;
	}

	.site-preloader__animation-text p {
		color: #fff;
		width: calc(100% - (var(--site-margin) * 2));
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		pointer-events: none;
		font-family: "RecklessNeue-Book", serif;
		font-style: normal;
		font-weight: 400;
		font-size: 30px;
		line-height: 1;
	}

	@media only screen and (max-width: 768px) {

		.site-preloader__animation-text p {
			font-size: 20px;
		}
	}

	.site-preloader__sequence_1 {
		animation: 2000ms fadeInAndOut 1000ms forwards cubic-bezier(0.520, 0.100, 0.535, 0.870);
	}

	.site-preloader__sequence_2 {
		animation: 2000ms fadeIn 3500ms forwards cubic-bezier(0.520, 0.100, 0.535, 0.870);
	}

	@keyframes fadeInAndOut {

		0% {
			opacity: 0;
		}

		10% {
			opacity: 1;
		}

		80% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes fadeIn {

		0% {
			opacity: 0;
		}

		20% {
			opacity: 1;
		}

		100% {
			opacity: 1;
		}
	}

</style>

<div class="site-preloader">
	<div class="site-preloader__inner">
		<div class="site-preloader__animation-text">
			<p class="site-preloader__sequence_1">Assemblage Views is a magazine.</p>
			<p class="site-preloader__sequence_2 js-end-animation">We explore what it means to be a responsible global citizen of the 21st century.</p>
		</div>
	</div>
</div>

<script>
	let isSiteReady = false
	let myPreloaderInterval
	let animation = document.querySelector('.js-end-animation')

	animation.onanimationend = () => {

		myPreloaderInterval = setInterval(() => {

			if(!isSiteReady) {

				if(document.readyState != 'complete') {

				} else {
					isSiteReady = true
					clearInterval(myPreloaderInterval)
					document.body.classList.add('site-is-loaded')
					document.cookie = "Preloader=set; max-age=86400; path=/;"
				}
			}
			}, 120)
	}
</script>