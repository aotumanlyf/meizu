define(["tool", "jquery", "jquery-cookie"], function(tool, $){
	function json(){
		$(function(){
			$.ajax({
				method: "get",
				url: "../json/data.json",
				success: function(data){
					//header_ul2
					var header_ul2 = data.header_ul2;
					for(var i = 0; i < header_ul2.length; i++){
						for(var j = 0; j < header_ul2[i].length; j++){
							$(`<li>
					<a href="">
						<img src="${header_ul2[i][j].img}" alt="">
						<span>${header_ul2[i][j].title}</span>
						<p>${header_ul2[i][j].price }</p>
					</a>
				</li>`).appendTo($(`#header_ul2`))
						}
					}
					tool.shoppingNum();
					//banner
					var banner = data.banner;
					for(var i = 0; i < banner.length + 1; i++){
						$(`<li><a href=""></a></li>`).appendTo($('#banner_ul2'));
						if(i == banner.length){
							$(`#banner_ul2 li`).eq(i).css('background', `url(${banner[0].img}) center no-repeat`);
						}else{
							$(`#banner_ul2 li`).eq(i).css('background', `url(${banner[i].img}) center no-repeat`);
						}
					}
					//content
					var content = data.content;
						//content1
					for(var i = 0; i < content[0].length; i++){
						$(`<li>
						<a href="">
							<img src="${content[0][i].img}" alt="">
							<span>${content[0][i].title}</span>
							<p>${content[0][i].details}</p>
						</a>
					</li>`).appendTo($('#content_1'));
					}
						//content2
					$('#con_2_hd_box').html(`${content[1][0].title}`);
					$('#con_2_ban_box a').css('background-image', `url(${content[1][0].img})`)
					for(var i = 1; i < content[1].length; i++){
						$(`<li class="${content[1][i].class} other_img">
							<a href="">
								<img src="${content[1][i].img}" alt="">
								<span>${content[1][i].title}</span>
								<span>${content[1][i].details}</span>
								<span><i>${content[1][i].currency}</i>${content[1][i].price}<em style='${exists(content[1][i].sp)}'>起</em></span>
								<span style='${exists(content[1][i].id)}'>新品</span>
								<img src="${content[1][i].img}" alt="">
							</a>
						</li>`).appendTo($('#con_2_con'))
					}
					function exists(num){
						if(num == 0){
							return 'display: none';
						}					
					}
						//content3
					$('#con_3_hd_box').html(`${content[2][0].title}`);
					$('#con_3_ban_box a').css('background-image', `url(${content[2][0].img})`)
					for(var i = 1; i < content[2].length; i++){
						$(`<li class="${content[2][i].class}">
							<a href="">
								<img src="${content[2][i].img}" alt="">
								<span>${content[2][i].title}</span>
								<span>${content[2][i].details}</span>
								<span><i>${content[2][i].currency}</i>${content[2][i].price}<em>${content[2][i].original}</em></span>
							</a>
						</li>`).appendTo($('#con_3_con'))
					}
						//content4
					$('#con_4_hd_box').html(`${content[3][0].title}`);
					$('#con_4_ban_box a').css('background-image', `url(${content[3][0].img})`)
					for(var i = 1; i < content[3].length; i++){
						$(`<li class="${content[3][i].class}">
							<a href="">
								<img src="${content[3][i].img}" alt="">
								<span>${content[3][i].title}</span>
								<span>${content[3][i].details}</span>
								<span><i>${content[3][i].currency}</i>${content[3][i].price}<em>${content[2][i].original}</em></span>
							</a>
						</li>`).appendTo($('#con_4_con'))
					}
						//content5
					$('#con_5_hd_box').html(`${content[4][0].title}`);
					$('#con_5_ban_box a').css('background-image', `url(${content[4][0].img})`)
					for(var i = 1; i < content[4].length; i++){
						$(`<li class="${content[4][i].class}">
							<a href="">
								<img src="${content[4][i].img}" alt="">
								<span>${content[4][i].title}</span>
								<span>${content[4][i].details}</span>
								<span><i>${content[4][i].currency}</i>${content[4][i].price}<em>${content[2][i].original}</em></span>
							</a>
						</li>`).appendTo($('#con_5_con'))
					}
						//content6
					$('#con_6_hd_box').html(`${content[5][0].title}`);
					for(var i = 1; i < content[5].length; i++){
						$(`<li class="other_img">
							<a href="">
								<img src="${content[5][i].img}" alt="">
								<div>
									<img src="${content[5][i].portrait}" alt="">
									<span>${content[5][i].user}</span>
								</div>
								<p>${content[5][i].intro}</p>
								<p>${content[5][i].commodity}</p>
							</a>
						</li>`).appendTo($('#con_6_con'))
					}
						//content7
					$('#con_7_hd_box').html(`${content[6][0].title}`);
					for(var i = 1; i < content[6].length; i++){
						$(`<li class="other_img">
							<a href="">
								<div>
									<img src="${content[6][i].img}" alt="">
									<span>
										<i></i>
									</span>
								</div>
								<p>${content[6][i].title}</p>
							</a>
						</li>`).appendTo($('#con_7_con'))
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