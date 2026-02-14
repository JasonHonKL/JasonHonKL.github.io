let documents = [];

// Load and display documents from config.json
async function loadDocuments() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();

        documents = config.documents;
        const listElement = document.getElementById('document-list');

        documents.forEach(doc => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + doc.id;
            a.textContent = doc.title;
            a.onclick = (e) => {
                e.preventDefault();
                showPdf(doc.url, doc.id);
            };
            li.appendChild(a);
            listElement.appendChild(li);
        });

        // Check if there's a hash in URL to show specific document
        const hash = window.location.hash.substring(1);
        if (hash) {
            const doc = documents.find(d => d.id === hash);
            if (doc) {
                showPdf(doc.url, doc.id);
            }
        }
    } catch (error) {
        console.error('Error loading config:', error);
        document.getElementById('document-list').innerHTML =
            '<p style="color: red;">Error loading documents</p>';
    }
}

// Show PDF in iframe
function showPdf(url, id) {
    document.getElementById('document-list').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.getElementById('pdf-container').style.display = 'block';

    const iframe = document.getElementById('pdf-frame');
    iframe.src = url;

    // Update URL without scrolling
    history.pushState(null, null, '#' + id);
}

// Close PDF viewer
function closePdf() {
    document.getElementById('pdf-container').style.display = 'none';
    document.getElementById('document-list').style.display = 'block';
    document.querySelector('h1').style.display = 'block';
    document.getElementById('pdf-frame').src = '';

    // Clear hash
    history.pushState(null, null, ' ');
}

// Handle hash changes (back/forward button)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const doc = documents.find(d => d.id === hash);
        if (doc) {
            showPdf(doc.url, doc.id);
        }
    } else {
        closePdf();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadDocuments);
