// ── Fade-in images on load ──────────────────────────────────────────
document.querySelectorAll('.music-grid img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => img.classList.add('loaded'));
    }
});

// ── Music sorting ───────────────────────────────────────────────────
// Parse alt text format: "Artist Name, Album Name, Year"
function parseAlbumData(altText) {
    const parts = altText.split(',').map(s => s.trim());
    return {
        artist: parts[0] || '',
        album: parts[1] || '',
        year: parts[2] ? parseInt(parts[2]) : 0
    };
}

// Store original order
const musicGrid = document.querySelector('.music-grid');
const albums = Array.from(musicGrid.children);
const originalOrder = albums.map(album => album.cloneNode(true));

// Sort functions
function sortByDefault() {
    musicGrid.innerHTML = '';
    originalOrder.forEach(album => {
        musicGrid.appendChild(album.cloneNode(true));
    });
}

function sortByArtist() {
    const sorted = albums.sort((a, b) => {
        const aData = parseAlbumData(a.querySelector('img').alt);
        const bData = parseAlbumData(b.querySelector('img').alt);
        return aData.artist.localeCompare(bData.artist);
    });
    
    musicGrid.innerHTML = '';
    sorted.forEach(album => musicGrid.appendChild(album));
}

function sortByYearNew() {
    const sorted = albums.sort((a, b) => {
        const aData = parseAlbumData(a.querySelector('img').alt);
        const bData = parseAlbumData(b.querySelector('img').alt);
        return bData.year - aData.year; // Newest first
    });
    
    musicGrid.innerHTML = '';
    sorted.forEach(album => musicGrid.appendChild(album));
}

function sortByYearOld() {
    const sorted = albums.sort((a, b) => {
        const aData = parseAlbumData(a.querySelector('img').alt);
        const bData = parseAlbumData(b.querySelector('img').alt);
        return aData.year - bData.year; // Oldest first
    });
    
    musicGrid.innerHTML = '';
    sorted.forEach(album => musicGrid.appendChild(album));
}

// Button click handlers
const sortButtons = document.querySelectorAll('.sort-btn');

sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        sortButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Sort based on data-sort attribute
        const sortType = button.getAttribute('data-sort');
        
        switch(sortType) {
            case 'default':
                sortByDefault();
                break;
            case 'artist':
                sortByArtist();
                break;
            case 'year-new':
                sortByYearNew();
                break;
            case 'year-old':
                sortByYearOld();
                break;
        }
    });
});
