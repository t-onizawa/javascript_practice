var PRC = window.PRC || {};

var OPTION = {
	duration: 500,
	easing : 'swing'
};

	var $carouselContainer = $('#jsi-carousel-container'),
		$carouselImg  = $carouselContainer.find('li'),
		carouselImgWidth = $carouselImg.width(),
		carouselImgLength = $carouselImg.size(),
		leftPosition = 0,
		rightPosition = carouselImgWidth * carouselImgLength - carouselImgWidth,
		defaultPosition = $carouselContainer.position().left,
		slidedPositon = 0,
		$prev = $('#jsi-prev'),
		$next = $('#jsi-next');
		console.log(carouselImgWidth);
		console.log(carouselImgLength);
		console.log(rightPosition);

	var showHide = function () {
		if ( defaultPosition == leftPosition ) {
			$prev.hide();
		} else if ( -defaultPosition ==  rightPosition ) {
			$next.hide();
		} else {
			$prev.show();
			$next.show();
		}
	};
	showHide();
	var slideLeft = function () {
		if ($prev.is(':hidden')) {
			return;
		}
		slidedPositon = defaultPosition + 800;
		$carouselContainer.animate({
				'left': slidedPositon
			});
		defaultPosition = slidedPositon;
	};
	var slideRight = function () {
		if ($next.is(':hidden')) {
			return;
		}
		slidedPositon = defaultPosition - 800;
		$carouselContainer.animate({
			'left': slidedPositon
		});
		defaultPosition = slidedPositon;
	};
	$prev.on('click', function () {
		showHide();
		slideleft();
	});
	$next.on('click', function () {
		showHide();
		slideRight();
	});
	

$(function () {
	alert('途中')
});