   var a = 1;
var zsh;
	// 匿名的立即执行函数，因访问了全局变量a，所以也是一个闭包
    (function test (){
        console.log(a);
    })();
   zsh=test ();