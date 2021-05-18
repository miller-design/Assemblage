const timeConverter = {

	secondsToHms(d) {

		d = Number(d)
		var h = Math.floor(d / 3600)
		var m = Math.floor(d % 3600 / 60)
		var s = Math.floor(d % 3600 % 60)

		var hDisplay = (h > 0) ? h + ":" : ""
		var mDisplay = (m > 0) ? m + ":" : ""
		var sDisplay = (m > 0) ? s : 0 + ":" + s

		return hDisplay + mDisplay + sDisplay;
  }
}

export default timeConverter