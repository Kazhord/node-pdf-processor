import Mustache from 'mustache'
import puppeteer from 'puppeteer'

export class PdfProcessor {
    private browser: puppeteer.Browser

    private async initialize(): Promise<void> {
        this.browser = await puppeteer.launch()
    }

    public async process(template: string, data = {}, styleContent?: string): Promise<Buffer> {
        if (!this.browser) {
            await this.initialize()
        }
        const page = await this.browser.newPage()
        try {
            await page.setContent(Mustache.render(template, data), {
                waitUntil: 'domcontentloaded',
            })

            await page.evaluate(async (content) => {
                const style = document.createElement('style')
                style.appendChild(document.createTextNode(content))
                const promise = new Promise((resolve, reject) => {
                    style.onload = resolve
                    style.onerror = reject
                })
                document.head.appendChild(style)
                return await promise
            }, styleContent)

            const pdf = await page.pdf({
                printBackground: true,
                format: 'A4',
            })
            return pdf
        } finally {
            await page.close()
        }
    }

    public async stop(): Promise<void> {
        if (this.browser) {
            await this.browser.close()
            this.browser = undefined
        }
    }
}
