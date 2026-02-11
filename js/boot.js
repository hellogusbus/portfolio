// Add booting class to body
document.body.classList.add('booting');

// Boot sequence messages with custom delays (in milliseconds)
const bootMessages = [
    { text: 'C:\\> GUSIFY.EXE', delay: 150 },
    { text: 'Loading system files...', delay: 300 },
    { text: 'Initializing payment protocols...', delay: 400 },
    { text: 'CONFIG.SYS loaded', delay: 100 },
    { text: 'ARTIST_COMPENSATION.DLL ... FAIL', delay: 200 },
    { text: 'CEO_COMPENSATION.DLL ... OK', delay: 100 },
    { text: '', delay: 200 },
    { text: 'Allocating memory: 640K', delay: 150 },
    { text: 'Artist royalty rate: $0.003/stream', delay: 250 },
    { text: 'CEO salary: $47,000,000/year', delay: 250 },
    { text: '', delay: 150 },
    { text: 'Spotify: $0.004/stream', delay: 120 },
    { text: 'Apple Music: $0.01/stream', delay: 120 },
    { text: 'Gusify: CURATING....', delay: 200 },
    { text: '', delay: 200 },
    { text: 'Shareholder dividends: MAXIMIZED', delay: 150 },
    { text: 'Artist status: EXPLOITED', delay: 250 },
    { text: '', delay: 300 },
    { text: 'Loading catalogue...', delay: 500 },
    { text: '104 albums found', delay: 150 },
    { text: 'Mounting revenue extraction system...', delay: 150 },
    { text: 'SYSTEM READY', delay: 500 }
];

// Display boot sequence
function displayBootSequence() {
    const bootScreen = document.getElementById('bootScreen');
    const bootContent = bootScreen.querySelector('.boot-content');
    const splashScreen = document.getElementById('splashScreen');
    
    let totalDelay = 0;
    
    bootMessages.forEach((item, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.textContent = item.text;
            
            // Styling rules
            if (item.text.includes('FAIL')) {
                line.style.color = '#ff0000';
            } else if (item.text.includes('OK') || item.text.includes('READY')) {
                line.style.color = '#00ff00';
                line.style.fontWeight = 'bold';
            } else if (item.text.includes('CURATING....') || item.text.includes('MAXIMIZED')) {
                line.style.color = '#ffff00';
            } else if (item.text.includes('EXPLOITED')) {
                line.style.color = '#ff6600';
            }
            
            bootContent.appendChild(line);
            
            // Scroll to bottom
            bootScreen.scrollTop = bootScreen.scrollHeight;
            
            // If last message → show blinking cursor → then splash
            if (index === bootMessages.length - 1) {
                const cursor = document.createElement('span');
                cursor.className = 'boot-cursor';
                bootContent.appendChild(cursor);
                
                // Wait while cursor blinks
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    bootScreen.remove();
                    splashScreen.classList.remove('hidden');
                    splashScreen.classList.add('active');
                    
                    // Fade out splash after 2 seconds
                    setTimeout(() => {
                        splashScreen.classList.add('fade-out');
                        setTimeout(() => {
                            splashScreen.remove();
                            // Remove booting class to show header and content
                            document.body.classList.remove('booting');
                        }, 500);
                    }, 2000);
                }, 2400); // blinking pause length
            }
        }, totalDelay);
        
        totalDelay += item.delay;
    });
}

// Run boot sequence on page load
window.addEventListener('load', displayBootSequence);