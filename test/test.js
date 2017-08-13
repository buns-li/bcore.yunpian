const Should = require('should')

const miniServer = require('./miniServer')

const Yunpian = require('./yunpian')

let obj = new Yunpian()

require('../index')

describe('bcore.yunpian test', () => {

    before((done) => {
        miniServer(obj).then(() => {
            done()
        })
    })

    it.skip('should return sid when send SMS ', (done) => {

        obj.sendSMS('手机号', 'sms-code', {
                company: 'freeing码',
                code: 123456
            })
            .then(data => {

                Should(data).have.property('data')

                data[0].msg.should.be.equal('发送成功')

                data[0].sid.should.have.be.ok()
            })
            .catch(err => {
                done(err)
            })
    })

    it('should return sid when send VoiceCode', done => {

        obj.sendVoiceCode('手机号', 123456)
            .then(data => {

                Should(data).have.property('sid')

                data.sid.should.have.be.ok()
            })
            .catch(err => {
                done(err)
            })

    })
})