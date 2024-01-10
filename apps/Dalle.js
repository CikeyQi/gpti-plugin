import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { dalle } from 'gpti'

export class dalle_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'dalle',
            /** 功能描述 */
            dsc: 'dalle',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?dd([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'dalle_draw'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?dm([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'dalle_mini_draw'
                }
            ]
        })
    }

    async dalle_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?dd/, '').trim()
        if (content) {
            await e.reply('正在使用 DALL-E 生成图片，请稍后...', true)
            dalle.v1({
                prompt: content,
            }, (err, result) => {
                if (err) {
                    Log.e(err)
                    e.reply('遇到了一些问题，请反馈控制台日志给开发者', true)
                    return true
                } else {
                    if (result.code === 200) {
                        e.reply(segment.image('base64://' + result.images[0].replace('data:image/jpeg;base64,', '')), true)
                        return true
                    } else {
                        Log.e(result)
                        e.reply('远程服务器返回错误代码 ' + result.code + ' ，请等待开发者修复', true)
                        return true
                    }
                }
            })
        } else {
            await e.reply('请输入绘画提示词', true)
            return true
        }
    }
    async dalle_mini_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?dm/, '').trim()
        if (content) {
            await e.reply('正在使用 DALL-E Mini 生成图片，请稍后...', true)
            dalle.mini({
                prompt: content,
            }, (err, result) => {
                if (err) {
                    Log.e(err)
                    e.reply('遇到了一些问题，请反馈控制台日志给开发者', true)
                    return true
                } else {
                    if (result.code === 200) {
                        let images = []
                        for (let i = 0; i < result.images.length; i++) {
                            images.push(segment.image('base64://' + result.images[i].replace('data:image/jpeg;base64,', '')))
                        }
                        e.reply(images, true)
                        return true
                    } else {
                        Log.e(result)
                        e.reply('远程服务器返回错误代码 ' + result.code + ' ，请等待开发者修复', true)
                        return true
                    }
                }
            })
        } else {
            await e.reply('请输入绘画提示词', true)
            return true
        }
    }
}