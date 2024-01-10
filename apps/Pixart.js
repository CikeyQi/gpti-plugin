import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { pixart } from 'gpti'

export class pixart_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'pixart',
            /** 功能描述 */
            dsc: 'pixart',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?pia([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'pixart_a_draw'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?pilcm([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'pixart_lcm_draw'
                }
            ]
        })
    }

    async pixart_a_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?pia/, '').trim()
        if (content) {
            await e.reply('正在使用 Pixart A 生成图片，请稍后...', true)
            pixart.a({
                prompt: content,
                data: {
                    prompt_negative: "EasyNegative, nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, lowquality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
                    sampler: "DPM-Solver",
                    image_style: "Anime",
                    width: 768,
                    height: 1024,
                    dpm_guidance_scale: 4.5,
                    dpm_inference_steps: 14,
                    sa_guidance_scale: 3,
                    sa_inference_steps: 25
                }
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
    async pixart_lcm_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?pilcm/, '').trim()
        if (content) {
            await e.reply('正在使用 Pixart LCM 生成图片，请稍后...', true)
            pixart.lcm({
                prompt: content,
                data: {
                    prompt_negative: "EasyNegative, nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, lowquality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
                    image_style: "Anime",
                    width: 768,
                    height: 1024,
                    lcm_inference_steps: 9
                }
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
}