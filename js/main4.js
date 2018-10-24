require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		// "parabola": "parabola",
		"sign": "sign",
		"json_sign": "json_sign"
	},
	//设置模块之间的依赖关系
	shim: {
		"sign": ["json_sign"],
		"jquery-cookie": ["jquery"],
		/*
			定义不遵从AMD规范的js文件
		*/
		/*"parabola": {
			exports: "_"
		}*/
	}
})


require(['sign', 'json_sign'], function(sign, json){
	sign.sign();
	json.json();
})