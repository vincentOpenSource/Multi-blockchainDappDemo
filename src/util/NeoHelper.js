import { async } from "q";

class NeoHelper {
    static getAddressFromScriptHash = () => {
        //根据合约notify输出的scripthash，转换为NEO地址
    }

    constructor(store) {
        this.store = store
    }

    /**
     * 
     * @param {string} hex 
     */
    static hexToString = (hex) => {
        var string = '';
        for (var i = 0; i < hex.length; i += 2) {
            string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return string;
    }

    /**
     * 
     * @param {string} hexx 
     */
    static hex2Int = (hexx) => {
        if (hexx == '') return 0
        return parseInt(NeoHelper.byte2Hex(NeoHelper.hex2Byte(hexx).reverse()), 16)
    }

    /**
     * 
     * @param {string} hexx 
     */
    static hex2TimeStr = (hexx) => {
        return NeoHelper.timetrans(parseInt(NeoHelper.byte2Hex(NeoHelper.hex2Byte(hexx).reverse()), 16))
    }

    /**
     * 
     * @param {string} hexx 
     */
    static hexReverse = (hexx) => {
        return NeoHelper.byte2Hex(NeoHelper.hex2Byte(hexx).reverse())
    }

    /**
     * 
     * @param {Uint8Array} uint8arr 
     */
    static byte2Hex = (uint8arr) => {
        if (!uint8arr) {
            return '';
        }

        var hexStr = '';
        for (var i = 0; i < uint8arr.length; i++) {
            var hex = (uint8arr[i] & 0xff).toString(16);
            hex = (hex.length === 1) ? '0' + hex : hex;
            hexStr += hex;
        }

        return hexStr.toLowerCase();
    }

    /**
     * 
     * @param {string} str 
     */
    static hex2Byte = (str) => {
        if (!str) {
            return new Uint8Array();
        }

        var a = [];
        for (var i = 0, len = str.length; i < len; i += 2) {
            a.push(parseInt(str.substr(i, 2), 16));
        }

        return new Uint8Array(a);
    }

    /**
     * 
     * @param {number} timestamp 
     */
    static timetrans = (timestamp) => {
        var date = new Date(timestamp * 1000);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    }

    /**
     * 
     * @param {number} sec 
     */
    static sec2HMS = (sec) => {
        let h = 0
        let m = 0
        let s = 0
        if ((sec % 3600) > 0) {
            h = parseInt((sec / 3600).toString())
            sec = sec - h * 3600
        }
        if ((sec % 60) > 0) {
            m = parseInt((sec / 60).toString())
            sec = sec - m * 60
        }
        s = sec

        let mStr = '00'
        let sStr = '00'
        if (m < 10) mStr = '0' + m
        else mStr = m.toString()
        if (s < 10) sStr = '0' + s
        else sStr = s.toString()

        return h + ':' + mStr + ':' + sStr
    }
}

export default NeoHelper;