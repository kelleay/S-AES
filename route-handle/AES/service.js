const VALUES = require('./constant')
const iconv = require('iconv-lite');

// 1. 轮密钥加
function ROUND_KEY_ADD(Key, Text){
    let res = [
        [], []
    ]
    const KEY_MATRIX = GENERATE_STATE_MATRIX(Key)
    const STATE_MATRIX = GENERATE_STATE_MATRIX(Text)
    for(let i = 0; i < 2; i ++){
        for(let j = 0; j < 2; j ++){
            res[i][j] = KEY_MATRIX[i][j] ^ STATE_MATRIX[i][j]
        }
    }
    return res;
}

// 矩阵转化为字符串
function MATRIX_TO_STR(matrix){
    return TO_BINARY_STR(matrix[0][0], 4) + TO_BINARY_STR(matrix[1][0], 4)
    + TO_BINARY_STR(matrix[0][1], 4)
    + TO_BINARY_STR(matrix[1][1], 4)
}

// 生成状态矩阵
function GENERATE_STATE_MATRIX(Text){
    let matrix = [
        [0, 0], 
        [0, 0]
    ]
    matrix[0][0] = GET_BINARY_VALUE(Text.slice(0, 4))
    matrix[1][0] = GET_BINARY_VALUE(Text.slice(4, 8))
    matrix[0][1] = GET_BINARY_VALUE(Text.slice(8, 12))
    matrix[1][1] = GET_BINARY_VALUE(Text.slice(12, 16))
    return matrix
} 

// 二进制字符串 -> 十进制值
function GET_BINARY_VALUE(str){
    let res =  0;
    let k = str.length - 1
    for(let i = 0; i < str.length; i ++){
        if(str[i] === '1'){
            res += (1 << k)
        }
        k --;
    }
    return res;
} 

// 2. 半字节代替
function NIBBLE_SUB(matrix, BOX){
    let res = [
        [], []
    ]
    for(let i = 0; i < 2; ++i){
        for(let j = 0; j < 2; ++j){
            const rowIndex = matrix[i][j] >> 2;
            const colIndex = matrix[i][j] % 4;
            res[i][j] = BOX[rowIndex][colIndex]
        }
    }
    return res;
}

// 3. 行移位
function ROW_MOVE(matrix){
    const temp = matrix[1][0]
    matrix[1][0] = matrix[1][1]
    matrix[1][1] = temp
    return matrix
}

// 4. 列混淆
function COL_MIX(matrix, GF){
    let res = [
        [0, 0], [0, 0]
    ]
    for(let i = 0; i < 2; i ++){
        for(let j = 0; j < 2; j ++){
            for(let k = 0; k < 2; k ++){
                res[i][j] = XOR(res[i][j], MUL(GF[i][k], matrix[k][j]))
            }
        }
    }
    return res;
}

// 异或
function XOR(a, b){
    return a ^ b;
}
// GF 乘法
function MUL(a, b){
    let res = 0;
    while(b > 0){
        if(b & 1) { // b末位是1
            res = XOR(res, a); //累加到乘积中
        }
        a <<= 1; // a左移, 乘法需要进位
        b >>=  1; // b右移，使用下一位
        if(a & 0b10000){  // 如果 a 有 x^4 项，需要MOD
            /*
                有 x^4 则转化为 x + 1, 所以直接MOD 10011
            */
           a ^= VALUES.MOD
        }
    }
    return res;
}

// 5. 扩展密钥
function KEYS_EXTENSION(Key){
    let w0, w1, w2, w3, w4, w5
    w0 = Key.slice(0, 8)
    w1 = Key.slice(8, 16)
    w2 = GET_BINARY_VALUE(w0) ^ g(w1, VALUES.SBOX, 1)
    w3 = w2 ^ GET_BINARY_VALUE(w1)
    w4 = w2 ^ g(TO_BINARY_STR(w3, 8), VALUES.SBOX, 2)
    w5 = w4 ^ w3
    w2 = TO_BINARY_STR(w2, 8)
    w3 = TO_BINARY_STR(w3, 8)
    w4 = TO_BINARY_STR(w4, 8)
    w5 = TO_BINARY_STR(w5, 8)
    return [w0, w1, w2, w3, w4, w5]
}

// 函数g
function g(w, BOX, i){
    let w_ = 0
    let N0 = w.slice(0, 4)
    let N1 = w.slice(4, 8)

    const N0_rowIndex = GET_BINARY_VALUE(N0.slice(0, 2))
    const N0_colIndex = GET_BINARY_VALUE(N0.slice(2, 4))
    const N1_rowIndex = GET_BINARY_VALUE(N1.slice(0, 2))
    const N1_colIndex = GET_BINARY_VALUE(N1.slice(2, 4))
    // 置换
    w_ = BOX[N0_rowIndex][N0_colIndex] + (BOX[N1_rowIndex][N1_colIndex] << 4);
    w_ ^= GET_BINARY_VALUE(RCON(i))
    return w_;
}

function RCON(i){
    if(i === 1) return "10000000"
    if(i === 2) return "00110000"
}
// 转化为len位二进制字符串
function TO_BINARY_STR(num, len){
    return num.toString(2).padStart(len, '0')
}

// 将输入的字符串转化为ASCII编码
function STR_TO_CODE(str){
    let BYTES = []
    const len = str.length
    for(let i = 0; i < len; i += 2){
        // 两个字符进行拼接，不足两位则在后面补0
        const charCode1 = TO_BINARY_STR(str.charCodeAt(i), 8);
        let charCode2
        if(i + 1 < len) charCode2 = TO_BINARY_STR(str.charCodeAt(i + 1), 8)
        else charCode2 = TO_BINARY_STR(0, 8) 
        BYTES.push(charCode1 + charCode2)
    }
    return BYTES
}

function BINARY_TO_STR(BinaryStr){
    const byte1 = GET_BINARY_VALUE(BinaryStr.slice(0, 8))
    const byte2 = GET_BINARY_VALUE(BinaryStr.slice(8, 16))
    let res = String.fromCharCode(byte1) + String.fromCharCode(byte2)
    return res;
}

module.exports = {
    ROUND_KEY_ADD,
    NIBBLE_SUB,
    ROW_MOVE,
    COL_MIX,
    KEYS_EXTENSION,
    TO_BINARY_STR,
    GET_BINARY_VALUE,
    MATRIX_TO_STR,
    STR_TO_CODE,
    BINARY_TO_STR
}