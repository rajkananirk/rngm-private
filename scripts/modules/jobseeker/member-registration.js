$(function () {

    $("#frm").validate({
        rules: {
            Phone: {
                required: true,
                remote: phoneExist
            }
        },
        messages: {
            Phone: {
                required: 'Phone is required. Please enter a phone number.',
                remote: '{Email/Phone} is already in use. Register with a different {email/phone}.'
            }
        },
        errorClass: 'is-invalid',
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.insertAfter($(element).parent());
        },
        highlight: function (element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).removeClass('is-invalid');
        }
    });


    $('input[name="SelectedContact"]').on('change', function () {
        updatePhoneValidation();
    });

    updatePhoneValidation();
});

function updatePhoneValidation() {
    if ($('input[name="SelectedContact"]:checked').val() == "Email") {
        $('#Phone').rules('remove', 'required');
        $('#Phone-Required').addClass('d-none');
        $("#Phone").valid();
    }
    else {
        $('#Phone').rules('add', {
            required: true,
            messages: {
                required: "Phone is required. Please enter a phone number."
            }
        });
        $('#Phone-Required').removeClass('d-none');
    }
}


$(function () {

    passwordRule($('#Password'));

    $('#Phone').mask('(000) 000-0000');

    ZipCodeAutoComplete("#ZipCode", "#zipCodeAddres", '#CountryId');

    ZipCodeAutoCompleteBindOnPaste("#ZipCode");

    $('#ZipCode').keypress(function () {
        $("#ZipCode").rules("add", {
            remote: {
                url: baseZipcodeUrl,
                type: "GET",
                data: {
                    CountryId: $("#CountryId").val()
                }
            },
            messages: {
                remote: "Please enter a valid zip code."
            }
        });
    });
    $('#ZipCode').blur(function () {
        if ($(this).val() === "" || $(this).val() === " ") {
            $("#zipCodeAddres").text("");
        }
    });

    $('#btnMemberRegistration').on('click', function () {
        loadVerificationScreen();
    });
});


function checkTerms() {
    $('#Phone').removeAttr('aria-describedby');
    if ($('#IsAcceptTerms').is(':checked')) {
        return true;
    } else {
        $('#IsAcceptTerms').removeAttr('aria-describedby');
        return false;
    }


}
function maskEmail(email) {
    let [localPart, domain] = email.split("@");
    let visiblePart = localPart.length <= 3
        ? localPart.slice(-2) // Show last 2 characters if length <= 3
        : localPart.slice(-3); // Show last 3 characters otherwise
    let maskedLocalPart = "*".repeat(localPart.length - visiblePart.length) + visiblePart;
    return maskedLocalPart + "@" + domain; // Combine masked part and domain
}

function maskPhone(phone) {
    if (!phone || phone.length < 8) {
        return phone;
    }

    // Extract the last 4 characters for masking
    let visiblePart = phone.slice(-4);

    // Replace everything before the last 4 digits with `*`
    let maskedPart = phone.slice(0, -4).replace(/\d/g, "*");

    return maskedPart + visiblePart;
}

function loadVerificationScreen() {

    if ($('#frmMemberRegistration').valid() && validatePasswordRule()) {
        if ($('#IsAcceptTerms').is(':checked')) {
            var ladda = window.laddaStart('btnMemberRegistration');
            $.ajax({
                url: registermemberurl,
                type: "POST",
                data: {
                    email: $('#Email').val(),
                    name: $('#FirstName').val(),
                    pageSessionId: $('#PageSessionId').val(),
                    mobile: $('#Phone').val(),
                    connectTalent: $('input[name="SelectedContact"]:checked').val()
                },
                success: function (data) {
                    if (data.status) {

                        if ($('input[name="SelectedContact"]:checked').val() == "Email") {
                            $('#lblEmail').html('The verification code is sent to ' + maskEmail($('#Email').val().trim()) + '.');
                        } else if ($('input[name="SelectedContact"]:checked').val() == "Text") {
                            $('#lblEmail').html('The verification code is sent to ' + maskPhone($('#Phone').val().trim()) + '.');
                        } else if ($('input[name="SelectedContact"]:checked').val() == "Both") {
                            $('#lblEmail').html('The verification code is sent to ' + maskEmail($('#Email').val().trim()) + ' & ' + maskPhone($('#Phone').val().trim()) + '.');
                        }

                        $('#Section-Registration-Form').addClass('d-none');
                        $('#Section-Otp-Verification').removeClass('d-none');
                    }
                    else {
                        notifyError(data.message);
                    }
                    window.laddaStop(ladda);
                },
                error: function (error) {
                    console.log(error);
                    notifyError('Something went wrong! Try after some time.');
                    window.laddaStop(ladda);
                }
            });
        } else {
            notifyError('Accept our terms and policy.');
        }
    }
    else {
        checkTerms();
        var firstInvalidInput = $('#frmMemberRegistration').find('.input-validation-error').first();
        firstInvalidInput.focus();
    }
}


function verifyOTP() {
    var ladda = window.laddaStart('btnConfirmVerificationCode');
    $.ajax({
        url: verifyOTPurl,
        type: "POST",
        data: {
            email: $('#Email').val(),
            otp: $('#OneTimePassword').val()
        },
        success: function (data) {
            if (data.status) {
                grecaptcha.enterprise.ready(function () {
                    grecaptcha.enterprise.execute(sitekey, { action: $('#googleCaptchaAction').val() }).then(function (token) {
                        $('#googleCaptcha').val(token);
                        $('#frmMemberRegistration').submit();
                    });
                });

            }
            else {
                notifyError(data.message);
                window.laddaStop(ladda);
            }
        },
        error: function (error) {
            console.log(error);
            notifyError('Something went wrong! Try after some time.');
            window.laddaStop(ladda);
        }
    });
}

function resendMailForVerification() {
    showLoader();
    $.ajax({
        url: resendverifyurl,
        type: "POST",
        data: {
            email: $('#Email').val(), name: $('#FirstName').val(), mobile: $('#Phone').val(),
            connectTalent: $('input[name="SelectedContact"]:checked').val()
        },
        success: function (data) {
            if (data.status) {
                notifySuccess(data.message);
            }
            else {
                notifyError(data.message);
            }
            hideLoader();
        },
        error: function (error) {
            console.log(error);
            notifyError('Something went wrong! Try after some time.');
            hideLoader();
        }
    });
}
