import { nanoid } from "nanoid";
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

// 初始化
const keyPair = new JSEncrypt()


export function initKey () {
    console.log("initKey",nanoid(16))
    return  nanoid(16);
}

//加密
export function encryptText(cipherContent, key) {
    const aesKey = CryptoJS.enc.Utf8.parse(key);
    const aesIv = CryptoJS.enc.Utf8.parse(Buffer.from(key).reverse().toString());

    const newValue = typeof cipherContent === 'string' ? cipherContent : cipherContent.toString()
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(newValue), aesKey, {
        iv: aesIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()

}

function deUrlSafe(url = ""){
    return url.replace(/_/g,"/").replace(/-/g,"+")
}
//解密
export function decryptText(plainContent, key) {
    const aesKey = CryptoJS.enc.Utf8.parse(key);
    const aesIv = CryptoJS.enc.Utf8.parse(Buffer.from(key).reverse().toString());

    const decrypt = CryptoJS.AES.decrypt(deUrlSafe(plainContent), aesKey, {
        iv: aesIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decString = CryptoJS.enc.Utf8.stringify(decrypt).toString()
    return decString
}

/**
 * rsa公钥加密
 * @param {*} cipherContent 需要加密内容
 * @param {*} publicKey 服务端的公钥
 * @returns
 */
export function encryptRsa(cipherContent, publicKey) {
    const newValue = typeof cipherContent === 'string' ? cipherContent : cipherContent.toString()
    keyPair.setPublicKey(publicKey)
    return keyPair.encrypt(newValue) // 注意：加密类型为string
}

/**
 * rsa私钥解密
 * @param {*} plainContent 解密的内容
 * @param {*} privateKey 解密私钥
 * @returns
 */
export function decryptRsa(plainContent, privateKey) {
    keyPair.setPrivateKey(privateKey)
    return keyPair.decrypt(plainContent)
}
