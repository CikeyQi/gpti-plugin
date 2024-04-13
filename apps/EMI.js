import plugin from '../../../lib/plugins/plugin.js'
import Log from '../utils/logs.js'
import { emi } from 'gpti'

export class emi_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'emi',
            /** 功能描述 */
            dsc: 'emi',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#ee([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let content = inputMessage.replace(/^#ee/, '').trim()

        if (content) {
            await e.reply('正在使用 EMI 生成图片，请稍后...', true)
            emi({
                prompt: content
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
            await e.reply('请输入 EMI 生成图片的描述', true);
            return true;
        }
    }
}