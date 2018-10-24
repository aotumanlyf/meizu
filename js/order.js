define(["jquery", "jquery-cookie"], function($){
	function order(){
		$(function(){

			//header
			$('#header_right ol li').mouseenter(function(){
				$('#header_right ol').stop().animate({height: '230px'}).css({border: '1px solid #ccc'})
			}).mouseleave(function(){
				$('#header_right ol').stop().animate({height: '38px'}, function(){
					$('#header_right ol').css({border: '1px solid #fff'});
				})
			})
			//content
				//下栏 滚动窗口 浮动
			$(window).scroll(function(){
				scrollBtn();
			});
			function scrollBtn(){
				if((topNum - $(window).scrollTop() + 50) > $(window).height()){
					$('#con_btn').css({width: '100%', position: 'fixed', bottom: 0, left: 0, boxShadow: '10px 0px 2px 2px #eee'})
				}else{
					$('#con_btn').css({width: '1240px', position: 'relative', boxShadow: 'none'})
				}
			}
				//点击
			hits('.checkAll');
			hits('.checkCom');

				//编辑
			var pCount = 0
			$('#con_hd p:eq(3)').click(function(){
				if(pCount == 0){
					$(this).html('完成');
					pCount++;

					$('.fKeys').html('<i>&#xe604;</i><i></i>');
				}else{
					$(this).html('编辑');
					pCount--;

					$('.fKeys').html('--');
				}
			})
					//删除键
			$('#con_con dl').on('mouseenter', 'dd .fKeys i', function(){
				$(this).closest('.fKeys').find('i:eq(1)').stop().animate({opacity: 1});
			}).on('mouseleave', 'dd .fKeys i', function(){
				$(this).closest('.fKeys').find('i:eq(1)').stop().animate({opacity: 0});
			})
			$('#con_con dl').on('click', 'dd .fKeys i', function(){
				$(this).closest('dd').remove();
				if($('#con_con dl dd').size() == 0){
					$('#con_con dl, #con_hd, #con_btn').css({display: 'none'});
					$('#con_con div').css({display: 'block'});
				}
				num_total();
				scrollBtn();
				cook($(this));
			})
						//删除所选
			$('#con_btn span p:eq(0)').click(function(){
				var pitchNum = 0;
				var AllNum = $('#con_con dl dd').size();
				for(var i = AllNum; i > 0; i--){
					if($('#con_con dd').eq(i - 1).find('.checkCom').attr('xxx') == 0){
						cook($('#con_con dd').eq(i - 1).find('.checkCom'));
						$('#con_con dd').eq(i - 1).remove();
						pitchNum++;
					}
				}
				if(AllNum == pitchNum){
					$('#con_con dl, #con_hd, #con_btn').css({display: 'none'});
					$('#con_con div').css({display: 'block'});
				}
				num_total();
				scrollBtn();
			})
			//删除cookie
			function cook(node){
                var arr = eval($.cookie('shoppingCar'));
                var ddId = $(node).closest('dd').attr('id');
                for (var i = 0; i < arr.length; i++) {
                	if(arr[i].id == ddId){
                    	arr.splice(i, 1);
                    	$.cookie('shoppingCar', JSON.stringify(arr), {
	                        expires: 7,
	                        raw: true
	                    });
                	}
                }
			}
					//加减商品数量
			var inputNum = 0;
						//+
			$('#con_con dl').on('click', '.quantity i:nth-of-type(2)',function(){
				inputNum = parseInt($(this).siblings('input').val());
				if(inputNum < 5){
					$(this).siblings('input').val(inputNum + 1);
					$(this).closest('dd').find('.totalPrice').html(`￥${$(this).closest('dd').find('.unitPrice').html().slice(1) * (inputNum + 1)}.00`);
					cookNum($(this), inputNum + 1);
				}
				if(inputNum == 4){
					$(this).css({color: '#ccc', cursor: 'auto'});
				}else if(inputNum == 1){
					$(this).siblings('i').css({color: '#333', cursor: 'pointer'})
				}
				num_total();

			})
						//-
			$('#con_con dl').on('click', '.quantity i:nth-of-type(1)',function(){
				inputNum = parseInt($(this).siblings('input').val());
				if(inputNum > 1){
					$(this).siblings('input').val(inputNum - 1);
					$(this).closest('dd').find('.totalPrice').html(`￥${$(this).closest('dd').find('.unitPrice').html().slice(1) * (inputNum - 1)}.00`);
					cookNum($(this), inputNum - 1);
				}
				if(inputNum == 2){
					$(this).css({color: '#ccc', cursor: 'auto'})
				}else if(inputNum == 5){
					$(this).siblings('i').css({color: '#333', cursor: 'pointer'})
				}
				num_total();
			})
				//改变cookie数量
			function cookNum(node, num){
                var arr = eval($.cookie('shoppingCar'));
                var ddId = $(node).closest('dd').attr('id');
				for(var i = 0; i < arr.length; i++){
					if(arr[i].id == ddId){
                    	arr[i].num = num;
                    	$.cookie('shoppingCar', JSON.stringify(arr), {
	                        expires: 7,
	                        raw: true
	                    });
                	}
				}
			}

				//点击函数
			function hits(node){
				$('dl').on('mousedown', node, function(){
					var nAll = $(this).attr('xxx');
					if(node == '.checkAll'){
						if(nAll == 1){
							$('.checkAll, .checkCom').css({background: '#00c3f5', border: '1px solid #00c3f5'})
							.attr('xxx', 0);
							nAll++;
						}else{
							$('.checkAll, .checkCom').css({background: '#fff', border: '1px solid #aaa'})
							.attr('xxx', 1);
							nAll--;
						}
					}else{
						var cStr1 = '';
						for(var i = 0; i < $('#con_con dd').size(); i++){
							cStr1 += $('#con_con dd').eq(i).find('.checkCom').attr('xxx');
						}
						if(cStr1 == 0){
							$('.checkAll').css({background: '#fff', border: '1px solid #aaa'})
							.attr('xxx', 1);
						}
						if(nAll == 1){
							$(this).css({background: '#00c3f5', border: '1px solid #00c3f5'})
							.attr('xxx', 0);
							nAll++;
						}else{
							$(this).css({background: '#fff', border: '1px solid #aaa'})
							.attr('xxx', 1);
							nAll--;
						}
						var cStr2 = '';
						for(var i = 0; i < $('#con_con dd').size(); i++){
							cStr2 += $('#con_con dd').eq(i).find('.checkCom').attr('xxx');
						}
						if(cStr2 == 0){
							$('.checkAll').css({background: '#00c3f5', border: '1px solid #00c3f5'})
							.attr('xxx', 0);
						}
					}
					num_total();
				});
			}
				//选中商品的数量  商品总价
			function num_total(){
				var allNum = 0;
				var ckNum = 0;
				var allPrice = 0;
				for(var i = 0; i < $('#con_con dd').size(); i++){
					allNum += parseInt($('#con_con dd').eq(i).find('input').val());
					if($('#con_con dd').eq(i).find('.checkCom').attr('xxx') == 0){
						ckNum += parseInt($('#con_con dd').eq(i).find('.quantity input').val());
						allPrice += parseInt($('#con_con dd').eq(i).find('.totalPrice').html().slice(1));
					}
				}
				$('#con_btn span p:eq(1) i').html(allNum);
				$('#con_btn span p em').html(ckNum);
				$('#con_btn span:eq(1) p em').html(`￥${allPrice}.00`);
				if(allPrice == 0){
					$('#con_btn span:eq(1) p:eq(1)').css({borderColor: '#DBDBDB', background: '#DBDBDB', cursor: 'auto'})
				}else{
					$('#con_btn span:eq(1) p:eq(1)').css({borderColor: '#F66567', background: '#F66567', cursor: 'pointer'})
				}
			}
		})
	}
	return {order: order};
})