import { join } from 'path'
import { RollupOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import externals from 'rollup-plugin-node-externals'
import esbuild from 'rollup-plugin-esbuild'; 
// rollup 支持moudle模式
// const {join} = require('path') // 已废弃
// import {main} from '../package.json'
// const main:string = process.env.npm_package_main
// console.log(main)
// console.log(process.env.npm_package_main, '奥科吉数据库大师', join(__dirname as string, '../', main))
export default (env = 'production') => <RollupOptions>{
    input: join(__dirname, '../src/main/index.ts'),
    output: {
        file: join(__dirname, '..', process.env.npm_package_main as string),
        format: 'cjs',
        name: "ElectronMainBundle",
        sourcemap: false
    },
    plugins: [
        nodeResolve({ // 消除碰到 node.js 模块时⚠警告
            extensions: ['.ts', '.js']
        }),
        commonjs(),
        json(),
        esbuild({ // 直接去 esbuild md 粘贴！！！// ts 编译为js
            // All options are optional
            include: /\.[jt]sx?$/, // default, inferred from `loaders` option
            exclude: /node_modules/, // default
            sourceMap: false, // default
            minify: process.env.NODE_ENV === 'production',
            target: 'es2017', // default, or 'es20XX', 'esnext'
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            // Like @rollup/plugin-replace
            define: {
                __VERSION__: '"x.y.z"'
            },
            tsconfig: 'tsconfig.json', // default
            // Add extra loaders
            loaders: {
                // Add .json files support
                // require @rollup/plugin-commonjs
                '.json': 'json',
                // Enable JSX in .js files too
                '.js': 'jsx'
            }
        }),
        alias({
            entries: {
                '@src': join(__dirname, '../src'),
                '@root': join(__dirname, '..')
            }
        }),
        externals(),
    ],
    external: ['electron'],
    onwarn: warning => {
        // https://github.com/rollup/rollup/issues/1089#issuecomment-365395213
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            console.error(`(!) ${warning.message}`)
        }
    }
}