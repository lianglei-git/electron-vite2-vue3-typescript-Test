/**
 * electron 打包主线程代码!!!!
 */
import { join } from 'path'

import { spawn, ChildProcess } from 'child_process' // 杀死、重启进程

import { watch, rollup, OutputOptions } from 'rollup'

import minimist from 'minimist'; // 解析 命令行参数

import chalk from 'chalk'// 输出文字带颜色

import electron from 'electron'

import ora from "ora"; // 命令行友好提示

import dotenv from 'dotenv' // env路径指定

import { waitOn } from './utils'

import rolConfig from './rollup.config'

// import {main} from '../package.json' // 或 npm_package_main

dotenv.config({ path: join(__dirname, '../.env') })

let argv = minimist(process.argv.slice(2))

let opt = rolConfig(argv.env)

const TAG = ['script/build.ts']

const spinner = ora(`${TAG} Electron build...`) // 加載用的 可以看做loading

if (argv.watch) {// 开发环境 
    //  开发环境就要动态监听依赖文件是否在改变， 如果改变 就杀死进程，重新开
    waitOn({ port: process.env.PORT }).then(res => {
        const watcher = watch(opt)
        // 用代码启动electron
        let child:ChildProcess
        watcher.on('change', (filename) => {
            console.log(TAG, chalk.green('change -- file --',filename))
        })
        watcher.on('event', ev => {
            if(ev.code === 'END') {
                if(child) child.kill()
                // console.log(join(__dirname, process.env.npm_package_main as any))
                setTimeout(() => {
                    child = spawn(electron as any, [process.env.npm_package_main as any], { stdio: 'inherit' })
                }, 1000)
            } else if (ev.code === 'ERROR') {
                console.log(ev.error)
            }
        })

    })
} else { // 非开发 根据命令行判断
    console.log(['非开发 !!!'])
    spinner.start()
    rollup(opt).then(build => {
        spinner.stop()
        console.log(TAG, chalk.green('Electron build successed.'))
        build.write(opt.output as OutputOptions)
    }).catch(error => {
        spinner.stop()
        // console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n')
    })
}
