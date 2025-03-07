var isLocationPopulated = false;
var stateISO = "";
var countryISO = "";


function getStateAndCountryName() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            showLoader();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiKey = $('#GoogleGeoKey').val();
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const results = data.results;

                    for (let i = 0; i < results.length; i++) {
                        const addressComponents = results[i].address_components;
                        for (let j = 0; j < addressComponents.length; j++) {
                            const component = addressComponents[j];
                            if (component.types.includes('administrative_area_level_1')) {
                                stateISO = component.short_name;
                            }
                            if (component.types.includes('country')) {
                                countryISO = component.short_name;
                            }
                        }
                    }

                    assignPreLocation();
                    return { countryISO, stateISO };
                })
                .catch(error => {
                    hideLoader();
                    console.error('Error:', error)
                });
        }, error => {
            hideLoader();
            console.error('Geolocation error:', error.message);
        });
    } else {
        hideLoader();
        console.error('Geolocation not supported by this browser.');
    }
}

$(function () {
    getStateAndCountryName();
});

function assignPreLocation() {
    console.log(tagify);

    $.ajax({
        url: UrlLocationByShortName,
        type: 'POST',
        data: { countryShortName: countryISO, stateShortName: stateISO },
        dataType: "json",
        success: function (response) {

            if (response.success) {
                // Original list, which could be null or an empty string
                let listString = $('#location').val(); // or listString = '';

                let list = (listString && listString.trim() !== '') ? JSON.parse(listString) : [];

                // Create the new object to append
                let newItem = {
                    "value": `${response.data.stateName}, ${countryISO}`,
                    "id": `s-${response.data.stateID}`
                };

                // Append the new item to the list
                list.push(newItem);

                // Convert the updated list back to a string
                let updatedListString = JSON.stringify(list);

                // Log the updated list (or use it as needed)
                console.log(updatedListString);

                addLocationTagifyTag(`${response.data.stateName}, ${countryISO}`, `s-${response.data.stateID}`);

                //$('#location').val(updatedListString)
            } 

            hideLoader();
        },
        error: function (error) {
            console.log(error);
        }
    });

}