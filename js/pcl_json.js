define(["tool", "jquery", "jquery-cookie"], function(tool, $){
	function json(){
		$(function(){
			$.ajax({
				method: "get",
				url: "../json/pcl.json",
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
					var content = data.content;
					for(var i = 0; i < content[1].length; i++){
						$(`<li><img src="" alt=""></li>`).appendTo('#cc_left ul');
						$('#cc_left ul li').eq(i).find('img').attr('src', `${content[1][i]}`);
						if(i == 0){
							$('#cc_left ul li').attr('class', 'active');
							$('#cc_img img').attr('src', `${content[1][0]}`)
						}
					}
					for(var i = 0; i < content[2].length; i++){
						loop('model', '#cc_r4');
						loop('network', '#cc_r5');
						loop('color', '#cc_r6');
						if(content[2][0].color_img){
							for(var j = 0; j < content[2][0].color_img.length; j++){
								$(`<img src="${content[2][0].color_img[j]}" alt="">`).appendTo($('#cc_r6 span').eq(j))
							}
						}
						loop('memory', '#cc_r7');
						loop('setMeal', '#cc_r8');
						if(content[2][0].oByStages){
							for(var j = 0; j < content[2][0]['oByStages'].length; j++){
								$(`<span><i>${content[2][0].price / (3 * j + 3) - (-content[2][0].oByStages[j])}x${3 * j + 3}期</i><em>含手续费${content[2][0].oByStages[j]}/期</em></span>`).appendTo('#cc_r9');
								$('#cc_r9 span').eq(j).find('i').attr('class', `${content[2][0].price / (3 * j + 3) - (-content[2][0].oByStages[j])}`);
							}
						}
					}
					function loop(node, address){
						if(content[2][0][node]){
							for(var j = 0; j < content[2][0][node].length; j++){
								$(`<span title=${content[2][0][node][j]}>${content[2][0][node][j]}</span>`).appendTo(address)
							}
						}else{
							$('#' + address).css('display', 'none');
						}
					}
						//地址
					for(var i = 0; i < content[0].length; i++){
						$(`<li>${content[0][i].name}</li>`).appendTo('#province')
					}
					var pNum = null;
					var cNum = null;
					var area = null;
					$('#cc_r3 dl article ol').on('click', 'li', function(ev){
						var iNum = $(this).index();
						
						if($('.site').index() == 0){
							//点击时ol显示隐藏
							$('#cc_r3 dl article ol').css('display', 'none');
							$('#city').css('display', 'block');

							pNum = iNum;
							$('#cc_r3 dl article span').attr('class', '').find('i').html('请选择');
							$('#cc_r3 dl article span:eq(1)').attr('class', 'site');
							$('#cc_r3 dl article span:eq(0)').find('i').html(`${content[0][pNum].name}`);
							$('#city').html('');
							$('#area').html('');
							for(var i = 0; i < content[0][pNum].city.length; i++){
								$(`<li>${content[0][pNum].city[i].name}</li>`).appendTo('#city')
							}
						}else if($('.site').index() == 1){
							//点击时ol显示隐藏
							$('#cc_r3 dl article ol').css('display', 'none');
							$('#area').css('display', 'block');

							cNum = iNum;
							$('#cc_r3 dl article span').attr('class', '');
							$('#cc_r3 dl article span:eq(2)').attr('class', 'site').find('i').html('请选择');
							$('#cc_r3 dl article span:eq(1)').find('i').html(`${content[0][pNum].city[cNum].name}`);
							$('#area').html('');
							for(var i = 0; i < content[0][pNum].city[cNum].area.length; i++){
								$(`<li>${content[0][pNum].city[cNum].area[i]}</li>`).appendTo('#area')
							}
						}else if($('.site').index() == 2){
							//点击时ol显示隐藏
							$('#cc_r3 dl article').css('display', 'none');

							aNum = iNum;
							$('#cc_r3 dl article span:eq(2)').find('i').html(`${content[0][pNum].city[cNum].area[aNum]}`);
							var str = '';
							for(var i = 0; i < 3; i++){
								str += $(`#cc_r3 dl article span:eq(${i})`).find('i').html() + ' ';
							}
							$('#cc_r3 dd em').html(str);
						}
					})
					//content_btn
					for(var i = 0; i < content[3].length; i++){
						$(`<li>
						<a href="">
							<p></p>
							<span>${content[3][i].title}</span>
							<span><i>￥&nbsp</i>${content[3][i].price}<em>&nbsp起</em></span>
							<span style='${newPhone()}'>新品</span>
						</a>
					</li>`).appendTo($('#con_btn ul'))
						$('#con_btn li').eq(i).find('p').css({background: `url(${content[3][i].img}) center no-repeat`, backgroundSize: `100%`})

					}
					function newPhone(){
						if(content[3][i].id == 1){
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
			$.ajax({
				url: "../json/com.json",
				success: function(data){
					if(!$.cookie('pageId')){
						return
					}
					var arr = eval($.cookie('pageId'));
					//id
					var id = arr[0].id;
					$(window).attr('id', id);

					$('#meizu section p').html(`${data.content[0][id - 1].title}`);
					$('#cc_r1').html(`${data.content[0][id - 1].title}`);
					$('#cc_r2 span').html(`${data.content[0][id - 1].price}`);
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