import App from '../components/App/App';
import * as preact from 'preact';
import render from 'preact-render-to-string';

const html = render(<App />);

console.log(
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sandbox Preact App</title>
  </head>
  <body>
    <div id="root-content">${html}</div>
    <script src="/scripts/main.bundle.js"></script>
  </body>
  </html>`
);