;require(['config'],function(){
    require(['jquery','common'],function(){
        //将商品信息写进cookie里面，本地保存读取
        var cookies = Cookie.get('carlist')
        console.log(cookies)

        //引入底部公共部分
        $('.footer').load('common.html #last',function(){
                $('.footBottom').css({'border-top':'0 none'});
        });
    })
});