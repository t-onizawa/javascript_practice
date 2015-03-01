(function ($){

	var SwipeCarousel = {};

	SwipeCarousel = function ($container, options) {
		this.$win = $(window);
		this.$container = $container;
		this.$carousel = $container.find('.jsc-carousel-contents');
		this.$list = this.$carousel.find('ul');
		this.$items = this.$list.find('li');
		this.itemsLength = this.$items.length;

		this.optionIndicator = options.spIndicator;
		this.optionClickButton = options.spClickButton;
		this.optionTapDisplaySlide = options.spTapDisplaySlide;
		this.optionLandscapeResize = options.landscapeResize;

		this.$prev = $container.find('.jsc-carousel-prev');
		this.$next = $container.find('.jsc-carousel-next');

		this.currentIndex = 0;

		this.init();
	};
	SwipeCarousel.prototype = {
		init: function () {
			this.listSizing();
			this.swipeTrigger();

			this.clickButtonDisplay();
			this.clickButtonTrigger();

			if ( this.optionIndicator ) {
				this.createIndicator();
			}

			if ( this.optionTapDisplaySlide ) {
				this.createCssDisplayBtn();
			}

			if ( this.optionLandscapeResize ) {
				this.landscapeResize();
			}
		},
		createIndicator: function () {
			var indicators = [];

			this.$indicatorContainer = $('<ul class="indicator" />');

			for ( var i = 0; i < this.itemsLength; i++ ) {
				indicators.push('<li><a href="javascript:void(0);"></a></li>');
			}
			this.$indicatorContainer[0].innerHTML = indicators.join('');
			this.$container.append(this.$indicatorContainer);

			this.$indicatorItems = this.$indicatorContainer.find('li');
			this.$indicatorItems.eq(this.currentIndex).addClass('current');
		},
		listSizing: function () {
			this.carouselWidth = this.$carousel.width();
			this.carouselHeight = this.$carousel.height();
			this.$list.width( this.carouselWidth * this.itemsLength );
			this.$items.width(this.carouselWidth).height(this.carouselHeight);
		},
		landscapeResize: function () {
			this.$win.on('resize', $.proxy(function () {
				this.listSizing();
				this.translateXPosition(0);
			}, this));
		},
		swipeTrigger: function () {
			var self = this;

			this.$container.swipe({
				swipeStatus: function(event, phase, direction, distance, duration) {

					if ( phase == 'move' ) {

						switch (direction) {
							case 'left':
							self.distance = distance;
							self.slideLeft();
							break;

							case 'right':
							self.distance = distance;
							self.slideRight();
							break;

							case 'up':
							self.distance = distance;
							self.scrollWindow();
							break;

							case 'down':
							self.distance = -distance;
							self.scrollWindow();
							break;
						}

					} else if ( phase == 'end') {
						if ( direction == 'left') {
							self.touchEndSlideLeft();
						} else if ( direction == 'right' ) {
							self.touchEndSlideRight();
						}
					}

				}
			});
		},
		scrollWindow: function () {
			var scrollTopPosition = this.$win.scrollTop() + this.distance;
			this.$win.scrollTop(scrollTopPosition);
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

			this.$indicatorItems.removeClass('current');
			this.$indicatorItems.eq(this.currentIndex).addClass('current');

			this.clickButtonDisplay();
		},
		translateXPosition: function (distance) {
			var self = this,
				touchMovePositionLeft = this.currentIndex * -this.carouselWidth + distance;

			this.$list.removeClass('transition').css({
				WebkitTransform : 'translateX(' + touchMovePositionLeft + 'px)',
				MozTransform : 'translateX(' + touchMovePositionLeft + 'px)',
				Transform : 'translateX(' + touchMovePositionLeft + 'px)'
			});

		},
		clickButtonDisplay: function () {
			if ( this.optionClickButton ) {
				if ( this.currentIndex === 0 ) {
				this.$prev.hide();
				} else if ( this.currentIndex == this.itemsLength - 1 ) {
					this.$next.hide();
				} else {
					this.$prev.show();
					this.$next.show();
				}
			} else {
				this.$prev.hide();
				this.$next.hide();
			}

		},
		clickButtonTrigger: function () {
			this.$prev.on('click', $.proxy(function () {
				this.currentIndex--;
				this.translateXAnimation( -this.carouselWidth * this.currentIndex );
			}, this));
			this.$next.on('click', $.proxy(function () {
				this.currentIndex++;
				this.translateXAnimation( -this.carouselWidth * this.currentIndex );
			}, this));
		},
		createCssDisplayBtn: function () {
			var listHeight = this.$list.height();

			this.$prev.addClass('spTapDisplay').css('line-height', listHeight + 'px' );
			this.$next.addClass('spTapDisplay').css('line-height', listHeight + 'px' );

		}
	};

	$.fn.swipeCarousel = function(options){
        return this.each(function(){
            new SwipeCarousel($(this), options);
        });
    };

})(jQuery);
