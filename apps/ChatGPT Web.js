import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { gptweb } from 'gpti'

export class gptweb_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'gptweb',
            /** 功能描述 */
            dsc: 'gptweb',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#gw([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let content = inputMessage.replace(/^#gw/, '').trim();

        if (content) {
            let config = await Config.getConfig();
            gptweb({
                prompt: content,
                markdown: config.gptweb.markdown,
            }, (error, result) => {

                if (error) {
                    Log.e(error);
                    e.reply('遇到了一些问题，请反馈控制台日志给开发者', true);
                    return true;
                } else {
                    if (result.code === 200) {
                        let responseMessage = result.gpt;
                        if (responseMessage) {
                            e.reply(responseMessage, true);
                            return true;
                        }
                    } else {
                        Log.e(result);
                        e.reply('远程服务器返回错误代码 ' + result.code + ' ，请等待开发者修复', true);
                        return true;
                    }
                }
            });
        } else {
            await e.reply('请输入与 ChatGPT Web 对话的内容', true);
            return true;
        }
    }
}