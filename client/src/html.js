import serialize from 'serialize-javascript'

export default ({ title, body, helmet, store }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>${title}</title>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.12.1/css/all.css"
        integrity="sha384-TxKWSXbsweFt0o2WqfkfJRRNVaPdzXJ/YLqgStggBVRREXkwU7OKz+xXtqOU4u8+"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href="main.css" media="screen" />
    </head>
    <body>
      <div id="cryptodock">${body}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.getState())}
      </script>
    </body>
    <script src="client.js"></script>
  </html>
`
