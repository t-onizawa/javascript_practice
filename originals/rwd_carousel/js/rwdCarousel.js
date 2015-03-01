

var rwdCarousel = {};

rwdCarousel = {
	init: function (options) {
		this.$body = $('body');

		this.$target = $(options.target);

		this.optionSwipe = options.swipe;
		this.optionSwipeTrueWidth = options.swipeTrueWidth;

		this.optionPcLoop = options.pcLoop;
		this.optionPcIndicator = options.pcIndicator;

		this.$touchSwipeScript = $('<script src="'+ options.touchSwipeDirectory +'">');
		this.$spSwipeScript = $('<script src="'+ options.spSwipeDirectory +'">');
		this.$pcCarouselScript = $('<script src="' + options.pcCarouselScriptDirectory + '">');

		if ( this.optionSwipe && $(window).width() <= this.optionSwipeTrueWidth ) {
			this.appendSpScript(options);
		} else {
			this.appendPcScript(options);
		}
	},
	appendSpScript: function (options) {

		this.$body.append(this.$touchSwipeScript).append(this.$spSwipeScript);
		this.$pcCarouselScript.remove();

		this.$target.swipeCarousel({
			spIndicator: options.spIndicator,
			spClickButton: options.spClickButton,
			spTapDisplaySlide: options.spTapDisplaySlide,
			landscapeResize: options.landscapeResize
		});
	},
	appendPcScript: function (options) {

		this.$body.append(this.$pcCarouselScript);
		this.$touchSwipeScript.remove();
		this.$spSwipeScript.remove();

		this.$target.carousel({
			pcLoop: options.pcLoop,
			pcLoopDuraion: options.pcLoopDuraion,
			pcAnimationDuration: options.pcAnimationDuration,
			pcIndicator: options.pcIndicator,
			pcResize: options.pcResize
		});
	}
};


