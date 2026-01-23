#!/usr/bin/env node
/**
 * 多語言 OG Image 生成腳本
 * 截取首頁工具介面區域作為 Open Graph 圖片
 */

const puppeteer = require('puppeteer');
const path = require('path');
const http = require('http');
const fs = require('fs');

const languages = ['zh-Hant', 'en', 'zh-Hans', 'ja', 'ko'];

// 簡易靜態伺服器
function createServer(root, port) {
    return new Promise((resolve) => {
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.webm': 'video/webm',
        };

        const server = http.createServer((req, res) => {
            let filePath = path.join(root, req.url === '/' ? 'index.html' : req.url);
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Not found');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
        });

        server.listen(port, () => resolve(server));
    });
}

async function generateOgImages() {
    const projectRoot = path.resolve(__dirname, '..');
    const outputDir = path.join(projectRoot, 'assets', 'images');
    const port = 8765;

    // 啟動本地伺服器
    console.log('啟動本地伺服器...');
    const server = await createServer(projectRoot, port);

    console.log('啟動瀏覽器...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        for (const lang of languages) {
            console.log(`生成 ${lang} 版本...`);

            const page = await browser.newPage();

            // 設定較大的 viewport 以容納完整介面
            await page.setViewport({ width: 1400, height: 900 });

            // 訪問對應語言的首頁
            await page.goto(`http://localhost:${port}/${lang}/index.html`, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // 等待字型和動態內容載入
            await page.evaluate(() => document.fonts.ready);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 注入格線背景到 hero-workspace
            await page.evaluate(() => {
                const workspace = document.querySelector('.hero-workspace');
                if (workspace) {
                    // 創建一個包裝容器
                    const wrapper = document.createElement('div');
                    wrapper.id = 'og-capture-wrapper';
                    wrapper.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 1200px;
                        height: 630px;
                        background-color: #f8f6f0;
                        background-image:
                            linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
                        background-size: 60px 60px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 99999;
                    `;

                    // 複製工具介面
                    const clone = workspace.cloneNode(true);
                    clone.style.margin = '0';
                    clone.style.transform = 'scale(1.15)';

                    wrapper.appendChild(clone);
                    document.body.appendChild(wrapper);
                }
            });

            // 等待渲染完成
            await new Promise(resolve => setTimeout(resolve, 500));

            // 截取包裝容器
            const wrapper = await page.$('#og-capture-wrapper');
            if (wrapper) {
                const outputPath = path.join(outputDir, `og-image-${lang}.png`);
                await wrapper.screenshot({
                    path: outputPath,
                    type: 'png'
                });
                console.log(`  ✓ 已儲存: ${outputPath}`);
            } else {
                console.log(`  ✗ 找不到 hero-workspace`);
            }

            await page.close();
        }
    } finally {
        await browser.close();
        server.close();
    }

    console.log('\n完成！共生成 5 張 OG 圖片。');
}

generateOgImages().catch(console.error);
