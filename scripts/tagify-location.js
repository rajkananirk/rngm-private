/* START: Location */

var whitelist = [];
var tagify;
var tagifyInput;

$(function () {

    tagifyInput = document.getElementById('location');
    var controller; // for aborting the call

    tagify = new Tagify(tagifyInput, {
        enforceWhitelist: true,
        delimiters: null,
        whitelist: whitelist,
        dropdown: {
            closeOnSelect: true,
            highlightFirst: true
        }
    });

    // listen to any keystrokes which modify tagify's input
    tagify.on('input', onInput);

    function onInput(e) {
        var value = e.detail.value;
        tagify.settings.whitelist.length = 0; // reset the whitelist

        controller && controller.abort();
        controller = new AbortController();

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            ContentType: 'application/json; charset=utf-8',
            url: UrlTagify,
            datatype: "jsonp",
            data: {
                'query': value,
                'countryId': $('#countryId').val(),
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
            },
            success: function (response) {
                if (response.status && response.data.length > 0) {
                    tagify.settings.whitelist = response.data;
                }
            },
            beforeSend: function () {
                // show loading animation and hide the suggestions dropdown
                tagify.loading(true).dropdown.hide.call(tagify)
            },
            complete: function () {
                tagify.loading(false).dropdown.show.call(tagify, value); // render the suggestions dropdown
            }
        });
    }

    $('.tagify__input').attr('aria-label', 'City, State');

    // Change role to combobox
    $('.tagify__input').attr('role', 'combobox');

    // Add aria attributes to input
    if (tagifyInput != null) {
        tagifyInput.removeAttribute('role');
        tagifyInput.setAttribute('aria-expanded', 'false');
        tagifyInput.setAttribute('aria-controls', 'tagify-listbox');
        tagifyInput.setAttribute('aria-activedescendant', '');
    }
    

    // Add aria-label to the listbox div
    var listbox = document.querySelector('.tagify__dropdown');
    if (listbox != null) {
        listbox.setAttribute('role', 'listbox');
        listbox.setAttribute('aria-label', 'City, State');
        listbox.setAttribute('id', 'tagify-listbox');
    }
   
    
    // Event listener to handle expanding and collapsing 
    tagify.on('dropdown:show', function () {
        tagifyInput.setAttribute('aria-expanded', 'true');
    });

    tagify.on('dropdown:hide', function () {
        tagifyInput.setAttribute('aria-expanded', 'false');
    });

    // Event listener to handle active descendant
    tagify.on('dropdown:select', function (e) {
        var selectedOption = e.detail.elm;
        tagifyInput.setAttribute('aria-activedescendant', selectedOption ? selectedOption.id : '');
    });

    // Announce options for screen readers
    tagify.on('dropdown:show', function (e) {
        var options = e.detail.elm.querySelectorAll('[role="option"]');
        options.forEach(function (option, index) {
            option.setAttribute('id', 'tagify-option-' + index);
        });
    });
});

$(function () {
    $('#Keywords').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            submitSearchData();
        }
    });

    $("#btnSearchJob").click(function () {
        var l = laddaStart('btnSearchJob');
        submitSearchData();
    });
});

function submitSearchData() {
    $("#frmTaJobs").submit();
}

// Dynamically add a new tag to Tagify
function addLocationTagifyTag(value, id) {
    var newTag = {
        value: value,  
        id: id
    };

    // Add the new value to the whitelist
    tagify.settings.whitelist.push(newTag);

    // Optionally, you may want to remove duplicate values from the whitelist
    //tagify.settings.whitelist = Array.from(new Set(tagify.settings.whitelist.map(tag => tag.value)))
    //    .map(value => tagify.settings.whitelist.find(tag => tag.value === value));
     
    tagify.addTags([newTag]);
}

/*END: Location*/