define(["tool", "jquery", "jquery-cookie"], function(tool, $){
	function json(){
		$(function(){
			$.ajax({
				method: "get",
				url: "../json/com.json",
				success: function(data){
					//header
					var header = data.header;
					for(var i = 0; i < header.length; i++){
						for(var j = 0; j < header[i].length; j++){
							$(`<li>
					<a href="">
						<img src="${header[i][j].img}" alt="">
						<span>${header[i][j].title}</span>
						<p>${header[i][j].price }</p>
					</a>
				</li>`).appendTo($(`#header_ul2`))
						}
					}

					tool.shoppingNum();
					//content
						//content-con
					var content = data.content;
					for(var i = 0; i < content[0].length; i++){
						$(`<li id="${content[0][i].id}">
							<a href="pcl.html">
								${aimg('big active', 'big')}
								<div class='sImg'>
									${aimg('sActive', '')}
								</div>
								<span>${content[0][i].title}</span>
								<span>${content[0][i].details}</span>
								<span><i>￥</i><p>${content[0][i].price}</p><em>起</em></span>
								<div class='contrast'>
									<p class="iconfont">&#xe603;</p>
									<i>对比</i>
								</div>
							</a>
						</li>`).appendTo($('#con_con_con'));
					}
					//下载图片
					function aimg(n1, n2){
						var str = '';
						for(var j = 0; j < content[0][i].img.length; j++){
							if(content[0][i].img[j]){
								if(j == 0){
									str += `<img class="${n1}" src="${content[0][i].img[j]}" alt="">`
								}else{
									str += `<img class="${n2}" src="${content[0][i].img[j]}" alt="">`
								}
							}
						}
						return str;
					}
						//content_btn
					for(var i = 0; i < content[1].length; i++){
						$(`<li>
						<a href="">
							<p></p>
							<span>${content[1][i].title}</span>
							<span><i>￥&nbsp</i>${content[1][i].price}<em>&nbsp起</em></span>
							<span style='${newPhone()}'>新品</span>
						</a>
					</li>`).appendTo($('#con_btn ul'))
						$('#con_btn li').eq(i).find('p').css({background: `url(${content[1][i].img}) center no-repeat`, backgroundSize: `100%`})

					}
					function newPhone(){
						if(content[1][i].id == 1){
							return 'display: block';
						}else{
							return 'display: none'
						}
					}
				},
				error: function(msg){
					alert("aaa"+msg);
				}
			})
		})
	}
	return {
		json: json
	};
})