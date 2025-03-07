$(document).ready(function () {
    // Set initial zoom level
    var minZoom = 0.9;
    var zoomLevel = 1.0;
    var maxZoom = 1.1;

    $('#decreaseZoomLevel').on('click', function () {
        if (zoomLevel > minZoom) {
            zoomLevel -= 0.05;
            $('body').css('zoom', zoomLevel);
        }
    });
    $('#regularZoomLevel').on('click', function () {
        zoomLevel = 1;
        $('body').css('zoom', '1');
    });
    $('#increaseZoomLevel').on('click', function () {
        if (zoomLevel < maxZoom) {
            zoomLevel += 0.05;
            $('body').css('zoom', zoomLevel);
        }
    });
    function addClassToBody() {
        $('body').addClass('high-contrast');
        localStorage.setItem('addedClass', 'high-contrast');
        console.log('Class added to body:', 'high-contrast');
    }
    // Function to remove a variable from local storage
    function removeFromLocalStorage() {
        $('body').removeClass('high-contrast');
        localStorage.removeItem("addedClass");
        console.log("Variable removed from local storage:");
    }
    // Check if the class is already added on page load
    var storedClass = localStorage.getItem('addedClass');
    if (storedClass) {
        $('body').addClass(storedClass);
        console.log('Class added to body from local storage:', storedClass);
    }
    $('#addContrast').on('click', function () {
        addClassToBody();
    });
    $('#removeContrast').on('click', function () {
        removeFromLocalStorage();
    });
});
/* Password icon and type changes JS starts */
function passwordIconChange() {
    var passwordType = document.getElementById("Password");
    if (passwordType.type === "password") {
        passwordType.type = "text";
        document.getElementById("eye-icon-change").classList.remove('fa-eye');
        document.getElementById("eye-icon-change").classList.add('fa-eye-slash');
    } else {
        passwordType.type = "password";
        document.getElementById("eye-icon-change").classList.add('fa-eye');
        document.getElementById("eye-icon-change").classList.remove('fa-eye-slash');
    }
}
/* Password icon and type changes JS ends */

const btnScrollToTop = document.querySelector(".scroll-to-top");


if (btnScrollToTop !== null) {
    window.addEventListener('scroll', e => {
        btnScrollToTop.style.display = window.scrollY > 100 ? 'block' : 'none';
    });
}

$(document).ready(function () {

    //assign - aria-current="page" aria-current="page"
    $('.menulnk').each(function () {
        $(this).removeAttr('aria-current');

        if ($(this).hasClass('active')) {
            $(this).attr("aria-current", 'page');
        }
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })


    var msgSuccess = $('#msgSuccess').val();
    var msgError = $('#msgError').val();
    var msgWarning = $('#msgWarning').val();

    if (msgSuccess !== "" && msgSuccess !== null) {
        notifySuccess(msgSuccess);
        $('#msgSuccess').val('');
    }
    if (msgError !== "" && msgError !== null) {
        notifyError(msgError);
        $('#msgError').val('');
    }
    if (msgWarning !== "" && msgWarning !== null) {
        notifyWarning(msgWarning);
        $('#msgWarning').val('');
    }
});

function wip() {
    iziToast.success({
        title: 'Stay Tuned!',
        message: "Our website's functionality is a work in progress",
        position: 'bottomCenter',
        role: 'alert',
        timeout: 7000,
        onOpening: function (instance, toast) {
            toast.setAttribute('role', 'alert');
        },
    });
}

function notifySuccess(message) {
    iziToast.success({
        title: 'Success',
        message: message,
        position: 'bottomCenter',
        role: 'alert',
        onOpening: function (instance, toast) {
            toast.setAttribute('role', 'alert');
        },
        timeout: 5000
    });
}

function notifyError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'bottomCenter',
        role: 'alert',
        onOpening: function (instance, toast) {
            toast.setAttribute('role', 'alert');
        },
        timeout: 5000
    });
}

function notifyWarning(message) {
    iziToast.warning({
        title: 'Warning',
        message: message,
        position: 'bottomCenter',
        role: 'alert',
        onOpening: function (instance, toast) {
            toast.setAttribute('role', 'alert');
        },
        timeout: 5000
    });
}

function showLoader() {
    $.LoadingOverlay("show", {
        // Background
        background: "rgba(255, 255, 255, 0.6)"
    });
}

function showLoaderElement(element) {
    $("#" + element).LoadingOverlay("show", {
        background: "rgba(255, 255, 255, 0.6)"
    });
}

function hideLoader() {
    $.LoadingOverlay("hide");
}

function hideLoaderElement(element) {
    $("#" + element).LoadingOverlay("hide");
}


function laddaStart(id) {
    var l = Ladda.create(document.getElementById(id));
    l.start();
    return l;
}

function laddaStop(l) {
    l.stop();
}

function redirectToMemberRegistration() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/member/registration';
}

function redirectToService() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/service';
}

function redirectToAbout() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/about';
}

function redirectToEmployee() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/employee';
}

function redirectToSupportProvider() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/support-provider';
}

function redirectToTraining() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/training';
}

function redirectToJobSeekerRegistration() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/jobseeker/register';
}

function redirectToJobDetails(id) {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/jobs/details/' + id;
}

function redirectToJobs() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/jobs';
}

function redirectToSupportTeamForm() {
    window.location.href = 'https://forms.office.com/pages/responsepage.aspx?id=hth3doczxEurjVI9m-tyhijglXIgWNJNi8UntjwTDNpUOFZTWThISjI0UkY1N1MzU0FJVk1FQ0xEUCQlQCN0PWcu';
}

function redirectToSupportTeam() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/support-team/registration';
}

function redirectToHiringManager() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/hiring-manager/registration';
}

function redirectToReferTalent() {
    window.location.href = '/' + $('#HdDomainDirectory').val() + '/refertalent';
}

function redirectToContact() {
    window.location.href = '/portal/' + $('#HdDomainDirectory').val() + '/contact';
}

function redirectToHome() {
    window.location.href = '/' + $('#HdDomainDirectory').val();
}

document.onkeydown = function (e) {
    //check if capslock key was pressed isn the whole window
    e = e || event;
    if (typeof (window.lastpress) === 'undefined') { window.lastpress = e.timeStamp; }
    if (typeof (window.capsLockEnabled) !== 'undefined') {
        if (e.keyCode == 20 && e.timeStamp > window.lastpress + 50) {
            window.capsLockEnabled = !window.capsLockEnabled;
            $('#divCapLogsText').toggleClass('d-none');
        }
        window.lastpress = e.timeStamp;
        //sometimes this function is called twice when pressing capslock once, so I use the timeStamp to fix the problem
    }
};

function check_capslock(e) {
    //check what key was pressed in the form
    var s = String.fromCharCode(e.keyCode);
    if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
        window.capsLockEnabled = true;
        $('#divCapLogsText').removeClass('d-none');
    }
    else {
        window.capsLockEnabled = false;
        $('#divCapLogsText').addClass('d-none');
    }
}

function check_capslock_form(where) {
    if (!where) { where = $(document); }
    where.find('input,select').each(function () {
        if (this.type != "hidden") {
            $(this).keypress(check_capslock);
        }
    });
}


/* Footer position manage as per the content JS starts */
$(function () {
    adjustFooter();
});

function adjustFooter() {
    const content = document.querySelector('#content');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');

    const adjustFooter = () => {
        const contentHeight = content.clientHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = footer.clientHeight;
        const headerHeight = header.clientHeight;

        if (contentHeight + footerHeight + headerHeight < windowHeight) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.left = '0';
            footer.style.right = '0';
            footer.style.width = '100%';
        } else {
            footer.style.position = 'static';
        }
    };

    adjustFooter();

    window.addEventListener('resize', adjustFooter);
}
/* Footer position manage as per the content JS ends */


/* Hightlight selected menu */
$(document).ready(function () {
    // Get the current URL path
    var currentUrl = window.location.pathname;

    $('.nav-link').each(function () {
        $(this).removeClass('active');
    });

    if (window.location.pathname.includes('contact')) {
        $('#linkContact').addClass('active');
    }
    else if (window.location.pathname.includes('training') || window.location.pathname.includes('faqs') || window.location.pathname.includes('refertalent')) {
        $('#dropResources').addClass('active');
    }
    else if (window.location.pathname.includes('about') || window.location.pathname.includes('service') || window.location.pathname.includes('partners-employers')) {
        $('#dropAboutUs').addClass('active');
    }
    else {
        $('#linkHome').addClass('active');
    }
});
/* END: Hightlight selected menu */


/* Custom tooltip starts */
$(document).ready(function () {
    $(document).on('click', function () {
        // Hide all tooltips when clicking outside
        $('.custom-tooltip-content').hide();
    });

    $('.custom-tooltip-alert').on('click', function (e) {
        e.stopPropagation(); // Prevent document click handler from firing

        // Hide all tooltips except the current one
        $('.custom-tooltip-content').not($(this).find('.custom-tooltip-content')).hide();

        // Toggle the current tooltip
        $(this).find('.custom-tooltip-content').toggle();
    });
});
/* Custom tooltip ends */


/* Footer position manage as per the content JS starts */
window.addEventListener('DOMContentLoaded', () => {
    adjustFooter();
    observeContentChanges(); // Start observing content changes
});

function adjustFooter() {
    const content = document.querySelector('#content');
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');

    const adjustFooterPosition = () => {
        const contentHeight = content.clientHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = footer.clientHeight;
        const headerHeight = header.clientHeight;

        if (contentHeight + footerHeight + headerHeight < windowHeight) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.left = '0';
            footer.style.right = '0';
            footer.style.width = '100%';
        } else {
            footer.style.position = 'static';
        }
    };

    adjustFooterPosition();

    window.addEventListener('resize', adjustFooterPosition);
}

/* Observe content changes */
function observeContentChanges() {
    const content = document.querySelector('#content');

    const observer = new MutationObserver(() => {
        adjustFooter(); // Recalculate footer position when content changes
    });

    // Observe changes in child elements, attributes, or character data
    observer.observe(content, { childList: true, subtree: true, attributes: true, characterData: true });
}
/* Footer position manage as per the content JS ends */