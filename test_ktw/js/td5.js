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

});
