// Array of quotes - add as many as you like!
const quotes = [
    "Dizzy my future, silly my way.",
    "High-quality, grade-A, prime-cut, 100% pure, New Zealand BS.",
    "Trying is the first step towards failure.",
    "Now 100% vermin free.",
    "Keep it foolish.",
    "Defined in more than 160 characters.",
    "Dollar value lost since 1913: 96.23%",
    "National debt: +$100,000 p/sec.",
    // More quotes here
];

// Check if user has already seen splash this session
function shouldShowSplash() {
    // If coming from another page on this site, skip splash
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        return false;
    }
    
    // If already seen this session, skip splash
    if (sessionStorage.getItem('splashSeen')) {
        return false;
    }
    
    return true;
}

// Randomly select a quote
const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

// Typing effect
function typeQuote() {
    const splashScreen = document.getElementById('homeSplash');
    
    // Check if we should show splash
    if (!shouldShowSplash()) {
        splashScreen.remove();
        return;
    }
    
    // Mark that splash has been seen this session
    sessionStorage.setItem('splashSeen', 'true');
    
    const quoteContainer = document.querySelector('.quote-text');
    
    let charIndex = 0;
    const typingSpeed = 50; // milliseconds per character
    
    function typeChar() {
        if (charIndex < selectedQuote.length) {
            quoteContainer.textContent += selectedQuote.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            // Typing complete - add cursor
            const cursor = document.createElement('span');
            cursor.className = 'quote-cursor';
            quoteContainer.appendChild(cursor);
            
            // Wait for cursor to blink a few times, then fade out
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                
                // Remove splash after fade completes
                setTimeout(() => {
                    splashScreen.remove();
                }, 1000);
            }, 2000); // 2 seconds of cursor blinking
        }
    }
    
    typeChar();
}

// Run on page load
window.addEventListener('load', typeQuote);
