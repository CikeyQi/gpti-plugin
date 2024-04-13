import plugin from '../../../lib/plugins/plugin.js'
import _ from 'lodash'
import fs from 'fs'
import Log from '../utils/logs.js'
import { pluginRoot } from '../model/path.js'
import Version from '../components/Version.js'
import Init from '../model/init.js'


export class Help extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: 'GPTI-帮助',
      /** 功能描述 */
      dsc: 'GPTI 帮助',
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 1009,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?gpti帮助$',
          /** 执行方法 */
          fnc: 'help'
        }
      ]
    })
  }

  async help(e) {
    const helpCfg = {
      themeSet: false,
      title: '#GPTI-plugin帮助',
      subTitle: 'Yunzai-Bot & GPTI-plugin',
      colWidth: 265,
      theme: 'all',
      themeExclude: ['default'],
      colCount: 2,
      bgBlur: true
    }
    const helpList = [
      {
        group: 'GPTI-功能',
        list: [
          {
            icon: 1,
            title: '#gg<内容>',
            desc: '与 GPT 进行连续对话'
          },
          {
            icon: 2,
            title: '#gg清空对话',
            desc: '清空与 GPT 的聊天记录'
          },
          {
            icon: 3,
            title: '#bb<内容>',
            desc: '与 Bing 进行连续对话 '
          },
          {
            icon: 4,
            title: '#bb<清空对话>',
            desc: '清空与 Bing 的聊天记录'
          },
          {
            icon: 5,
            title: '#dd<提示词>',
            desc: '使用 DALL-E 生成图片'
          },
          {
            icon: 6,
            title: '#dm<提示词>',
            desc: '使用 DALL-E Mini 批量生成图片'
          },
          {
            icon: 7,
            title: '#prv1<提示词>',
            desc: '使用 Prodia V1 生成图片'
          },
          {
            icon: 8,
            title: '#prsd<提示词>',
            desc: '使用 Prodia SD 生成图片'
          },
          {
            icon: 9,
            title: '#prxl<提示词>',
            desc: '使用 Prodia XL 生成图片'
          },
          {
            icon: 10,
            title: '#pia<提示词>',
            desc: '使用 Pixart A 生成图片'
          },
          {
            icon: 11,
            title: '#pilcm<提示词>',
            desc: '使用 Pixart LCM 生成图片'
          }
        ]
      },
      {
        group: 'GPTI-设置（暂不可用）',
        list: [
          {
            icon: 12,
            title: '#gpti设置gpt模型<模型名称>',
            desc: '修改使用的 GPT 模型'
          },
          {
            icon: 13,
            title: '#gpti设置bing风格<风格名称>',
            desc: '修改使用的 Bing 风格'
          },
          {
            icon: 14,
            title: '#gpti设置v1模型<模型名称>',
            desc: '修改 Prodia V1 使用的模型'
          },
          {
            icon: 15,
            title: '#gpti设置v1步数<步数>',
            desc: '修改 Prodia V1 绘制步数'
          },
          {
            icon: 16,
            title: '#gpti设置v1相关性<值>',
            desc: '修改 Prodia V1 提示词相关性'
          },
          {
            icon: 17,
            title: '#gpti设置v1采样<采样器>',
            desc: '修改 Prodia V1 采样器'
          },
          {
            icon: 18,
            title: '#gpti设置v1负面<提示词>',
            desc: '修改 Prodia V1 负面提示词'
          },
          {
            icon: 19,
            title: '#gpti设置sd模型<模型名称>',
            desc: '修改 Prodia SD 使用的模型'
          },
          {
            icon: 20,
            title: '#gpti设置sd宽度<值>',
            desc: '修改 Prodia SD 画幅宽度'
          },
          {
            icon: 21,
            title: '#gpti设置sd高度<值>',
            desc: '修改 Prodia SD 画幅高度'
          },
          {
            icon: 22,
            title: '#gpti设置sd步数<步数>',
            desc: '修改 Prodia SD 绘制步数'
          },
          {
            icon: 23,
            title: '#gpti设置sd相关性<值>',
            desc: '修改 Prodia SD 提示词相关性'
          },
          {
            icon: 24,
            title: '#gpti设置sd采样<采样器>',
            desc: '修改 Prodia SD 采样器'
          },
          {
            icon: 25,
            title: '#gpti设置sd负面<提示词>',
            desc: '修改 Prodia SD 负面提示词'
          },
          {
            icon: 26,
            title: '#gpti设置xl模型<模型名称>',
            desc: '修改 Prodia XL 使用的模型'
          },
          {
            icon: 27,
            title: '#gpti设置xl宽度<值>',
            desc: '修改 Prodia XL 画幅宽度'
          },
          {
            icon: 28,
            title: '#gpti设置xl高度<值>',
            desc: '修改 Prodia XL 画幅高度'
          },
          {
            icon: 29,
            title: '#gpti设置xl步数<步数>',
            desc: '修改 Prodia XL 绘制步数'
          },
          {
            icon: 30,
            title: '#gpti设置xl相关性<值>',
            desc: '修改 Prodia XL 提示词相关性'
          },
          {
            icon: 31,
            title: '#gpti设置xl采样<采样器>',
            desc: '修改 Prodia XL 采样器'
          },
          {
            icon: 32,
            title: '#gpti设置xl负面<提示词>',
            desc: '修改 Prodia XL 负面提示词'
          },
          {
            icon: 33,
            title: '#gpti设置pa宽度<值>',
            desc: '修改 Pixart A 画幅宽度'
          },
          {
            icon: 34,
            title: '#gpti设置pa高度<值>',
            desc: '修改 Pixart A 画幅高度'
          },
          {
            icon: 35,
            title: '#gpti设置pa相关性<值>',
            desc: '修改 Pixart A 提示词相关性'
          }
        ]
      }
    ]
    const helpGroup = []
    _.forEach(helpList, (group) => {
      _.forEach(group.list, (help) => {
        const icon = help.icon * 1
        if (!icon) {
          help.css = 'display:none'
        } else {
          const x = (icon - 1) % 10
          const y = (icon - x - 1) / 10
          help.css = `background-position:-${x * 50}px -${y * 50}px`
        }
      })
      helpGroup.push(group)
    })

    const themeData = await this.getThemeData(helpCfg, helpCfg)

    return await this.render(
      'helpTemp/helpTemp',
      {
        helpCfg,
        helpGroup,
        ...themeData,
        element: 'default'
      },
      { e }
    )
  }

  getThemeCfg() {
    const resPath = '{{_res_path}}/helpTemp/'
    return {
      main: `${resPath}/main.png`,
      bg: `${resPath}/bg.jpg`,
      style: {
        // 主文字颜色
        fontColor: '#ceb78b',
        // 主文字阴影： 横向距离 垂直距离 阴影大小 阴影颜色
        // fontShadow: '0px 0px 1px rgba(6, 21, 31, .9)',
        fontShadow: 'none',
        // 描述文字颜色
        descColor: '#eee',

        /* 面板整体底色，会叠加在标题栏及帮助行之下，方便整体帮助有一个基础底色
         *  若无需此项可将rgba最后一位置为0即为完全透明
         *  注意若综合透明度较低，或颜色与主文字颜色过近或太透明可能导致阅读困难 */
        contBgColor: 'rgba(6, 21, 31, .5)',

        // 面板底图毛玻璃效果，数字越大越模糊，0-10 ，可为小数
        contBgBlur: 3,

        // 板块标题栏底色
        headerBgColor: 'rgba(6, 21, 31, .4)',
        // 帮助奇数行底色
        rowBgColor1: 'rgba(6, 21, 31, .2)',
        // 帮助偶数行底色
        rowBgColor2: 'rgba(6, 21, 31, .35)'
      }
    }
  }

  async getThemeData(diyStyle, sysStyle) {
    const helpConfig = _.extend({}, diyStyle, sysStyle)
    const colCount = Math.min(
      5,
      Math.max(parseInt(helpConfig?.colCount) || 3, 2)
    )
    const colWidth = Math.min(
      500,
      Math.max(100, parseInt(helpConfig?.colWidth) || 265)
    )
    const width = Math.min(2500, Math.max(800, colCount * colWidth + 30))
    const theme = this.getThemeCfg()
    const themeStyle = theme.style || {}
    const ret = [
      `
      body{background-image:url(${theme.bg});width:${width}px;}
      .container{background-image:url(${theme.main
      });width:${width}px;background-size:cover}
      .help-table .td,.help-table .th{width:${100 / colCount}%}
      `
    ]
    const css = function (sel, css, key, def, fn) {
      let val = (function () {
        for (const idx in arguments) {
          if (!_.isUndefined(arguments[idx])) {
            return arguments[idx]
          }
        }
      })(themeStyle[key], diyStyle[key], sysStyle[key], def)
      if (fn) {
        val = fn(val)
      }
      ret.push(`${sel}{${css}:${val}}`)
    }
    css('.help-title,.help-group', 'color', 'fontColor', '#ceb78b')
    css('.help-title,.help-group', 'text-shadow', 'fontShadow', 'none')
    css('.help-desc', 'color', 'descColor', '#eee')
    css('.cont-box', 'background', 'contBgColor', 'rgba(43, 52, 61, 0.8)')
    css('.cont-box', 'backdrop-filter', 'contBgBlur', 3, (n) =>
      diyStyle.bgBlur === false ? 'none' : `blur(${n}px)`
    )
    css('.help-group', 'background', 'headerBgColor', 'rgba(34, 41, 51, .4)')
    css(
      '.help-table .tr:nth-child(odd)',
      'background',
      'rowBgColor1',
      'rgba(34, 41, 51, .2)'
    )
    css(
      '.help-table .tr:nth-child(even)',
      'background',
      'rowBgColor2',
      'rgba(34, 41, 51, .4)'
    )
    return {
      style: `<style>${ret.join('\n')}</style>`,
      colCount
    }
  }

  async render(path, params, cfg) {
    const { e } = cfg
    if (!e.runtime) {
      console.log('未找到e.runtime，请升级至最新版Yunzai')
    }

    const BotName = Version.isMiao ? 'Miao-Yunzai' : 'Yunzai-Bot'
    let currentVersion = null
    const package_path = `${pluginRoot}/package.json`
    try {
      const package_json = JSON.parse(fs.readFileSync(package_path, 'utf-8'))
      if (package_json.version) {
        currentVersion = package_json.version
      }
    } catch (err) {
      Log.e('读取package.json失败', err)
    }
    return e.runtime.render('gpti-plugin', path, params, {
      retType: cfg.retMsgId ? 'msgId' : 'default',
      beforeRender({ data }) {
        const pluginName =
          'gpti-plugin' + `<span class="version">${currentVersion}`
        const resPath = data.pluResPath
        const layoutPath =
          process.cwd() + '/plugins/gpti-plugin/resources/common/layout/'
        return {
          ...data,
          _res_path: resPath,
          _mj_path: resPath,
          defaultLayout: layoutPath + 'default.html',
          sys: {
            scale: 'style=transform:scale(1.8)'
          },
          copyright: `Created By ${BotName}<span class="version">${Version.yunzai}</span>${pluginName}</span>`
        }
      }
    })
  }
}
