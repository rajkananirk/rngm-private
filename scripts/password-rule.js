var pwdValid = false;

function passwordRule(pwdInput) {

    function validatePwdStrength() {

        var pwdValue = $(this).val(); // This works because when it's called it's called from the pwdInput, see end

        // Validate the length
        if (pwdValue.length > 7 && pwdValue.length < 16) {
            $('#pr-length').removeClass('invalid').addClass('valid');
            pwdValid = true;
        } else {
            $('#pr-length').removeClass('valid').addClass('invalid');
        }

        // Validate pr-capital letter
        if (pwdValue.match(/[A-Z]/)) {
            $('#pr-capital').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#pr-capital').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }

        // Validate pr-lowercase letter
        if (pwdValue.match(/[a-z]/)) {
            $('#pr-lowercase').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#pr-lowercase').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }

        // Validate number
        if (pwdValue.match(/[\d]/)) {
            $('#pr-number').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#pr-number').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }

        //Validate special character
        if (pwdValue.match(/[!@@#$*]/)) {
            $('#pr-special-character').removeClass('invalid').addClass('valid');
            pwdValid = pwdValid && true;
        } else {
            $('#pr-special-character').removeClass('valid').addClass('invalid');
            pwdValid = false;
        }
    }

    pwdInput.bind('change keyup input', validatePwdStrength); // Keyup is a bit unpredictable
}

function validatePasswordRule() {

    if (pwdValid === false) {
        $('#alert-invalid-password').removeClass('d-none');
    } else {
        $('#alert-invalid-password').addClass('d-none');
    }

    return pwdValid;
}