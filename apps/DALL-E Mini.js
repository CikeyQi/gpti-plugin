import plugin from '../../../lib/plugins/plugin.js'
import Log from '../utils/logs.js'
import { dalle } from 'gpti'

export class dalle_mini_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'dalle_mini',
            /** 功能描述 */
            dsc: 'dalle_mini',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#dm([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let content = inputMessage.replace(/^#dm/, '').trim()

        if (content) {
            await e.reply('正在使用 DALL·E Mini 生成图片，请稍后...', true)
            dalle.mini({
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
            await e.reply('请输入 DALL·E Mini 生成图片的描述', true);
            return true;
        }
    }
}