// Load and display documents from config.json
async function loadDocuments() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();

        const listElement = document.getElementById('document-list');

        config.documents.forEach(doc => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = doc.title;
            a.onclick = () => showPdf(doc.url);
            li.appendChild(a);
            listElement.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading config:', error);
        document.getElementById('document-list').innerHTML =
            '<p style="color: red;">Error loading documents</p>';
    }
}

// Show PDF in iframe
function showPdf(url) {
    document.getElementById('document-list').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.getElementById('pdf-container').style.display = 'block';

    const iframe = document.getElementById('pdf-frame');
    iframe.src = url;
}

// Close PDF viewer
function closePdf() {
    document.getElementById('pdf-container').style.display = 'none';
    document.getElementById('document-list').style.display = 'block';
    document.querySelector('h1').style.display = 'block';
    document.getElementById('pdf-frame').src = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadDocuments);
