document.addEventListener('DOMContentLoaded', () => {
    console.log('SelahStudy Engine initialized successfully. Visual containers loaded.');
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('bookSearchInput');

    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            const searchString = event.target.value.toLowerCase().trim();
            
            // Find all column wrappers holding our library cards
            const columns = document.querySelectorAll('.row.g-4 > div[class*="col-"]');

            columns.forEach((col) => {
                const bookItems = col.querySelectorAll('.book-item');
                let cardHasMatches = false;

                bookItems.forEach((item) => {
                    const bookTitleText = item.querySelector('span').textContent.toLowerCase();

                    if (bookTitleText.includes(searchString)) {
                        item.style.setProperty('display', 'flex', 'important');
                        cardHasMatches = true; // Mark that this card contains a matching book
                    } else {
                        item.style.setProperty('display', 'none', 'important');
                    }
                });

                // If the card has matching books (or if the search input is empty), show the card column.
                // Otherwise, hide the entire column so empty cards don't clutter the screen.
                if (cardHasMatches || searchString === '') {
                    col.style.setProperty('display', 'block', 'important');
                } else {
                    col.style.setProperty('display', 'none', 'important');
                }
            });
        });
    }
});


    // Feature 2: Interactive Contact Form Validation & Success Modal Deployment
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Stop default page reloads on submission
            event.preventDefault();
            event.stopPropagation();

            // Run structural validation check
            if (!contactForm.checkValidity()) {
                // If invalid, apply standard Bootstrap visual warning indicators
                contactForm.classList.add('was-validated');
            } else {
                // If inputs are fully complete, extract data cleanly
                const nameValue = document.getElementById('userName').value.trim();
                const typeValue = document.getElementById('messageType').value;

                // Inject extracted data tokens into our confirmation modal placeholder spans
                document.getElementById('modalTargetName').textContent = nameValue;
                document.getElementById('modalTargetType').textContent = typeValue;

                // Programmatically initialize and display the Bootstrap Modal component
                const successModalElement = document.getElementById('submissionSuccessModal');
                const modalInstance = new bootstrap.Modal(successModalElement);
                modalInstance.show();

                // Cleanly reset the form fields and verification validation rings for subsequent uses
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }
        });
    }

    // Feature 3: Interactive Newsletter Subscription & Success Modal Deployment

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!newsletterForm.checkValidity()) {
            newsletterForm.classList.add("was-validated");
            return;
        }

        const email = document.getElementById("newsletterEmail").value.trim();

        const name = email.split("@")[0];

        document.getElementById("modalTargetName").textContent = name;
        document.getElementById("modalTargetType").textContent =
            "Weekly Scripture Insights Newsletter";

        const modal = new bootstrap.Modal(
            document.getElementById("submissionSuccessModal")
        );

        modal.show();

        newsletterForm.reset();
        newsletterForm.classList.remove("was-validated");
    });

}


   // ==========================================================================
    // Feature 4: Split Dual-Plan Reading Tracker via LocalStorage (Fixed)
    // ==========================================================================
    
    /**
     * Calculates progress percentage inside an isolated parent list element
     * and maps it straight to its matching unique progress bar nodes.
     */
    const calculatePlanProgress = (containerId, progressBarId, progressTextId) => {
        const container = document.getElementById(containerId);
        if (!container) return; // Exit gracefully if the container isn't on the current page

        const containerBoxes = container.querySelectorAll('.reading-checkbox');
        const progressBar = document.getElementById(progressBarId);
        const progressText = document.getElementById(progressTextId);

        if (containerBoxes.length === 0) return;

        // Scope the checked query specifically inside this single plan container element
        const total = containerBoxes.length;
        const checkedCount = container.querySelectorAll('.reading-checkbox:checked').length;
        const scorePercentage = Math.round((checkedCount / total) * 100);

        // Render metrics to the unique target nodes
        if (progressBar && progressText) {
            progressBar.style.width = `${scorePercentage}%`;
            progressBar.setAttribute('aria-valuenow', scorePercentage);
            progressText.textContent = `${scorePercentage}% Complete`;
        }
    };

    // Global listener setup to catch checkbox modifications on execution boot
    const readingCheckboxes = document.querySelectorAll('.reading-checkbox');
    
    if (readingCheckboxes.length > 0) {
        readingCheckboxes.forEach((box) => {
            // Restore persistent checkbox state on window execution loads
            const boxSavedState = localStorage.getItem(`selah_plan_${box.value}`);
            if (boxSavedState === 'true') {
                box.checked = true;
            }

            // Watch element toggle state mutations
            box.addEventListener('change', () => {
                localStorage.setItem(`selah_plan_${box.value}`, box.checked);
                
                // Fire independent recalculations across both containers upon click interactions
                calculatePlanProgress('readingPlanGroupOT', 'otProgressBar', 'otProgressPercentText');
                calculatePlanProgress('readingPlanGroupNT', 'ntProgressBar', 'ntProgressPercentText');
            });
        });

        // Initialize state configurations when page first opens
        calculatePlanProgress('readingPlanGroupOT', 'otProgressBar', 'otProgressPercentText');
        calculatePlanProgress('readingPlanGroupNT', 'ntProgressBar', 'ntProgressPercentText');
    }