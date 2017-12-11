// 返回单一随机字符
function singleStr(startNum = 32, endNum = 126) {
    return String.fromCharCode(Math.round(Math.random() * (endNum - startNum) + startNum));
}

function randomNum(n) {
    return Math.ceil(Math.random() * +n);
}

function $(str) {
    return document.getElementsByClassName(str.slice(1))[0];
}
// 替换字符串特定索引值
function replaceStr(str, ind, val) {
    var arr = str.split("");
    arr[ind] = val;
    return arr.join("");
}
// 深度克隆
function deepClone(obj) {
    if (typeof obj !== "object" && typeof obj !== 'function') {
        return obj; //原始类型直接返回
    }
    var o = Array.isArray(obj) ? [] : {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}


$(".subBtn").addEventListener("click", function() {
    var conditionObj = {
        len: $(".strLen").value || randomNum(20),
        valcase: $(".valcase").checked,
        upcase: $(".upcase").checked,
        lowcase: $(".lowcase").checked,
        numcase: $(".numcase").checked
    };
    var minLen = conditionObj.upcase + conditionObj.lowcase + conditionObj.numcase;
    var valStr = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    var resStr = "";
    var leftArr = [];
    var tempArr = [];
    if (!!$(".strLen").value && +$(".strLen").value < minLen) {
        $(".resStr").innerText = "条件出错";
        return null;
    }
    if (conditionObj.len < minLen) {
        conditionObj.len = minLen;
    }
    for (var i = 0; i < conditionObj.len; i++) {
        if (conditionObj.valcase) {
            resStr += valStr[randomNum(62) - 1];
        } else {
            resStr += singleStr();
        }
    }
    leftArr = resStr.split("");
    tempArr = deepClone(leftArr);
    // 随机一个数字索引并且替换此值，然后temp数组删除这个索引值防止重复替换同一位置的值
    if (conditionObj.upcase) {
        var indUp = randomNum(conditionObj.len) - 1;
        var upVal = leftArr[indUp];
        resStr = replaceStr(resStr, leftArr.findIndex((item) => {
            return item === upVal;
        }), singleStr(65, 90));
        tempArr.splice(indUp, 1);
    }
    if (conditionObj.lowcase) {
        var indLow = randomNum(conditionObj.len - conditionObj.upcase) - 1;
        var lowVal = tempArr[indLow];
        resStr = replaceStr(resStr, leftArr.findIndex((item) => {
            return item === lowVal;
        }), singleStr(97, 122));
        tempArr.splice(indLow, 1);
    }
    if (conditionObj.numcase) {
        var indNum = randomNum(conditionObj.len - conditionObj.upcase - conditionObj.lowcase) - 1;
        var numVal = tempArr[indNum];
        resStr = replaceStr(resStr, leftArr.findIndex((item) => {
            return item === numVal;
        }), singleStr(48, 57));
    }

    $(".resStr").innerText = resStr;
});
