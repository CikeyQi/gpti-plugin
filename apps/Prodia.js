import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { prodia } from 'gpti'

export class prodia_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'prodia',
            /** 功能描述 */
            dsc: 'prodia',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?prv1([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'prodia_v1_draw'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?prsd([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'prodia_sd_draw'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^#?prxl([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'prodia_xl_draw'
                },
            ]
        })
    }

    async prodia_v1_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?prv1/, '').trim()
        if (content) {
            await e.reply('正在使用 Prodia V1 生成图片，请稍后...', true)
            prodia.v1({
                prompt: content,
                data: {
                    model: "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]",
                    steps: 30,
                    cfg_scale: 7,
                    sampler: "DPM++ 2M Karras",
                    negative_prompt: "EasyNegative, nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, lowquality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
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
    async prodia_sd_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?prsd/, '').trim()
        if (content) {
            await e.reply('正在使用 Prodia SD 生成图片，请稍后...', true)
            prodia.stablediffusion({
                prompt: content,
                data: {
                    model: "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]",
                    sampling_steps: 30,
                    cfg_scale: 7,
                    width: 768,
                    height: 1024,
                    sampling_method: "DPM++ 2M Karras",
                    prompt_negative: "EasyNegative, nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, lowquality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
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
    async prodia_xl_draw(e) {
        let message = e.msg
        let content = message.replace(/^#?prxl/, '').trim()
        if (content) {
            await e.reply('正在使用 Prodia XL 生成图片，请稍后...', true)
            prodia.stablediffusion_xl({
                prompt: content,
                data: {
                    prompt_negative: "EasyNegative, nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, lowquality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
                    model: "sd_xl_base_1.0.safetensors [be9edd61]",
                    sampling_method: "DPM++ 2M Karras",
                    sampling_steps: 30,
                    width: 768,
                    height: 1024,
                    cfg_scale: 7
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