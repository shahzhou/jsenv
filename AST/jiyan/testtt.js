function a(){
    var a = 1;
    var b = 2;
    let c = a + b;

    console.log('a:', a);
    (()=>{
        var d = 6;
        console.log('c:', c);
       console.log('d:', d);
    })()
    // console.log('d:', d); // 错误
}
a()