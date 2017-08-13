module.exports = class Yunpian {
    constructor() {}

    sendSMS(mobile, tplAlias, tplKeyValue) {
        return this.msrv.yunpian.sendSMS(mobile, tplAlias, tplKeyValue)
    }

    sendVoiceCode(mobile, code) {
        return this.msrv.yunpian.sendVoiceCode(mobile, code)
    }

    sendVoiceNotify(mobile, tplAlias, tplKeyValue) {
        return this.msrv.yunpian.sendVoiceNotify(mobile, tplAlias, tplKeyValue)
    }
}