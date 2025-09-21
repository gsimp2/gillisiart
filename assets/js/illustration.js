// Initialize the website when DOM is loaded
$(document).ready(function () {
	initializeGallery();
});

// Gallery Functions
function initializeGallery() {
	const $column1 = $('#column1');
	const $column2 = $('#column2');
	const $column3 = $('#column3');
	illustrationData.forEach((item, index) => {
		const $galleryItem = createGalleryItem(item);
		if (index % 3 == 0) {
			$column1.append($galleryItem);
		}
		else if (index % 3 == 1) {
			$column2.append($galleryItem);
		}
		else {
			$column3.append($galleryItem);
		}
	});
}

function createGalleryItem(item) {
	const $galleryItem = $('<div>')
		.addClass('gallery-item mb-3');

	$galleryItem.html(`
        <img src="${item.image}" 
             alt="${item.title}" 
             class="img-fluid w-100" 
             onerror="this.src='https://via.placeholder.com/300x250/667eea/ffffff?text=${encodeURIComponent(item.title)}'">
    `);

	return $galleryItem;
}