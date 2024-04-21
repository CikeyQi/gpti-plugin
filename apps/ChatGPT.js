import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { gpt } from 'gpti'

// 存储每个用户的对话
const messagesSave = [];

export class gpt_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'gpt',
            /** 功能描述 */
            dsc: 'gpt',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#gg([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let currentUser = e.user_id;
        let content = inputMessage.replace(/^#gg/, '').trim();

        if (content === '清空对话') {
            await this.clearContent(e);
            return true;
        }

        if (content) {
            let config = await Config.getConfig();
            let historicalMessages = messagesSave[currentUser] || [];
            gpt.v1({
                messages: historicalMessages,
                prompt: content,
                model: config.gpt.model,
                markdown: config.gpt.markdown,
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
                            messagesSave[currentUser] = [...historicalMessages, { role: 'user', content: content }, { role: 'assistant', content: responseMessage }];
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
            await e.reply('请输入与 ChatGPT 对话的内容', true);
            return true;
        }
    }

    async clearContent(e) {
        let currentUser = e.user_id;
        let historicalMessages = messagesSave[currentUser] || [];
        let messageCount = historicalMessages.length;

        messagesSave[currentUser] = [];
        await e.reply(`已清空${messageCount}条对话记录`, true);

        return true;
    }
}