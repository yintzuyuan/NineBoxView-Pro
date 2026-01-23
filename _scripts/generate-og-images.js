#!/usr/bin/env node
/**
 * 多語言 OG Image 生成腳本
 * 使用 Puppeteer 從 HTML 模板生成各語言版本的 Open Graph 圖片
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 各語言配置
const languages = {
    'zh-Hant': {
        title: '九宮格預覽 Pro',
        subtitle: '九宮格預覽工具'
    },
    'en': {
        title: 'NineBoxView Pro',
        subtitle: 'Nine-grid Preview Tool'
    },
    'zh-Hans': {
        title: '九宫格预览 Pro',
        subtitle: '九宫格预览工具'
    },
    'ja': {
        title: '九マスビュー Pro',
        subtitle: '9マスプレビューツール'
    },
    'ko': {
        title: '나인박스뷰 Pro',
        subtitle: '9칸 미리보기 도구'
    }
};

async function generateOgImages() {
    const scriptDir = __dirname;
    const projectRoot = path.resolve(scriptDir, '..');
    const templatePath = path.join(scriptDir, 'og-image-template.html');
    const logoPath = path.join(projectRoot, 'assets', 'logo-512.png');
    const outputDir = path.join(projectRoot, 'assets', 'images');

    // 讀取模板
    let template = fs.readFileSync(templatePath, 'utf-8');

    // 將 logo 轉為 base64 data URI（解決 file:// 協議問題）
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

    // 確保輸出目錄存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('啟動瀏覽器...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        for (const [lang, config] of Object.entries(languages)) {
            console.log(`生成 ${lang} 版本...`);

            // 替換模板變數
            let html = template
                .replace('{{LANG}}', lang)
                .replace('{{LOGO_PATH}}', logoBase64)
                .replace('{{TITLE}}', config.title)
                .replace('{{SUBTITLE}}', config.subtitle);

            const page = await browser.newPage();
            await page.setViewport({ width: 1200, height: 630 });
            await page.setContent(html, { waitUntil: 'networkidle0' });

            // 等待字型載入
            await page.evaluate(() => document.fonts.ready);
            // 額外等待確保字型渲染完成
            await new Promise(resolve => setTimeout(resolve, 500));

            const outputPath = path.join(outputDir, `og-image-${lang}.png`);
            await page.screenshot({
                path: outputPath,
                type: 'png'
            });

            await page.close();
            console.log(`  ✓ 已儲存: ${outputPath}`);
        }
    } finally {
        await browser.close();
    }

    console.log('\n完成！共生成 5 張 OG 圖片。');
}

generateOgImages().catch(console.error);
