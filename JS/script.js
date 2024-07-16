// navbar

// sticky
window.addEventListener('scroll', function () {
    let navbar = document.getElementById('menu-bar');
    if (this.window.pageYOffset >= 10) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky")
    }
})

// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", () => {
    navbar.classList.toggle("showInput");
    if (navbar.classList.contains("showInput")) {
        searchBox.classList.replace("bx-search", "bx-x");
    } else {
        searchBox.classList.replace("bx-x", "bx-search");
    }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function () {
    navLinks.style.left = "0";
}
menuCloseBtn.onclick = function () {
    navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function () {
    navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function () {
    navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function () {
    navLinks.classList.toggle("show3");
}

// navbar end


// Home-Section
let currentIndex = 0;
const items = document.querySelectorAll('.carousel_item');
const totalItems = items.length;

window.addEventListener('load', () => {
    startAutoSlide();

    document.querySelector('.carousel_control__next').addEventListener('click', () => {
        slideTo(currentIndex + 1);
        resetAutoSlide();
    });

    document.querySelector('.carousel_control__prev').addEventListener('click', () => {
        slideTo(currentIndex - 1);
        resetAutoSlide();
    });

    document.querySelectorAll('.carousel_dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideTo(index);
            resetAutoSlide();
        });
    });
});

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        slideTo(currentIndex + 1);
    }, 3000); // slide speed = 3s
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function slideTo(index) {
    if (index >= totalItems) {
        index = 0;
    } else if (index < 0) {
        index = totalItems - 1;
    }
    const carouselInner = document.querySelector('.carousel_inner');
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.carousel_dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('carousel_dot__active', index === currentIndex);
    });
}

// home-section end


// aboutus-section
// wrapper

let options = {
    startAngle: -1.55,
    size: 150,
    value: 0.95,
    fill: { gradient: ['#1a641a', '#41ae41'] }
}
$(".circle .bar").circleProgress(options).on('circle-animation-progress',
    function (event, progress, stepValue) {
        $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
    });
$(".js .bar").circleProgress({
    value: 0.80
});
$(".react .bar").circleProgress({
    value: 0.75
});
// about-section end

// category section
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".DOORS .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

// category-section end

// testimonial-section
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        const rating = Array.from(star.parentNode.children).indexOf(star) + 1;
        const stars = star.parentNode.children;

        for (let i = 0; i < stars.length; i++) {
            if (i < rating) {
                stars[i].textContent = '★';
            } else {
                stars[i].textContent = '☆';
            }
        }
    });
});


// product-Section
// Select relevant HTML elements
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

// Function to filter cards based on filter buttons
const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
        if (card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));
// product-Section end



// Scroll Reveal Animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
})

sr.reveal(` .image-cat, .card-1, .pic, .brand-image`, { interval: 100, })

sr.reveal(`.info-item, .social-media, .door-heading, h2,h4, h5,.footer-col, .testimonial-heading, .about-team`, { origin: 'left' })
sr.reveal(`.p,.hire,.col-12`, { origin: 'right' })

