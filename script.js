let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar"); 

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () =>{
    document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick = () =>{
    document.querySelector('.login-form-container').classList.remove('active');
}
window.onscroll = () => {

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }

    // CLOSE MENU ON SCROLL
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

window.onload = () => {
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}

window.onresize = () => {
    // If the window is resized to desktop width
    if(window.innerWidth > 768){
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
}


document.querySelector('.home').onmousemove = (e) =>{
    document.querySelectorAll('.home-parallax').forEach(elm =>{
        let speed = elm.getAttribute('data-speed');
        let x = (window.innerWidth - e.pageX * speed) / 90;
        let y = (window.innerHeight - e.pageY * speed) / 90;

        elm.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

document.querySelector('.home').onmouseleave = () =>{
    document.querySelectorAll('.home-parallax').forEach(elm =>{
        elm.style.transform = `translateX(0px) translateY(0px)`;
    });
}


// Vehicles Slider Initialization
var swiper = new Swiper(".vehicles-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});