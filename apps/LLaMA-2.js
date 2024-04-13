import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { llama2 } from 'gpti'

// 存储每个用户的对话
const messagesSave = [];

export class llama2_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'llama2',
            /** 功能描述 */
            dsc: 'llama2',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#ll([\\s\\S]*)$',
                    /** 执行方法 */
                    fnc: 'processContent'
                }
            ]
        })
    }

    async processContent(e) {
        let inputMessage = e.msg;
        let currentUser = e.user_id;
        let content = inputMessage.replace(/^#ll/, '').trim();

        if (content === '清空对话') {
            await this.clearContent(e);
            return true;
        }

        if (content) {
            let config = await Config.getConfig();
            let historicalMessages = messagesSave[currentUser] || [];
            historicalMessages.push({ role: 'user', content: content });
            llama2({
                system_message: config.llama2.system,
                temperature: config.llama2.temperature,
                max_tokens: config.llama2.max_tokens,
                top_p: config.llama2.top_p,
                repetition_penalty: config.llama2.repetition_penalty,
                markdown: config.llama2.markdown,
                stream: false,
            }, (error, result) => {

                if (error) {
                    Log.e(error);
                    e.reply('遇到了一些问题，请反馈控制台日志给开发者', true);
                    return true;
                } else {
                    if (result.code === 200) {
                        let responseMessage = result.message;
                        if (responseMessage) {
                            e.reply(responseMessage, true);
                            messagesSave[currentUser] = [...historicalMessages, { role: 'assistant', content: responseMessage }];
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
            await e.reply('请输入与 LLaMA-2 对话的内容', true);
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