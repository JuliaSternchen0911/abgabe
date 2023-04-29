console.log("menshcne sind toll");
function slideShow(){
    console.log("menshcne sind toll");
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLImageElement>;
    let currentSlide = 0;

    function showSlide() {
        // Setze alle Slides auf opacity 0, damit nur die aktive Slide sichtbar ist
        slides.forEach(slide => slide.classList.remove('active'));

        // Setze die aktive Slide auf opacity 1 und erhöhe currentSlide
        slides[currentSlide].classList.add('active');
        currentSlide = (currentSlide + 1) % slides.length;

        // Rufe showSlide() alle 3 Sekunden auf
        setTimeout(showSlide, 3000);
    }

    // Starte die Slideshow
    showSlide();
    
} 
export{slideShow}