require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		// "parabola": "parabola",
		"commodity": "commodity",
		"json_com": "json_com",
		"tool": "tool"
	},
	//设置模块之间的依赖关系
	shim: {
		"jquery-cookie": ["jquery"],
		/*
			定义不遵从AMD规范的js文件
		*/
		/*"parabola": {
			exports: "_"
		}*/
	}
})


require(['commodity', 'json_com'], function(commodity, json){
	commodity.commodity();
	json.json();
})