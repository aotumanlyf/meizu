require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		// "parabola": "parabola",
		"meizu": "meizu",
		"json": "json",
		"tool": "tool"
	},
	//设置模块之间的依赖关系
	shim: {
		"meizu": ["json"],
		"meizu": ["tool"],
		"json": ["tool"],
		"jquery-cookie": ["jquery"],
		/*
			定义不遵从AMD规范的js文件
		*/
		/*"parabola": {
			exports: "_"
		}*/
	}
})


require(['meizu', 'json'], function(meizu, json){
	meizu.meizu();
	json.json();
})