// Gallery data - Easy to modify
const galleryData = [
	{
		thumb: window.assetsPath + "4Austens-main.JPG",
		full: window.assetsPath + "4Austens-bottom.JPG",
		title: "Jane Austen Collection",
		medium: "Fore-Edge Painting",
		year: "2024"
	},
	{
		thumb: window.assetsPath + "Dune-aesthetic.JPG",
		full: window.assetsPath + "Dune-main.jpg",
		title: "Dune",
		medium: "Fore-Edge Painting",
		year: "2024"
	},
	{
		thumb: window.assetsPath + "KingArthur-main.jpg",
		full: window.assetsPath + "KingArthur-top.jpg",
		title: "Arthurian Myths and Legends",
		medium: "Fore-Edge Painting",
		year: "2024"
	},
	{
		thumb: window.assetsPath + "OrientExpress-main.jpg",
		full: window.assetsPath + "OrientExpress-main.jpg",
		title: "Murder on the Orient Express",
		medium: "Fore-Edge Painting",
		year: "2024"
	},
	{
		thumb: window.assetsPath + "WoO-aesthetic.jpg",
		full: window.assetsPath + "WoO-main.jpg",
		title: "The Wizard of Oz",
		medium: "Fore-Edge Painting",
		year: "2025"
	},
	{
		thumb: window.assetsPath + "Austen-stack.jpg",
		full: window.assetsPath + "Austen-stack-main.jpg",
		title: "Pride & Prejudice, Emma, Mansfield Park",
		medium: "Fore-Edge Painting",
		year: "2023"
	},
	{
		thumb: window.assetsPath + "LOTR-lothlorien-main.jpg",
		full: window.assetsPath + "LOTR-lothlorien-main.jpg",
		title: "Lord of the Rings",
		medium: "Fore-Edge Painting",
		year: "2023"
	},
	{
		thumb: window.assetsPath + "HHGTTG-main.jpg",
		full: window.assetsPath + "HHGTTG-main.jpg",
		title: "The Hitchhiker's Guide to the Galaxy",
		medium: "Fore-Edge Painting",
		year: "2023"
	},
	{
		thumb: window.assetsPath + "AiW-stack-main.jpg",
		full: window.assetsPath + "AiW-stack-top.jpg",
		title: "Alice's Adventures in Wonderland",
		medium: "Fore-Edge Painting",
		year: "2023"
	}
];

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

	galleryData.forEach(item => {
		const galleryItem = createGalleryItem(item);
		galleryGrid.appendChild(galleryItem);
	});
}

function createGalleryItem(item) {
	const galleryItem = document.createElement('div');
	galleryItem.className = 'gallery-item';
	galleryItem.onclick = () => openModal(item.full);

	galleryItem.innerHTML = `
        <img src="${item.thumb}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x250/667eea/ffffff?text=${encodeURIComponent(item.title)}'">
        <div class="gallery-item-info">
            <h3>${item.title}</h3>
            <p>${item.medium} • ${item.year}</p>
        </div>
    `;

	return galleryItem;
}

function openModal(imageSrc) {
	const modal = document.getElementById('modal');
	const modalImg = document.getElementById('modal-img');
	modal.style.display = 'flex';
	modalImg.src = imageSrc;
}

function closeModal() {
	const modal = document.getElementById('modal');
	modal.style.display = 'none';
}

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
	openModal,
	closeModal,
	handleSubmit
};