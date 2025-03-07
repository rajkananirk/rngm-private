$(function () {
    var agreeToLimitedAccess = $('#HdAgreeToLimitedAccess').val();
    var isPasscodePopupOpen = false;

    if ($('#mdPasscode').hasClass('show') || $('#mdRequestPasscode').hasClass('show')) {
        isPasscodePopupOpen = true;
    }

    if (isPasscodePopupOpen === false
        && (agreeToLimitedAccess === "" || agreeToLimitedAccess === " " || agreeToLimitedAccess === null || agreeToLimitedAccess === "No")) {
        $('#ModalAgreeToLimitedAccess').modal('show');
    }

    $('#btnSubmitAgreeToLimitedAccess').on('click', function (e) {
        var AgreeToLimitedAccess = $('input[name="AgreeToLimitedAccess"]:checked').val();

        if (AgreeToLimitedAccess === "No") {
            $('#ModalAgreeToLimitedAccess_RTN').modal('show');
            $('#ModalAgreeToLimitedAccess').modal('hide');
        } else {
            var l = laddaStart('btnSubmitAgreeToLimitedAccess');
            $.ajax({
                type: "POST",
                data: { "agreeToLimitedAccess": AgreeToLimitedAccess },
                url: urlSaveAgreeToLimitedAccess,
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        location.reload();
                    } else {
                        notifyError(response.message);
                        l.stop();
                    }
                },
                error: function (error) {
                    notifyError(error.statusText);
                    l.stop();
                }
            });
        }
    });
});

function closeAgreeToJoinRtn() {
    $('#ModalAgreeToLimitedAccess_RTN').modal('hide');
    $('#ModalAgreeToLimitedAccess').modal('show');
}
