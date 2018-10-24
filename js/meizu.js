define(["jquery"], function($){
	function meizu(){
		$(function(){
			// header
			var header_color = "#fff";
			$("#header a").on({
				mouseenter:function(){
					$(this).css("text-decoration", "none");
					$(this).css("color", "#00beff")
				},
				mouseleave:function(){
					$(this).css("color", header_color)
				}
			})
			$('#header span a').off();
			$('#header_ul2 li a').off();
			// header_ul2
			$('#header_ul1 li').slice(0, 4).mouseenter(function(){
				shiftIn();
				var liNum = $(this).index();
				$('#header_ul2 li').css('display', 'none');
				$('#header_ul2 li').slice(8 * liNum, 8 * (liNum + 1)).css('display', 'inline-block');
				$('#header_ul2').css({display: 'block'}).stop().animate({height: 270}, 200);
				$(this).find('a').css('color', '#00beff');
			}).mouseleave(function(){
				$('#header_ul2').stop().animate({height: 0}, 10);
				shiftOut();
			});

			$('#header_ul2')
			.mouseenter(function(){
				shiftIn();
				$('#header_ul2').stop().css({height: 270});
			})
			.mouseleave(function(){
				shiftOut();
				$('#header_ul2').stop().animate({height: 0}, 10);
			})
				//鼠标移入，li变透明
			$('#header_ul2').on('mouseover', 'li', function(){
				$('#header_ul2 li').stop().animate({opacity: 0.5});
				$(this).stop().animate({opacity: 1}).find('a').css('color', '#000');
			}).on('mouseleave', 'li', function(){
				$('#header_ul2 li').stop().animate({opacity: 1}).find('a').css('color', '#515151');
			})

			// header_ul3
			$('#header_ul1 li a:eq(8)').mouseenter(function(){
				$('#header_ul3_box').stop().animate({height: 402});
				shiftIn();
				$(this).css('color', '#00beff');
			}).mouseleave(function(){
				$('#header_ul3_box').stop().animate({height: 0}, 10);
				shiftOut();
			})
			$('#header_ul3_box').mouseenter(function(){
				$('#header_ul3_box').stop().animate({height: 402});
				shiftIn();
			}).mouseleave(function(){
				$('#header_ul3_box').stop().animate({height: 0}, 10);
				shiftOut();
			});
			// header_ul4
			$('#header_ul1 li:eq(9)').hover(function(){
				$('#header_ul4').css('display', 'block');
			}, function(){
				$('#header_ul4').css('display', 'none');
			});
			$('#header_ul4').hover(function(){
				$('#header_ul4').css('display', 'block');
			}, function(){
				$('#header_ul4').css('display', 'none');
			});
			$('#header_ul4 li a').hover(function(){
				$(this).css('color', '#00beff');
			}, function(){
				$(this).css('color', '#000');
			})

			// 鼠标移出时 文本变白 form边框消失 logo变白
			function shiftOut(){
				header_color = "#fff";
				$('#header_ul1 li a').css({color: header_color});
				$('#header_ul1 form').css('border-color', '#fff');
				$('#header .meizu a').css('color', '#fff');
			}
			// 鼠标移入时 文本变黑 form边框显示 logo变蓝
			function shiftIn(){
				header_color = "#000";
				$('#header_ul1 li a').css({color: header_color});
				$('#header_ul1 form').css('border-color', '#999');
				$('#header .meizu a').css('color', '#00beff');
			}

			// banner
			var iNow = 0;
			var timer = null;
			bannerRoll();
				//点击下标换页
			$('#banner_ul1 li').click(function(){
				iNow = $(this).index();
				$('#banner_ul2').stop().animate({left: iNow * -$('#banner_ul2').find('li:eq(0)').width()});
				$('#banner_ul1 li').attr('class', '');
				$(this).attr('class', 'active');
			})
			$('#bannerBox').mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				bannerRoll();
			});
				//banner 滚动函数
			function bannerRoll(){
				timer = setInterval(function(){
					iNow++;
					$('#banner_ul2').stop().animate({
						left: iNow * -$('#banner_ul2').find('li:eq(0)').width()
					}, 200, function(){
						if(iNow == 0){
							$('#banner_ul2').css('left', 0);
						}
					})
					if(iNow == 7){
						iNow = 0;
					}
					$('#banner_ul1 li').attr('class', '');
					$('#banner_ul1 li').eq(iNow).attr('class', 'active');
				}, 5000)
			}
			//content_1
			$('#content_1').on('mouseenter', 'li', function(){
				$(this).stop().animate({opacity: 0.8})
			}).on('mouseleave', 'li', function(){
				$(this).stop().animate({opacity: 1})
			})
			//content_2, content_3, content_4, content_5, content_6, content_7
			$('#con_2_ban_box, #con_3_ban_box, #con_4_ban_box, #con_5_ban_box').hover(function(){
				$(this).stop().animate({opacity: 0.8})
			}, function(){
				$(this).stop().animate({opacity: 1})
			})
				//阴影效果
			$('#con_2_con, #con_3_con, #con_4_con, #con_5_con, #con_6_con, #con_7_con').on('mouseenter', '.other_img', function(){
				$(this).css({boxShadow: '0px 15px 30px 0px #ddd'})
			}).on('mouseleave', '.other_img', function(){
				$(this).css({boxShadow: '0 0 0 0'})
			});
			
			//button
			$('#button #btn_down .iconfont a').hover(function(){
				$(this).css('color', $(this).attr('class'));
			}, function(){
				$(this).css('color', '#aaa');
			}).eq(1).hover(function(){
				$('#button #btn_down .iconfont img').css('display', 'block');
			}, function(){
				$('#button #btn_down .iconfont img').css('display', 'none');
			})
		})
	}
	return {
		meizu: meizu
	}
})







