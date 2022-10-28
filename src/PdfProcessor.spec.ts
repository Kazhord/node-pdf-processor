import { PdfProcessor } from '.'

describe('PdfProcessor', () => {
    let processor: PdfProcessor
    beforeEach(async () => {
        processor = new PdfProcessor()
    })

    afterEach(async () => {
        await processor.stop()
    })

    it('should be ok with data and style', async () => {
        const buffer = await processor.process(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
              </head>
              <body>
                <h1>Test #{{ testNumber }}</h1>
              </body>
            </html>`,
            {
                testNumber: 12345,
            },
            `body {
                background-color: red;
                color: yellow;
            }
            `
        )
        expect(buffer).toBeInstanceOf(Buffer)
    })

    it('should be ok with data and style and multiple pdf', async () => {
        const buffer = await processor.process(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
              </head>
              <body>
                <h1>Test #{{ testNumber }}</h1>
              </body>
            </html>`,
            {
                testNumber: 12345,
            },
            `body {
                background-color: red;
                color: yellow;
            }
            `
        )
        expect(buffer).toBeInstanceOf(Buffer)

        const buffer2 = await processor.process(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
              </head>
              <body>
                <h1>Test #{{ testNumber }}</h1>
              </body>
            </html>`,
            {
                testNumber: 12346,
            },
            `body {
                background-color: red;
                color: yellow;
            }
            `
        )
        expect(buffer2).toBeInstanceOf(Buffer)

        const buffer3 = await processor.process(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
              </head>
              <body>
                <h1>Test #{{ testNumber }}</h1>
              </body>
            </html>`,
            {
                testNumber: 12347,
            },
            `body {
                background-color: red;
                color: yellow;
            }
            `
        )
        expect(buffer3).toBeInstanceOf(Buffer)
    })

    it('should be ok with data and no style', async () => {
        const buffer = await processor.process(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
              </head>
              <body>
                <h1>Test #{{ testNumber }}</h1>
              </body>
            </html>`,
            {
                testNumber: 12345,
            }
        )
        expect(buffer).toBeInstanceOf(Buffer)
    })

    it('should be ok without data and style', async () => {
        const buffer = await processor.process(
            `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
              </head>
              <body>
                <h1>Test</h1>
              </body>
            </html>`
        )
        expect(buffer).toBeInstanceOf(Buffer)
    })
})
