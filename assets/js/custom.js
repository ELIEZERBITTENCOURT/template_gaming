"use strict";

// Page loading animation
window.addEventListener('load', function () {
    var preloader = document.getElementById('js-preloader');
    preloader.classList.add('loaded');
});

// Scroll event for header background
window.addEventListener('scroll', function () {
    var scroll = window.scrollY;
    var box = document.querySelector('.header-text').offsetHeight;
    var header = document.querySelector('header').offsetHeight;
    var headerElem = document.querySelector('header');

    if (scroll >= box - header) {
        headerElem.classList.add('background-header');
    } else {
        headerElem.classList.remove('background-header');
    }
});

// Window resize event for reload
var width = window.innerWidth;
window.addEventListener('resize', function () {
    if ((width > 767 && window.innerWidth < 767) || (width < 767 && window.innerWidth > 767)) {
        location.reload();
    }
});

// Isotope filtering
var elem = document.querySelector('.trending-box');
var filtersElem = document.querySelector('.trending-filter');

if (elem) {
    var rdnEventsList = new Isotope(elem, {
        itemSelector: '.trending-items',
        layoutMode: 'masonry'
    });

    if (filtersElem) {
        filtersElem.addEventListener('click', function (event) {
            if (!event.target.matches('a')) return;
            var filterValue = event.target.getAttribute('data-filter');
            rdnEventsList.arrange({
                filter: filterValue
            });

            var activeFilter = filtersElem.querySelector('.is_active');
            if (activeFilter) {
                activeFilter.classList.remove('is_active');
            }

            event.target.classList.add('is_active');
            event.preventDefault();
        });
    }
}

// Menu Dropdown Toggle
var menuTrigger = document.querySelector('.menu-trigger');
var nav = document.querySelector('.header-area .nav');

if (menuTrigger) {
    menuTrigger.addEventListener('click', function () {
        menuTrigger.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
var scrollLinks = document.querySelectorAll('.scroll-to-section a[href^="#"]:not([href="#"])');
scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        var targetId = link.getAttribute('href').substring(1);
        var target = document.getElementById(targetId);

        if (target) {
            var offset = target.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });

            if (menuTrigger && nav.classList.contains('active')) {
                menuTrigger.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });
});

// Parallax effect and page loading animation
window.addEventListener('load', function () {
    var cover = document.querySelector('.cover');
    if (cover) {
        cover.style.backgroundImage = 'url(' + cover.getAttribute('data-image') + ')';
    }

    var preloader = document.getElementById('js-preloader');
    preloader.style.opacity = '0';
    setTimeout(function () {
        preloader.style.visibility = 'hidden';
        preloader.style.display = 'none';
    }, 300);
});
