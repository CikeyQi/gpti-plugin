
![Cover](https://github.com/CikeyQi/gpti-plugin/assets/61369914/3a964c89-ba50-4d28-be7b-910ad1eb94b7)

# gpti-plugin
基于Yunzai-Bot的GPT插件，简化了GPT模型的交互，无需令牌来访问GPT

# 安装

1.克隆本仓库至 plugins 目录

- 使用 Ghproxy（国内服务器推荐使用此方法）

```
git clone https://mirror.ghproxy.com/https://github.com/CikeyQi/gpti-plugin.git ./plugins/gpti-plugin
```

- 使用 Github

```
git clone https://github.com/CikeyQi/gpti-plugin.git ./plugins/gpti-plugin
```

2. 安装依赖

```
pnpm install --filter=gpti-plugin
```

# 配置

非常不建议手动修改配置文件，本插件已兼容 [Guoba-plugin](https://github.com/guoba-yunzai/guoba-plugin) ，请使用锅巴插件对配置项进行修改

# 命令列表

| 序号 | 模型 | 命令 | 功能 |
| ---- | ---- | ---- | ---- |
| 1    | ChatGPT | #gg<内容> | 与 ChatGPT 进行连续对话 |
| 2    | ChatGPT Web | #gw<内容> | 与 ChatGPT网页版 进行对话 |
| 3    | Bing | #bb<内容> | 与 New Bing 进行连续对话 |
| 4    | LLaMA-2 | #ll<内容> | 与 LLaMA-2 进行连续对话 |
| 5    | DALL·E | #dd<内容> | 使用 DALL·E 生成图像 |
| 6    | DALL-E Mini | #dm<内容> | 使用 DALL-E Mini 生成图像 |
| 7    | Prodia | #pp<内容> | 使用 Prodia 生成图像 |
| 8    | Prodia Stable-Diffusion | #ps<内容> | 使用 Prodia Stable-Diffusion 生成图像 |
| 9    | Stable-Diffusion 1.5 | #sd1<内容> | 使用 Stable-Diffusion 1.5 生成图像 |
| 10    | Stable-Diffusion 2.1 | #sd2<内容> | 使用 Stable-Diffusion 2.1 生成图像 |
| 11    | EMI | #ee<内容> | 使用 EMI 生成图像 |

# 声明

此项目仅用于学习交流，请勿用于非法用途

# 我们

<a href="https://github.com/CikeyQi/gpti-plugin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CikeyQi/gpti-plugin" />
</a>
