
/* ========================================
   NEXORA FAQ ACCORDION
   Main JavaScript File
======================================== */


/*
   1. INITIALISE ACCORDION
*/

function initialiseAccordion(accordion) {

    // Check whether the accordion element exists
    if (!accordion) {
        console.error("FAQ Accordion element was not found.");
        return;
    }

    // Select all accordion items
    const accordionItems = accordion.querySelectorAll(
        ".accordion-item"
    );

    // Check whether accordion items exist
    if (accordionItems.length === 0) {
        console.warn("No FAQ items were found.");
        return;
    }


    /*
       2. CHECK REQUIRED ELEMENTS
    */

    const validItems = [];

    accordionItems.forEach(function (item) {

        const button = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");

        // Check whether button and panel exist
        if (!button || !panel) {
            console.warn(
                "An FAQ item is missing its button or answer panel.",
                item
            );
            return;
        }

        // Store valid accordion items
        validItems.push({
            item: item,
            button: button,
            panel: panel
        });

    });


    // Stop if no valid items are available
    if (validItems.length === 0) {
        console.warn("No valid FAQ items are available.");
        return;
    }


    /*
       3. SET INITIAL ACCORDION STATE
    */

    validItems.forEach(function (faq) {

        // Close all answers initially
        faq.item.classList.remove("is-open");

        // Update accessibility attribute
        faq.button.setAttribute("aria-expanded", "false");

        // Make sure the answer is hidden
        faq.panel.setAttribute("aria-hidden", "true");

if ("inert" in faq.panel) {
    faq.panel.inert = true;
}

    });


    /*
       4. HANDLE QUESTION BUTTON CLICKS
    */

    validItems.forEach(function (faq) {

        faq.button.addEventListener("click", function () {

            // Check whether the current answer is open
            const isOpen = faq.item.classList.contains("is-open");


            // Close every accordion item
            validItems.forEach(function (otherFaq) {

                otherFaq.item.classList.remove("is-open");

                otherFaq.button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherFaq.panel.setAttribute("aria-hidden", "true");

if ("inert" in otherFaq.panel) {
    otherFaq.panel.inert = true;
}

            });


            /*
               5. OPEN THE SELECTED ANSWER
            */

            // Open only if it was previously closed
            if (!isOpen) {

                faq.item.classList.add("is-open");

                faq.button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                faq.panel.setAttribute("aria-hidden", "false");

if ("inert" in faq.panel) {
    faq.panel.inert = false;
}

            }

        });

    });


    // Report successful initialisation
    console.log("NEXORA FAQ Accordion initialised successfully.");

}


/*
   6. START THE ACCORDION
*/

function startAccordion() {

    // Find the main accordion container
    const accordion = document.getElementById("faq-accordion");

    // Initialise the accordion
    if (accordion) {

        initialiseAccordion(accordion);

        // Enable JavaScript-specific CSS styles
        document.documentElement.classList.add("js-enabled");

    } else {

        console.error(
            "Cannot start FAQ Accordion: container not found."
        );

    }

}


// Start after the HTML document has loaded
if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", startAccordion);

} else {

    startAccordion();

}
