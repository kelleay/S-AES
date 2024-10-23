const VALUES = require("./constant")
const FUNCS = require("./service")


// 加密 16bit明文字符串  16bit密钥字符串
function Encrypt(plainText, Key){
    const keys = FUNCS.KEYS_EXTENSION(Key)
    const w01 = keys[0] + keys[1]
    const w23 = keys[2] + keys[3]
    const w45 = keys[4] + keys[5]
    let res = ""
    res = FUNCS.ROUND_KEY_ADD(w01, plainText)
    // 1. 第一轮
    res = FUNCS.NIBBLE_SUB(res, VALUES.SBOX)
    res = FUNCS.ROW_MOVE(res)
    res = FUNCS.COL_MIX(res, VALUES.GF_MATRIX)
    res = FUNCS.ROUND_KEY_ADD(w23, FUNCS.MATRIX_TO_STR(res))
    // 2. 第二轮
    res = FUNCS.NIBBLE_SUB(res, VALUES.SBOX)
    res = FUNCS.ROW_MOVE(res)
    res = FUNCS.ROUND_KEY_ADD(w45, FUNCS.MATRIX_TO_STR(res))
    return FUNCS.MATRIX_TO_STR(res)
}
// 解密 16bit密文字符串  16bit密钥字符串
function Decrypt(cipherText, Key){
    const keys = FUNCS.KEYS_EXTENSION(Key)
    const w01 = keys[0] + keys[1]
    const w23 = keys[2] + keys[3]
    const w45 = keys[4] + keys[5]
    let res = ""
    res = FUNCS.ROUND_KEY_ADD(w45, cipherText)
    // 1. 第一轮
    res = FUNCS.ROW_MOVE(res)
    res = FUNCS.NIBBLE_SUB(res, VALUES.INVERSE_SBOX)
    res = FUNCS.ROUND_KEY_ADD(w23, FUNCS.MATRIX_TO_STR(res))
    res = FUNCS.COL_MIX(res, VALUES.INVERSE_GF_MATRIX)
    // 2. 第二轮
    res = FUNCS.ROW_MOVE(res)
    res = FUNCS.NIBBLE_SUB(res, VALUES.INVERSE_SBOX)
    res = FUNCS.ROUND_KEY_ADD(w01, FUNCS.MATRIX_TO_STR(res))
    return FUNCS.MATRIX_TO_STR(res)
}
// 扩展加密
function ExtendEncrypt(plainStr, Key){
    const plainBlock = FUNCS.STR_TO_CODE(plainStr)
    let cipherStr = ""
    for(let i = 0; i < plainBlock.length; i ++){
        let BinaryStr = Encrypt(plainBlock[i], Key);
        cipherStr += FUNCS.BINARY_TO_STR(BinaryStr)
    }
    return cipherStr
}
// 扩展解密
function ExtendDecrypt(cipherStr, Key){
    const cipherBlock = FUNCS.STR_TO_CODE(cipherStr)
    let plainStr = ""
    for(let i = 0; i < cipherBlock.length; i ++){
        let BinaryStr = Decrypt(cipherBlock[i], Key)
        plainStr += FUNCS.BINARY_TO_STR(BinaryStr)
    }
    return plainStr
}

// 双重加密 16bit明文字符串  32bit密钥字符串
function DoubleEncrypt(plainText, Key){
    const midResult = Encrypt(plainText, Key.slice(0, 16))
    return Encrypt(midResult, Key.slice(16, 32))
}

// 双重解密 16bit密文字符串  32bit密钥字符串
function DoubleDecrypt(plainText, Key){
    const midResult = Decrypt(plainText, Key.slice(16, 32))
    return Decrypt(midResult, Key.slice(0, 16))
}

// 双重加密扩展 任意长度明文字符串  32bit密钥
function ExtendDoubleEncrypt(plainText, Key){
    const midResult = ExtendEncrypt(plainText, Key.slice(0, 16))
    return ExtendEncrypt(midResult, Key.slice(16, 32))
}

// 双重解密扩展 任意长度密文字符串  32bit密钥
function ExtendDoubleDecrypt(plainText, Key){
    const midResult = ExtendDecrypt(plainText, Key.slice(16, 32))
    return ExtendDecrypt(midResult, Key.slice(0, 16))
}

// 破解
function crack(plainTexts, cipherTexts){
    let keys = []
    let pre = new Date()
    let pre_sec = pre.getSeconds()
    let pre_msec = pre.getMilliseconds()

    const midResultsMap = new Map(); // 存储中间结果与密钥部分的映射

    // 生成第一个部分的中间结果
    for (let k1 = 0; k1 <= 0xffff; k1++) {
        const Key1 = FUNCS.TO_BINARY_STR(k1, 16);
        for (let i = 0; i < plainTexts.length; i++) {
            let midResult
            if(judge(plainTexts[i]) && judge(cipherTexts[i])) midResult = Encrypt(plainTexts[i], Key1);
            else midResult = ExtendEncrypt(plainTexts[i], Key1);
            midResultsMap.set(midResult, Key1); // 将中间结果与密钥部分关联
        }
    }

    // 查找第二部分的中间结果
    for (let k2 = 0; k2 <= 0xffff; k2++) {
        const Key2 = FUNCS.TO_BINARY_STR(k2, 16);

        for (let i = 0; i < cipherTexts.length; i++) {
            let midResult
            if(judge(plainTexts[i]) && judge(cipherTexts[i])) midResult = Decrypt(cipherTexts[i], Key2);
            else midResult = ExtendDecrypt(cipherTexts[i], Key2);

            if (midResultsMap.has(midResult)) {
                const Key1 = midResultsMap.get(midResult);
                const fullKey = Key1 + Key2; // 组合找到的密钥
                // 检查组合密钥是否有效
                if (isValidKey(fullKey, plainTexts, cipherTexts)) {
                    keys.push(fullKey);
                }
            }
        }
    }
    
    let now = new Date()
    let sec = now.getSeconds()
    let msec = now.getMilliseconds()

    let crack_time = (sec - pre_sec) * 1000 + (msec - pre_msec)
    return [keys, keys.length, crack_time];
}

// 检查密钥是否有效
function isValidKey(key, plainTexts, cipherTexts) {
    for (let i = 0; i < plainTexts.length; i++) {
        if (DoubleEncrypt(plainTexts[i], key) !== cipherTexts[i] && 
            ExtendDoubleEncrypt(plainTexts[i], key) !== cipherTexts[i]) {
            return false; // 只要有一个不匹配就返回 false
        }
    }
    return true; // 所有明文均匹配
}

// 判断破解的是否为16bit二进制数
function judge(text){
    if(text.length !== 16) return false
    for(let i = 0; i < 16; i ++){
        if(text[i] !== "0" && text[i] !== "1") return false;
    }
    return true
}

// 三重加密  明文16bit  密钥48bit 
function TripleEncrypt(plainText, Key){
    const midResult1 = Encrypt(plainText, Key.slice(0, 16))
    const midResult2 = Encrypt(midResult1, Key.slice(16,32))
    return Encrypt(midResult2, Key.slice(32, 48))
}


// 三重解密  密文16bit 密钥48bit
function TripleDecrypt(cipherText, Key){
    const midResult1 = Decrypt(cipherText, Key.slice(32, 48))
    const midResult2 = Decrypt(midResult1, Key.slice(16,32))
    return Decrypt(midResult2, Key.slice(0, 16))
}


// 三重扩展加密  明文任意字符串  密钥48bit 
function ExtendTripleEncrypt(plainText, Key){
    const midResult1 = ExtendEncrypt(plainText, Key.slice(0, 16))
    const midResult2 = ExtendEncrypt(midResult1, Key.slice(16,32))
    return ExtendEncrypt(midResult2, Key.slice(32, 48))
}


// 三重解密  密文任意字符串  密钥48bit 
function ExtendTripleDecrypt(cipherText, Key){
    const midResult1 = ExtendDecrypt(cipherText, Key.slice(32, 48))
    const midResult2 = ExtendDecrypt(midResult1, Key.slice(16,32))
    return ExtendDecrypt(midResult2, Key.slice(0, 16))
}

// CBC加密
function CbcEncrypt(IV, plainText, Key){
    const blocks = FUNCS.STR_TO_CODE(plainText)
    const ivValue = FUNCS.GET_BINARY_VALUE(IV)
    let cipherBlocks = []
    let midIV = 0
    // 获取cipherblocks
    for(let i = 0; i < blocks.length; i++){
        if(i === 0){
            const piValue = FUNCS.GET_BINARY_VALUE(blocks[i])
            const processedPlaintext = FUNCS.TO_BINARY_STR((piValue ^ ivValue), 16)
            cipherBlocks[i] = Encrypt(processedPlaintext, Key)
            midIV = FUNCS.GET_BINARY_VALUE(cipherBlocks[i])
        }
        else {
            const piValue = FUNCS.GET_BINARY_VALUE(blocks[i])
            const processedPlaintext = FUNCS.TO_BINARY_STR((piValue ^ midIV), 16)
            cipherBlocks[i] = Encrypt(processedPlaintext, Key)
            midIV = FUNCS.GET_BINARY_VALUE(cipherBlocks[i])
        }
    }
    // 将ASCII码转化成字符
    let cipherText = ""
    for(let i = 0; i < cipherBlocks.length; i ++){
        cipherText += FUNCS.BINARY_TO_STR(cipherBlocks[i])
    }
    return cipherText
}

// CBC解密
function CbcDecrypt(IV, cipherText, Key){
    const cipherBlocks = FUNCS.STR_TO_CODE(cipherText)
    const ivValue = FUNCS.GET_BINARY_VALUE(IV)
    let processedBlocks = []
    for(let i = 0; i < cipherBlocks.length; i ++){
        processedBlocks[i] = Decrypt(cipherBlocks[i], Key)
    }
    let plainBlocks = []
    for(let i = 0; i < processedBlocks.length; i ++){
        if(i === 0){
            const prValue = FUNCS.GET_BINARY_VALUE(processedBlocks[i])
            plainBlocks[i] = FUNCS.TO_BINARY_STR((ivValue ^ prValue), 16)
        }
        else {
            const prValue = FUNCS.GET_BINARY_VALUE(processedBlocks[i])
            const ciValue = FUNCS.GET_BINARY_VALUE(cipherBlocks[i-1])
            plainBlocks[i] = FUNCS.TO_BINARY_STR((ciValue ^ prValue), 16)
        }
    }
    let plainText = ""
    for(let i = 0; i < plainBlocks.length; i ++){
        plainText += FUNCS.BINARY_TO_STR(plainBlocks[i])
    }
    return plainText
}


module.exports = {
    Encrypt,
    Decrypt,
    ExtendDecrypt,
    ExtendEncrypt,
    DoubleEncrypt,
    DoubleDecrypt,
    ExtendDoubleDecrypt,
    ExtendDoubleEncrypt,
    TripleDecrypt,
    TripleEncrypt,
    ExtendTripleDecrypt,
    ExtendTripleEncrypt,
    crack,
    CbcEncrypt,
    CbcDecrypt
}