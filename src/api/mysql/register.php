<?php
    /*
        连接数据库
     */
    include "connect.php";

    /*
        接口功能：验证用户信息，登录;
            所需参数：手机号码、密码
     */
    //接收从前端传递过来的参数
    $number = isset($_GET['number'])?$_GET['number']:null;
    $password =isset($_GET['password'])?$_GET['password']:null;

    //从数据库获取number和password
    $sql = "select * from signin where number='$number' and password='$password'" ;
    //获取查询结果集
    $result = $conn->query($sql);

    //判断用户信息是否已经存在
    if($result->num_rows>0){
        echo "exist";
    }else{
        echo 'inexistence';
    }
?>