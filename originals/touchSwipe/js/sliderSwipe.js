(function ($){

    var Carousel = window.Carousel || {};

    Carousel = function($container, options){
        this.$win = $(window);
        this.$container = $container;
        this.$carousel = $container.find('.jsc-carousel');
        this.$list = $container.find('ul');
        this.$items = $container.find('li');
        this.$prev = $container.find('.jsc-prev');
        this.$next = $container.find('.jsc-next');
        this.$itemsLength = this.$items.length;

        this.currentIndex = 0;
        this.defaultIndex = 0;
        this.differenceNumber = 0;

        this.optionTouchSwipe = options.touchSwipe;
        this.optionSwipeButton = options.swipeButton;
        this.optionIndicator = options.indicator;
        this.optionResize = options.resize;
        this.optionEasing = options.easing;
        this.optionDuration = options.duration;

        this.init();
   };
   Carousel.prototype = {
        init : function () {
            var self = this;

            if ( this.optionResize ) {
                this.$win.on('load resize', function () {
                    windowWidth = self.sizing();
                    self.swipeFlag(windowWidth);
                });
            }

            if ( this.optionIndicator ) {
                this.addIndicator();
            }
            this.$prev.on('click', function () {
                self.clickPrev();
            });
            this.$next.on('click', function () {
                self.clickNext();
            });
            
        },
        sizing : function () {
            this.$windowWidth = this.$win.width();
            this.$carouselWidth = this.$carousel.width();
            this.$carouselHeight = this.$carousel.height();

            this.$list.width(this.$carouselWidth * this.$itemsLength );
            this.$items.width(this.$carouselWidth);
            this.$items.height(this.$carouselHeight);

            return this.$windowWidth;
        },
        addIndicator: function () {
            var $indicatorContainer = $('<ul class="indicator" />'),
                indicators = [];

            for ( var i = 0; i < this.$itemsLength; i++ ) {
                indicators.push('<li><a href="javascript:void(0);"></a></li>');
            }
            $indicatorContainer[0].innerHTML = indicators.join('');
            this.$container.append($indicatorContainer);
        },
        slide: function () {
            var self = this,
                differenceNumber = 0;

            if ( this.defaultIndex > this.currentIndex ) {
                differenceNumber = this.defaultIndex - this.currentIndex;
                this.$list.animate({
                    left: '-=' + self.$carouselWidth * differenceNumber
                });
            } else if ( this.defaultIndex > this.currentIndex ) {
                differenceNumber = this.currentIndex - this.defaultIndex;
                this.$list.animate({
                    left: '+=' + self.$carouselWidth * differenceNumber
                });
            }
            console.log(this.defaultIndex);
            console.log(this.currentIndex);
            this.defaultIndex = this.currentIndex;
        },
        clickPrev: function () {
            if ( this.$list.is(':animated') ) {
                return;
            }
            this.currentIndex++;
            this.slide();
        },
        clickNext: function () {
            if ( this.$list.is(':animated') ) {
                return;
            }
            this.currentIndex--;
            this.slide();
        },
        swipeFlag: function (windowWidth) {
            if ( this.optionTouchSwipe >= windowWidth ) {
                this.$carousel.swipe(this.sliderSwipe);
                if ( !this.swipeBotton ) {
                    this.$prev.hide();
                    this.$next.hide();
                }
            } else {
                this.$prev.show();
                this.$next.show();
            }
        },
    };
    Carousel.prototype.sliderSwipe = {
        swipe: function (event, direction, distance) {
            console.log(this);
            console.log(Carousel.$list);
        },
        swipeLeft: function (event, direction, distance) {
            // if ( Carousel.$list.is(':animated') ) {
            //     return;
            // }
            this.currentIndex--;
            Carousel.slide();
            alert();
        },
        swipeRight: function (event, direction, distance) {

        },
        click: function (event, target) {

        },
        swipeStatus: function (event, phase, direction, distance) {

        },
        threshold: 50
    };
    
    $.fn.carousel = function(options){
        return this.each(function(){
            new Carousel($(this), options);
        });
    };
})(jQuery);


$(function() {
    var $container = $('.jsc-carousel-container');

    $container.carousel({
        touchSwipe: 1900,
        swipeButton: false,
        indicator: true,
        resize: true,
        loop: true,
        interval: true,
        easing: 'swing',
        duration: 300
    });
});

 

