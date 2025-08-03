var str = document.getElementById("input").value;

function getLetters() {
    str = document.getElementById("input").value;
    // console.log(str);
}

function translateFun() {
    getLetters();
    // 将输入转换为大写以统一处理
    var originalStr = str.toUpperCase();
    var result = []; // 用于存储每个字母对应的数字
    
    // 遍历每个字母并替换
    for (let i = 0; i < originalStr.length; i++) {
        var char = originalStr[i];
        switch(char) {
            case 'C':
                result.push('1');
                break;
            case 'D':
                result.push('2');
                break;
            case 'E':
                result.push('3');
                break;
            case 'F':
                result.push('4');
                break;
            case 'G':
                result.push('5');
                break;
            case 'A':
                result.push('6');
                break;
            case 'B':
                result.push('7');
                break;
            default:
                // 如果不是简谱字母，保留原字符
                result.push(char);
        }
    }
    
    var afterStr = result.join(''); // 将数组连接成字符串
    document.getElementById("output").innerText = afterStr;
}

 function clearFun() {
    document.getElementById("input").value = '';
    document.getElementById("output").innerText = '';
}