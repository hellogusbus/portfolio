// ── Fade-in images on load ──────────────────────────────────────────
document.querySelectorAll('.gallery-item img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => img.classList.add('loaded'));
    }
});

// ── Lightbox with multi-image support ───────────────────────────────
// Create lightbox element
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

// Create navigation arrows (gallery navigation)
const prevArrow = document.createElement('div');
prevArrow.className = 'lightbox-arrow lightbox-prev';
prevArrow.innerHTML = '&#8249;';
lightbox.appendChild(prevArrow);

const nextArrow = document.createElement('div');
nextArrow.className = 'lightbox-arrow lightbox-next';
nextArrow.innerHTML = '&#8250;';
lightbox.appendChild(nextArrow);

// Create image container
const imageContainer = document.createElement('div');
imageContainer.className = 'lightbox-image-container';
lightbox.appendChild(imageContainer);

// Create sub-navigation for multi-image items
const subNav = document.createElement('div');
subNav.className = 'lightbox-subnav';
lightbox.appendChild(subNav);

const subPrev = document.createElement('button');
subPrev.className = 'subnav-btn subnav-prev';
subPrev.innerHTML = '‹';
subNav.appendChild(subPrev);

const imageCounter = document.createElement('span');
imageCounter.className = 'image-counter';
subNav.appendChild(imageCounter);

const subNext = document.createElement('button');
subNext.className = 'subnav-btn subnav-next';
subNext.innerHTML = '›';
subNav.appendChild(subNext);

// Create caption element
const caption = document.createElement('div');
caption.className = 'lightbox-caption';
lightbox.appendChild(caption);

// Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;
let currentSubIndex = 0;
let currentImages = [];

// Show image in lightbox
function showImage(index, subIndex = 0) {
    const item = galleryItems[index];
    const videoUrl = item.getAttribute('data-video');
    const imagesData = item.getAttribute('data-images');
    
    // Check if this is a video item
    if (videoUrl) {
        loadVideo(videoUrl);
        currentIndex = index;
        return;
    }
    
    // Check if item has multiple images
    if (imagesData) {
        try {
            currentImages = JSON.parse(imagesData);
        } catch (e) {
            currentImages = [item.querySelector('img').src];
        }
    } else {
        currentImages = [item.querySelector('img').src];
    }
    
    // Fade out current image/video
    const currentContent = imageContainer.querySelector('img, iframe');
    if (currentContent) {
        currentContent.style.opacity = '0';
        setTimeout(() => {
            loadNewImage(subIndex);
        }, 300);
    } else {
        loadNewImage(subIndex);
    }
    
    currentIndex = index;
    currentSubIndex = subIndex;
}

function loadVideo(videoUrl) {
    // Create iframe for YouTube video
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl + '?autoplay=0&modestbranding=1&rel=0';
    iframe.width = '960';
    iframe.height = '540';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.style.opacity = '0';
    
    imageContainer.innerHTML = '';
    imageContainer.appendChild(iframe);
    
    // Fade in video
    setTimeout(() => {
        iframe.style.opacity = '1';
    }, 10);
    
    // Update caption
    const item = galleryItems[currentIndex];
    const captionText = item.querySelector('img').getAttribute('data-caption');
    caption.textContent = captionText || '';
    caption.style.display = captionText ? 'block' : 'none';
    
    // Hide sub-navigation for videos
    subNav.style.display = 'none';
}

function loadNewImage(subIndex) {
    // Show the specified sub-image
    const img = document.createElement('img');
    img.src = currentImages[subIndex];
    img.style.opacity = '0';
    
    imageContainer.innerHTML = '';
    imageContainer.appendChild(img);
    
    // Fade in new image
    setTimeout(() => {
        img.style.opacity = '1';
    }, 10);
    
    // Update caption
    const item = galleryItems[currentIndex];
    const captionText = item.querySelector('img').getAttribute('data-caption');
    caption.textContent = captionText || '';
    caption.style.display = captionText ? 'block' : 'none';
    
    // Update sub-navigation
    if (currentImages.length > 1) {
        subNav.style.display = 'flex';
        imageCounter.textContent = `${subIndex + 1} / ${currentImages.length}`;
    } else {
        subNav.style.display = 'none';
    }
}

// Open lightbox
function openLightbox(index) {
    showImage(index, 0);
    
    // Show lightbox with fade
    lightbox.style.display = 'flex';
    lightbox.offsetHeight;
    lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.add('fade-out');
    setTimeout(() => {
        lightbox.classList.remove('active', 'fade-out');
        lightbox.style.display = 'none';
    }, 300);
}

// Navigate to next gallery item
function nextImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage(currentIndex, 0);
}

// Navigate to previous gallery item
function prevImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentIndex, 0);
}

// Navigate to next sub-image
function nextSubImage(e) {
    e.stopPropagation();
    if (currentImages.length > 1) {
        currentSubIndex = (currentSubIndex + 1) % currentImages.length;
        showImage(currentIndex, currentSubIndex);
    }
}

// Navigate to previous sub-image
function prevSubImage(e) {
    e.stopPropagation();
    if (currentImages.length > 1) {
        currentSubIndex = (currentSubIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex, currentSubIndex);
    }
}

// Add click listeners to all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Event listeners
prevArrow.addEventListener('click', prevImage);
nextArrow.addEventListener('click', nextImage);
subPrev.addEventListener('click', prevSubImage);
subNext.addEventListener('click', nextSubImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        // If multiple images in current item, navigate sub-images first
        if (currentImages.length > 1 && currentSubIndex < currentImages.length - 1) {
            nextSubImage(e);
        } else {
            nextImage(e);
        }
    } else if (e.key === 'ArrowLeft') {
        // If multiple images in current item, navigate sub-images first
        if (currentImages.length > 1 && currentSubIndex > 0) {
            prevSubImage(e);
        } else {
            prevImage(e);
        }
    }
});

// ── Portfolio Filtering ─────────────────────────────────────────────
const dynamicFilters = document.getElementById('dynamicFilters');
const filterToggle = document.getElementById('filterToggle');
const filterButtons = document.getElementById('filterButtons');

// Toggle filter menu
if (filterToggle && filterButtons) {
    filterToggle.addEventListener('click', () => {
        filterButtons.classList.toggle('collapsed');
        filterToggle.textContent = filterButtons.classList.contains('collapsed') 
            ? 'Filters ▼' 
            : 'Filters ▲';
    });
}

if (dynamicFilters) {
    // Extract all unique categories from captions
    const categories = new Set();
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const caption = img ? img.getAttribute('data-caption') : '';
        
if (caption) {
    const parts = caption.split('&').map(s => s.split(',')[0].trim());
    parts.forEach(part => {
        if (part) categories.add(part);
    });

        }
    });
    
    // Sort categories alphabetically
    const sortedCategories = Array.from(categories).sort();
    
    // Create filter buttons
    sortedCategories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'sort-btn';
        btn.textContent = category;
        btn.setAttribute('data-filter', category);
        dynamicFilters.appendChild(btn);
    });
    
    // Add click handlers to all filter buttons
    const allFilterBtns = document.querySelectorAll('.sort-controls .sort-btn');
    
    allFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            allFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const img = item.querySelector('img');
                const caption = img ? img.getAttribute('data-caption') : '';
                
                if (filter === 'all') {
                    item.style.display = '';
                } else {
                    // Check if caption contains the filter category
                    const parts = caption.split(/[&,]/).map(s => s.trim());
                    if (parts.includes(filter)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ── Back to top button ──────────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
