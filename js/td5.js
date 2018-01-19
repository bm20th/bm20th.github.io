$(function(){

	$("a[href*='#']").click(function(){

		//移動先の位置をoffset().topで求める
		var targetTo = $(this.hash);
		//画面上部メニュー分だけ下に
		var targetOffset = targetTo.offset().top - 65;

		//ページ全体をanimate()で移動
		 $('html,body').animate({ scrollTop: targetOffset},500);
		return false;
	});

	$("div.divButton").hover(
		function(){
			$(this).css("cursor","pointer"); //---カーソルを指に
		},
		function(){
			$(this).css("cursor","default"); //---カーソルを戻す
		}
	);

	jQuery(function($) {
	    $('.bg-slider').bgSwitcher({
	        images: ['./images/slide01.jpg','./images/slide02.jpg','./images/slide03.jpg','./images/slide04.jpg','./images/slide05.jpg','./images/slide06.jpg','./images/slide07.jpg','./images/slide08.jpg','./images/slide09.jpg','./images/slide10.jpg','./images/slide11.jpg','./images/slide12.jpg'], // 切り替える背景画像を指定
					interval: 4000, // 背景画像を切り替える間隔を指定 3000=3秒
          loop: true, // 切り替えを繰り返すか指定 true=繰り返す　false=繰り返さない
				  shuffle: true, // 背景画像の順番をシャッフルするか指定 true=する　false=しない
	    });
	});
});
