// let finishedTime, closedTime
const dayjs = require('dayjs');
const summa = {
    /*     GET: 0,
        PUT: 0,
        HEAD: 0,
        POST: 0,
        PATCH: 0,
        TRACE: 0,
        DELETE: 0,
        OPTIONS: 0, */
}
module.exports.logger = function (env, { path = 'console' } = { path: 'console' }) {
    const fs = require('fs');
    if (process.env.NODE_ENV === env || env + '' === 'true') {
        return function (req, res, next) {
            req._startTime = new Date()
            if (summa[req.method] === undefined)
                summa[req.method] = 0
            summa[req.method]++
            res.once('finish', () => {
                // console.log('req', typeof req.method);
                let execTime = new Date() - req._startTime
                let execTimeTest = '\033[40;' + `${execTime <= 2000 ? '32' : (execTime <= 8000 ? '33' : '31')}m` +
                    `${execTime} mm` + '\033[0m'
                let statusCodeTest = '\033[;' + (res.statusCode < 300 ? '32' : (res.statusCode < 400 ? '34' : '31')) + 'm' + res.statusCode + '\033[0m'
                execTimeTest = execTimeTest.padEnd(20, /* '0', '\033[40;30m-\033[0m' */)
                let logText
                if (path === 'console') {
                    logText = `${req.method.padEnd(7)} ${execTimeTest} ` + '\033[;34m>\033[0m' +
                        ` ${(decodeURIComponent(req.originalUrl)/*  + req.params + req.query */).padEnd(50)} ` +
                        `${statusCodeTest} ${dayjs(req._startTime).format('HH:mm:ss')} ${dayjs().format('HH:mm:ss')}`
                    console.log(logText)
                } else {
                    // 打印至日志的应该还要有 访问者的IP地址
                    logText = `${req.method.padEnd(6)} ${execTimeTest} ` +
                        ` ${(decodeURIComponent(req.originalUrl)/*  + req.params + req.query */).padEnd(20)} ` +
                        `${statusCodeTest} ${dayjs(req._startTime).format('HH:mm:ss')} ${dayjs().format('HH:mm:ss')}  \n`
                    fs.appendFileSync(path, logText)
                }
            });
            next()
        }
    }

    return function (_, _, next) {
        next()
    }
}

module.exports.summa = summa

