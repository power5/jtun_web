// JavaScript Document
$(function(){
	var tabNum = 6;
	var loadedWeb = false;
	var loadedParter = false;
	var loadedApp;

	$("#opacityBg").hide();
	$(".linkItem").hide();
	var documentWidth = getWidth();
	var sHeight = $(window).height();
	//alert(documentWidth);
	changeFooterH();
	$("#linkBox").css("height", sHeight - 26);
	$(window).resize(function(){
		sHeight = $(window).height();
		changeFooterH();
		documentWidth = getWidth();
	});
	
	$('.tile').mouseover(function(){
		$(this).css({
			'opacity': '0.7'
		});
	}).mouseout(function(){
		$(this).css({
			"opacity": '1'
		});
	});
	
	function getWidth(){
		var $width = $(window).width();
		if($width > 900){
			$width = ($width - 900)/2 + 10;
		} else {
			$width = 0;
		}
		return $width;
	}
	
	//footer位置函数
	function changeFooterH(){
		$("#footer").css({
			"top":sHeight - 26
		});
	}
	
	$("#tileBox div.tile").each(function(n){
		$(this).click(function(){
			showTab(n);
		});
	});
	
	$("#tileBox2 div.tile").each(function(n){
		$(this).click(function(){
			n = n + 4;
			if( n > 6){
				n = n - 4;
			}
			if (n == 6){
				showTab6();
			} else{
				showTab(n);
			}
		});
	});
	
	
			
	//显示tab函数
	function showTab(n){
		if(n == 0){
			if(!loadedApp){
				loadApp();	
			}
		} else if(n == 1){
			if(!loadedWeb){
				loadWebsite();
			}
		} else if(n == 5){
			if(!loadedParter){
				loadParter();
			}
		} else if(n == 2){
			loadLive();
		}
		//alert(n);
		$('#tileContent').hide();
		$("#tabBox" + n).show();
		$("#titleBox" + n).show();
		$("#titleBox" + n).css({
			"left":documentWidth
		});
		$(".icon-arrow-left-3").click(function(){
			initTab(n);
		});
		$("#tabBox" + n).animate({
			//opacity: .5,
			right: documentWidth - 10,
		  }, 300, function() {
			// Animation complete.
		  });
	}
	
	function showTab6(){
		$("#linkBox").show( "fold", 1000, function(){
			$("#link1").fadeIn(500, function(){
				$("#link2").fadeIn(500, function(){
					$("#link3").fadeIn(500,function(){
						$('#link4').fadeIn(500);
					});
				});
			});
		});
	}
	
	//初始化首页函数
	function initTab(n){
		$('#tileContent').fadeIn(300);
		$("#titleBox" + n).hide();
		$("#tabBox" + n).animate({
			//opacity: .5,
			right: -1000,
		}, 300)
	}
	

	
	$(".close").click(function(){
		$(this).parent().parent().fadeOut(300);
	});
	
	
	//image-collection添加鼠标手势
	$(".image-collection img").css({
		"cursor": "pointer"
	});
	$(".image-collection img").mouseover(function(){
		$(this).css("opacity" , 0.3);
	}).mouseout(function(){
		$(this).css("opacity" , 1);
	});
	
	//滚动条
		
	$('#videoBox').slimscroll({
		width:'830px',
  		height: '410px',
		size: '16px',
		color: '#0066FF',
		opacity: .5,
		alwaysVisible: true
	});

	
  function callVideo(iid) {
	/*var flashvars = {
	iid:iid, // 视频iid
	skinColor : "0x4da0eb", // 皮肤颜色
	colorDegree:"1", // 1是浅色UI，2是深色UI
	definition : "high", // 默认显示的画质 high/low
	hideControlBar : "true", // 是否隐藏播放控制条 true/false
	hideCcBtn : "true", // 是否隐藏字幕按钮 true/false
	hideCameraBtn : "true", // 是否隐藏截图按钮 true/false
	hideDefinitionBtn : "false", // 是否隐藏画质选择按钮 true/false
	hideFullBtn : "false", // 是否隐藏全屏按钮 true/false
	isAutoPlay : "true", // 是否自动播放 true/false
	startTime : "0" // 开始播放的起始时
	//png : "mask.png",
	};
	var params = {
	allowfullscreen: 'true',
	allowScriptAccess: "always",
	wmode: "transparent"
	};
	swfobject.embedSWF("http://ui.tudou.com/bin/events/product/player/player.swf", "player", "700", "430", "10.0.0", "player/expressInstall.swf",flashvars,params);*/
	
			var flashvars = {
					iid:iid,
					autoPlay:'true',
					title:"false",
					type:"default",
					setting:"false"
				};
			var params = {
					allowfullscreen: 'true',
					allowScriptAccess: "always",
					wmode: "transparent"
				};
				swfobject.embedSWF("http://marketing.tudou.com/global/SPlayer/v3/player.swf", "player", "700", "430", "10.0.0", "player/expressInstall.swf",flashvars,params);


	}	
	
	
	 
	//改变背景透明度 
	function showOpacityBg(){
		$("#opacityBg").css("height", sHeight);
		$("#opacityBg").fadeIn(500);
	};
	function hideOpacityBg(){
		$("#opacityBg").fadeOut(300);
	};
	
	
	$(".iorange").click(function(){
		$("#linkBox").hide( "fold", 800, function(){
			$("#link1, #link2, #link3, #link4").hide();
		});
	});
	
	
	$(".linkItem img").mouseover(function(){
		$(this).css("opacity", .5);
	});
	$(".linkItem img").mouseout(function(){
		$(this).css("opacity", 1);
	});
	
	$(".videoItem").mouseover(function(){
		//$(this).css("opacity", .5);
		$(this).children('.vTxt').show();
	});
	$(".videoItem").mouseout(function(){
		//$(this).css("opacity", 1);
		$(this).children('.vTxt').hide();
	});
	

	//加载app
	function loadApp(){
		$.get('xml/app.xml', function(data, status){
			//alert(status);
			$(data).find('web').each(function(){
				var $web = $(this);
				var group = $web.attr('group');
				var title = $web.find('title').text();
				var thumb = $web.find('thumb').text();
				var url_0 = $web.find('url_0').text();
				var url_1 = $web.find('url_1').text();
				var url_2 = $web.find('url_2').text();
				var url_3 = $web.find('url_3').text();
				var ur = 'images/appImg/';
				var html = '<div class="caseApp">';
				html += '<a href="' + ur + url_0 + '" rel="' + group + '" title="' + title + '"><img class="thumb" src="' + ur + thumb + '" /></a>';
				if(url_1) {
					html += '<a href="' + ur + url_1 + '" rel="' + group + '" title="' + title + '"></a>';
				}
				if(url_2) {
					html += '<a href="' + ur + url_2 + '" rel="' + group + '" title="' + title + '"></a>';
				}
				if(url_3) {
					html += '<a href="' + ur + url_3 + '" rel="' + group + '" title="' + title + '"></a>';
				}
				html += '</div>';
				
				$('.appBox .loadImg').fadeOut(2000, function(){
					$('.appBox').append(html);
					$('.appBox').slimscroll({
						height: '220px',
						size: '10px',
						color: '#0066FF',
						opacity: .5,
						alwaysVisible: true
					});

					$('.caseApp img').mouseover(function(){
						$(this).css("opacity", .5);
					}).mouseout(function(){
						$(this).css("opacity", 1);
					});
				});
				if(status == 'success'){
					loadedApp = true;
				}	
			});
		});
	}




	
	//加载website
	function loadWebsite(){
		loadedWeb = true;
		$.get('xml/website.xml', function(data, status){
			//alert(status);
			$(data).find('web').each(function(){
				var $web = $(this);
				var group = $web.attr('group');
				var title = $web.find('title').text();
				var thumb = $web.find('thumb').text();
				var url_0 = $web.find('url_0').text();
				var url_1 = $web.find('url_1').text();
				var url_2 = $web.find('url_2').text();
				var url_3 = $web.find('url_3').text();
				var ur = 'images/examples/';
				var html = '<div class="case">';
				html += '<a href="' + ur + url_0 + '" rel="' + group + '" title="' + title + '"><img src="' + ur + thumb + '" /></a>';
				if(url_1) {
					html += '<a href="' + ur + url_1 + '" rel="' + group + '" title="' + title + '"></a>';
				}
				if(url_2) {
					html += '<a href="' + ur + url_2 + '" rel="' + group + '" title="' + title + '"></a>';
				}
				if(url_3) {
					html += '<a href="' + ur + url_3 + '" rel="' + group + '" title="' + title + '"></a>';
				}
				html += '</div>';
				
				$('#imgBox .loadImg').fadeOut(2500, function(){
					$('#imgBox').append(html);
					$('#imgBox').slimscroll({
						width: '840px',
						height: '360px',
						size: '14px',
						color: '#0066FF',
						opacity: .5,
						alwaysVisible: true
					});

					$('.case img').mouseover(function(){
						$(this).css("opacity", .5);
					}).mouseout(function(){
						$(this).css("opacity", 1);
					});
				});
				if(status == 'success'){
					loadedWeb = true;
				}	
			});
		});
	}
	
	//加载Parter
	function loadParter(){
		loadedParter = true;
		$('.pBox').load('parter.html', function(){
			$(this).fadeIn(1000);
		});
	}
	
	//跳转页面livecast
	function loadLive(){
		window.location.href = 'livecast.html';	
	}

	
		//加入div #player
/*	function addPlayerhtml(){
		$("#playerBox").html("<div id='player'></div><i class='icon-cancel' id='btnClose'></i><div class='videoContent'><h4>井屯科技</h4><h5>客户：路虎</h5><h5>导演：daniel</h5><h5>代理：ddb</h5><h5>时间：2013</h5></div>");
			
	}*/
	
	$('.videoItem').click(function(){
		var s = $(this).attr('rel');
		//alert(s);
		showOpacityBg();
		$("#playerBox").show( "fold", 1000, function(){
			//$(this).append(html2);
			callVideoContent(s);
			$(".btnClose").click(function(){
				hideOpacityBg();
				$("#playerBox").hide("drop", { direction: "down" }, 300, function(){
					$("#playerBox").empty();	
				});
			});
		});
	});
	
	function callVideoContent(s){
		$.get('xml/video.xml', function(data,status){
			if(status == 'success'){
				$(data).find('video').eq(s).each(function(){
					var $video = $(this);
					//var url = $video.find('url').text();
					var iid = $video.find('iid').text();
					var name = $video.find('name').text();
					var client = $video.find('client').text();
					var director = $video.find('director').text();
					var agency = $video.find('agency').text();
					var time = $video.find('time').text();				
					var html = '<div id="player"></div><div id="btnClose"></div><div class="videoContent">';
					html += '<h4>' + name + '</h4><h5>客户：' + client + '</h5><h5>导演：' + director + '</h5><h5>代理：';
					html += agency + '</h5><h5>时间：' + time + '</h5></div>';
					
					$('#playerBox').append(html);
					callVideo(iid);
					$("#btnClose").mouseover(function(){
						$(this).css("opacity" , 0.5);
					}).mouseout(function(){
						$(this).css("opacity" , 1);
					});
					$("#btnClose").click(function(){
						hideOpacityBg();
						$("#playerBox").hide("drop", { direction: "down" }, 300, function(){
							$("#playerBox").empty();	
						});
					});
				});
			}
		});
				
	};
	
		
});














