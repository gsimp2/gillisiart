$(document).ready(function () {
	initializeGallery();
});

// Gallery Functions
function initializeGallery() {
	const $mainContainer = $('#galleryContainer');
	const $wwContainer = $('#wonderwoman');

	illustrationData.forEach((item) => {
		const $galleryItem = createGalleryItem(item);

		// Check if title starts with "WW"
		if (item.title && item.title.startsWith('WW')) {
			$wwContainer.append($galleryItem);
		} else {
			$mainContainer.append($galleryItem);
		}
	});

	// Initialize Masonry for main gallery
	if ($mainContainer.children().length > 0) {
		imagesLoaded($mainContainer, function () {
			new Masonry($mainContainer[0], {
				itemSelector: '.gallery-item',
				columnWidth: '.gallery-item',
				percentPosition: true,
				gutter: 15
			});
		});
	}

	// Initialize Masonry for Wonder Woman gallery
	if ($wwContainer.length > 0 && $wwContainer.children().length > 0) {
		imagesLoaded($wwContainer, function () {
			new Masonry($wwContainer[0], {
				itemSelector: '.gallery-item',
				columnWidth: '.gallery-item',
				percentPosition: true,
				gutter: 15
			});
		});
	}
}

function createGalleryItem(item) {
	const $galleryItem = $('<div>')
		.addClass('gallery-item');
	$galleryItem.html(`
        <img src="${item.image}"
             alt="${item.title}"
             class="w-100"
             loading="lazy"
             decoding="async"
             onerror="this.src='https://via.placeholder.com/300x250/667eea/ffffff?text=${encodeURIComponent(item.title)}'">
    `);
	return $galleryItem;
}