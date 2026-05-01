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

var swiper = new Swiper(".featured-slider", {
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
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        991: { slidesPerView: 3 },
    },
});

// Dark/Light Mode 
// ===== DARK MODE TOGGLE =====
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Load saved preference or detect system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    document.body.classList.add('light-mode');
}

themeToggle.onclick = () => {
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        document.body.classList.replace('dark-mode', 'light-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
};


// ============================================================
// COMPLETE & BALANCED CALCULATOR LOGIC
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. OPEN / CLOSE LOGIC
    const calcOverlay = document.getElementById('calc-overlay');
    const openBtn = document.getElementById('open-calc');
    const closeBtn = document.getElementById('close-calc');

    if (openBtn) {
        openBtn.onclick = (e) => {
            e.preventDefault();
            calcOverlay.classList.add('active');
            
            // Auto-close mobile menu if it's open
            if (typeof navbar !== 'undefined') {
                navbar.classList.remove('active');
                if (typeof menu !== 'undefined') menu.classList.remove('fa-times');
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            calcOverlay.classList.remove('active');
        };
    }

    // 2. CALCULATOR STATE
    let current = '0';
    let previous = '';
    let operator = null;
    let freshInput = false;

    const resultEl = document.getElementById('calc-result');
    const expressionEl = document.getElementById('calc-expression');

    function updateDisplay() {
        if (!resultEl) return;
        resultEl.textContent = current.length > 10
            ? parseFloat(current).toExponential(4)
            : current;
    }

    function calculate() {
        const a = parseFloat(previous);
        const b = parseFloat(current);
        let res;
        if (operator === '+') res = a + b;
        else if (operator === '-') res = a - b;
        else if (operator === '*') res = a * b;
        else if (operator === '/') res = b !== 0 ? a / b : 'Error';
        
        current = res === 'Error' ? 'Error' : String(parseFloat(res.toFixed(10)));
        freshInput = true;
    }

    function displayOp(op) {
        return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
    }

    // 3. BUTTON CLICKS
    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const value = btn.dataset.value;

            if (action === 'number') {
                if (current === '0' || freshInput) {
                    current = value;
                    freshInput = false;
                } else {
                    if (current.length < 12) current += value;
                }
            } else if (action === 'decimal') {
                if (freshInput) { current = '0.'; freshInput = false; }
                else if (!current.includes('.')) current += '.';
            } else if (action === 'operator') {
                if (operator && !freshInput) calculate();
                previous = current;
                operator = value;
                freshInput = true;
                if (expressionEl) expressionEl.textContent = `${previous} ${displayOp(value)}`;
            } else if (action === 'equals') {
                if (!operator) return;
                if (expressionEl) expressionEl.textContent = `${previous} ${displayOp(operator)} ${current} =`;
                calculate();
                operator = null;
            } else if (action === 'clear') {
                current = '0'; previous = ''; operator = null; freshInput = false;
                if (expressionEl) expressionEl.textContent = '';
            } else if (action === 'sign') {
                current = String(parseFloat(current) * -1);
            } else if (action === 'percent') {
                current = String(parseFloat(current) / 100);
            }

            updateDisplay();
        });
    });

    // 4. KEYBOARD SUPPORT
    document.addEventListener('keydown', e => {
        if (!calcOverlay || !calcOverlay.classList.contains('active')) return;

        const map = {
            '0':'0','1':'1','2':'2','3':'3','4':'4',
            '5':'5','6':'6','7':'7','8':'8','9':'9',
            '+':'+','-':'-','*':'*','/':'/',
            'Enter':'=', '=':'=', 'Backspace':'back', '.':'.'
        };
        const key = map[e.key];
        if (!key) return;

        if (key === 'back') {
            current = current.length > 1 ? current.slice(0, -1) : '0';
            updateDisplay();
            return;
        }

        const btn = [...document.querySelectorAll('.calc-btn')].find(b =>
            (b.dataset.value === key) ||
            (key === '=' && b.dataset.action === 'equals') ||
            (key === '.' && b.dataset.action === 'decimal')
        );
        if (btn) btn.click();
    });
});// Calculator javascript ends



// Timer
// Set the date we're counting down to (7 days from now)
const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    // If finished
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);


// Sumini


var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
        delay: 9500,
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

document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    };
});
