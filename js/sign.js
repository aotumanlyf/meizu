define(["jquery", "jquery-cookie"], function($){
	function sign(){
		$(function(){
			//header
				//获取焦点边框变蓝
			$('#con_input1 input, #con_input2 input, #con_input3 input, #con_input4 input, #con_input_f1 input, #con_input_f2 input, #con_input_f3 input').focus(function(){
				$(this).closest('div').css({border: '1px solid #32A5E7'})
			}).blur(function(){
				$(this).closest('div').css({border: '1px solid #dadada'})
			})
				//对号按钮
			var cNum = 0;
			$('#form1 dl').click(function(){
				if(cNum == 0){
					cNum++;
					$('#form1 dl dt').css({
						border: '1px solid #32A5E7',
						background: '#32A5E7',
					})
				}else{
					cNum--;
					$('#form1 dl dt').css({
						border: '1px solid #aaa',
						background: '#fff',
					})
				}
			})
				//登录方式切换
			$('#con_hd p:eq(0)').click(function(){
				$('#con_hd p').attr('class', '');
				$(this).attr('class', 'active');
				cut();
			})
			$('#con_hd p:eq(1)').click(function(){
				$('#con_hd p').attr('class', '');
				$(this).attr('class', 'active');
				cut();
			})
			function cut(){
				if($('#con_hd p:eq(0)').attr('class') == 'active'){
					$('#con_input1, #con_input2, #xxx, #form1 dl').css({display: 'block'});
					$('#con_input3, #con_input4').css({display: 'none'});
				}else{
					$('#con_input1, #con_input2, #xxx, #form1 dl').css({display: 'none'});
					$('#con_input3, #con_input4').css({display: 'block'});
				}
			}
				//账号登陆
			$('#login').click(function(){
				var inTrue = false;
				$.ajax({
					method: 'post',
					url: '../php/sign.php?type=logIn',
					data: `phoneNum=${$('#con_input1 input').val()}&password=${$('#con_input2 input').val()}`,
					success: function(res){
						console.log(res);
						if(res.charAt(0) == 'y'){
							console.log('登陆成功');
							inTrue = true;
						}else{
							console.log('登陆失败');
							inTrue = false;
						}
						if(inTrue){
							//跳转页面
							location.assign('10.30.151.42/dist/html/meizu.html/');
						}else{
							if(!$('#con_input1 input').val()){
								$('#form1 h5').css({display: 'block'})
								.html(`<em class='iconfont'>&#xe666;</em>请输入完整信息<em class='iconfont'>&#xe604;</em>`);
							}else{
								$('#form1 h5').css({display: 'block'})
								.html(`<em class='iconfont'>&#xe666;</em>账号不存在<em class='iconfont'>&#xe604;</em>`);
							}
						}
					},
					error: function(msg){
						alert("vvv"+msg);
					}
				})
			})
				//二维码
			var iNum = 0;
			$('#form1 i').click(function(){
				if(iNum == 0){
					iNum++;
					$('#QR_hd').nextAll().css({display: 'block'});
					$('#QR_hd').prevAll().css({display: 'none'});
					$('#QR_hd').css({display: 'block'});
					$('#form1 i img').attr('src', '../images/pc.png');
					$('#form1 i').css({display: 'block'})
				}else{
					iNum--;
					$('#QR_hd').nextAll().css({display: 'none'});
					$('#QR_hd').css({display: 'none'});
					$('#QR_hd').prevAll().css({display: 'block'});
					$('#form1 i img').attr('src', '../images/qr.png');
					$('#form1 i').css({display: 'block'});
					cut();
				}
			})
				//登录注册转换
			var fNum = 0;
			$('#form1 section a:eq(0)').click(function(){
				$('#form1').css({display: 'none'});
				$('#form2 p').nextAll().css({display: 'none'});
				$('#con_input_f1 input').val('');
				$('#con_input_f3 input').val('');
				$('#form2, #form2 p, #con_input_f1, #yyy, #form2 span, #logon, #form2 section').css({display: 'block'});
				fNum = 0;
				return false;
			})
			$('#form2 section a').click(function(){
				$('#form1').css({display: 'block'});
				$('#form2').css({display: 'none'});
				return false;
			})
				//注册第二步,第三步,第四步
			var logNum = null;
			var isTrue = false;
			$('#form2 #logon').click(function(){
				if(fNum == 0){
					if(fPhone($('#con_input_f1 input').val())){
						$.ajax({
							method: 'post',
							url: '../php/sign.php?type=inspect',
							data: `phoneNum=${$('#con_input_f1 input').val()}`,
							success: function(res){
								console.log(res.charAt(0));
								if(res.charAt(0) == 'y'){
									$('#con_text h5:eq(0)').html('<em>&#xe666;</em>该手机号已注册 Flyme 账号<em>&#xe604;</em>').css({display: 'block'});
									$('#con_text h5:eq(1)').css({display: 'none'});
									$('#con_text').css({display: 'block'});
									isTrue = false;
								}
								isTrue = true;
								if(!isTrue){
									console.log(1);
									return
								}
								fNum++;
								$('#con_input_f1, #yyy, #form2 span').css({display: 'none'});
								$('#con_text, #con_input_f3').css({display: 'block'});
								$('#con_input_f3 input').val('');
								$('#con_text h5:eq(1)').css({display: 'block'})
								.html(`我已发送一条验证码至<em>${$('#con_input_f1 em').html().slice(0, 3)} ${$('#con_input_f1 input').val()}</em>请输入短信中的验证码`);
								$('#logon').html('下一步');
								setItn();
								$('#con_text h5:eq(0)').css({display: 'none'});
								logNum = auth();
								console.log(logNum);
							},
							error: function(msg){
								alert("aab"+msg);
							}
						})
					}else{
						$('#con_text').css({display: 'block'});
						$('#con_text h5:eq(0)').html('<em>&#xe666;</em>请输入有效手机号<em>&#xe604;</em>').css({display: 'block'});
					}
				}else if(fNum == 1){
					//检验验证码
					if($('#con_input_f3 input').val() == logNum){
						fNum++;
						$('#con_input_f3').css({display: 'none'});
						$('#con_input_f2').css({display: 'block'});
						$('#con_text h5:eq(1)').html('密码长度为 8-16 位，至少包含字母、数字和符号中的两种类型，且不可与账号相同');
						$('#logon').html('提交');	
						$('#con_text h5:eq(0)').css({display: 'none'});
					}else{
						$('#con_text h5:eq(0)').html('<em>&#xe666;</em>请填写正确验证码<em>&#xe604;</em>').css({display: 'block'});
					}
					
				}else if(fNum == 2){
					if(pass()){
						signon();
						$('#form1').css({display: 'block'});
						$('#form2').css({display: 'none'});
					}
				}
			})
				//关闭警告栏
			$('#form1 h5').on('click', ' em:eq(1)', function(){
				$("#form1 h5").css({display: 'none'});
			})
			$('#con_text h5:eq(0)').on('click', ' em:eq(1)', function(){
				$("#con_text h5:eq(0)").css({display: 'none'});
			})
			//检查
			function signInspect(){
				 $.ajax({
					method: 'post',
					url: '../php/sign.php?type=inspect',
					data: `phoneNum=${$('#con_input_f1 input').val()}`,
					success: function(res){
						console.log(res.charAt(0));
						if(res.charAt(0) == 'y'){
							$('#con_text h5:eq(0)').html('<em>&#xe666;</em>该手机号已注册 Flyme 账号<em>&#xe604;</em>').css({display: 'block'});
							$('#con_text').css({display: 'block'});
							return false;
						}
						return true;
					},
					error: function(msg){
						alert("aa1"+msg);
					}
				})
			}
			//注册
			function signon(){
				 $.ajax({
					method: 'post',
					url: '../php/sign.php?type=verify',
					data: `phoneNum=${$('#con_input_f1 input').val()}&password=${$('#con_input_f2 input').val()}`,
					success: function(res){
						if(res.charAt(0) == "y"){
							console.log('注册成功');
						}else{
							console.log('注册失败');
						}
					},
					error: function(msg){
						alert("aa2"+msg);
					}
				})
			}
			//登陆
			function signin(){
				$.ajax({
					method: 'post',
					url: '../php/sign.php?type=logIn',
					data: `phoneNum=${$('#con_input1 input').val()}&password=${$('#con_input2 input').val()}`,
					success: function(res){
						if(res == 'y'){
							console.log('登陆成功');
						}else{
							console.log('登陆失败');
						}
					},
					error: function(msg){
						alert("aa3"+msg);
					}
				})
			}

			//函数
					//判断手机号
			function fPhone(str){
				return /^\d{11}$/.test(str);
			}
					//验证码
			function auth(){
				var aNum = null;
				var aStr = '';
				var aCount = 0;
				while(1){
					aNum = parseInt(Math.random() * 100) + 30;
					// console.log(aNum);
					if((aNum >= 48 && aNum <= 57) || (aNum >= 65 && aNum <= 90) || (aNum >= 97 && aNum <= 122)){
						aStr += String.fromCharCode(aNum);
						// console.log(String.fromCharCode(aNum));
						aCount++;
					}
					if(aCount == 6){
						return aStr;
					}
				}
			}
					//计时器
			function setItn(){
				var tNum = 60;
				clearInterval(timer);
				var timer = setInterval(function(){
					tNum--;
					if(tNum <= 0){
						clearInterval(timer);
						$('#con_input_f3 em').html(`获取验证码`).css({cursor: 'pointer', marginLeft: '10px'}).hover(function(){
							$(this).css({color: '#32A5E7'});
						}, function(){
							$(this).css({color: '#bababa'})
						});
					}else{
						$('#con_input_f3 em').html(`${tNum}秒后重新获取`);
					}
				}, 1000)
			}
					//判断密码格式
			function pass(){
				var pStr = $('#con_input_f2 input').val();
				if(pStr.length < 8 || pStr.length > 16){
					$('#con_text h5:eq(0)').html('<em>&#xe666;</em>密码长度应为8-16个字符，区分大小写<em>&#xe604;</em>')
					.css({display: 'block'});
				}else if(pStr == $('#con_input_f1 input').val){
					$('#con_text h5:eq(0)').html('<em>&#xe666;</em>密码不能与账号重复<em>&#xe604;</em>').css({display: 'block'});
				}else if(fStr(pStr)){
					$('#con_text h5:eq(0)').html('<em>&#xe666;</em>至少包含字母、数字和符号的两种类型<em>&#xe604;</em>').css({display: 'block'});
				}else{
					$('#con_text h5:eq(0)').css({display: 'none'})
					return true;
				}
				return false;
			}
					//判断字符串组成
			function fStr(str){
				if(/^\d*$/.test(str) || /^[a-zA-Z]*$/.test(str) || /^[^0-9a-zA-Z]*$/.test(str)){
					return true;
				}else{
					return false;
				}
			}
		})
	}
	return {
		sign: sign
	};
})