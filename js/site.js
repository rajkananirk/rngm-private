/* Show tooltip JS starts */
var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
/* Show tooltip JS ends */

$(document).ready(function () {
    $(".password-field").each(function () {
        var $passwordField = $(this);
        var $showPasswordLink = $passwordField.find(".show-password");
        var $showPasswordLinkText = $passwordField.find(".show-password span");
        var $showPasswordLinkImage = $passwordField.find(".show-password img");
        var $passwordInput = $passwordField.find('input[type="password"]');

        $showPasswordLink.on("click", function () {
            var currentType = $passwordInput.attr("type");
            if (currentType === "password") {
                $passwordInput.attr("type", "text");
                $showPasswordLinkText.text("Hide");
                $showPasswordLink.attr("aria-checked", "true");
                $showPasswordLinkImage.attr(
                    "src",
                    "/portal/tenant/elevancehealth/images/password-show.svg"
                );
            } else {
                $passwordInput.attr("type", "password");
                $showPasswordLinkText.text("Show");
                $showPasswordLink.attr("aria-checked", "false");
                $showPasswordLinkImage.attr(
                    "src",
                    "/portal/tenant/elevancehealth/images/password-hide.svg"
                );
            }
        });
    });
});

$(document).ready(function () {
    $("#Password").on("keyup", function () {
        var count = $(".password-rules li.valid").length;
        $("#valid-count").text(count + " out of 5 requirements completed");
    });
});

// Accessibility  bar //
$(document).ready(function () {
    // Set initial zoom level
    var minZoom = 0.9;
    var zoomLevel = 1.0;
    var maxZoom = 1.1;

    $("#decreaseZoomLevel").on("click", function () {
        if (zoomLevel > minZoom) {
            zoomLevel -= 0.05;
            $("body").css("zoom", zoomLevel);
        }
    });
    $("#regularZoomLevel").on("click", function () {
        zoomLevel = 1;
        $("body").css("zoom", "1");
    });
    $("#increaseZoomLevel").on("click", function () {
        if (zoomLevel < maxZoom) {
            zoomLevel += 0.05;
            $("body").css("zoom", zoomLevel);
        }
    });

    function addClassToBody() {
        $("body").addClass("high-contrast");
        localStorage.setItem("addedClass", "high-contrast");
        console.log("Class added to body:", "high-contrast");
    }
    // Function to remove a variable from local storage
    function removeFromLocalStorage() {
        $("body").removeClass("high-contrast");
        localStorage.removeItem("addedClass");
        console.log("Variable removed from local storage:");
    }
    // Check if the class is already added on page load
    var storedClass = localStorage.getItem("addedClass");
    if (storedClass) {
        $("body").addClass(storedClass);
        console.log("Class added to body from local storage:", storedClass);
    }
    $("#addContrast").on("click", function () {
        addClassToBody();
    });
    $("#removeContrast").on("click", function () {
        removeFromLocalStorage();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var skipButton = document.getElementById("skip-to-content-btn");
    var mainContent = document.getElementById("main-content");
    var headerHeight = document.querySelector("header").offsetHeight;

    if (skipButton !== null && skipButton !== undefined) {
        skipButton.addEventListener("click", function () {
            // Adjust scroll position to account for fixed header
            var scrollPosition = mainContent.offsetTop - headerHeight;

            // Set tabindex and focus on main content
            mainContent.tabIndex = -1;
            mainContent.focus();

            // Scroll to adjusted position
            window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            });
        });
    }
});

/* Header sticky JS starts */
//let lastScrollTop = 0;
//const header = document.getElementById('header');

//window.addEventListener('scroll', function () {
//    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//    if (window.innerWidth <= 575) {
//        if (scrollTop > lastScrollTop) {
//            // Downscroll code
//            header.style.top = '-200px'; // Hide header
//        } else {
//            // Upscroll code
//            header.style.top = '0'; // Show header
//        }
//    }
//    else {
//        if (scrollTop > lastScrollTop) {
//            // Downscroll code
//            header.style.top = '-118px'; // Hide header
//        } else {
//            // Upscroll code
//            header.style.top = '0'; // Show header
//        }
//    }

//    lastScrollTop = scrollTop;
//});
/* Header sticky JS ends */

/* Resources menu active JS starts */
document.addEventListener("DOMContentLoaded", function () {
    var currentUrl = window.location.href;
    var resourcesLink = document.querySelector(
        ".nav-item.dropdown a.dropdown-toggle"
    );

    if (currentUrl.includes("/training") || currentUrl.includes("/faqs")) {
        resourcesLink.classList.add("active");
    }
});
/* Resources menu active JS ends */

/* Footer position manage as per the content JS starts */
window.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector("#content");
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");

    const adjustFooter = () => {
        const contentHeight = content.clientHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = footer.clientHeight;
        const headerHeight = header.clientHeight;

        if (contentHeight + footerHeight + headerHeight < windowHeight) {
            footer.style.position = "fixed";
            footer.style.bottom = "0";
            footer.style.left = "0";
            footer.style.right = "0";
            footer.style.width = "100%";
        } else {
            footer.style.position = "static";
        }
    };

    adjustFooter();

    window.addEventListener("resize", adjustFooter);
});
/* Footer position manage as per the content JS ends */

/* Add current page in navigation code starts */
// Get the current URL path
let path = window.location.pathname;

// Select the navigation link that matches the current path
let link = document.querySelector(`.navbar a[href="${path}"]`);

// Add aria-current="page" to the selected link
if (link) {
    link.setAttribute("aria-current", "page");
}
/* Add current page in navigation code ends */

function applyReadMore() {
    document.querySelectorAll(".paragraph").forEach((paragraph) => {
        let fullText = paragraph.innerText;
        let textWithoutSpaces = fullText.replace(/\s/g, ""); // Remove spaces for counting
        let limit = 90; // Character limit excluding spaces
        let shortText = "";
        let count = 0;

        //Build shortText while ignoring spaces in the count
        for (let i = 0; i < fullText.length; i++) {
            if (fullText[i] !== " ") count++; // Only count non-space characters
            shortText += fullText[i]; // Keep spaces in display
            if (count >= limit) break; // Stop when limit is reached
        }

        shortText += "..."; // Add ellipsis

        let readMoreBtn = document.createElement("span");
        readMoreBtn.classList.add("read-more-btn");
        readMoreBtn.textContent = "Read More";

        function toggleText() {
            if (paragraph.classList.contains("full-text")) {
                paragraph.innerText = shortText;
                readMoreBtn.textContent = "Read more";
            } else {
                paragraph.innerText = fullText;
                readMoreBtn.textContent = "Read less";
            }
            paragraph.appendChild(readMoreBtn);
            paragraph.classList.toggle("full-text");
        }

        if (window.innerWidth < 768) {
            paragraph.innerText = shortText;
            paragraph.appendChild(readMoreBtn);
            readMoreBtn.style.display = "inline";
            readMoreBtn.addEventListener("click", toggleText);
        }
    });
}

applyReadMore(); // Run on page load
window.addEventListener("resize", applyReadMore); // Re-apply on screen resize

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
