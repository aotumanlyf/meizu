<?php 
	//设置编码格式
	header("Content-type:text/html;charset=utf-8");
	/*
		总结：php链接数据的  天龙八部
	*/
	//1、链接数据库
	$link = mysql_connect("localhost", 'root', '123456');
	// var_dump($link)
	//2、判断链接是否成功
	if(!$link){
		echo "链接数据库失败";
		exit; //退出当前程序。
	}

	//3、设置字符集
	mysql_set_charset("utf8");

	//4、选择数据库
	mysql_select_db("meizu");

	//5、准备sql语句进行操作。
	$type = $_GET['type'];
	if($type == 'inspect'){
		//检查
		$phoneNum = $_POST['phoneNum'];
		$sql = "select * from meizu_data where phoneNum = '{$phoneNum}'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		if($row){
			echo 'y';
		}else{
			echo 'n';
		}
	}else if($type == 'verify'){
		//注册
		$phoneNum = $_POST['phoneNum'];
		$password = $_POST['password'];
		$sql = "insert into meizu_data(phoneNum, password) value ('{$phoneNum}', '{$password}')";
		$res = mysql_query($sql);
		if($res){
			echo "y";
		}else{
			echo "n";
		}
	}else if($type == 'logIn'){
		//登陆
		$phoneNum = $_POST['phoneNum'];
		$password = $_POST['password'];
		
		$sql = "select password from meizu_data where phoneNum = '{$phoneNum}'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		if($row){
			echo 'y';
		}else{
			echo 'n';
		}
	}

	//8、关闭数据库
	mysql_close($link);
	
 ?>	