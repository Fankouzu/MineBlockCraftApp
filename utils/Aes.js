import CryptoJS from 'crypto-js'

export function aesEncrypt(word, key) {
    let _word = CryptoJS.enc.Utf8.parse(word)
    let _key = CryptoJS.enc.Utf8.parse(key)
    try {
        let encrypted = CryptoJS.AES.encrypt(_word, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
        return encrypted.toString()
    } catch (e){
        return false
    }
}
export function aesDecrypt(encrypt, key) {
    let _key = CryptoJS.enc.Utf8.parse(key)
    try {
        let decrypt = CryptoJS.AES.decrypt(encrypt, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
        return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    } catch (e){
        return false
    }

}

export function sha1(password) {
    return CryptoJS.SHA1(password)
}
