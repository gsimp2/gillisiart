// Initialize the website when DOM is loaded
$(document).ready(function () {
	initializeGallery();
	initializeNavigation();
	initializeScrollEffects();
	initializeAnimations();
});

// Gallery Functions
function initializeGallery() {
	const $galleryGrid = $('#gallery-grid');
	galleryData.forEach((item, index) => {
		const $galleryItem = createGalleryItem(item, index);
		$galleryGrid.append($galleryItem);
	});
}

function createGalleryItem(item, index) {
	const $galleryItem = $('<div>')
		.addClass('gallery-item')
		.on('click', () => openGalleryModal(index));

	$galleryItem.html(`
        <img src="${item.thumb}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x250/667eea/ffffff?text=${encodeURIComponent(item.title)}'">
        <div class="gallery-item-info">
			<div>
				<h3 class="gallery-title">${item.title}</h3>
				<p class="gallery-author">${item.author}</p>
			</div>
			<p class="gallery-year">${item.year}</p>
		</div>
    `);

	return $galleryItem;
}

// Global variables to track current gallery item and image within that item
let currentGalleryIndex = 0;
let currentImageIndex = 0;

// Open the gallery modal at a specific gallery item index
function openGalleryModal(galleryIndex = 0) {
	currentGalleryIndex = galleryIndex;
	currentImageIndex = 0; // Start with first image of the selected gallery item

	// Create modal if it doesn't exist
	let $modal = $('#gallery-modal');
	if ($modal.length === 0) {
		$modal = createGalleryModal();
		$('body').append($modal);
	}

	updateModalContent();
	$modal.css('display', 'flex');
	$('body').css('overflow', 'hidden'); // Prevent background scrolling
}

// Create the modal structure
function createGalleryModal() {
	const $modal = $('<div>')
		.attr('id', 'gallery-modal')
		.addClass('gallery-modal');

	$modal.html(`
        <div class="modal-overlay"></div>
            <button class="modal-close">&times;</button>
            
            <button class="modal-nav modal-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
            </button>
            
            <div class="modal-image-container">
                <img id="modal-image" src="" alt="" />
                <div class="modal-info">
					<div>
						<h3 class="gallery-title" id="modal-title"></h3>
						<p class="gallery-author" id="modal-author"></p>
					</div>
					<p class="gallery-year" id="modal-year"></p>
                </div>
            </div>
            
            <button class="modal-nav modal-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
            </button>
        </div>
    `);

	// Event listeners
	$modal.find('.modal-overlay').on('click', closeGalleryModal);
	$modal.find('.modal-close').on('click', closeGalleryModal);
	$modal.find('.modal-prev').on('click', previousImage);
	$modal.find('.modal-next').on('click', nextImage);

	// Add touch/swipe support
	addSwipeSupport($modal);

	return $modal;
}

// Update modal content with current image
function updateModalContent() {
	const currentGalleryItem = galleryData[currentGalleryIndex];
	const currentImage = currentGalleryItem.images[currentImageIndex];

	$('#modal-image').attr('src', currentImage).attr('alt', currentGalleryItem.title);
	$('#modal-title').text(currentGalleryItem.title);
	$('#modal-author').text(currentGalleryItem.author);
	$('#modal-year').text(currentGalleryItem.year);

	// Update navigation button states
	const $prevBtn = $('.modal-prev');
	const $nextBtn = $('.modal-next');

	if ($prevBtn.length && $nextBtn.length) {
		// Disable prev button if at first image of current gallery item
		const isFirstImage = currentImageIndex === 0;
		$prevBtn.css('opacity', isFirstImage ? '0.5' : '1');

		// Disable next button if at last image of current gallery item
		const isLastImage = currentImageIndex === currentGalleryItem.images.length - 1;
		$nextBtn.css('opacity', isLastImage ? '0.5' : '1');
	}
}

// Navigation functions - only navigate within current gallery item
function nextImage() {
	const currentGalleryItem = galleryData[currentGalleryIndex];

	// Only go to next image if not at last image of current gallery item
	if (currentImageIndex < currentGalleryItem.images.length - 1) {
		currentImageIndex++;
		updateModalContent();
	}
}

function previousImage() {
	// Only go to previous image if not at first image of current gallery item
	if (currentImageIndex > 0) {
		currentImageIndex--;
		updateModalContent();
	}
}

// Close modal
function closeGalleryModal() {
	const $modal = $('#gallery-modal');
	if ($modal.length) {
		$modal.css('display', 'none');
		$('body').css('overflow', 'auto'); // Restore scrolling
	}
}

// Add swipe support for touch devices
function addSwipeSupport($modal) {
	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;

	const $imageContainer = $modal.find('.modal-image-container');

	$imageContainer.on('touchstart', function (e) {
		startX = e.originalEvent.touches[0].clientX;
		startY = e.originalEvent.touches[0].clientY;
	});

	$imageContainer.on('touchend', function (e) {
		endX = e.originalEvent.changedTouches[0].clientX;
		endY = e.originalEvent.changedTouches[0].clientY;

		const deltaX = startX - endX;
		const deltaY = startY - endY;

		// Only swipe if horizontal movement is greater than vertical
		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
			if (deltaX > 0) {
				nextImage(); // Swipe left - next image
			} else {
				previousImage(); // Swipe right - previous image
			}
		}
	});
}

// Keyboard navigation
$(document).on('keydown', function (e) {
	const $modal = $('#gallery-modal');
	if ($modal.length && $modal.css('display') === 'flex') {
		switch (e.key) {
			case 'ArrowLeft':
				previousImage();
				break;
			case 'ArrowRight':
				nextImage();
				break;
			case 'Escape':
				closeGalleryModal();
				break;
		}
	}
});

// Modal Event Listeners
$(document).ready(function () {
	// Close modal when clicking outside the image
	$(document).on('click', '#modal', function (e) {
		if (e.target === this) {
			closeModal();
		}
	});

	// Close modal with Escape key (handled above in keyboard navigation)
});


// Animation Functions
function initializeAnimations() {
	// Intersection Observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				$(entry.target).css('animation', 'fadeInUp 0.8s ease forwards');
			}
		});
	}, observerOptions);

	// Observe gallery items
	$('.gallery-item').each(function () {
		observer.observe(this);
	});
}

// Utility Functions
function addGalleryItem(item) {
	galleryData.push(item);
	const $galleryGrid = $('#gallery-grid');
	const $newItem = createGalleryItem(item, galleryData.length - 1);
	$galleryGrid.append($newItem);
}

function updateGalleryItem(index, updatedItem) {
	if (index >= 0 && index < galleryData.length) {
		galleryData[index] = updatedItem;
		initializeGallery(); // Refresh gallery
	}
}

// Export functions for potential use in other files
window.portfolioFunctions = {
	addGalleryItem,
	updateGalleryItem,
	handleSubmit
};