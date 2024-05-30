const SHA256 = require('js-sha256')
import CryptoES from 'crypto-es'

export const passwordToHash = async (password: string) => {
    try {
        const newHash = await CryptoES.AES.encrypt(password, 'pass').toString()
        return newHash
    } catch (error) {
        console.log(error)
    }
}  

export const hashToPassword = async (password: string) => {
    try {
        let newPass: string = await CryptoES.AES.decrypt(password, 'pass').toString(CryptoES.enc.Utf8)
        return newPass
    } catch (error) {
        console.log(error)
    }
}   