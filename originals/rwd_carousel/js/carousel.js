(function ($){

	var Carousel = function ($this, options) {
		this.$win = $(window);
		this.$container = $this;
		this.$contents = this.$container.find('.jsc-carousel-contents');
		this.$list = this.$contents.find('ul');
		this.$items = this.$list.find('li');
		this.itemsLength = this.$items.length;
		this.$prev = this.$contents.find('.jsc-carousel-prev');
		this.$next = this.$contents.find('.jsc-carousel-next');

		this.optionLoop = options.pcLoop;
		this.optionLoopDuration = options.pcLoopDuraion;
		this.optionAnimationDuration = options.pcAnimationDuration;
		this.optionIndicator = options.pcIndicator;
		this.optionResize = options.pcResize;
		
		this.init();
	};
	Carousel.prototype = {
		init: function () {
			this.defaultIndex = 0;
			this.currentIndex = 0;

			this.sizing();
			if ( this.optionResize ) {
				this.$win.on('resize', $.proxy(function () {
					this.sizing();
					this.$list.css({
						left: -this.carouselWidth * this.currentIndex
					});
				}, this));
			}

			if ( this.optionIndicator ) {
				this.createIndicator();
			}
			
			if ( this.optionLoop ) {
				this.createTwiceItems();
				this.intervalSlide();
				this.$prev.on('mouseout', $.proxy(function () {
					this.intervalSlide();
				}, this));
				this.$next.on('mouseout', $.proxy(function () {
					this.intervalSlide();
				}, this));
				this.$indicatorContainer.on('mouseout', $.proxy(function () {
					this.intervalSlide();
				}, this));
			} else {
				this.clickButtonDisplay();
			}

			this.clickTrigger();
			
		},
		sizing: function () {
			this.carouselWidth = this.$container.width();
			this.carouselHeight = this.$contents.height();

			this.$items.width(this.carouselWidth).height(this.carouselHeight);
			this.$list.width(this.carouselWidth * this.itemsLength * 2);


			this.winWidth = this.$win.width();
		},
		createIndicator: function () {
			var indicators = [];

			this.$indicatorContainer = $('<ul class="indicator" />');

			for ( var i = 0; i < this.itemsLength; i++ ) {
				indicators.push('<li><a href="javascript:void(0);"></a></li>');
			}
			this.$indicatorContainer[0].innerHTML = indicators.join('');
			this.$container.append(this.$indicatorContainer);

			this.indicatorIndex = this.currentIndex;
			this.$indicatorItems = this.$indicatorContainer.find('li');
			this.$indicatorItems.eq(this.indicatorIndex).addClass('current');
		},
		createTwiceItems: function () {
			this.$items.clone().appendTo(this.$list);
			this.$items = this.$list.find('li');
		},
		slide: function () {
			var self = this,
				differenceNumber = 0;

			this.indicatorIndex = this.currentIndex;

			if ( this.defaultIndex < this.currentIndex ) {
				differenceNumber = this.currentIndex - this.defaultIndex;
				

				if ( this.currentIndex > this.itemsLength ) {
					this.$list.css({
						left: 0
					});
					this.currentIndex = 1;
					this.indicatorIndex = this.currentIndex;
				}
				
				this.$list.animate({
					left: '-=' + this.carouselWidth * differenceNumber
				}, this.pcAnimationDuration);

			} else if ( this.defaultIndex > this.currentIndex ) {
				differenceNumber = this.defaultIndex - this.currentIndex;

				if ( this.currentIndex == -1 ) {
					this.$list.css({
						left: -this.carouselWidth * this.itemsLength
					});
					this.currentIndex = this.itemsLength - 1;
				}

				this.$list.animate({
					left: '+=' + this.carouselWidth * differenceNumber
				}, this.pcAnimationDuration);
			}

			if ( this.indicatorIndex > this.itemsLength ) {
				this.indicatorIndex = this.indicatorIndex - this.itemsLength;
			} else if ( this.indicatorIndex == this.itemsLength ) {
				this.indicatorIndex = 0;
			}

			
			this.$indicatorItems.removeClass('current');
			this.$indicatorItems.eq(this.indicatorIndex).addClass('current');

			this.defaultIndex = this.currentIndex;

			if ( !this.optionLoop ) {
				this.clickButtonDisplay();
			}

		},
		intervalSlide: function () {

			var self = this;
			var interval = setInterval( function () {
				self.currentIndex++;
				self.slide();
			}, self.optionLoopDuration);
			
			this.$prev.on('mouseover', function () {
				clearInterval(interval);
			});
			this.$next.on('mouseover', function () {
				clearInterval(interval);
			});
			this.$indicatorContainer.on('mouseover', function () {
				clearInterval(interval);
			});

		},
		clickButtonDisplay: function () {
			if ( this.currentIndex === 0 ) {
				this.$prev.hide();
			} else if ( this.currentIndex == this.itemsLength - 1 ) {
				this.$next.hide();
			} else {
				this.$prev.show();
				this.$next.show();
			}

		},
		slideLeft: function () {
			if ( this.$list.is(':animated') ) {
				return;
			}
			this.currentIndex++;
			this.slide();
		},
		slideRight: function () {
			if ( this.$list.is(':animated') ) {
				return;
			}
			this.currentIndex--;
			this.slide();
		},
		clickTrigger: function () {
			var self = this;

			this.$prev.on('click', $.proxy(function () {
				this.slideRight();
			}, this));
			this.$next.on('click', $.proxy(function () {
				this.slideLeft();
			}, this));
			this.$indicatorItems.find('a').on('click', function () {
				self.currentIndex = $(this).parent().index();
				self.slide();
			});
		}
	};
	

	$.fn.carousel = function(options){
		return this.each(function(){
			new Carousel($(this), options);
		});
	};

})(jQuery);


