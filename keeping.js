// ==UserScript==
// @name         智慧树挂机脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  适用于录播课，设置静音和1.5倍速，自动跳过已经看过的视频，模拟答题（不完善）
// @author       jungtravor
// @match        *://*.zhihuishu.com/videoStudy.html*
// @icon         http://assets.zhihuishu.com/icon/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const $ = window.jQuery;
	var zhs_halt = false;

	function keeping() {
		if ( zhs_halt ) return;

		// 读取视频时长计算标识
		var video_finished = $(".current_play b").hasClass("time_icofinish");

		// 暂停后自动播放
		if ( $("video")[0].paused && !video_finished ) {
			$("#playButton").click();
		}

		// 自动切换下一个视频
		if ( video_finished ) {
			$("#nextBtn").click();
		}

		// 静音
		if ( $("video")[0].volume ) {
			$(".volumeIcon")[0].click();
		}

		// 自动切换到1.5倍
		if ( $("video")[0].playbackRate != 1.5 ) {
			$(".speedTab15")[0].click();
		}

		// 弹题自动选择第一个选项
		if ( $(".dialog-test").length ) {
			var test = $(".dialog-test")[0];
			var test_option = test.find(".topic-item").length - 1;
			test_option = parseInt(Math.random()*test_option);
			test.find(".topic-item")[test_option].click();
			test.find(".dialog-footer").find(".btn")[0].click();
		}

	}

	$(window).ready(function(){
		setInterval(keeping, 3000);
	})

})();
