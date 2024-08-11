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

	// Get the status of the API and update the status indicator
	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		// If the API status is "OK", add the class "available" to the div with id #api_status
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			// If the API status is not "OK", remove the class "available"
			$("div#api_status").removeClass("available");
		}
	});

	// Fetch data about places via a POST request
	$.post({
		// Set the URL to the API endpoint for searching places
		url: `${HOST}/api/v1/places_search`,
		// Send an empty dictionary as the request body in JSON format
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json", // Specify the content type as JSON
		},
		success: (data) => {
			// Loop through the data returned from the API, which is a list of places
			data.forEach((place) =>
				// For each place, append a new article element to the section.places
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json", // Expect the response data to be in JSON format
	});

	// Bind the search button to the searchPlace function to search for places
	$(".filters button").bind("click", searchPlace);

	// Execute the searchPlace function immediately to load places when the page is loaded
	searchPlace();
});
