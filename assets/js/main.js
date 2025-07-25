// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
	initializeGallery();
	initializeNavigation();
	initializeScrollEffects();
	initializeAnimations();
});

// Gallery Functions
function initializeGallery() {
	const galleryGrid = document.getElementById('gallery-grid');
	galleryData.forEach((item, index) => {
		const galleryItem = createGalleryItem(item, index);
		galleryGrid.appendChild(galleryItem);
	});
}

function createGalleryItem(item, index) {
	const galleryItem = document.createElement('div');
	galleryItem.className = 'gallery-item';
	galleryItem.onclick = () => openGalleryModal(index);
	galleryItem.innerHTML = `
        <img src="${item.thumb}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x250/667eea/ffffff?text=${encodeURIComponent(item.title)}'">
        <div class="gallery-item-info">
            <h3>${item.title}<p>${item.author}</p></h3>
            <p>${item.year}</p>
        </div>
    `;
	return galleryItem;
}

// Global variables to track current gallery item and image within that item
let currentGalleryIndex = 0;
let currentImageIndex = 0;

// Open the gallery modal at a specific gallery item index
function openGalleryModal(galleryIndex = 0) {
	currentGalleryIndex = galleryIndex;
	currentImageIndex = 0; // Start with first image of the selected gallery item

	// Create modal if it doesn't exist
	let modal = document.getElementById('gallery-modal');
	if (!modal) {
		modal = createGalleryModal();
		document.body.appendChild(modal);
	}

	updateModalContent();
	modal.style.display = 'flex';
	document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Create the modal structure
function createGalleryModal() {
	const modal = document.createElement('div');
	modal.id = 'gallery-modal';
	modal.className = 'gallery-modal';

	modal.innerHTML = `
        <div class="modal-overlay" onclick="closeGalleryModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeGalleryModal()">&times;</button>
            
            <button class="modal-nav modal-prev" onclick="previousImage()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
            </button>
            
            <div class="modal-image-container">
                <img id="modal-image" src="" alt="" />
                <div class="modal-info">
                    <h3 id="modal-title"></h3>
                    <p id="modal-author"></p>
                    <p id="modal-year"></p>
                </div>
            </div>
            
            <button class="modal-nav modal-next" onclick="nextImage()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
            </button>
        </div>
    `;

	// Add touch/swipe support
	addSwipeSupport(modal);

	return modal;
}

// Update modal content with current image
function updateModalContent() {
	const currentGalleryItem = galleryData[currentGalleryIndex];
	const currentImage = currentGalleryItem.images[currentImageIndex];

	document.getElementById('modal-image').src = currentImage;
	document.getElementById('modal-image').alt = currentGalleryItem.title;
	document.getElementById('modal-title').textContent = currentGalleryItem.title;
	document.getElementById('modal-author').textContent = currentGalleryItem.author;
	document.getElementById('modal-year').textContent = currentGalleryItem.year;

	// Update navigation button states
	const prevBtn = document.querySelector('.modal-prev');
	const nextBtn = document.querySelector('.modal-next');

	if (prevBtn && nextBtn) {
		// Disable prev button if at first image of first gallery item
		const isFirstImage = currentGalleryIndex === 0 && currentImageIndex === 0;
		prevBtn.style.opacity = isFirstImage ? '0.5' : '1';

		// Disable next button if at last image of last gallery item
		const isLastGalleryItem = currentGalleryIndex === galleryData.length - 1;
		const isLastImageOfCurrentItem = currentImageIndex === currentGalleryItem.images.length - 1;
		const isLastImage = isLastGalleryItem && isLastImageOfCurrentItem;
		nextBtn.style.opacity = isLastImage ? '0.5' : '1';
	}
}

// Navigation functions
function nextImage() {
	const currentGalleryItem = galleryData[currentGalleryIndex];

	// If not at last image of current gallery item, go to next image
	if (currentImageIndex < currentGalleryItem.images.length - 1) {
		currentImageIndex++;
	}
	// If at last image of current gallery item, go to first image of next gallery item
	else if (currentGalleryIndex < galleryData.length - 1) {
		currentGalleryIndex++;
		currentImageIndex = 0;
	}
	// If at last image of last gallery item, do nothing

	updateModalContent();
}

function previousImage() {
	// If not at first image of current gallery item, go to previous image
	if (currentImageIndex > 0) {
		currentImageIndex--;
	}
	// If at first image of current gallery item, go to last image of previous gallery item
	else if (currentGalleryIndex > 0) {
		currentGalleryIndex--;
		const previousGalleryItem = galleryData[currentGalleryIndex];
		currentImageIndex = previousGalleryItem.images.length - 1;
	}
	// If at first image of first gallery item, do nothing

	updateModalContent();
}

// Close modal
function closeGalleryModal() {
	const modal = document.getElementById('gallery-modal');
	if (modal) {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto'; // Restore scrolling
	}
}

// Add swipe support for touch devices
function addSwipeSupport(modal) {
	let startX = 0;
	let startY = 0;
	let endX = 0;
	let endY = 0;

	const imageContainer = modal.querySelector('.modal-image-container');

	imageContainer.addEventListener('touchstart', (e) => {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	});

	imageContainer.addEventListener('touchend', (e) => {
		endX = e.changedTouches[0].clientX;
		endY = e.changedTouches[0].clientY;

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
document.addEventListener('keydown', (e) => {
	const modal = document.getElementById('gallery-modal');
	if (modal && modal.style.display === 'flex') {
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

// Navigation Functions
function initializeNavigation() {
	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}

// Scroll Effects
function initializeScrollEffects() {
	// Header background change on scroll
	window.addEventListener('scroll', function () {
		const header = document.querySelector('header');
		const navLinks = document.querySelectorAll('.nav-links a');
		const logo = document.querySelector('.logo');

		if (window.scrollY > 100) {
			header.style.background = 'rgba(255, 255, 255, 0.95)';
			header.style.backdropFilter = 'blur(10px)';
			logo.style.color = '#333';
			navLinks.forEach(link => {
				link.style.color = '#333';
			});
		} else {
			header.style.background = 'rgba(255, 255, 255, 0.1)';
			header.style.backdropFilter = 'blur(10px)';
			logo.style.color = 'white';
			navLinks.forEach(link => {
				link.style.color = 'white';
			});
		}
	});
}

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
				entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
			}
		});
	}, observerOptions);

	// Observe gallery items
	document.querySelectorAll('.gallery-item').forEach(item => {
		observer.observe(item);
	});
}

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', function () {
	// Close modal when clicking outside the image
	document.getElementById('modal').addEventListener('click', function (e) {
		if (e.target === this) {
			closeModal();
		}
	});

	// Close modal with Escape key
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
});

// Form Handling
function handleSubmit(event) {
	event.preventDefault();

	// Get form data
	const formData = new FormData(event.target);
	const name = formData.get('name');
	const email = formData.get('email');
	const message = formData.get('message');

	// Here you would typically send the data to your server
	// For now, we'll just show a success message
	alert(`Thank you, ${name}! I'll get back to you soon.`);

	// Reset the form
	event.target.reset();
}

// Utility Functions
function addGalleryItem(item) {
	galleryData.push(item);
	const galleryGrid = document.getElementById('gallery-grid');
	const newItem = createGalleryItem(item);
	galleryGrid.appendChild(newItem);
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