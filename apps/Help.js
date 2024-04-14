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
            desc: '与 ChatGPT 进行连续对话'
          },
          {
            icon: 2,
            title: '#gg清空对话',
            desc: '清空与 ChatGPT 的聊天记录'
          },
          {
            icon: 3,
            title: '#gw<内容>',
            desc: '与 ChatGPT网页版 进行对话'
          },
          {
            icon: 4,
            title: '#bb<内容>',
            desc: '与 New Bing 进行连续对话'
          },
          {
            icon: 5,
            title: '#bb清空对话',
            desc: '清空与 New Bing 的聊天记录'
          },
          {
            icon: 6,
            title: '#ll<内容>',
            desc: '与 LLaMA-2 进行连续对话'
          },
          {
            icon: 7,
            title: '#ll清空对话',
            desc: '清空与 LLaMA-2 的聊天记录'
          },
          {
            icon: 8,
            title: '#dd<内容>',
            desc: '使用 DALL·E 生成图像'
          },
          {
            icon: 9,
            title: '#dm<内容>',
            desc: '使用 DALL-E Mini 生成图像'
          },
          {
            icon: 10,
            title: '#pp<内容>',
            desc: '使用 Prodia 生成图像'
          },
          {
            icon: 11,
            title: '#ps<内容>',
            desc: '使用 Prodia Stable-Diffusion 生成图像'
          },
          {
            icon: 12,
            title: '#sd1<内容>',
            desc: '使用 Stable-Diffusion 1.5 生成图像'
          },
          {
            icon: 13,
            title: '#sd2<内容>',
            desc: '使用 Stable-Diffusion 2.1 生成图像'
          },
          {
            icon: 14,
            title: '#ee<内容>',
            desc: '使用 EMI 生成图像'
          },
        ]
      },
      {
        group: 'GPTI-设置（请使用Guoba-Plugin进行操作）',
        list: [
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
