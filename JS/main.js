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