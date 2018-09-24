
//require配置

;require.config({

    //配置短路径
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'bootstrap':'../lib/bootstrap',
        'index':'js/index',
        'common':'../lib/common',
        'carousel':'/js/carousel',
        'goodsList':'js/goodsList',
        'goods':'js/goods',
        'jquery.lxzoom':'../lib/jquery-lxzoom/jquery.lxzoom',
        'register':'js/register',
        'signIn':'js/signIn',
        'car':'js/car'

    },

    //配置模块间依赖关系
    //讲明依赖关系（加载过程中自动处理先后顺序）
    
    shim:{        
        'index':['jquery'],
        'bootstrap':['jquery'],
        'carousel':['common'],
        'goodsList':['index'],
        'goods':['jquery'],
        'jquery.lxzoom':['jquery'],
        'signIn':['jquery'],
        'register':['jquery'],
        'car':['jquery']
    },



});