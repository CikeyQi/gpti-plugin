import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Log from '../utils/logs.js'
import { bing } from 'gpti'

// 存储每个用户的对话
var messagesSave = []

export class bing_use extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'bing',
            /** 功能描述 */
            dsc: 'bing',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?bb.*$',
                    /** 执行方法 */
                    fnc: 'bing_content'
                }
            ]
        })
    }

    async bing_content(e) {
        let message = e.msg
        let user = e.user_id
        let content = message.replace(/^#?bb/, '').trim()
        if (content === '清空对话') {
            await this.bing_clear(e)
            return true
        }
        if (content) {
            let HistoryMsg = messagesSave[user] || []
            HistoryMsg.push({ role: 'user', content: content })
            bing({
                messages: HistoryMsg,
                conversation_style: 'Balanced',
                markdown: false,
                stream: false,
            }, (err, result) => {
                if (err) {
                    Log.e(err)
                    e.reply('遇到了一些问题，请反馈控制台日志给开发者', true)
                    return true
                } else {
                    if (result.code === 200) {
                        let ReplyMsg = result.message
                        if (ReplyMsg) {
                            e.reply(ReplyMsg, true)
                            messagesSave[user] = [...HistoryMsg, { role: 'assistant', content: ReplyMsg }]
                            Log.i(`用户 ${user} 对话内容：${content}，Bing回复内容：${ReplyMsg}`)
                            return true
                        }
                    } else {
                        Log.e(result)
                        e.reply('远程服务器返回错误代码 ' + result.code + ' ，请等待开发者修复', true)
                        return true
                    }
                }
            })
        } else {
            await e.reply('请输入与Bing对话的内容', true)
            return true
        }
    }

    async bing_clear(e) {
        let user = e.user_id
        let HistoryMsg = messagesSave[user] || []
        let msgCount = HistoryMsg.length
        messagesSave[user] = []
        await e.reply(`已清空${msgCount}条对话记录`, true)
        return true
    }
}