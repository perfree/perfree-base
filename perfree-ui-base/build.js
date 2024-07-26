import {build} from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function viteBuild(configFile) {
   return  build({
        configFile: configFile
    })
}


/**
 * 扫描生成入口文件
 * @returns {{index: string}}
 */
async function buildModules() {
    const modulesDir = path.resolve(__dirname, 'src/modules');
    for (const moduleName of fs.readdirSync(modulesDir)) {
        const modulePath = path.join(modulesDir, moduleName, 'index.js');
        if (fs.existsSync(modulePath)) {
            process.env.moduleName = moduleName;
            process.env.entry = modulePath;
            console.log(`-------------开始打包${moduleName}模块-------------`)
            await viteBuild('vite.module.config.js')
        }
    }
}

// 使用封装的 Promise 进行打包
console.log("-------------开始打包核心模块-------------")
viteBuild('vite.config.js').then(() => {
    buildModules();
})
