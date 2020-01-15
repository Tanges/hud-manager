// Initial map rendering
//
// Responsible for changing radar background on map change, loading map
// metadata and applying some general config values.

// Catch map data send by the game
socket.element.addEventListener("map", event => {
	/**
	 * Show a map error and quit
	 * @param  {String} text What error message to show
	 */
	function throwMapError(text) {
		document.getElementById("unknownMap").style.display = "flex"
		document.getElementById("unknownMap").children[0].innerHTML = text
	}

	// If map is unchanged we do not need to do anything
	if (global.currentMap == event.data) return

	fetch(window.location.origin + `/maps/${event.data}/meta.json5`)
	.then(resp => resp.text())
	.then(data => {
		data = data.replace(/^\s*?\/\/.*?$/gm, "")
		global.mapData = JSON.parse(data)

		// Check if the map uses the expected meta format
		if (global.mapData.version.format != 2) {
			return throwMapError(`Outdated map file for ${event.data}`)
		}

		// Make sure that the "unknown map" message is turned off for valid maps
		document.getElementById("unknownMap").style.display = "none"

		// Show the radar backdrop
		document.getElementById("radar").src = `/maps/${event.data}/radar.png`

		// Set the map as the current map and in the window title
		global.currentMap = event.data
		document.title = "Boltobserv - " + event.data

		// Hide advisories if you've been disabled in the config
		if (global.config.radar.hideAdvisories) {
			document.getElementById("advisory").style.display = "none"
		}
		else {
			// Otherwise, read the advisory position from config and apply it
			document.getElementById("advisory").style.left = global.mapData.advisoryPosition.x + "%"
			document.getElementById("advisory").style.bottom = global.mapData.advisoryPosition.y + "%"
			document.getElementById("advisory").style.display = "block"
		}

		// Allow init to load other scripts
		hasMap = true
		importScripts()
	})
	.catch(() => {
		return throwMapError(`Error reading the ${event.data} map file :(`)
	})
})