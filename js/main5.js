require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		// "parabola": "parabola",
		"order": "order",
		"json_order": "json_order"
	},
	//设置模块之间的依赖关系
	shim: {
		"order": ["json_order"],
		"jquery-cookie": ["jquery"],
		/*
			定义不遵从AMD规范的js文件
		*/
		/*"parabola": {
			exports: "_"
		}*/
	}
})


require(['order', 'json_order'], function(order, json){
	order.order();
	json.json();
})