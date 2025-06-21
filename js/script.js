var str = document.getElementById("input").value;

function getLetters() {
    str = document.getElementById("input").value;
    console.log(str);  
}

function translateFun() {
    getLetters();

    if(str.match(/[a-zA-Z]/) ){
        // 替换大写字母
        var originalStr = str.toUpperCase();
        var Letters = ["C", "D", "E", "F", "G", "A", "B"];
        var afterStr;
        for (let i = 0; i < Letters.length; i++) {
            afterStr += originalStr.replace(Letters[i], i + 1);
        }
        afterStr=afterStr.replace(/[a-zA-Z]+/g,"");
        console.log(afterStr);
        document.getElementById("output").innerText = afterStr;
    }else{}
}

function clearFun() {
    document.getElementById("input").innerHTML = '';
    document.getElementById("output").innerHTML = '';
}