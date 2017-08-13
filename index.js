/**
 * 云片网API接口包装
 */

const bcore = require('bcore')

const URIs = {
    'single': 'https://sms.yunpian.com/v2/sms/single_send.json',
    'batch': 'https://sms.yunpian.com/v2/sms/batch_send.json',
    'voice_code': 'https://voice.yunpian.com/v2/voice/send.json',
    'voice_notify': 'https://voice.yunpian.com/v2/voice/tpl_notify.json'
}

const request = require('./request')

bcore.on('yunpian', {
    //用户唯一标识
    apikey: '',
    //云片网审核通过的短信模板
    /**
     * {
     *   '别名':{
     *      "id":"模板id",
     *      "params":["company","code"],
     *      "content":"【#company#】您的验证码是: #code#"
     *    }
     * }
     */
    tpls: {}
}, function() {

    this.__init = function(options) {
        this.apikey = options.apikey
        this.tpls = options.tpls || {}
    }

    /**
     * 单条/批量发送相同短信
     *
     * @param {String|Array} mobile 目标电话(批量情况用逗号分隔或直接传入数组)
     * @param {String} tplAlias 短信模板配置中的别名
     * @param {String} tplKeyValue 模板数据
     *
     */
    this.sendSMS = function(mobile, tplAlias, tplKeyValue) {

        let tpl = this.tpls[tplAlias]

        let content = tpl.content

        tpl.params.forEach(param => {
            content = content.replace('#' + param + '#', tplKeyValue[param])
        })

        if (Array.isArray(mobile)) {
            mobile = mobile.join(',')
        }

        if (!~mobile.indexOf(',')) {

            return request(URIs.batch, {
                apikey: this.apikey,
                mobile: mobile,
                text: content
            })

        } else {
            return request(URIs.single, {
                apikey: this.apikey,
                mobile: mobile,
                text: content
            })
        }
    }

    /**
     * 发送语音验证码
     *
     * @param {String} mobile 目标电话
     * @param {String} code 短信验证码
     */
    this.sendVoiceCode = function(mobile, code) {
        return request(URIs.voice_code, {
            apikey: this.apikey,
            mobile: mobile,
            code: code
        })
    }

    /**
     * 发送语音通知
     *
     * @param {String} mobile 目标电话
     * @param {String} tplAlias 短信模板配置中的别名
     * @param {String} tplKeyValue 模板数据
     *
     */
    this.sendVoiceNotify = function(mobile, tplAlias, tplKeyValue) {

        let tpl = this.tpls[tplAlias]

        //generate tpl_value str
        let tplValue = ''

        tpl.params.forEach(param => {
            tplValue += '&' + param + '=' + tplKeyValue[param]
        })

        tplValue = encodeURIComponent(tplValue.substring(1))

        return request(URIs.voice_notify, {
            apikey: this.apikey,
            mobile: mobile,
            tpl_id: tpl.id,
            tpl_value: tplValue
        })
    }

})