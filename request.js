const https = require('https')
const qs = require('querystring')

const { URL } = require('url')

module.exports = function(url, postData) {

    let promise, callback

    url = new URL(url)

    promise = new Promise((resolve, reject) => {

        callback = function(...args) {

            let err = args.shift()

            if (err) return reject(err)

            return resolve(...args)
        }

    })

    //URL to Options

    let options = {
        protocol: url.protocol,
        hostname: url.hostname,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        path: `${url.pathname}${url.search}`,
        href: url.href
    }

    if (url.port !== '') {
        options.port = Number(url.port)
    }

    options.method = 'POST'

    const req = https.request(options, (res) => {

        res.setEncoding('utf8')

        let datas = ''

        res.on('data', chunk => {
            datas += chunk.toString()
        })

        res.on('end', function() {
            callback && callback(null, datas)
        })

        res.on('error', err => {
            callback && callback(err)
        })
    })


    req.write(qs.stringify(postData))

    req.end()

    return promise
}