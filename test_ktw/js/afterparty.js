// JSON reader for AFTER PARTY - TWO DECADES OF 5KEYS

// コンフィグ --------------------------------------------------------

// JSON データが存在する URL
var jsonAddress = 'https://script.google.com/macros/s/AKfycbx9oYzhOpaYKT1hjAdnK-F2yWunq5xKrjUzXJXKr2jkyouhtx3s/exec';

// -------------------------------------------------------------------

// blockUI のコンフィグ設定
$.blockUI.defaults.css.width = '100%';
$.blockUI.defaults.css.left = '';
$.blockUI.defaults.css.border = 'none';
$.blockUI.defaults.css.backgroundColor = 'transparent';
$.blockUI.defaults.css.color = '#ffff66';
$.blockUI.defaults.css.fontSize = '1.4em';
$.blockUI.defaults.fadeOut = 0;
$.blockUI.defaults.fadeIn = 0;

// jQuery エントリーポイント
$(function() {
	// データ読み込み
	loadData( jsonAddress );
});

// JSON データ読み込み
//   strURL ... JSON データを読み込む先のアドレス
function loadData( strURL ) {

	// Last Update とテーブルを非表示に
	$("#main-contents").css('display','none');

	// blockUI 実行
	$.blockUI({ message: 'データを取得しています…' });

	// Ajax で JSON データを受信
	$.ajax({
		url: strURL,
		dataType: "json",
		timeout: 20000,
		success: function(data){ showData(data); },
		error: function(){ showError(); }
	});
}

// 受信データを表示
function showData( data ) {

	// 通信に成功したはずなのにデータが null のままであればエラー表示
	if (data === null) {
		showError();
		return;
	}

	// 受信したデータが想定外のもの、もしくは不足していたらエラー表示
	if (data.length === null || data.length === undefined) {
		showError();
		return;
	}
	if (data.length < 2) {
		showError();
		return;
	}
	if (data[1].length === null || data[1].length === undefined) {
		showError();
		return;
	}

	// 最終更新日を取得
	var lastUpdate = null;
	if (data[0].last_update !== undefined) {
		lastUpdate = new Date( data[0].last_update );
	}
	if (lastUpdate !== null) {
		$("#last_update").append( "Last Update " + getFormattedDateTime( lastUpdate ) );
	} else {
		// 取得できなかった場合は不明とする
		$("#last_update").append( "Last Update ----.--.-- --/--" );
	}

	// blockUI 解除
	$.unblockUI();

	// エントリーデータを処理
	for (var n = 0; n < data[1].length; n ++ ) {
		var entry = data[1][ n ];
		var tds_afterparty = [];

		if (entry.number !== undefined || entry.name !== undefined && entry.area !== undefined && entry.area !== undefined && entry.age !== undefined) {
			if (entry.number != '' && entry.name != '') {
				var row = '';
				var age = '未成年';

				// 成人の場合は「成人」に変更
				if ( entry.age.match(/はい、成人です/) ) {
					age = '成人';
				}

				row = "<td id='number'>" + escapeHTML( entry.number.toString() ) + "</td>\n"
					+ "<td id='name'>" + escapeHTML( entry.name ) + "</td>\n"
					+ "<td id='area'>" + escapeHTML( entry.area ) + "</td>\n"
					+ "<td id='age'>" + escapeHTML( age ) + "</td>\n"
					+ "<td id='comment'>" + escapeHTML( entry.comment ) + "</td>\n";

				switch ( entry.number.toString().slice(0, 1) ) {
					/* スタッフ分岐があるのかないのか
					case 'S':
						if ( entry.number.toString().slice(1, 2) == 'G' ) {
							tds_staff_noentry.push( row );
						} else {
							tds_staff.push( row );
						}
						break;
					*/
					default:
						tds_afterparty.push( row );
				} // end-of switch
			} // end-of if data is empty
		} // end-of if data is undefined

		$("#afterparty").append(
			$( "<tr>", {
				"class": "list",
				html: tds_afterparty.join( "" )
			})
		);
		/*
		$("#staff").append(
			$( "<tr>", {
				"class": "list",
				html: tds_staff.join( "" )
			})
		);
		*/
	} // end-of for (var n ...

	// Last Update とテーブルを表示
	$("#main-contents").css('display','block');

}

// 通信エラー表示
function showError() {

	// blockUI 解除
	$.unblockUI();

	// Last Update の代わりにエラーメッセージを表示
	$("#last_update").append( "エントリー情報の取得に失敗しました。<br />\n恐れ入りますが少し時間を空けてから再読み込みをお願いいたします。" );

	// エラー表示
	$("#main-contents").css('display','block');

}

// Date 型から文字列への変換処理
function getFormattedDateTime( date ) {
	var yyyy, mm, dd, hh, nn;

	yyyy = date.getFullYear().toString();
	mm = ('0' + (date.getMonth() + 1).toString()).slice(-2);
	dd = ('0' + date.getDate().toString()).slice(-2);
	hh = ('0' + date.getHours().toString()).slice(-2);
	nn = ('0' + date.getMinutes().toString()).slice(-2);

	return yyyy + '.' + mm + '.' + dd + ' ' + hh + ':' + nn;
}

// HTML エスケープ処理
function escapeHTML( str ) {
	if (typeof(str) == 'number') {
		str = str.toString();
	}

	str = (str === null || str === undefined) ? '' : '' + str;

	if (str.length <= 0) { return ''; }

	str = str.replace( /&/g, '&amp;');
	str = str.replace( /'/g, '&#x27;');
	str = str.replace( /`/g, '&#x60;');
	str = str.replace( /"/g, '&quot;');
	str = str.replace( /</g, '&lt;');
	str = str.replace( />/g, '&gt;');

	return str;
}
