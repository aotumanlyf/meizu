require.config({
	paths: {
		"jquery": "jquery-1.10.1.min",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		// "parabola": "parabola",
		"pcl": "pcl",
		"pcl_json": "pcl_json",
		"tool": "tool"
	},
	//设置模块之间的依赖关系
	shim: {
		// "commodity": ["json_com"]
		"jquery-cookie": ["jquery"],
		/*
			定义不遵从AMD规范的js文件
		*/
		/*"parabola": {
			exports: "_"
		}*/
	}
})


require(['pcl', 'pcl_json'], function(pcl, json){
	pcl.pcl();
	json.json();
})