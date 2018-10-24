define(["jquery", "jquery-cookie"], function($){
	function commodity(){
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
			//coontent
				//选择是否是有货商品
			$('#con_con #con_con_hd span').click(function(){
				if($(this).find('i').html()){
					$(this).find('i').css({background: '#fff'}).html("")
				}else{
					$(this).find('i').css({background: '#f4f4f4'}).html("&#xe613;")
				}
			})
			//商品
				//显示对比按钮
			$('#con_con_con').on('mouseenter', ' li a', function(){
				$(this).find('.contrast').css({display: 'block'});
			}).on('mouseleave', ' li a', function(){
				if($(this).find('.contrast').attr('xxx') != 'xxx'){
					$(this).find('.contrast').css({display: 'none'});
				}
			})
				//大小图转换
			$('#con_con_con').on('click', 'li a .sImg img', function(){
					//选择小图
				$(this).closest('li').find('a .sImg img').attr('class', '');
				$(this).attr('class', 'sActive');
					//大图变换
				var iNow = $(this).index();
				$(this).closest('li').find('a .big').attr('class', 'big');
				$(this).closest('li').find('a .big').eq(iNow).attr('class', 'big active');
				return false;
			})
				//商品对比
					//警告栏关闭
			$('#ccb_hd div em').click(function(){
				$('#ccb_hd div').css('display', 'none')
			})
					//点击对比按钮,显示下栏
			var count = 0;
			var cId = [];
			$('#con_con_con').on('click', 'li a .contrast', function(){
				$('#con_con_btn').css('display', 'block');
					//遍历数组，检查是否有重复商品
				for(var i in cId){
					if(cId[i] == $(this).closest('li').attr('id')){
						warn('该商品已经添加过了哦～');
						return false;
					}
				}
				count++;
				btnNull();
				if(count == 5){
					warn('您最多只能同时对比4款商品哦～');
				}else{
						//显示对比按钮
					$(this).attr('xxx', `xxx`);
						//存入商品序号
					cId.push($(this).closest('li').attr('id'));
						//商品对比(0/4)
					$('#ccb_hd p').html(`商品对比 (${count}/4)`);
						//商品信息
					$('#ccb_btn ul li').eq(count-1).css('display', 'block');
					$('#ccb_btn ul li').eq(count-1).find('div a').html(`${$(this).closest('a').find('span:eq(0)').html()}`);
					$('#ccb_btn ul li').eq(count-1).find('div article span em').html(`${$(this).closest('a').find('span:eq(2) p').html()}.00`);
					$('#ccb_btn ul li').eq(count-1).find('div article span i').html(`${$(this).closest('a').find('span:eq(2) i').html()}`);
					$('#ccb_btn ul li').eq(count-1).find('img').attr('src',`${$(this).closest('a').find('.active').attr('src')}`);
					$('#ccb_btn ul li').eq(count-1).attr('class',`${$(this).closest('li').attr('id')}`);
				}
				return false;
			})
				//弹出警告栏
				function warn(text){
						//警告栏
					$('#ccb_hd div').css('display', 'block');
						// 警告栏延时3s消失
					clearTimeout(timer);
					 var timer = setTimeout(function(){
						$('#ccb_hd div').css('display', 'none')
					}, 3000)
						//警告信息
					$('#ccb_hd div dl dd').html(text);
				}

					//下栏功能
						//关闭
			$('#ccb_hd span').click(function(){
				$('#con_con_btn').css('display', 'none');
			})
						//删除
			$('#ccb_btn ul').on('click', 'li div article p', function(){
				//隐藏对比按钮
				$(`#con_con_con #${$(this).closest('li').attr('class')}`).find('.contrast').attr('xxx', '').css('display', 'none');
				console.log(`#con_con_con #${$(this).closest('li').attr('class')}`);

				$(this).closest("li").css('display', 'none');
				count--;
				btnNull();
				$('#ccb_hd p').html(`商品对比 (${count}/4)`);
				for(var i in cId){
					if(cId[i] == $(this).closest('li').attr('class')){
						cId.splice(i, 1);
						return false;
					}
				}
			}).find('li div').hover(function(){
				$(this).find('article p').css('display', 'block')
			}, function(){
				$(this).find('article p').css('display', 'none')
			})
						//清空
			$('#ccb_operate p').click(function(){
				$('#ccb_btn ul li').css('display', 'none');
				count = 0;
				$('#ccb_hd p').html(`商品对比 (${count}/4)`);
				cId = [];
				$('#con_con_con li .contrast').attr('xxx', '').css('display', 'none');
				btnNull();
			})
				//您还没有选择需要对比的商品哦～
			function btnNull(){
				if(count == 0){
					$('#btn_null').css('display', 'block');
				}else{
					$('#btn_null').css('display', 'none');
				}
			}

				//阴影效果
			$('#con_con').on('mouseenter', 'li', function(){
				$(this).css({boxShadow: '0px 15px 30px 0px #ddd'})
			}).on('mouseleave', 'li', function(){
				$(this).css({boxShadow: '0 0 0 0'})
			});
				//content_btn
					//点击左右滚动
			var sNum = $('#con_btn ul').position().left;
			$('#con_btn .sLeft').click(function(){
				if(sNum < 0){
					sNum += 1245;
					$('#con_btn ul').stop().animate({left: `${sNum}`});
					if(sNum == 0){
						$('#con_btn .sLeft').css({color: '#eee', border: '2px solid #eee'})
					}else{
						$('#con_btn .sRight').css({color: '#00C3F5', border: '2px solid #00C3F5'})
					}
				}
			})
			$('#con_btn .sRight').click(function(){
				if(sNum > -2490){
					sNum -= 1245;
					$('#con_btn ul').stop().animate({left: `${sNum}`});
					if(sNum == -2490){
						$('#con_btn .sRight').css({color: '#eee', border: '2px solid #eee'})
					}else{
						$('#con_btn .sLeft').css({color: '#00C3F5', border: '2px solid #00C3F5'});
					}
				}
			})

					//图片放大效果
			$('#con_btn ul').on('mouseenter', 'li', function(){
				$(this).find('p').stop().animate({backgroundSize: `110%`}, 200);
			}).on('mouseleave', 'li', function(){
				$(this).find('p').stop().animate({backgroundSize: `100%`}, 200);
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

				//加入购物车
			$('#con_con_con').on('mouseenter', 'li',function(){
                var arr = [{
                    id: $(this).attr('id'),
                }];
                $.cookie('pageId', JSON.stringify(arr), {
                    expires: 7,
                    raw: true
                });
				return false;
			})

		})
	}
	return {
		commodity: commodity
	}
})