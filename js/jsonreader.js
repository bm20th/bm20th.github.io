// JSON reader for TWO DECADES OF 5KEYS

// コンフィグ --------------------------------------------------------

// JSON データが存在する URL
var jsonAddress = 'https://script.google.com/macros/s/AKfycbxmMH9utys425PKS3api7ZjtCm4PVgIFFuT0HXP2CrlJBEYQK0/exec';

// -------------------------------------------------------------------

// blockUI のコンフィグ設定
$.blockUI.defaults.css.border = '4px solid #888888'; 
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
	$.blockUI({ message: '<h2>データを取得しています…</h2>' });

	$.getJSON( strURL, function( data ) {

		// blockUI 解除
		$.unblockUI();

		// 受信したデータが不足していたら終了
		if (data.length < 2) {
			return;
		}

		// 最終更新日を取得
		var lastUpdate = null;
		if (data[0].last_update !== undefined) {
			lastUpdate = new Date( data[0].last_update );
		}
		if (lastUpdate !== null) {
			$("#last_update").append( "Last Update " + getFormattedDateTime( lastUpdate ) );
		}

		// エントリーデータを処理
		for (var n = 0; n < data[1].length; n ++ ) {
			var entry = data[1][ n ];
			var tds_entry = [];
			var tds_staff = [];
			var tds_gallery = [];
			var tds_staff_noentry = [];

			if (entry.number !== undefined || entry.name !== undefined && entry.area !== undefined && entry.area !== undefined) {
				if (entry.number != '' && entry.name != '') {
					var row = '';
					
					row = "<td id='number'>" + escapeHTML( entry.number.toString() ) + "</td>\n"
						+ "<td id='name'>" + escapeHTML( entry.name ) + "</td>\n"
						+ "<td id='area'>" + escapeHTML( entry.area ) + "</td>\n"
						+ "<td id='comment'>" + escapeHTML( entry.comment ) + "</td>\n";
					
					switch ( entry.number.toString().slice(0, 1) ) {
						case 'G':
							if ( entry.number.toString().slice(1, 2) == 'S' ) {
								tds_staff_noentry.push( row );
							} else {
								tds_gallery.push( row );
							}
							break;
						case 'S':
							tds_staff.push( row );
							break;
						default:
							tds_entry.push( row );
					} // end-of switch
				} // end-of if data is empty
			} // end-of if data is undefined
			
			$("#entry").append(
				$( "<tr>", {
					"class": "list",
					html: tds_entry.join( "" )
				})
			);
			$("#gallery").append(
				$( "<tr>", {
					"class": "list",
					html: tds_gallery.join( "" )
				})
			);
			$("#staff").append(
				$( "<tr>", {
					"class": "list",
					html: tds_staff.join( "" )
				})
			);
			$("#staff_noentry").append(
				$( "<tr>", {
					"class": "list",
					html: tds_staff_noentry.join( "" )
				})
			);
		} // end-of for (var n ...

		// Last Update とテーブルを表示
		$("#main-contents").css('display','block');

}); // end-of $.getJSON

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
