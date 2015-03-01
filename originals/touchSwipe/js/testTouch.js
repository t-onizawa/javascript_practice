var $win = $(window);
var $body = $('body');
var text1 = document.getElementById('jsi-text1');
var text2 = document.getElementById('jsi-text2');


$body.on('touchstart', function (e) {
	var pageX = event.changedTouches[0].pageX;
	
	text1.innerHTML = 'start: ' + pageX;
});
$body.on('touchmove', function (e) {
	e.preventDefault();

	var pageX = event.changedTouches[0].pageX;
	text2.innerHTML = 'move: ' + pageX;
});
