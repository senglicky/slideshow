import './style.css'

class Slideshow {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('dotsContainer');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    // Generate dots
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });

    this.dots = document.querySelectorAll('.dot');

    // Event Listeners for arrows
    this.prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoPlay();
    });

    this.nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    // Start auto play
    this.startAutoPlay();

    // Show initial slide
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    if (index >= this.slides.length) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex = index;
    }

    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      // Reset animations so they re-trigger
      slide.style.animation = 'none';
      slide.offsetHeight; /* trigger reflow */
      slide.style.animation = null;
    });

    // Remove active from all dots
    this.dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Show current slide and active dot
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  goToSlide(index) {
    this.showSlide(index);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

new Slideshow();
