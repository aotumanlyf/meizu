define(["tool", "jquery", "jquery-cookie"], function(tool, $){
	function pcl(){
		$(function(){
			// header
			$("#header_ul1 a").on({
				mouseenter:function(){
					$(this).css("text-decoration", "none");
					$(this).css({color: "#00beff"});
				},
				mouseleave:function(){
					$(this).css({color: "#000"})
				}
			})
			$('#header span a').off();
			$('#header_ul2 li a').off();
			// header_ul2
			$('#header_ul1 li').slice(0, 4).mouseenter(function(){
				var liNum = $(this).index();
				$('#header_ul2 li').css('display', 'none');
				$('#header_ul2 li').slice(8 * liNum, 8 * (liNum + 1)).css('display', 'inline-block');
				$('#header_ul2').css({display: 'block'}).stop().animate({height: 270}, 200);
				// $(this).find('a').css('color', '#00beff');
			}).mouseleave(function(){
				$('#header_ul2').stop().animate({height: 0}, 10);
			});

			$('#header_ul2')
			.mouseenter(function(){
				$('#header_ul2').stop().css({height: 270});
			})
			.mouseleave(function(){
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
				$(this).css('color', '#00beff');
			}).mouseleave(function(){
				$('#header_ul3_box').stop().animate({height: 0}, 10);
			})
			$('#header_ul3_box').mouseenter(function(){
				$('#header_ul3_box').stop().animate({height: 402});
			}).mouseleave(function(){
				$('#header_ul3_box').stop().animate({height: 0}, 10);
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
			//content
				//meizu
			$(window).scroll(function(){
				if($(window).scrollTop() >= 81){
					$('#meizu').css({position: 'fixed', borderBottom: '1px solid #efefef'})
				}else{
					$('#meizu').css({position: 'absolute', borderBottom: 'none'})
				}
			})
				//左图
					//放大镜
			$('#cc_img').hover(function(){
				$('#cc_img p, #cc_img span').css({display: 'block'})
			}, function(){
				$('#cc_img p, #cc_img span').css({display: 'none'})
			})
			$('#cc_img span').mouseenter(function(){
				$('#cc_img p, #cc_img span').css({display: 'none'})
			});
					//移动
			pMove();
			$(window).scroll(function(){
				pMove();
			})
			function pMove(){
				$('#cc_img').mouseenter(function(ev){
						//大小图
					$('#cc_left span').css({background: `url(${$('#cc_left img').attr('src')}) #fff no-repeat`,backgroundSize: '200%'})
					$(document).mousemove(function(ev){
						offsetX = ev.clientX - $('#cc_img').offset().left + $(document).scrollLeft();
						offsetY = ev.clientY - $('#cc_img').offset().top + $(document).scrollTop();
						if((offsetX <= 140 || offsetX >= 420) && (offsetY <= 140 || offsetY >= 420)){

						}else if(offsetX <= 140 || offsetX >= 420){
							$('#cc_img p').css({
								top: offsetY - 140
							})
						}else if(offsetY <= 140 || offsetY >= 420){
							$('#cc_img p').css({
								left: offsetX - 140
							})
						}else{
							$('#cc_img p').css({
								left: offsetX - 140,
								top: offsetY - 140
							})
						}
						$('#cc_left span').css({
							backgroundPosition: `-${2 * $('#cc_img p').offset().left}px -${2 * $('#cc_img p').offset().top - 300}px`
						});
					})
					$('#cc_img').mouseleave(function(){
						$(document).off();
					})
				})
			}
					
					//点击转换
			$('#cc_left ul').on('click', 'li', function(){
				$('#cc_left ul li').attr('class', '');
				$(this).closest('li').attr('class', 'active');
				$('#cc_img img').attr('src', $('.active img').attr('src'));
			})
				//右
					//点击变色
			$('#cc_right .cc_r').on('click', 'span', function(){
				$(this).siblings('span').attr('class', '');
				$(this).attr('class', 'ccActive');
			})
					//地址
			$('#cc_r3 dl article').on('click', 'span', function(){
				$('#cc_r3 dl article span').attr('class', '');
				$(this).attr('class', 'site');
				$('#cc_r3 dl article ol').css('display', 'none');
				$('#cc_r3 dl article ol').eq(`${$(this).index()}`).css('display', 'block');
				cursor();
				$(this).find('p').css({top: 0, color: '#000'})
			})
					//显示消失
			$('#cc_r3 dl dd, #cc_r3 dl article').hover(function(){
				$('#cc_r3 dl article').css({display: 'block'})
			}, function(){
				$('#cc_r3 dl article').css({display: 'none'})
			})
					//光标特效
			cursor();
			function cursor(){
				$('#cc_r3 dl article span').hover(function(){
					$(this).find('p').css({top: 2, color: '#00c3f5'})
				}, function(){
					$(this).find('p').css({top: 0, color: '#000'})
				})
				$('#cc_r3 dl article .site').off();
			}
					//数字加减
			var cc_count = 1;
			$('#cc_r10 section').on('click', 'span:eq(0)', function(){
				if(cc_count == 1){
					return
				}
				cc_count--;
				huabei();
				$('#cc_r10 section span:eq(1)').css({color: '#000'});
				if(cc_count == 1){
					$(this).css({color: '#e0e0e0'})
				}else{
					$(this).css({color: '#000'})
				}
				$('#cc_r10 section input').val(cc_count);
			})
			$('#cc_r10 section').on('click', 'span:eq(1)', function(){
				if(cc_count == 5){
					return
				}
				cc_count++;
				huabei();
				$('#cc_r10 section span:eq(0)').css({color: '#000'});
				if(cc_count == 5){
					$(this).css({color: '#e0e0e0'})
				}else{
					$(this).css({color: '#000'})
				}
				$('#cc_r10 section input').val(cc_count);
			})
			$('#cc_r10 section input').keydown(function(ev){
				switch (ev.keyCode) {
					case 49:
						cc_count = 1;
						break;
					case 50:
						cc_count = 2;
						break;
					case 51:
						cc_count = 3;
						break;
					case 52:
						cc_count = 4;
						break;
					case 53:
						cc_count = 5;
						break;
					case 8:
						cc_count = 1;
						break;
					default:
						break;
				}
				if(cc_count == 1){
					$('#cc_r10 section span:eq(0)').css({color: '#e0e0e0'});
					$('#cc_r10 section span:eq(1)').css({color: '#000'});
				}else if(cc_count == 5){
					$('#cc_r10 section span:eq(0)').css({color: '#000'});
					$('#cc_r10 section span:eq(1)').css({color: '#e0e0e0'});
				}else{
					$('#cc_r10 section span:eq(0)').css({color: '#000'});
					$('#cc_r10 section span:eq(1)').css({color: '#000'});
				}
				$('#cc_r10 section input').val(cc_count);
				huabei();
				return false;
			});
				//花呗
			function huabei(){
				for(var i = 0; i < 3; i++){
					$('#cc_r9 i').eq(i).html(`${dbNum(cc_count * $('#cc_r9 span').eq(i).find('i').attr('class'))}x${3 * i + 3}期`)
				}
			}
				//保留两位小数
			function dbNum(num){
				return parseInt(num * 100) / 100;
			}
			//图片放大效果
			$('#con_btn ul').on('mouseenter', 'li', function(){
				$(this).find('p').stop().animate({backgroundSize: `110%`}, 200);
			}).on('mouseleave', 'li', function(){
				$(this).find('p').stop().animate({backgroundSize: `100%`}, 200);
			})
				//加入购物车
			$('#cc_r11 a:eq(1)').on('click', function(){
				if (!($.cookie('shoppingCar'))) {
                    var arr = [{
                        id: $(window).attr('id'),
                        num: $('#cc_r10 input').val()
                    }];
                    $.cookie('shoppingCar', JSON.stringify(arr), {
                        expires: 7,
                        raw: true
                    });
                } else {
                    var arr = eval($.cookie('shoppingCar'));
                    for (let i = 0; i < arr.length; i++) {
                        if(id == arr[i].id){
                            arr[i].num=parseInt(arr[i].num)+parseInt($('#cc_r10 input').val());
                            if(arr[i].num >= 5){
                            	arr[i].num = 5;
                            }
                            $.cookie('shoppingCar', JSON.stringify(arr), {
                                expires: 7,
                                raw: true
                            });
                            tool.shoppingNum();
                            return;
               	        }
                    }
                    arr.push({id:id,num:$('#cc_r10 input').val()});
                    $.cookie('shoppingCar', JSON.stringify(arr), {
                        expires: 7,
                        raw: true
                    });
                }
				tool.shoppingNum();
			})
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
		pcl: pcl
	}
}) 