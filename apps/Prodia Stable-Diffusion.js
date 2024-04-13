import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { prodia } from 'gpti'

export class prodia_stablediffusion_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'prodia_stablediffusion',
            /** 功能描述 */
            dsc: 'prodia_stablediffusion',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#ps([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let content = inputMessage.replace(/^#ps/, '').trim()

        if (content) {
            let config = await Config.getConfig();
            await e.reply('正在使用 Prodia Stable-Diffusion 生成图片，请稍后...', true)
            prodia.stablediffusion({
                prompt: content,
                data: {
                    prompt_negative: config.prodia_stablediffusion.prompt_negative,
                    model: config.prodia_stablediffusion.model,
                    sampling_method: config.prodia_stablediffusion.sampling_method,
                    sampling_steps: config.prodia_stablediffusion.sampling_steps,
                    width: config.prodia_stablediffusion.width,
                    height: config.prodia_stablediffusion.height,
                    cfg_scale: config.prodia_stablediffusion.cfg_scale
                }
            }, (error, result) => {

                if (error) {
                    Log.e(error);
                    e.reply('遇到了一些问题，请反馈控制台日志给开发者', true);
                    return true;
                } else {
                    if (result.code === 200) {
                        let message = []
                        result.images.forEach(element => {
                            message.push({message: segment.image('base64://' + element.replace('data:image/jpeg;base64,', ''))})
                        })
                        e.reply(Bot.makeForwardMsg(message))
                        return true;
                    } else {
                        Log.e(result);
                        e.reply('远程服务器返回错误代码 ' + result.code + ' ，请等待开发者修复', true);
                        return true;
                    }
                }
            });
        } else {
            await e.reply('请输入 Prodia Stable-Diffusion 生成图片的描述', true);
            return true;
        }
    }
}