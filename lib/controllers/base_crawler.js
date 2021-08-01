"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrawler = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class BaseCrawler {
    async run() {
        const browser = await puppeteer_1.default.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        });
        const _page = await browser.newPage();
        await this.crawl(browser, _page);
        await browser.close();
    }
}
exports.BaseCrawler = BaseCrawler;
//# sourceMappingURL=base_crawler.js.map