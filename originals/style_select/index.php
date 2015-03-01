<?php
	$select = $_POST['styleSelect'];
	$hidden1 = $_POST['hidden1'];
	$hidden2 = $_POST['hidden2'];
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>STYLE SELECT</title>
	<link rel="stylesheet" href="css/style_select.css">
	<style>
		* {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		.wrapper {
			max-width: 960px;
			margin: 100px auto;
		}
		.style-select-wrap,
		input[type="submit"] {
			display: inline-block;
			vertical-align: middle;
		}
		.answer1 {
			margin-top: 50px;
			font-size: 24px;
		}
		.answer2 {
			margin-top: 30px;
			font-size: 30px;
		}
		.answer2 span {
			display: inline-block;
			vertical-align: baseline;
		}
		.num {
			font-size: 36px;
		}
		.btn-send {
			padding: 10px;
			text-shadow: 0 1px 2px rgba(0,0,0,.4);
			border: none;
			background-color: #f0f0f0;
			box-shadow: inset 0 0 5px rgba(0,0,0,.6);
			font-size: 12px;
			cursor: pointer;
			border-radius: 5px;
		}
	</style>
</head>
<body>
<div class="wrapper">
	<form action="/originals/style_select/index.php" method="post">
	<div class="selectWrap">
		<select name="styleSelect" id="styleSelect" class="jsc-style-select">
			<option value="" selected>選択して下さい</option>
			<option value="01">01 セレクトボックススタイル</option>
			<option value="02">02 テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト・テスト</option>
			<option value="03">03 テスト・テスト・テスト</option>
			<option value="04">04 テスト・テスト・テスト</option>
			<option value="05">05 テスト・テスト・テスト</option>
			<option value="06">06 テスト・テスト・テスト</option>
			<option value="07">07 テスト・テスト・テスト</option>
			<option value="08">08 テスト・テスト・テスト</option>
			<option value="09">09 テスト・テスト・テスト</option>
			<option value="10">10 テスト・テスト・テスト</option>
		</select>
		<input type="hidden" value="send押したでしょ？？" name="hidden1">
		<input type="hidden" value="のやつでしょーｗｗｗ" name="hidden2">
		<input type="submit" value="send" class="btn-send">
		<img src="sublime_icn.png" alt="">
	</div>
	</form>
	<p class="answer1"><?php echo $hidden1; ?></p>
	<p class="answer2"><span class="num"><?php echo $select; ?></span><span><?php echo $hidden2; ?></span></p>
</div>
<script src="/jquery/jquery.js"></script>
<script src="js/style_select.js"></script>
<script>
$(function () {
	$select = $('.jsc-style-select');
	$select.styleSelect({
		// click or mouseover
		mouseEventType : 'click',

		// fade or slide
		animationType : 'fade',

		// アニメーション速度
		animationDuration : 200
	});
});
</script>
</body>
</html>
