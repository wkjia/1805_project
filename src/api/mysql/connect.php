<?php

    /*
    接口功能：连接数据库
        
        步骤： 配置连接、创建连接

     */
    
    //配置连接参数
     $servername = 'localhost';
     $username = 'root';
     $password = "";
     $dbname = 'fangke';

     //连接到数据库
     $conn = new mysqli($servername, $username, $password, $dbname);

     //(检测连接)检测连接）判断数据库是否连接成功(php中操作面向对象的方法)
     if($conn->connect_error){
        //失败时输出信息并结束连接
        die("连接失败: " . $conn->connect_error);
     };

     // $sql = "select * from mt_goods";
     // $result = $conn->query($sql);
     // print_r($result)

?>