

// 控制页面切换
function showLevel(level) {
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`level${i}`).style.display = (i === level) ? 'block' : 'none';
    }
}

// 加密处理
function processLevel1() {
    const plaintext = document.getElementById('plaintext1').value;
    const key = document.getElementById('key1').value;
    const operation = document.querySelector('input[name="operation1"]:checked').value;
    const output = document.getElementById('output1');

    if(key.length !== 16){
        alert("密钥必须为16bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为16bit二进制数")
            return;
        }
    }

    if (operation === "加密") {
        if(plaintext.length !== 16){
            alert("明文必须为16bit二进制数")
            return;
        }
        for(let str of plaintext){
            if(str !== "0" && str !== "1"){
                alert("明文必须为16bit二进制数")
                return;
            }
        }
        const data = {
            plainText: plaintext.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/encrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "加密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("加密失败")
            }
        });
    } else {
        const data = {
            plainText: plaintext.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/exencrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "扩展加密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("加密失败")
            }
        })
    }
}

// 解密处理
function processLevel2() {
    const cipherText = document.getElementById('cipherText1').value;
    const key = document.getElementById('key2').value;
    const operation = document.querySelector('input[name="operation2"]:checked').value;
    const output = document.getElementById('output2');

    if(key.length !== 16){
        alert("密钥必须为16bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为16bit二进制数")
            return;
        }
    }

    if (operation === "解密") {
        if(cipherText.length !== 16){
            alert("密文必须为16bit二进制数")
            return;
        }
        for(let str of cipherText){
            if(str !== "0" && str !== "1"){
                alert("密文必须为16bit二进制数")
                return;
            }
        }
        const data = {
            cipherText: cipherText.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/decrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "解密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("解密失败")
            }
        });
    } else {
        const data = {
            cipherText: cipherText.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/exdecrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "扩展解密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("解密失败")
            }
        })
    }
}

function doubleEncrypt(){
    const plaintext = document.getElementById('plaintext2').value;
    const key = document.getElementById('key3').value;
    const operation = document.querySelector('input[name="operation3"]:checked').value;
    const output = document.getElementById('output3');

    if(key.length !== 32){
        alert("密钥必须为32bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为32bit二进制数")
            return;
        }
    }

    if (operation === "加密") {
        if(plaintext.length !== 16){
            alert("明文必须为16bit二进制数")
            return;
        }
        for(let str of plaintext){
            if(str !== "0" && str !== "1"){
                alert("明文必须为16bit二进制数")
                return;
            }
        }
        const data = {
            plainText: plaintext.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/dencrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "加密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("加密失败")
            }
        });
    } else {
        const data = {
            plainText: plaintext.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/dexencrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "扩展加密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("加密失败")
            }
        })
    }
}

function doubleDecrypt(){
    const cipherText = document.getElementById('cipherText2').value;
    const key = document.getElementById('key4').value;
    const operation = document.querySelector('input[name="operation4"]:checked').value;
    const output = document.getElementById('output4');

    if(key.length !== 32){
        alert("密钥必须为32bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为32bit二进制数")
            return;
        }
    }
    if (operation === "解密") {
        if(cipherText.length !== 16){
            alert("密文必须为16bit二进制数")
            return;
        }
        for(let str of cipherText){
            if(str !== "0" && str !== "1"){
                alert("密文必须为16bit二进制数")
                return;
            }
        }
        const data = {
            cipherText: cipherText.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/ddecrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "解密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("解密失败")
            }
        });
    } else {
        const data = {
            cipherText: cipherText.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/dexdecrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "扩展解密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("解密失败")
            }
        })
    }
}

function tripleEncrypt(){
    const plaintext = document.getElementById('plaintext3').value;
    const key = document.getElementById('key5').value;
    const operation = document.querySelector('input[name="operation5"]:checked').value;
    const output = document.getElementById('output5');

    if(key.length !== 48){
        alert("密钥必须为48bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为48bit二进制数")
            return;
        }
    }

    if (operation === "加密") {
        if(plaintext.length !== 16){
            alert("明文必须为16bit二进制数")
            return;
        }
        for(let str of plaintext){
            if(str !== "0" && str !== "1"){
                alert("明文必须为16bit二进制数")
                return;
            }
        }
        const data = {
            plainText: plaintext.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/tencrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "加密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("加密失败")
            }
        });
    } else {
        const data = {
            plainText: plaintext.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/texencrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "扩展加密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("加密失败")
            }
        })
    }
}

function tripleDecrypt(){
    const cipherText = document.getElementById('cipherText3').value;
    const key = document.getElementById('key6').value;
    const operation = document.querySelector('input[name="operation6"]:checked').value;
    const output = document.getElementById('output6');

    if(key.length !== 48){
        alert("密钥必须为48bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为48bit二进制数")
            return;
        }
    }
    if (operation === "解密") {
        if(cipherText.length !== 16){
            alert("密文必须为16bit二进制数")
            return;
        }
        for(let str of cipherText){
            if(str !== "0" && str !== "1"){
                alert("密文必须为16bit二进制数")
                return;
            }
        }
        const data = {
            cipherText: cipherText.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/tdecrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "解密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("解密失败")
            }
        });
    } else {
        const data = {
            cipherText: cipherText.toString(),
            Key: key.toString()
        }
        $.ajax({
            url: 'http://127.0.0.1:8080/yuanshen/texdecrypt',
            type: 'POST',
            data: data,
            ontentType: 'application/json', // 设置内容类型为 JSON
            success: function(response) {
                output.innerHTML = "扩展解密结果: " +  response.data        
            },
            error: function(xhr, status, error) {
                alert("解密失败")
            }
        })
    }
}


// 清空输入
function clearInputs(level) {
    document.querySelectorAll(`#level${level} input[type="text"]`).forEach(input => input.value = '');
    document.querySelectorAll(`#level${level} p`).forEach(p => p.innerText = '');
}

// 添加明密文对
function addPair(){
    const pairsContainer = document.querySelector("#pairsContainer")
    const pairDiv = document.createElement('div')
    pairDiv.innerHTML = `
    <label >明文</label>
    <input type="text" class="plainTextInput">
    <label >密文</label>
    <input type="text" class="cipherTextInput">
    <hr>
`
    pairsContainer.appendChild(pairDiv)
}

// 破解
function crack(){
    const plainTexts = document.querySelectorAll(".plainTextInput")
    const cipherTexts = document.querySelectorAll(".cipherTextInput")

    // 判断输入
    const count = plainTexts.length
    for(let i = 0; i < count; i ++){
        const plainText = plainTexts[i].value
        const cipherText = cipherTexts[i].value
        if(ValleyInput(plainText, cipherText) === false){
            alert("数据输入错误！")
            return
        }
    }
    // 获取输入
    let plains = []
    let ciphers = []
    for(let i = 0; i < count; i ++){
        plains[i] = plainTexts[i].value
        ciphers[i] = cipherTexts[i].value
    }
    const data = {
        plains: plains,
        ciphers: ciphers
    }
    $.ajax({
        url: 'http://127.0.0.1:8080/yuanshen/crack',
        type: 'POST',
        data: data,
        ontentType: 'application/json', // 设置内容类型为 JSON
        success: function(response) {
            AddResult(response.keys, response.len, response.time)
            console.log(response.keys)  
        },
        error: function(xhr, status, error) {
            alert("破解失败")
        }
    })
}

// 判断输入数据是否合理
function ValleyInput(plainText, cipherText){
    if(plainText.slice() === "" || cipherText.slice() === "") return false
    if(judgeBinary(plainText) && judgeBinary(cipherText)) return true
    if(Math.abs(plainText.length - cipherText.length) <= 1) return true
    return false
}

function judgeBinary(text){
    if(text.length !== 16) return false
    for(let i of text){
        if(i !== "0" || i !== "1") return false
    }
    return true
}
// 显示破解结果
function AddResult(keys, len, time){
    const crackResult = document.querySelector("#crackResult")
    const lenP = document.createElement('p')
    lenP.innerHTML = `找到密钥 ${len} 个`
    crackResult.appendChild(lenP)
    const timeP = document.createElement('p')

    timeP.innerHTML = `花费时间 ${time} ms `
    crackResult.appendChild(timeP)
    if(len > 10){
        const p = document.createElement('p')
        p.innerHTML = `密钥太多，仅显示10个`
        crackResult.appendChild(p)
        for(let i = 0; i < 10; i ++){
            const key = keys[i]
            const keyP = document.createElement('p')
            keyP.innerHTML = `密钥: ${key}`
            crackResult.appendChild(keyP)
        }

        // 存储密钥到 sessionStorage
        sessionStorage.setItem('allKeys', JSON.stringify(keys)); // 存储密钥

        // 添加查看所有密钥的链接，跳转到新页面
        const viewAllLink = document.createElement('a');
        viewAllLink.href = 'allKeys.html'; // 跳转到新页面
        viewAllLink.innerHTML = "点击查看所有密钥";
        crackResult.appendChild(viewAllLink);
    }
    else {
        for(let i = 0; i < len; i ++){
            const key = keys[i]
            const keyP = document.createElement('p')
            keyP.innerHTML = `密钥: ${key}`
            crackResult.appendChild(keyP)
        }
    }
}

// cbc加密解密
function cbcEncrypt(){
    const output = document.querySelector("#output7")
    const plainText = document.querySelector("#plaintext4").value
    const key = document.querySelector("#key7").value
    const IV = document.querySelector("#IV1").value

    if(key.length !== 16){
        alert("密钥必须为16bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为16bit二进制数")
            return;
        }
    }
    if(IV.length !== 16){
        alert("IV必须为16bit二进制数")
        return
    }
    for(let str of IV){
        if(str !== "0" && str !== "1"){
            alert("IV必须为16bit二进制数")
            return;
        }
    }
    if(plainText === ""){
        alert("明文不可为空字符串")
        return
    }

    const data = {
        plainText: plainText,
        Key: key,
        IV: IV
    }
    $.ajax({
        url: 'http://127.0.0.1:8080/yuanshen/cbcencrypt',
        type: 'POST',
        data: data,
        ontentType: 'application/json', // 设置内容类型为 JSON
        success: function(response) {
            output.innerHTML = "CBC加密结果:" +  response.data        
        },
        error: function(xhr, status, error) {
            alert("加密失败")
        }
    })
}

function cbcDecrypt(){
    const output = document.querySelector("#output8")
    const cipherText = document.querySelector("#cipherText4").value
    const key = document.querySelector("#key8").value
    const IV = document.querySelector("#IV2").value

    if(key.length !== 16){
        alert("密钥必须为16bit二进制数")
        return
    }
    for(let str of key){
        if(str !== "0" && str !== "1"){
            alert("密钥必须为16bit二进制数")
            return;
        }
    }
    if(IV.length !== 16){
        alert("IV必须为16bit二进制数")
        return
    }
    for(let str of IV){
        if(str !== "0" && str !== "1"){
            alert("IV必须为16bit二进制数")
            return;
        }
    }
    if(cipherText === ""){
        alert("密文不可为空字符串")
        return
    }

    const data = {
        cipherText: cipherText,
        Key: key,
        IV: IV
    }
    $.ajax({
        url: 'http://127.0.0.1:8080/yuanshen/cbcdecrypt',
        type: 'POST',
        data: data,
        ontentType: 'application/json', // 设置内容类型为 JSON
        success: function(response) {
            output.innerHTML = "CBC解密结果:" +  response.data        
        },
        error: function(xhr, status, error) {
            alert("加密失败")
        }
    })
}





