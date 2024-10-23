const aes_funcs = require('../route-handle/AES/AES.js')
const express = require('express')
const router = express.Router()

// 加密
router.post('/encrypt', (req, res) => {
    const { plainText, Key } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.Encrypt(plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})

// 扩展加密
router.post('/exencrypt', (req, res) => {
    const { plainText, Key } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.ExtendEncrypt(plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})

// 解密
router.post('/decrypt', (req, res) => {
    const { cipherText, Key } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.Decrypt(cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})

// 扩展解密
router.post('/exdecrypt', (req, res) => {
    const { cipherText, Key } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.ExtendDecrypt(cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})

// 双重加密
router.post('/dencrypt', (req, res) => {
    const { plainText, Key } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.DoubleEncrypt(plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})

// 双重扩展加密
router.post('/dexencrypt', (req, res) => {
    const { plainText, Key } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.ExtendDoubleEncrypt(plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})



// 双重解密
router.post('/ddecrypt', (req, res) => {
    const { cipherText, Key } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.DoubleDecrypt(cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})

// 双重扩展解密
router.post('/dexdecrypt', (req, res) => {
    const { cipherText, Key } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.ExtendDoubleDecrypt(cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})

// 三重加密
router.post('/tencrypt', (req, res) => {
    const { plainText, Key } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.TripleEncrypt(plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})

// 三重扩展加密
router.post('/texencrypt', (req, res) => {
    const { plainText, Key } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.ExtendTripleEncrypt(plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})

// 三重解密
router.post('/tdecrypt', (req, res) => {
    const { cipherText, Key } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.TripleDecrypt(cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})

// 三重扩展解密
router.post('/texdecrypt', (req, res) => {
    const { cipherText, Key } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.ExtendTripleDecrypt(cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})

// 破解
router.post('/crack', (req, res) => {
    const {plains, ciphers} = req.body
    try{
        let [keys, len, time] = aes_funcs.crack(plains, ciphers)
        res.send({
            keys: keys,
            len: len,
            time: time
        })
    }catch (error) {
        console.error('破解过程中出现错误:', error);
        res.status(500).send({ error: '破解失败' });
    }
})

// CBC加密
router.post('/cbcencrypt', (req, res) => {
    const { plainText, Key, IV } = req.body; // 提取参数
    try {
        let cipherText = aes_funcs.CbcEncrypt(IV, plainText, Key).replace(/,/g, ''); 
        res.send({ data: cipherText });
    } catch (error) {
        console.error('加密过程中出现错误:', error);
        res.status(500).send({ error: '加密失败' });
    }
})



// CBC解密
router.post('/cbcdecrypt', (req, res) => {
    const { cipherText, Key, IV } = req.body; // 提取参数
    try {
        let plainText = aes_funcs.CbcDecrypt(IV, cipherText, Key).replace(/,/g, ''); 
        res.send({ data: plainText });
    } catch (error) {
        console.error('解密过程中出现错误:', error);
        res.status(500).send({ error: '解密失败' });
    }
})


module.exports = router
