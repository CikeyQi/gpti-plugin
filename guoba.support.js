import Config from "./components/Config.js";
import lodash from "lodash";
import path from "path";
import { pluginRoot } from "./model/path.js";

export function supportGuoba() {
  return {
    pluginInfo: {
      name: 'gpti-plugin',
      title: 'GPTI交互插件',
      author: ['@CikeyQi', '@erzaozi'],
      authorLink: ['https://github.com/CikeyQi', 'https://github.com/erzaozi'],
      link: 'https://github.com/CikeyQi/gpti-plugin',
      isV3: true,
      isV2: false,
      description: '基于 Yunzai 的 GPT 插件，使用 gpti-js 免费接口',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'cryptocurrency-color:chat',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: path.join(pluginRoot, 'resources/readme/girl.png'),
    },
    configInfo: {
      schemas: [
        {
          component: "Divider",
          label: "ChatGPT 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "gpt.model",
          label: "模型",
          bottomHelpMessage: "选择要使用的ChatGPT模型",
          component: "Select",
          componentProps: {
            options: [
              { label: "GPT-4", value: "gpt-4" },
              { label: "GPT-4-0613", value: "gpt-4-0613" },
              { label: "GPT-4-32k", value: "gpt-4-32k" },
              { label: "GPT-4-0314", value: "gpt-4-0314" },
              { label: "GPT-4-32k-0314", value: "gpt-4-32k-0314" },
              { label: "GPT-3.5-Turbo", value: "gpt-3.5-turbo" },
              { label: "GPT-3.5-Turbo-16k", value: "gpt-3.5-turbo-16k" },
              { label: "GPT-3.5-Turbo-0613", value: "gpt-3.5-turbo-0613" },
              { label: "GPT-3.5-Turbo-16k-0613", value: "gpt-3.5-turbo-16k-0613" },
              { label: "GPT-3.5-Turbo-0301", value: "gpt-3.5-turbo-0301" },
              { label: "Text-Davinci-003", value: "text-davinci-003" },
              { label: "Text-Davinci-002", value: "text-davinci-002" },
              { label: "Code-Davinci-002", value: "code-davinci-002" },
              { label: "GPT-3", value: "gpt-3" },
              { label: "Text-Curie-001", value: "text-curie-001" },
              { label: "Text-Babbage-001", value: "text-babbage-001" },
              { label: "Text-Ada-001", value: "text-ada-001" },
              { label: "Davinci", value: "davinci" },
              { label: "Curie", value: "curie" },
              { label: "Babbage", value: "babbage" },
              { label: "Ada", value: "ada" },
              { label: "Babbage-002", value: "babbage-002" },
              { label: "Davinci-002", value: "davinci-002" }
            ]
          },
        },
        {
          field: "gpt.markdown",
          label: "Markdown",
          bottomHelpMessage: "是否使用Markdown格式输出内容",
          component: "Switch",
        },
        {
          component: "Divider",
          label: "ChatGPT Web 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "gptweb.markdown",
          label: "Markdown",
          bottomHelpMessage: "是否使用Markdown格式输出内容",
          component: "Switch",
        },
        {
          component: "Divider",
          label: "Bing 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "bing.style",
          label: "风格",
          bottomHelpMessage: "选择要使用的Bing风格",
          component: "Select",
          componentProps: {
            options: [
              { label: "Balanced", value: "Balanced" },
              { label: "Creative", value: "Creative" },
              { label: "Precise", value: "Precise" }
            ]
          },
        },
        {
          field: "bing.markdown",
          label: "Markdown",
          bottomHelpMessage: "是否使用Markdown格式输出内容",
          component: "Switch",
        },
        {
          component: "Divider",
          label: "LLaMA-2 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "llama2.system_message",
          label: "系统设定",
          component: "Input",
        },
        {
          field: "llama2.temperature",
          label: "温度系数",
          bottomHelpMessage: "温度越高，回复越随机越强，创造力越好",
          component: "InputNumber",
          componentProps: {
            min: 0,
            max: 1,
            step: 0.1,
          },
        },
        {
          field: "llama2.max_tokens",
          label: "最大回复长度",
          bottomHelpMessage: "设置最大回复长度，避免过长",
          component: "InputNumber",
          componentProps: {
            min: 0,
            max: 4096,
            step: 1,
          },
        },
        {
          field: "llama2.top_p",
          label: "概率",
          bottomHelpMessage: "设置概率，避免回复过于相似",
          component: "InputNumber",
          componentProps: {
            min: 0,
            max: 1,
            step: 0.1,
          },
        },
        {
          field: "llama2.repetition_penalty",
          label: "重复惩罚",
          bottomHelpMessage: "设置惩罚，避免回复过于相似",
          component: "InputNumber",
          componentProps: {
            min: 1,
            max: 2,
            step: 0.1,
          },
        },
        {
          field: "llama2.markdown",
          label: "Markdown",
          bottomHelpMessage: "是否使用Markdown格式输出内容",
          component: "Switch",
        },
        {
          component: "Divider",
          label: "Prodia 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "prodia_v1.model",
          label: "模型",
          bottomHelpMessage: "选择要使用的Prodia模型",
          component: "Select",
          componentProps: {
            options: [
              { label: "3Guofeng3_v34", value: "3Guofeng3_v34.safetensors [50f420de]" },
              { label: "absolutereality_V16", value: "absolutereality_V16.safetensors [37db0fc3]" },
              { label: "absolutereality_v181", value: "absolutereality_v181.safetensors [3d9d4d2b]" },
              { label: "amIReal_V41", value: "amIReal_V41.safetensors [0a8a2e61]" },
              { label: "analog-diffusion-1.0", value: "analog-diffusion-1.0.ckpt [9ca13f02]" },
              { label: "anythingv3_0-pruned", value: "anythingv3_0-pruned.ckpt [2700c435]" },
              { label: "anything-v4.5-pruned", value: "anything-v4.5-pruned.ckpt [65745d25]" },
              { label: "anythingV5_PrtRE", value: "anythingV5_PrtRE.safetensors [893e49b9]" },
              { label: "AOM3A3_orangemixs", value: "AOM3A3_orangemixs.safetensors [9600da17]" },
              { label: "blazing_drive_v10g", value: "blazing_drive_v10g.safetensors [ca1c1eab]" },
              { label: "breakdomain_I2428", value: "breakdomain_I2428.safetensors [43cc7d2f]" },
              { label: "breakdomain_M2150", value: "breakdomain_M2150.safetensors [15f7afca]" },
              { label: "cetusMix_Version35", value: "cetusMix_Version35.safetensors [de2f2560]" },
              { label: "childrensStories_v13D", value: "childrensStories_v13D.safetensors [9dfaabcb]" },
              { label: "childrensStories_v1SemiReal", value: "childrensStories_v1SemiReal.safetensors [a1c56dbb]" },
              { label: "childrensStories_v1ToonAnime", value: "childrensStories_v1ToonAnime.safetensors [2ec7b88b]" },
              { label: "Counterfeit_v30", value: "Counterfeit_v30.safetensors [9e2a8f19]" },
              { label: "cuteyukimixAdorable_midchapter3", value: "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]" },
              { label: "cyberrealistic_v33", value: "cyberrealistic_v33.safetensors [82b0d085]" },
              { label: "dalcefo_v4", value: "dalcefo_v4.safetensors [425952fe]" },
              { label: "deliberate_v2", value: "deliberate_v2.safetensors [10ec4b29]" },
              { label: "deliberate_v3", value: "deliberate_v3.safetensors [afd9d2d4]" },
              { label: "dreamlike-anime-1.0", value: "dreamlike-anime-1.0.safetensors [4520e090]" },
              { label: "dreamlike-diffusion-1.0", value: "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]" },
              { label: "dreamlike-photoreal-2.0", value: "dreamlike-photoreal-2.0.safetensors [fdcf65e7]" },
              { label: "dreamshaper_6BakedVae", value: "dreamshaper_6BakedVae.safetensors [114c8abb]" },
              { label: "dreamshaper_7", value: "dreamshaper_7.safetensors [5cf5ae06]" },
              { label: "dreamshaper_8", value: "dreamshaper_8.safetensors [9d40847d]" },
              { label: "edgeOfRealism_eorV20", value: "edgeOfRealism_eorV20.safetensors [3ed5de15]" },
              { label: "EimisAnimeDiffusion_V1", value: "EimisAnimeDiffusion_V1.ckpt [4f828a15]" },
              { label: "elldreths-vivid-mix", value: "elldreths-vivid-mix.safetensors [342d9d26]" },
              { label: "epicphotogasm_xPlusPlus", value: "epicphotogasm_xPlusPlus.safetensors [1a8f6d35]" },
              { label: "epicrealism_naturalSinRC1VAE", value: "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]" },
              { label: "epicrealism_pureEvolutionV3", value: "epicrealism_pureEvolutionV3.safetensors [42c8440c]" },
              { label: "ICantBelieveItsNotPhotography_seco", value: "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]" },
              { label: "indigoFurryMix_v75Hybrid", value: "indigoFurryMix_v75Hybrid.safetensors [91208cbb]" },
              { label: "juggernaut_aftermath", value: "juggernaut_aftermath.safetensors [5e20c455]" },
              { label: "lofi_v4", value: "lofi_v4.safetensors [ccc204d6]" },
              { label: "lyriel_v16", value: "lyriel_v16.safetensors [68fceea2]" },
              { label: "majicmixRealistic_v4", value: "majicmixRealistic_v4.safetensors [29d0de58]" },
              { label: "mechamix_v10", value: "mechamix_v10.safetensors [ee685731]" },
              { label: "meinamix_meinaV9", value: "meinamix_meinaV9.safetensors [2ec66ab0]" },
              { label: "meinamix_meinaV11", value: "meinamix_meinaV11.safetensors [b56ce717]" },
              { label: "neverendingDream_v122", value: "neverendingDream_v122.safetensors [f964ceeb]" },
              { label: "openjourney_V4", value: "openjourney_V4.ckpt [ca2f377f]" },
              { label: "pastelMixStylizedAnime_pruned_fp16", value: "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]" },
              { label: "portraitplus_V1.0", value: "portraitplus_V1.0.safetensors [1400e684]" },
              { label: "protogenx34", value: "protogenx34.safetensors [5896f8d5]" },
              { label: "Realistic_Vision_V1.4", value: "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]" },
              { label: "Realistic_Vision_V2.0", value: "Realistic_Vision_V2.0.safetensors [79587710]" },
              { label: "Realistic_Vision_V4.0", value: "Realistic_Vision_V4.0.safetensors [29a7afaa]" },
              { label: "Realistic_Vision_V5.0", value: "Realistic_Vision_V5.0.safetensors [614d1063]" },
              { label: "redshift_diffusion-V10", value: "redshift_diffusion-V10.safetensors [1400e684]" },
              { label: "revAnimated_v122", value: "revAnimated_v122.safetensors [3f4fefd9]" },
              { label: "rundiffusionFX25D_v10", value: "rundiffusionFX25D_v10.safetensors [cd12b0ee]" },
              { label: "rundiffusionFX_v10", value: "rundiffusionFX_v10.safetensors [cd4e694d]" },
              { label: "sdv1_4", value: "sdv1_4.ckpt [7460a6fa]" },
              { label: "v1-5-pruned-emaonly", value: "v1-5-pruned-emaonly.safetensors [d7049739]" },
              { label: "v1-5-inpainting", value: "v1-5-inpainting.safetensors [21c7ab71]" },
              { label: "shoninsBeautiful_v10", value: "shoninsBeautiful_v10.safetensors [25d8c546]" },
              { label: "theallys-mix-ii-churned", value: "theallys-mix-ii-churned.safetensors [5d9225a4]" },
              { label: "timeless-1.0", value: "timeless-1.0.ckpt [7c4971d4]" },
              { label: "toonyou_beta6", value: "toonyou_beta6.safetensors [980f6b15]" }
            ]
          },
        },
        {
          field: "prodia_v1.steps",
          label: "步数",
          bottomHelpMessage: "绘制图像的步数",
          component: "InputNumber",
          componentProps: {
            min: 1,
            max: 30,
            step: 1,
          },
        },
        {
          field: "prodia_v1.cfg_scale",
          label: "提示词权重",
          bottomHelpMessage: "绘制图像的步数",
          component: "InputNumber",
          componentProps: {
            min: 0,
            max: 20,
            step: 1,
          },
        },
        {
          field: "prodia_v1.sampler",
          label: "采样器",
          bottomHelpMessage: "选择要使用的采样器",
          component: "Select",
          componentProps: {
            options: [
              { label: "Euler", value: "Euler" },
              { label: "Euler a", value: "Euler a" },
              { label: "Heun", value: "Heun" },
              { label: "DPM++ 2M Karras", value: "DPM++ 2M Karras" },
              { label: "DPM++ SDE Karras", value: "DPM++ SDE Karras" },
              { label: "DDIM", value: "DDIM" }
            ]
          },
        },
        {
          field: "prodia_v1.negative_prompt",
          label: "负面提示词",
          component: "Input",
        },
        {
          component: "Divider",
          label: "Prodia Stable-Diffusion 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "prodia_stablediffusion.model",
          label: "模型",
          bottomHelpMessage: "选择要使用的Prodia Stable-Diffusion模型",
          component: "Select",
          componentProps: {
            options: [
              { label: "absolutereality_v181", value: "absolutereality_v181.safetensors [3d9d4d2b]" },
              { label: "3Guofeng3_v34", value: "3Guofeng3_v34.safetensors [50f420de]" },
              { label: "absolutereality_V16", value: "absolutereality_V16.safetensors [37db0fc3]" },
              { label: "amIReal_V41", value: "amIReal_V41.safetensors [0a8a2e61]" },
              { label: "analog-diffusion-1.0", value: "analog-diffusion-1.0.ckpt [9ca13f02]" },
              { label: "anythingv3_0-pruned", value: "anythingv3_0-pruned.ckpt [2700c435]" },
              { label: "anything-v4.5-pruned", value: "anything-v4.5-pruned.ckpt [65745d25]" },
              { label: "anythingV5_PrtRE", value: "anythingV5_PrtRE.safetensors [893e49b9]" },
              { label: "AOM3A3_orangemixs", value: "AOM3A3_orangemixs.safetensors [9600da17]" },
              { label: "blazing_drive_v10g", value: "blazing_drive_v10g.safetensors [ca1c1eab]" },
              { label: "cetusMix_Version35", value: "cetusMix_Version35.safetensors [de2f2560]" },
              { label: "childrensStories_v13D", value: "childrensStories_v13D.safetensors [9dfaabcb]" },
              { label: "childrensStories_v1SemiReal", value: "childrensStories_v1SemiReal.safetensors [a1c56dbb]" },
              { label: "childrensStories_v1ToonAnime", value: "childrensStories_v1ToonAnime.safetensors [2ec7b88b]" },
              { label: "Counterfeit_v30", value: "Counterfeit_v30.safetensors [9e2a8f19]" },
              { label: "cuteyukimixAdorable_midchapter3", value: "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]" },
              { label: "cyberrealistic_v33", value: "cyberrealistic_v33.safetensors [82b0d085]" },
              { label: "dalcefo_v4", value: "dalcefo_v4.safetensors [425952fe]" },
              { label: "deliberate_v2", value: "deliberate_v2.safetensors [10ec4b29]" },
              { label: "deliberate_v3", value: "deliberate_v3.safetensors [afd9d2d4]" },
              { label: "dreamlike-anime-1.0", value: "dreamlike-anime-1.0.safetensors [4520e090]" },
              { label: "dreamlike-diffusion-1.0", value: "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]" },
              { label: "dreamlike-photoreal-2.0", value: "dreamlike-photoreal-2.0.safetensors [fdcf65e7]" },
              { label: "dreamshaper_6BakedVae", value: "dreamshaper_6BakedVae.safetensors [114c8abb]" },
              { label: "dreamshaper_7", value: "dreamshaper_7.safetensors [5cf5ae06]" },
              { label: "dreamshaper_8", value: "dreamshaper_8.safetensors [9d40847d]" },
              { label: "edgeOfRealism_eorV20", value: "edgeOfRealism_eorV20.safetensors [3ed5de15]" },
              { label: "EimisAnimeDiffusion_V1", value: "EimisAnimeDiffusion_V1.ckpt [4f828a15]" },
              { label: "elldreths-vivid-mix", value: "elldreths-vivid-mix.safetensors [342d9d26]" },
              { label: "epicrealism_naturalSinRC1VAE", value: "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]" },
              { label: "ICantBelieveItsNotPhotography_seco", value: "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]" },
              { label: "juggernaut_aftermath", value: "juggernaut_aftermath.safetensors [5e20c455]" },
              { label: "lofi_v4", value: "lofi_v4.safetensors [ccc204d6]" },
              { label: "lyriel_v16", value: "lyriel_v16.safetensors [68fceea2]" },
              { label: "majicmixRealistic_v4", value: "majicmixRealistic_v4.safetensors [29d0de58]" },
              { label: "mechamix_v10", value: "mechamix_v10.safetensors [ee685731]" },
              { label: "meinamix_meinaV9", value: "meinamix_meinaV9.safetensors [2ec66ab0]" },
              { label: "meinamix_meinaV11", value: "meinamix_meinaV11.safetensors [b56ce717]" },
              { label: "neverendingDream_v122", value: "neverendingDream_v122.safetensors [f964ceeb]" },
              { label: "openjourney_V4", value: "openjourney_V4.ckpt [ca2f377f]" },
              { label: "pastelMixStylizedAnime_pruned_fp16", value: "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]" },
              { label: "portraitplus_V1.0", value: "portraitplus_V1.0.safetensors [1400e684]" },
              { label: "protogenx34", value: "protogenx34.safetensors [5896f8d5]" },
              { label: "Realistic_Vision_V1.4-pruned-fp16", value: "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]" },
              { label: "Realistic_Vision_V2.0", value: "Realistic_Vision_V2.0.safetensors [79587710]" },
              { label: "Realistic_Vision_V4.0", value: "Realistic_Vision_V4.0.safetensors [29a7afaa]" },
              { label: "Realistic_Vision_V5.0", value: "Realistic_Vision_V5.0.safetensors [614d1063]" },
              { label: "redshift_diffusion-V10", value: "redshift_diffusion-V10.safetensors [1400e684]" },
              { label: "revAnimated_v122", value: "revAnimated_v122.safetensors [3f4fefd9]" },
              { label: "rundiffusionFX25D_v10", value: "rundiffusionFX25D_v10.safetensors [cd12b0ee]" },
              { label: "rundiffusionFX_v10", value: "rundiffusionFX_v10.safetensors [cd4e694d]" },
              { label: "sdv1_4", value: "sdv1_4.ckpt [7460a6fa]" },
              { label: "v1-5-pruned-emaonly", value: "v1-5-pruned-emaonly.safetensors [d7049739]" },
              { label: "v1-5-inpainting", value: "v1-5-inpainting.safetensors [21c7ab71]" },
              { label: "shoninsBeautiful_v10", value: "shoninsBeautiful_v10.safetensors [25d8c546]" },
              { label: "theallys-mix-ii-churned", value: "theallys-mix-ii-churned.safetensors [5d9225a4]" },
              { label: "timeless-1.0", value: "timeless-1.0.ckpt [7c4971d4]" },
              { label: "toonyou_beta6", value: "toonyou_beta6.safetensors [980f6b15]" }
            ]
          },
        },
        {
          field: "prodia_stablediffusion.sampling_steps",
          label: "步数",
          bottomHelpMessage: "绘制图像的步数",
          component: "InputNumber",
          componentProps: {
            min: 1,
            max: 30,
            step: 1,
          },
        },
        {
          field: "prodia_stablediffusion.cfg_scale",
          label: "提示词权重",
          bottomHelpMessage: "提示词权重",
          component: "InputNumber",
          componentProps: {
            min: 0,
            max: 20,
            step: 1,
          },
        },
        {
          field: "prodia_stablediffusion.sampling_method",
          label: "采样器",
          bottomHelpMessage: "选择要使用的采样器",
          component: "Select",
          componentProps: {
            options: [
              { label: "DPM++ 2M Karras", value: "DPM++ 2M Karras" },
              { label: "Euler", value: "Euler" },
              { label: "Euler a", value: "Euler a" },
              { label: "LMS", value: "LMS" },
              { label: "Heun", value: "Heun" },
              { label: "DPM2", value: "DPM2" },
              { label: "DPM2 a", value: "DPM2 a" },
              { label: "DPM++ 2S a", value: "DPM++ 2S a" },
              { label: "DPM++ 2M", value: "DPM++ 2M" },
              { label: "DPM++ SDE", value: "DPM++ SDE" },
              { label: "DPM fast", value: "DPM fast" },
              { label: "DPM adaptive", value: "DPM adaptive" },
              { label: "LMS Karras", value: "LMS Karras" },
              { label: "DPM2 Karras", value: "DPM2 Karras" },
              { label: "DPM2 a Karras", value: "DPM2 a Karras" },
              { label: "DPM++ 2S a Karras", value: "DPM++ 2S a Karras" },
              { label: "DPM++ 2M Karras", value: "DPM++ 2M Karras" },
              { label: "DPM++ SDE Karras", value: "DPM++ SDE Karras" },
              { label: "DDIM", value: "DDIM" },
              { label: "PLMS", value: "PLMS" },
              { label: "DPM++ 2M Karras", value: "DPM++ 2M Karras" }
            ]
          },
        },
        {
          field: "prodia_stablediffusion.prompt_negative",
          label: "负面提示词",
          component: "Input",
        },
        {
          field: "prodia_stablediffusion.width",
          label: "宽度",
          bottomHelpMessage: "绘制图像的宽度",
          component: "InputNumber",
          componentProps: {
            min: 50,
            max: 1024,
            step: 1,
          },
        },
        {
          field: "prodia_stablediffusion.height",
          label: "高度",
          bottomHelpMessage: "绘制图像的高度",
          component: "InputNumber",
          componentProps: {
            min: 50,
            max: 1024,
            step: 1,
          },
        },
        {
          component: "Divider",
          label: "Stable-Diffusion 2.1 相关配置",
          componentProps: {
            orientation: "left",
            plain: true,
          },
        },
        {
          field: "stablediffusion_v2.guidance_scale",
          label: "提示词权重",
          bottomHelpMessage: "提示词权重",
          component: "InputNumber",
          componentProps: {
            min: 0,
            max: 50,
            step: 1,
          },
        },
        {
          field: "stablediffusion_v2.prompt_negative",
          label: "负面提示词",
          component: "Input",
        },
      ],
      getConfigData() {
        let config = Config.getConfig()
        return config
      },

      setConfigData(data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, Config.getConfig(), config)
        Config.setConfig(config)
        return Result.ok({}, '保存成功~')
      },
    },
  }
}