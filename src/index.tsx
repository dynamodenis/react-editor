import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm', // You can load from file
      // wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm' // or npm
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    // reset the iframe evetytime you run
    iframe.current.srcdoc = html;

    // build the poject
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write:false,
      plugins:[
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define:{
        'process.env.NODE_ENV': '"production"',
        global:"window"
      }
    });

    // check for changes in element
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  // get the code and wrap inside script tag to be executed on the iframe
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color:red;"><h4>Runtime Error: </h4>' + err + '</div>'

              throw err;
            }
            
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframe} srcDoc={html} title="preview" sandbox="allow-scripts"></iframe>

    </div>
  );
};


ReactDOM.render(<App />, document.querySelector('#root'));

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
)