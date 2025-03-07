$(function () {
    $("#frmRequestPasscode").validate({
        errorElement: 'span',
        rules: {
            TPFirstName: {
                required: true
            },
            TPEmail: {
                required: true,
                email: true,
                remote: UrlIsValidEmailDomain,//'/' + $('#HdDomainDirectory').val() + '/Base/IsValidEmailDomain'
            },
            TPLastName: {
                required: true
            },
        },
        messages: {
            TPFirstName: {
                required: 'Please enter a first name'
            },
            TPEmail: {
                required: 'Please enter an email',
                email: 'Enter a valid email',
                remote: 'Enter a valid email domain'
            },
            TPLastName: {
                required: 'Please enter a last name'
            },
        },
        errorClass: 'is-invalid'
    });

    $("#frmPasscode").validate({
        errorElement: 'span',
        rules: {
            Passcode: {
                required: true,
                maxlength: 128
            }
        },
        messages: {
            Passcode: 'Please enter your passcode',
        },
        errorClass: 'is-invalid'
    });


    // Handling form submission
    $("#frmPasscode").on("submit", function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            var firstErrorElement = $(this).find(".is-invalid").first();
            if (firstErrorElement.length) {
                firstErrorElement.focus();
            } 
        } else { 
            if ($("#frmPasscode").valid()) {
                var l = laddaStart('btnSubmitPasscode');
                $.ajax({
                    type: "POST",
                    data: { "passcode": $('#Passcode').val(), __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val() },
                    url: UrlValidateTenantPasscode,
                    dataType: 'json',
                    success: function (response) {
                        if (response) {                             
                            location.reload();
                        } else {
                            notifyError("Incorrect passcode or this passcode has expired.");
                            $('#Passcode').val('');
                            l.stop();
                        } 
                    },
                    error: function (error) {
                        notifyError(error.statusText);
                        l.stop();
                    }
                });
            }
        }
    });

    $("#frmRequestPasscode").on("submit", function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            var firstErrorElement = $(this).find(".is-invalid").first();
            if (firstErrorElement.length) {
                firstErrorElement.focus();
            }
        } else {
            if ($("#frmRequestPasscode").valid()) {

                var l = laddaStart('btnRequestPasscode');

                $.ajax({
                    type: "POST",
                    data: { "FirstName": $('#TPFirstName').val(), "LastName": $('#TPLastName').val(), "Email": $('#TPEmail').val(), "Passcode": '', __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val() },
                    url: UrlRequestPasscode,
                    dataType: 'json',
                    success: function (response) {
                        if (response) {
                            cleanRequestPasscodeFields();
                            $('#mdRequestPasscode').modal('hide');
                            $('#mdPasscode').modal('show');
                            notifySuccess("We have sent your passcode to your email.");
                        } else {
                            notifyError("Something went wrong! Try after some time.");
                        }
                        l.stop();
                    },
                    error: function (error) {
                        notifyError(error.statusText);
                        l.stop();
                    }
                });
            }
        }
    });


    
    if ($('#HdPasscodeCaseSensitve').val() === "true") {
        check_capslock_form($('#frmPasscode'));
    }

    var passcode = $('#HdPasscode').val();
    var enablePasscode = $('#HdEnablePasscode').val();
    if (enablePasscode === "true" && (passcode === "" || passcode === " " || passcode === null)) {
        $('#mdPasscode').modal('show');
    }

    $('#Passcode').keydown(function (e) {
        if ((event.keyCode == 13)) {
            e.preventDefault();
            submitPasscode();
        }
    });

    $('#btnSubmitPasscode').on('click', function (e) {
        e.preventDefault();
        submitPasscode();
    });

    $('#btnRequestPasscode').on('click', function (e) {
        e.preventDefault();
        requestPasscode();
    });

    $('#btnOpenRequestPasscode').on('click', function (e) {
        e.preventDefault();
        cleanPasscodeFields();
        $('#mdPasscode').modal('hide');
        $('#mdRequestPasscode').modal('show');
    });

    $('#btnOpenPasscode').on('click', function (e) {
        cleanRequestPasscodeFields();
        e.preventDefault();
        $('#mdRequestPasscode').modal('hide');
        $('#mdPasscode').modal('show');
    });
});

function openRequestPasscodeLink() {
    cleanPasscodeFields();
    $('#mdPasscode').modal('hide');
    $('#mdRequestPasscode').modal('show');
}

function cleanPasscodeFields() {
    $('#Passcode').val('');
}

function cleanRequestPasscodeFields() {
    $('#TPFirstName').val('');
    $('#TPEmail').val('');
    $('#TPLastName').val('');
}


function submitPasscode() {
    $("#frmPasscode").submit();
}

function requestPasscode() {
    $("#frmRequestPasscode").submit(); 
}
