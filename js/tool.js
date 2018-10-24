define(["jquery", "jquery-cookie"], function($){
		//购物车
	function shoppingNum(){
		var alNum = 0;
		var arr = eval($.cookie('shoppingCar'));
		if($.cookie('shoppingCar')){
			for(var i = 0; i < arr.length; i++){
				alNum += parseInt(arr[i].num);
			}
		}
		$('#header_ul1 li span').html(alNum);
	}

	return {
		shoppingNum: shoppingNum
	}
})