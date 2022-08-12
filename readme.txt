
https://github.com/codemobiles/cm-react-msw-browser-demo
npx create-react-app cm-react-msw-demo --template typescript

https://mswjs.io/docs/getting-started/install
yarn add axios
yarn add msw --dev
npx msw init public/ --save

mkdir src/mocks
### src/mocks/handlers.js
touch src/mocks/handlers.js

import { rest } from "msw";
export const handlers = [
  rest.get("/feed", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(["Angular", "ReactJS", "VueJS", "Flutter"])
    );
  }),
];
----------------------------------------------------

### src/mocks/browser.js
touch src/mocks/browser.js
import { setupWorker } from "msw";
import { handlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
----------------------------------------------------

### src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(<App />, document.getElementById('root'))
----------------------------------------------------

### Run and test
yarn start and verify in console
[MSW] Mocking enabled


### App.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
type Props = {};

export default function App({}: Props) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await axios("/feed");
    setData(response.data);
  };

  return <div>{JSON.stringify(data)}</div>;
}
----------------------------------------------------