# Usage

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Go to localhost:3000/mjml/:template?templateParam=templateValue

## How to add templates

All of the files except for index.js in the templates folder will be ignored by git.

To add a new template:
1. create a `.js` file that exports a function that should return an mjml template
2. the exported function is passed all query params as an object
Example: template-name.js
```
module.exports = function(data) {
  return `<mjml>
    <mj-head>
    </mj-head>

    <mj-body>
        ${data["query-param"]}
    </mj-body>
</mjml>`;
}
```