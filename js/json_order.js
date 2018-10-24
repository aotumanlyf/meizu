define(["jquery", "jquery-cookie"], function($){
	function json(){
		$(function(){
			$.ajax({
				method: 'get',
				url: '../json/com.json',
				success: function(data){
					var alNum = 0;
					var arr = eval($.cookie('shoppingCar'));
					if(!$.cookie('shoppingCar') || arr.length == 0){
						$('#con_con dl, #con_hd, #con_btn').css({display: 'none'});
						$('#con_con div').css({display: 'block'});
						return
					}
					for(var i = 0; i < arr.length; i++){
						$(`<dd id='${findId().id}'>
							<section>
								<p class="iconfont checkCom" xxx='1'>&#xe613;</p>
								<img src="${findId().img[0]}" alt="">
								<span>
									<i>${findId().title}</i>
									<em></em>
								</span>
							</section>
							<p class='unitPrice'>￥${findId().price}.00</p>
							<span class="quantity">
								<i>-</i>
								<input type="text" value="${arr[i].num}">
								<i>+</i>
							</span>
							<p class='totalPrice'>￥${findId().price}.00</p>
							<p class='fKeys iconfont'>--</p>
						</dd>`).appendTo($('#con_con dl'));
						alNum += parseInt(arr[i].num);
					}
					$('#con_btn span p:eq(1) i').html(alNum);
					topNum = $('#con_btn').offset().top;
					function findId(){
						for(var j = 0; j < data.content[0].length; j++){
							if(data.content[0][j].id == arr[i].id){
								var ojb = data.content[0][j];
								return ojb;
							}
						}
					}
				},
				error: function(msg){
					alert("aaa"+msg);
				}
			})
		})
	}
	return {json: json};
})