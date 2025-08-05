// Initialize the website when DOM is loaded
$(document).ready(function () {
	initializeNavigation();
});

// Navigation Functions
function initializeNavigation() {
	// Smooth scrolling for navigation links
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		const $target = $($(this).attr('href'));
		if ($target.length) {
			$('html, body').animate({
				scrollTop: $target.offset().top
			}, 800);
		}
	});
}

// // Scroll Effects
// function initializeScrollEffects() {
// 	// Header background change on scroll
// 	$(window).on('scroll', function () {
// 		const $header = $('header');
// 		const $navLinks = $('.nav-links a');
// 		const $logo = $('.logo');

// 		if ($(window).scrollTop() > 100) {
// 			$header.css({
// 				'background': 'rgba(255, 255, 255, 0.95)',
// 				'backdrop-filter': 'blur(10px)'
// 			});
// 			$logo.css('color', '#333');
// 			$navLinks.css('color', '#333');
// 		} else {
// 			$header.css({
// 				'background': 'rgba(255, 255, 255, 0.1)',
// 				'backdrop-filter': 'blur(10px)'
// 			});
// 			$logo.css('color', 'white');
// 			$navLinks.css('color', 'white');
// 		}
// 	});
// }
