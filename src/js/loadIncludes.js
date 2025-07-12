document.addEventListener('DOMContentLoaded', async () => {
    // Load Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        try {
            // Path relatif dari file HTML yang memanggil (misal: pages/ruangan.html akan mencari ../_includes/_header.html)
            // Atau jika HTML di root (index.html), maka cukup ./_includes/_header.html
            const headerPath = headerPlaceholder.dataset.includePath || './_includes/_header.html';
            const response = await fetch(headerPath);
            if (response.ok) {
                const headerHtml = await response.text();
                headerPlaceholder.innerHTML = headerHtml;
            } else {
                console.error('Failed to load header:', response.statusText);
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
    

    // Load Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            // Path relatif dari file HTML yang memanggil
            const footerPath = footerPlaceholder.dataset.includePath || './_includes/_footer.html';
            const response = await fetch(footerPath);
            if (response.ok) {
                const footerHtml = await response.text();
                footerPlaceholder.innerHTML = footerHtml;
            } else {
                console.error('Failed to load footer:', response.statusText);
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
});