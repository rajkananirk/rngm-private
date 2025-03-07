var selectedZipCodeObj;
var isSingleRecord = false;

function ZipCodeAutoCompleteBindOnPaste(zipCodeElement) {
    $(zipCodeElement).bind('paste', function (e) {
        setTimeout(function () {
            $(zipCodeElement).trigger('autocomplete');
        }, 0);
    });
}
function ZipCodeAutoComplete(zipCodeElement, lblZipCodeElement, countryElement) {
    $(zipCodeElement).autocomplete({
        minLength: 3,
        source: function (request, response) {
            selectedZipCodeObj = null;
            if ($(countryElement).val() === "0") {
                $('#countryError').removeClass('d-none');
                $(zipCodeElement).blur();
                $(countryElement).focus();
            } else {
                $.ajax({
                    url: baseSearchZipCodeUrl,//'/' + $('#HdDomainDirectory').val() + '/Base/SearchZipCode',
                    type: "GET",
                    dataType: "json",
                    data: { "q": request.term, "cid": $(countryElement).val() },
                    success: function (data) {
                        var obj = $.parseJSON(data);
                        if (obj != null && obj.length > 0) {
                            response($.map(obj, function (item) {
                                // populate value if only one element is returned
                                if (obj.length == 1) {
                                    isSingleRecord = true;
                                    selectedZipCodeObj = obj;
                                    $(zipCodeElement).val(obj[0].ZIPCode);
                                    $(lblZipCodeElement).text(obj[0].CityName + ', ' + obj[0].StateShortName).trigger('change');
                                    $(lblZipCodeElement).show();
                                    $("#ZIPCodeID").val(obj[0].ZIPCodeID);
                                    $('#CityID').val(obj[0].CityID);
                                    $('#StateID').val(obj[0].StateID);
                                    lableUpdate('#CountryID', '#ZipCode', '#lblZipCode', true);
                                    return [];
                                }
                                else {
                                    isSingleRecord = false;
                                    return {
                                        label: item.CityName + ', ' + item.StateShortName + ' ' + item.ZIPCode,
                                        value: item.ZIPCodeID,
                                        id: item.ZIPCodeID,
                                        Zip: item.ZIPCode,
                                        city: item.CityName,
                                        cityID: item.CityID,
                                        state: item.StateShortName,
                                        stateName: item.StateName,
                                        stateID: item.StateID,
                                        country: item.CountryShortName
                                    };
                                }
                            }));
                        }
                        else {
                            //$(zipCodeElement).val("");
                            $(lblZipCodeElement).hide();
                            $(zipCodeElement).focus();
                            lableUpdate(countryElement, zipCodeElement, lblZipCodeElement, true);
                        }
                    }
                });
            }
        },
        focus: function () {
            // prevent value inserted on focus 
            event.preventDefault(); // without this: keyboard movements reset the input to ''                  
            return false;
        },
        delay: 0,
        change: function (event, ui) {
            // handled case where user tabs out of control after typing in full zip code
            if (!ui.item) {
                if (!isSingleRecord) {
                    //$(zipCodeElement).val("");
                    $(lblZipCodeElement).text("").trigger('change');
                    $(zipCodeElement).focus();
                }
            }
        },
        select: function (event, ui) {
            var zipid = ui.item.value;
            var ziplabel = ui.item.Zip;
            this.value = ziplabel;
            selectedZipCodeObj = ui.item;
            $(lblZipCodeElement).text(ui.item.city + ' ' + ui.item.state).trigger('change');
            $("#ZIPCodeID").val(zipid);
            $('#CityID').val(ui.item.cityID);
            $('#StateID').val(ui.item.stateID);
            return false;
        }
    });
}

function lableUpdate(countryElement, zipcodeElement, lblzipcodeElement, isAddValidationRule) {
    var countryId = $(countryElement).val();
    $('#countryError').addClass('d-none');
    if (countryId === "3") {
        $(lblzipcodeElement).html('Postal Code');
        $(zipcodeElement).attr("placeholder", "Postal Code");
    } else if (countryId === "2") {
        $(lblzipcodeElement).html('PIN Code');
        $(zipcodeElement).attr("placeholder", "PIN Code");
    } else {
        $(lblzipcodeElement).html('ZIP Code');
        $(zipcodeElement).attr("placeholder", "ZIP Code");
    }
    if (isAddValidationRule === true) {
        if (countryId === '3') {
            $(zipcodeElement).rules('add', {
                messages: { required: "Please enter a valid Postal Code" }
            });
        } else if (countryId === '2') {
            $(zipcodeElement).rules('add', {
                messages: { required: "Please enter a valid PIN Code" }
            });
        } else {
            $(zipcodeElement).rules('add', {
                messages: { required: "Please enter a valid ZIP Code" }
            });
        }
    }
}

function clearAddressData(zipcodeElement, lblZipcodeElement) {
    $(zipcodeElement).val('');
    $(lblZipcodeElement).text('').trigger('change');
    var countryId = $('#drpCountry').val();
    if (countryId === "0") {
        $('#countryError').removeClass('d-none');
        e.preventDefault();
    }
}