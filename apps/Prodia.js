import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { prodia } from 'gpti'

export class prodia_v1_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'prodia_v1',
            /** 功能描述 */
            dsc: 'prodia_v1',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#pp([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let content = inputMessage.replace(/^#pp/, '').trim()

        if (content) {
            let config = await Config.getConfig();
            await e.reply('正在使用 Prodia 生成图片，请稍后...', true)
            prodia.v1({
                prompt: content,
                data: {
                    model: config.prodia_v1.model,
                    steps: config.prodia_v1.steps,
                    cfg_scale: config.prodia_v1.cfg_scale,
                    sampler: config.prodia_v1.sampler,
                    negative_prompt: config.prodia_v1.negative_prompt,
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
            await e.reply('请输入 Prodia 生成图片的描述', true);
            return true;
        }
    }
}