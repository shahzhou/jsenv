Java.perform(function() {
    console.log("[+] Hooking Java Crypto Methods");

    // Hook Cipher.getInstance 方法
    var Cipher = Java.use("javax.crypto.Cipher");
    Cipher.getInstance.overload('java.lang.String').implementation = function(algorithm) {
        console.log("[🔑] Cipher.getInstance() 被调用");
        console.log("   算法:", algorithm);
        var result = this.getInstance(algorithm);
        console.log("   返回的Cipher对象:", result);
        return result;
    };

    // Hook Cipher.doFinal 方法
    Cipher.doFinal.overload('[B').implementation = function(input) {
        console.log("[🔒] Cipher.doFinal() 被调用");
        console.log("   输入数据 (Hex):", toHexString(input));
        console.log("   输入数据 (String):", byteArrayToString(input));

        var result = this.doFinal(input);
        console.log("   加密结果 (Hex):", toHexString(result));
        return result;
    };
});

function byteArrayToString(bytes) {
    if (!bytes) return null;
    try {
        return String.fromCharCode.apply(null, bytes);
    } catch (e) {
        return "[Binary Data]";
    }
}