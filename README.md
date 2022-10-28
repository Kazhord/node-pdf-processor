# @kazhord/node-pdf-processor
Generate PDF using HTML template and Chrome renderer.


## Installation
```sh
$ npm install @kazhord/node-pdf-processor
```

## Features
- Generate PDF from HTML template
- Beautiful report with CSS
- Inject dynamic content

## API
```js
import { PdfProcessor } from '@kazhord/node-pdf-processor'
[...]
const processor = new PdfProcessor()
```

### Process PDF
```js
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
/*
<PDF buffer>
*/
```

### Close processor
```js
await processor.stop()
```

