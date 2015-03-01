(function ($){

	var SwipeCarousel = {};

	SwipeCarousel = function ($container, options) {
		this.$container = $container;
		this.$carousel = $container.find('.jsc-carousel');
		this.$list = this.$carousel.find('ul');
		this.$items = this.$list.find('li');
		this.carouselWidth = this.$carousel.width();
		this.itemsLength = this.$items.length;

		this.$prev = $container.find('.jsc-carousel-prev');
		this.$next = $container.find('.jsc-carousel-next');

		this.currentIndex = 0;

		this.init();
	};
	SwipeCarousel.prototype = {
		init: function () {
			this.listSizing();
			this.swipeTrigger();
		},
		listSizing: function () {
			this.$list.width( this.carouselWidth * this.itemsLength );
		},
		swipeTrigger: function () {
			var self = this;

			this.$container.swipe({
				swipeStatus: function(event, phase, direction, distance, duration) {

					if ( phase == 'move' ) {
						if ( direction == 'left' ) {
							self.distance = distance;
							self.slideLeft();
						} else if ( direction == 'right') {
							self.distance = distance;
							self.slideRight();
						}
					} else if ( phase == 'end') {
						console.log(duration);
						if ( direction == 'left') {
							self.touchEndSlideLeft();
						} else if ( direction == 'right' ) {
							self.touchEndSlideRight();
						}
					}

				}
			});
		},
		slideLeft: function () {
			this.translateXPosition( -this.distance );
		},
		slideRight: function () {
			this.translateXPosition( this.distance );
		},
		touchEndSlideLeft: function () {
			var touchEndPositionLeft = this.$list.position().left;


			if ( -touchEndPositionLeft - (this.carouselWidth * this.currentIndex ) <  this.carouselWidth / 3 || this.currentIndex >= this.itemsLength - 1 ) {
				console.log(this.currentIndex);
				this.translateXAnimation( -this.carouselWidth * this.currentIndex );
			} else {
				this.currentIndex++;
				this.translateXAnimation( -this.carouselWidth * this.currentIndex );
			}

		},
		touchEndSlideRight: function () {
			var touchEndPositionLeft = this.$list.position().left;

			if ( -touchEndPositionLeft - (this.carouselWidth * this.currentIndex) >  -this.carouselWidth  / 3 || this.currentIndex <= 0 ) {
				this.translateXAnimation( -this.carouselWidth * this.currentIndex );
			} else {
				this.currentIndex--;
				this.translateXAnimation( -this.carouselWidth * this.currentIndex );
			}
		},
		translateXAnimation: function (distance) {
			var self = this;

			this.$list.addClass('transition').css({
				WebkitTransform : 'translateX(' + distance + 'px)',
				MozTransform : 'translateX(' + distance + 'px)',
				Transform : 'translateX(' + distance + 'px)'
			});
		},
		translateXPosition: function (distance) {
			var self = this,
				touchMovePositionLeft = this.currentIndex * -this.carouselWidth + distance;

			this.$list.removeClass('transition').css({
				WebkitTransform : 'translateX(' + touchMovePositionLeft + 'px)',
				MozTransform : 'translateX(' + touchMovePositionLeft + 'px)',
				Transform : 'translateX(' + touchMovePositionLeft + 'px)'
			});
		}

	};

	$.fn.swipeCarousel = function(options){
        return this.each(function(){
            new SwipeCarousel($(this), options);
        });
    };

})(jQuery);


$(function () {
	$('.jsc-carousel-container').swipeCarousel({
		a: 'aaa'
	});
});