var calculate = {
	init: function () {
		this.$win = $(window);
		this.$header = $('#header');
		this.$nav = $('#jsi-nav');
		this.$navItems = this.$nav.find('a');
		this.$container = $('#jsi-calculate');
		this.$sectionContainer = $('#jsi-sec-wrap');
		this.$numFirst = $('#jsi-num-first');
		this.$numLast = $('#jsi-num-last');
		this.$numOperator = $('#jsi-operator');
		this.$input = $('#jsi-answer');
		this.$numList = $('#jsi-num-list');
		this.$numBtn = this.$numList.find('a');
		this.$numClear = $('#jsi-delete');
		this.$numOk = $('#jsi-submit');
		this.$section = this.$sectionContainer.find('.jsc-sec');
		this.$overlay = $('#jsi-overlay');

		this.sizing();
		this.inNumber();
		this.createBgBlur();
		this.listShow();
		this.includeListValue();
	},
	sizing: function () {
		var visibleWindowHeight = this.$win.height() - this.$header.height();
		this.$container.height(visibleWindowHeight).css('overflow', 'hidden');
		this.$nav.css({
			'-webkit-transform': 'translate(0,' + visibleWindowHeight + 'px)',
			'-moz-transform': 'translate(0,' + visibleWindowHeight + 'px)',
			'transform': 'translate(0,' + visibleWindowHeight + 'px)'
		}).height(visibleWindowHeight - 1);
	},
	inNumber: function () {
		var self = this;

		this.$navItems.on('click', function () {
			self.$nav.removeClass('display').css({
				'-webkit-transform': 'translate(0,' + 0 + 'px)',
				'-moz-transform': 'translate(0,' + 0 + 'px)',
				'transform': 'translate(0,' + 0 + 'px)'
			}).height(45);
			self.num1 = Math.floor( Math.random() * 100 );
			self.num2 = Math.floor( Math.random() * 100 );

			self.$numFirst.text(self.num1);
			self.$numLast.text(self.num2);
			self.$numOperator.text($(this).text());
		});
		

	},
	createBgBlur: function () {
		this.$numListBg = $('<div class="bg-num-list over" />');

		this.$numListBg.height(this.$numList.height());
		this.$container.append(this.$numListBg);
	},
	listShow: function () {
		var self = this;

		this.$input.on('focus', function () {
			self.$numList.removeClass('over');
			self.$numListBg.removeClass('over');
		});
	},
	includeListValue: function () {
		var self = this,
			value = '';

		this.$numList.hover(
			function () {
				self.$numListBg.addClass('filter');
			},
			function () {
				self.$numListBg.removeClass('filter');
			}
		);

		this.$numBtn.on('click', function () {
			value = value + $(this).text();
			self.$input.val(value);
		});

		this.$numClear.on('click', function () {
			self.$input.val('');
		});

		this.$numOk.on('click', function () {
			self.calculation();
		});
	},
	caluclation: function () {
		console.log('aaaa');
	}
};
$(function () {
	calculate.init();
});