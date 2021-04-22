import { get } from 'http'
import { white, red } from "chalk";
/**
 * waitOn 主要监听vite是否启动， 启动之后返回promise ，在启动watch监听文件变化
 * 在此也可以采用 "&&"" 异步加载 (scripts)
 * @param args 参数列表
 */
type Args = { port: string | number | any, time?: number }
const waitOn = (args: Args): Promise<{}> => {
    const { port, time = 1000 } = args
    const url = `http://127.0.0.1:${port}`
    let count = 0
    let timer:any = null
    return new Promise(resolve => {
        timer = setInterval(() => {
            get(url, suns => {
                clearInterval(timer)
                console.log('[waitOn]', white(`"${url}" are already responsive.`), `(${suns.statusCode}: ${suns.statusMessage})`)
                resolve(suns)
            }).on('error', (err: Error) => {
                console.log('[waitOn]', red(`counter: ${count++}`))
            })
        }, time)
    })


}

export {
    waitOn
}