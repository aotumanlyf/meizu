//了解

function startMove(node, speed, attr, iTarget, complete){ //complete = show
				clearInterval(node.timer);
				node.timer = setInterval(function(){
					//1、获取当前的值
					var iCur = null;
					if(attr == "opacity"){
						iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
					}else{
						iCur = parseInt(getStyle(node, attr))
					}
					//2、计算速度
					if(iCur < iTarget){
						speed = Math.abs(speed);
					}else{
						speed = -Math.abs(speed);
					}

					//3、运动和停止分开
					if(Math.abs(iTarget - iCur) < Math.abs(speed)){
						clearInterval(node.timer);
						/*
							手动将属性挪动到目的值。	
						*/
						if(attr == "opacity"){
							node.style.opacity = iTarget / 100;
							node.style.filter = "alpha(opacity=" + iTarget + ")";
						}else{
							node.style[attr] = iTarget + "px";
						}

						if(complete){
							complete();
						}
					}else{
						if(attr == "opacity"){
							iCur += speed;
							node.style.opacity = iCur / 100;
							node.style.filter = "alpha(opacity=" + iCur + ")";
						}else{
							node.style[attr] = iCur + speed + "px";
						}
					}
				}, 30);
			}

			function getStyle(obj, attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];
				}else{
					return getComputedStyle(obj)[attr];
				}
			}