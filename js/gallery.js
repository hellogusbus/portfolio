// Create lightbox element
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

// Create navigation arrows
const prevArrow = document.createElement('div');
prevArrow.className = 'lightbox-arrow lightbox-prev';
prevArrow.innerHTML = '‹';
lightbox.appendChild(prevArrow);

const nextArrow = document.createElement('div');
nextArrow.className = 'lightbox-arrow lightbox-next';
nextArrow.innerHTML = '›';
lightbox.appendChild(nextArrow);

// Create image container
const imageContainer = document.createElement('div');
imageContainer.className = 'lightbox-image-container';
lightbox.appendChild(imageContainer);

// Create caption element
const caption = document.createElement('div');
caption.className = 'lightbox-caption';
lightbox.appendChild(caption);

// Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item img');
let currentIndex = 0;

// Show image in lightbox
function showImage(index) {
    // Clone the clicked image
    const clonedImg = galleryItems[index].cloneNode(true);
    
    // Clear image container and add new image
    imageContainer.innerHTML = '';
    imageContainer.appendChild(clonedImg);
    
    // Update caption
    const captionText = galleryItems[index].getAttribute('data-caption');
    caption.textContent = captionText || '';
    caption.style.display = captionText ? 'block' : 'none';
    
    currentIndex = index;
}

// Open lightbox
function openLightbox(index) {
    showImage(index);
    
    // Show lightbox with fade
    lightbox.style.display = 'flex';
    // Trigger reflow to ensure transition works
    lightbox.offsetHeight;
    lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.add('fade-out');
    
    // Wait for fade out to complete, then hide
    setTimeout(() => {
        lightbox.classList.remove('active', 'fade-out');
        lightbox.style.display = 'none';
    }, 300);
}

// Navigate to next image
function nextImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage(currentIndex);
}

// Navigate to previous image
function prevImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentIndex);
}

// Add click listeners to all gallery images
galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Arrow click handlers
prevArrow.addEventListener('click', prevImage);
nextArrow.addEventListener('click', nextImage);

// Close lightbox when clicking on background (not on image, arrows, or caption)
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
        nextImage(e);
    } else if (e.key === 'ArrowLeft') {
        prevImage(e);
    }
});
