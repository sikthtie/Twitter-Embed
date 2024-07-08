// https://blog.stin.ink/articles/fully-understood-embedding-tweets

const input = document.querySelector('[data-js-x="input"]');
input.addEventListener('input', function (e) {
	const url = e.target.value.trim();
	const tweetEmbed = document.getElementById('tweetEmbed');
	const errorMessage = document.getElementById('errorMessage');

	// TwitterのURLパターンにマッチするかを確認
	const tweetUrlPattern = /^https?:\/\/x\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/;


	if (tweetUrlPattern.test(url)) {
		// 埋め込み表示をクリア
		tweetEmbed.innerHTML = '';
		errorMessage.textContent = '';

		// Twitterの埋め込みウィジェットを作成
		twttr.widgets.createTweet(
			url.match(tweetUrlPattern)[3],// [3]は /status/の後ろの文字列
			
			tweetEmbed, {
				conversation: 'none', // "none" に設定するとリプライを非表示
				cards: 'visible', // "hidden" に設定するとカード（画像や動画）を非表示
				linkColor: '#cc0000', // リンクの色を変更
				theme: 'light', // "light" または "dark"
				lang: 'ja',
				align: 'center',
			}
		).then(function (el) {
			// 成功
			console.log("Tweet displayed.");
			console.log(el);
			if(!el) {
				// console.log('ああああああ')
				errorMessage.textContent = "ツイートの埋め込みに失敗しました。ツイートが存在しない可能性があります。";
			}
		}).catch(function (error) {
			// 失敗
			console.error("Error displaying tweet:", error);
			errorMessage.textContent = "ツイートの埋め込みに失敗しました。ツイートが存在しない可能性があります。";
		});
	} else {
		console.log('urlが違うかも')
		tweetEmbed.innerHTML = '';

		if (url === '') {
			errorMessage.textContent = '';
		} else {
			errorMessage.textContent = 'URLを確認してください。';
		}
	}
})