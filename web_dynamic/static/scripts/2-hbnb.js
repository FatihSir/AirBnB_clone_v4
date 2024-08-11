$(document).ready(function () {
	// Initialize an empty object to store selected amenities
	const amenities = {};

	// Listen for changes on each checkbox within the li elements
	$("li input[type=checkbox]").change(function () {
		// If the checkbox is checked, add the amenity to the amenities object
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			// If the checkbox is unchecked, remove the amenity from the amenities object
			delete amenities[this.dataset.name];
		}

		// Update the text of the h4 tag within the .amenities div with the sorted list of selected amenities
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

	// Get the status of the API by making a GET request to the given URL
	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		// If the API status is "OK", add the class "available" to the div with id #api_status
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			// If the API status is not "OK", remove the class "available"
			$("div#api_status").removeClass("available");
		}
	});
});
