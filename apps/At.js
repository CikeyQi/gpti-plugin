import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import { bing, gpt, llama2 } from 'gpti'

// 存储每个用户的对话
const messagesSave = [];

// 计时器
let timer = [];

export class At extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'at',
            /** 功能描述 */
            dsc: '艾特触发',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 999999,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '',
                    /** 执行方法 */
                    fnc: 'at'
                }
            ]
        })
    }

    async at(e) {
        const config = await Config.getConfig();
        const { use_type, use_group, use_model, prompt, group_cd } = config.auto;

        if (!use_type || (use_type === 'at' && !e.atBot) || !e.msg || (e.isGroup && !use_group.map(String).includes(String(e.group_id)))) {
            return false;
        }

        if (timer[e.user_id]) return false;

        timer[e.user_id] = setTimeout(() => { timer[e.user_id] = null; }, group_cd * 1000);

        messagesSave[e.user_id] = messagesSave[e.user_id] || [];
        if (!messagesSave[e.user_id].length) messagesSave[e.user_id].push({ role: 'user', content: prompt });

        switch (use_model) {
            case 'gpt':
                await this.useGpt(e, config);
                break;
            case 'gpt2':
                await this.useGpt2(e, config);
                break;
            case 'bing':
                await this.useBing(e, config);
                break;
            case 'llama2':
                await this.useLlama2(e, config);
                break;
            default:
                await this.useBing(e, config);
                break;
        }
    }
    async useGpt(e, config) {
        gpt.v1({
            messages: messagesSave[e.user_id],
            prompt: e.msg,
            model: config.gpt.model,
            markdown: config.gpt.markdown,
        }, async (error, result) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                if (result.code === 200) {
                    await e.reply(result.gpt, true)
                    messagesSave[e.user_id].push({ role: 'user', content: e.msg });
                    messagesSave[e.user_id].push({ role: 'assistant', content: result.gpt });
                    return true;
                } else {
                    console.log(result);
                    return false;
                }
            }
        })
    }
    async useGpt2(e, config) {
        messagesSave[e.user_id].push({ role: 'user', content: e.msg });
        gpt.v2({
            messages: messagesSave[e.user_id],
            markdown: config.gpt.markdown,
            stream: false
        }, async (error, result) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                if (result.code === 200) {
                    await e.reply(result.message, true)
                    messagesSave[e.user_id].push({ role: 'assistant', content: result.message });
                    return true;
                } else {
                    console.log(result);
                    return false;
                }
            }
        })
    }
    async useBing(e, config) {
        messagesSave[e.user_id].push({ role: 'user', content: e.msg });
        bing({
            messages: messagesSave[e.user_id],
            conversation_style: config.bing.style,
            markdown: config.bing.markdown,
            stream: false,
        }, async (error, result) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                if (result.code === 200) {
                    await e.reply(result.message, true)
                    messagesSave[e.user_id].push({ role: 'assistant', content: result.message });
                    return true;
                } else {
                    console.log(result);
                    return false;
                }
            }
        })
    }
    async useLlama2(e, config) {
        messagesSave[e.user_id].push({ role: 'user', content: e.msg });
        llama2({
            system_message: config.llama2.system,
            temperature: config.llama2.temperature,
            max_tokens: config.llama2.max_tokens,
            top_p: config.llama2.top_p,
            repetition_penalty: config.llama2.repetition_penalty,
            markdown: config.llama2.markdown,
            stream: false,
        }, async (error, result) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                if (result.code === 200) {
                    await e.reply(result.message, true)
                    messagesSave[e.user_id].push({ role: 'assistant', content: result.message });
                    return true;
                } else {
                    console.log(result);
                    return false;
                }
            }
        })
    }
}