
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.forms-container');
    var flipButtons = document.querySelectorAll('.flip');

    // Flip forms between Sign in and Register
    flipButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        container.classList.toggle('flipped');
      });
    });

    // Smooth scrolling for "Learn more" and "Get started"
    var scrollLinks = document.querySelectorAll('.scroll');
    scrollLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').substring(1);
        var target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 50,
            behavior: 'smooth'
          });
        }
      });
    });

    // Header shadow effect on scroll
    var header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  });
})();
