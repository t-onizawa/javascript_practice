var lazyload = {

	init : function () {
		var elem = this;

		this.container = document.getElementsByClassName('container')[0];
		this.fadeListItems = this.container.getElementsByTagName('li');
		this.fadeListItemsLength = this.fadeListItems.length;
		this.currentIndex = 0;
		this.movingFlag = true;
		this.judgeElement();

		if ( window.addEventListener ) {
			window.addEventListener('resize', function () { elem.judgeWindowEvent(); }, false);
			window.addEventListener('scroll', function () { elem.judgeWindowEvent(); }, false);
		} else if ( window.attachEvent ) {
			window.attachEvent('onresize', elem.judgeWindowEvent() );
			window.attachEvent('onscroll', elem.judgeWindowEvent() );
		}
	},
	judgeWindowEvent : function () {
		if ( !this.movingFlag ) {
			this.judgeElement();
		}
	},
	judgeElement : function () {
		// if ( this.movingFlag ) {
		// 	return false;
		// }

		if ( this.currentIndex < this.fadeListItemsLength ) {
			this.getWindowSize();
			this.getElementPosition(this.currentIndex);


			if ( this.eventPointTop < this.windowTopPosition ) {
				this.fadeInElement(this.currentIndex);
				this.movingFlag = true;
			} else {
				this.movingFlag = false;
			}
		}
	},
	getWindowSize : function () {
		this.bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		this.windowHeight = window.innerHeight || this.body.clientHeight;
		this.windowTopPosition = this.bodyScrollTop + this.windowHeight;
	},
	getElementPosition : function (currentIndex) {
		this.fadeListItemsOffsetTop = this.container.offsetTop + this.fadeListItems[currentIndex].offsetTop;
		this.fadeListItemsHeight = this.fadeListItems[currentIndex].offsetHeight;
		this.eventPointTop = this.fadeListItemsOffsetTop + ( this.fadeListItemsHeight / 2 );
	},
	fadeInElement : function (currentIndex) {
		var alpha = 0;
		this.fadeInInterval(alpha, currentIndex);

	},
	fadeInInterval : function (alpha, currentIndex) {
		var self = this;

		var fadeOpacity = function () {

			if ( alpha < 1 ) {
				alpha +=  1 / 100;
				self.fadeListItems[currentIndex].style.opacity = alpha;
				
				setTimeout(fadeOpacity, 5);
			} else {
				self.fadeInClearInterval(currentIndex);
			}

		};
		fadeOpacity();

	},
	fadeInClearInterval : function (currentIndex) {
		this.currentIndex++;
		this.judgeElement();
	}
};

window.onload = function () {
	lazyload.init();
};

