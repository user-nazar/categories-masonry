"use strict"

function imagesInit() {
	const images = document.querySelectorAll('.article__image');
	if (images.length) {
		images.forEach(image => {
			const imageItem = image.querySelector('img');
			const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
			image.style.paddingBottom = `${padding}%`;
			imageItem.classList.add('init');
		});
	}
}


function gridInit() {
	const items = document.querySelector('.articles__items');
	const itemsGrid = new Isotope(items, {
		itemSelector: '.article',
		masonry: {
			fitWidth: true,
			gutter: 20
		}
	});

	document.addEventListener('click', documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.closest('.filter-articles__item')) {
			const filterItem = targetElement.closest('.filter-articles__item');
			const filterValue = filterItem.dataset.filter;
			const filterActiveItem = document.querySelector('.filter-articles__item.active');
			filterValue === "*" ? itemsGrid.arrange({filter: ``}) : 
				itemsGrid.arrange({filter: `[data-filter="${filterValue}"]`})


			filterActiveItem.classList.remove('active');
			filterItem.classList.add('active');


			e.preventDefault();
		}
	}
}

window.addEventListener('load', windowLoad);

function windowLoad() {
	imagesInit();
	gridInit();
}

window.addEventListener('DOMContentLoaded', function () {
    const articles = document.querySelectorAll('.articles__item');

    articles.forEach(function (article) {
        const image = article.querySelector('.article__image');
        const text = article.querySelector('.article__text');
        const date = article.querySelector('.article__date');
        const title = article.querySelector('.article__title');
        let hoverCount = 0;
        let isHidden = false;

        image.addEventListener('mouseenter', function () {
            hoverCount++;

            if (hoverCount <= 3) {
                const opacity = 1 - (hoverCount * 0.2);
                image.style.transition = 'opacity 0.5s';
                image.style.opacity = opacity.toFixed(1);
            } else if (hoverCount === 4 && !isHidden) {
                image.style.display = 'none';
                text.style.display = 'none';
                date.style.display = 'none';
                title.style.display = 'none';
                isHidden = true;
            }
        });

        article.addEventListener('mouseleave', function () {
            if (!isHidden) {
                image.style.display = 'block';
                text.style.display = 'block';
                date.style.display = 'block';
                title.style.display = 'block';
            }
        });
    });
});


