<?php
    /*
        连接数据库
     */
    include "connect.php";

    /*
        接口功能：注册用户信息;
            所需参数：手机号码、密码
     */
    //接收从前端传递过来的数据
    $number = isset($_GET['number'])?$_GET['number']:null;
    $password =isset($_GET['password'])?$_GET['password']:null;
    //从数据库获取number和password
    $sql = "select * from signin where number='$number'" ;
    $result = $conn->query($sql);
    // 对密码进行加密
    // $password = md5($password);
    // var_dump($result);
    // //获取查询结果集
    // //如果用户名已经存在的话，返回already，否则写入数据库中
    if($result->num_rows>0){
        echo "already";
    }else{
        // 对密码进行加密
        $password = md5($password);
        // $result = $conn->query($sql);
        $sql = "insert into signin(number,password) value('$number','$password')";
        // var_dump($sql);
        $result = $conn->query($sql);
        echo 'success';
    }
    
    
?>