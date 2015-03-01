    (function ($){

    var SpSwipe = function ($container, options) {
        this.$win = $(window);
        this.$container = $container;
        this.$carousel = this.$container.find('.jsc-carousel');
        this.$list = this.$container.find('ul');
        this.$items = this.$container.find('li');
        this.$prev = this.$container.find('.jsc-prev');
        this.$next = this.$container.find('.jsc-next');

        this.itemsLength = this.$items.length;
        this.windowWidth = this.$win.width();

        this.currentIndex = 0;
        this.defaultIndex = 0;

        this.optionTouchSwipe = options.touchSwipe;
        this.optionSwipeButton = options.swipeButton;
        this.optionIndicator = options.indicator;
        this.optionResize = options.resize;

        this.init();
    };
    SpSwipe.prototype = {
        init: function () {
            var self = this;

            if ( this.optionResize ) {
                this.$win.on('load resize', function() {
                    self.sizing();
                    self.windowWidth = self.$win.width();

                    if ( self.optionTouchSwipe && self.optionTouchSwipe >= self.windowWidth ) {
                        self.swipe();
                    }
                });
            }

            if ( this.optionIndicator ) {
                this.addIndicator();
            }

            this.carousel();
        },
        sizing: function () {
            this.carouselWidth = this.$carousel.width();
            this.$carouselHeight = this.$carousel.height();

            this.$list.width( this.carouselWidth * this.itemsLength );
            this.$items.width( this.carouselWidth );
            this.$items.height( this.carouselHeight );
        },
        addIndicator: function () {
            var indicators = [];

            this.$indicatorContainer = $('<ul class="indicator" />');
            for ( var i = 0; i < this.itemsLength; i++ ) {
                indicators.push('<li><a href="javascript:void(0);"></a></li>');
            }
            this.$indicatorContainer[0].innerHTML = indicators.join('');
            this.$container.append( this.$indicatorContainer );

            this.$indicatorContainer.find('li:first-child').addClass('current');
        },
        carousel: function () {
            var self = this;

            this.$prev.on('click', function () {
                self.carouselPrev();
            });
            this.$next.on('click', function () {
                self.carouselNext();
            });
        },
        swipe: function () {
            var self = this,
                startPageX = 0,
                movePageX = 0;

            this.$list.on('touchstart', function (e) {
                startPageX = event.changedTouches[0].pageX;
            });
            this.$list.on('touchmove', function (e) {
                e.preventDefault();
                movePageX = event.changedTouches[0].pageX;
                console.log(movePageX);
            });
            this.$list.on('touchend', function () {
                if ( startPageX > movePageX && startPageX - movePageX > 50 ) {
                    self.carouselNext();
                }
                if ( startPageX < movePageX && movePageX - startPageX > 50 ) {
                    self.carouselPrev();
                }
            });
            
        },
        carouselPrev: function () {
            if ( this.$carousel.is(':animated') ) {
                return;
            }
            this.currentIndex--;
            this.slide();
        },
        carouselNext: function () {
            if ( this.$carousel.is(':animated') ) {
                return;
            }
            this.currentIndex++;
            this.slide();
        },
        slide: function () {
            var differenceNumber = 0,
                carouselWidth = this.$carousel.parent().width();

            if ( this.defaultIndex < this.currentIndex && this.itemsLength > this.currentIndex ) {

                this.$prev.show();
                if ( this.itemsLength - 1 === this.currentIndex ) {
                    this.$next.hide();
                }
                differenceNumber = this.defaultIndex - this.currentIndex;
                this.$list.css({
                    'left': '+=' + carouselWidth * differenceNumber
                });

            } else if ( this.defaultIndex > this.currentIndex && this.currentIndex >= 0 ) {
                this.$next.show();
                if ( this.currentIndex === 0 ) {
                    this.$prev.hide();
                }

                differenceNumber = this.currentIndex - this.defaultIndex;
                this.$list.css({
                    'left': '-=' + carouselWidth * differenceNumber
                });
            }

            if ( this.temsLength <= this.currentIndex ) {
                this.currentIndex--;
            } else if ( this.currentIndex < 0 ) {
                this.currentIndex++;
            }

            this.$indicatorContainer.find('li').removeClass('current');
            this.$indicatorContainer.find('li').eq(this.currentIndex).addClass('current');
            this.defaultIndex = this.currentIndex;
        }
    };
    
    
    // SpSwipe.prototype.carousel = function () {
    //     var $carousel = this.$carousel;

    //     this.$carousel.swipe(this.swipeOptions);
    //     this.$carousel.find('.jsc-prev').on('click', function () {
    //         SpSwipe.prototype.carousel.carouselPrev($carousel);
    //     });
    //     this.$carousel.find('.jsc-next').on('click', function () {
    //         SpSwipe.prototype.carousel.carouselNext($carousel);
    //     });
    // };
    // SpSwipe.prototype.swipeOptions = {
    //     swipeLeft: function () {
    //         SpSwipe.prototype.carousel.carouselNext(this);
    //     },
    //      swipeRight: function () {
    //         SpSwipe.prototype.carousel.carouselPrev(this);
    //     },
    //     threshold: 50
    // };
   
    // SpSwipe.prototype.carousel.currentIndex = 0;
    // SpSwipe.prototype.carousel.defaultIndex = 0;
   
    // SpSwipe.prototype.carousel.slide = function ($carousel) {
    //     var differenceNumber = 0,
    //         carouselWidth = $carousel.parent().width(),
    //         $carouselList = $carousel.find('ul'),
    //         $carouselItems = $carouselList.find('li'),
    //         carouselItemsLength = $carouselItems.length,
    //         $indicator = $('.indicator').find('li'),
    //         $prev = $carousel.find('.jsc-prev'),
    //         $next = $carousel.find('.jsc-next');

    //         if ( this.defaultIndex < this.currentIndex && carouselItemsLength > this.currentIndex ) {

    //             $prev.show();
    //             if ( carouselItemsLength - 1 === this.currentIndex ) {
    //                 $next.hide();
    //             }
    //             differenceNumber = this.defaultIndex - this.currentIndex;
    //             $carouselList.css({
    //                 'left': '+=' + carouselWidth * differenceNumber
    //             });

    //         } else if ( this.defaultIndex > this.currentIndex && this.currentIndex >= 0 ) {
    //             $next.show();
    //             if ( this.currentIndex === 0 ) {
    //                 $prev.hide();
    //             }

    //             differenceNumber = this.currentIndex - this.defaultIndex;
    //             $carouselList.css({
    //                 'left': '-=' + carouselWidth * differenceNumber
    //             });
    //         }

    //         if ( carouselItemsLength <= this.currentIndex ) {
    //             this.currentIndex--;
    //         } else if ( this.currentIndex < 0 ) {
    //             this.currentIndex++;
    //         }

    //         $indicator.removeClass('current');
    //         $indicator.eq(this.currentIndex).addClass('current');
    //         this.defaultIndex = this.currentIndex;
    // };
    // SpSwipe.prototype.carousel.carouselNext = function ($carousel) {
    //     if ( $carousel.is(':animated') ) {
    //         return;
    //     }
    //     this.currentIndex++;
    //     this.slide($carousel);
    // };
    //  SpSwipe.prototype.carousel.carouselPrev = function ($carousel) {
    //     if ( $carousel.is(':animated') ) {
    //         return;
    //     }
    //     this.currentIndex--;
    //     this.slide($carousel);
    // };

    $.fn.spSwipe = function(options){
        return this.each(function(){
            new SpSwipe($(this), options);
        });
    };
})(jQuery);


$(function() {
    var $container = $('.jsc-carousel-container');

    $container.spSwipe({
        touchSwipe: 1900,
        swipeButton: false,
        indicator: true,
        resize: true,
    });
});

 

