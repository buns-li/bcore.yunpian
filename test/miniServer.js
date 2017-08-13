const MiniServer = require('bcore/lib/mini-server-center')

module.exports = function(obj) {
    return MiniServer.load('testApp', 'yunpian', {
        apikey: '云片网平台的用户唯一标识',
        tpls: {
            'sms-code': {
                id: '',
                params: ['company', 'code'],
                content: '【#company#】您的验证码是#code#'
            }
        }
    }).then(() => {
        MiniServer.injection('testApp', obj)
    })
}