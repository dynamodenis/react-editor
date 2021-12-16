import React, { useEffect, useRef } from 'react'
import './preview.css'

// Create interface
interface PreviewProps{
    code:string,
    err:string
}

  // get the code and wrap inside script tag to be executed on the iframe
const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>

          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red;"><h4>Runtime Error: </h4>' + err + '</div>'
            throw err;
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);            
          }, false);

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              handleError(err)
            }
            
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const iframe = useRef<any>();

    // reset the iFrame after every code
    useEffect(() => {
        iframe.current.srcdoc = html;
        // check for changes in element
        setTimeout(() => {
          iframe.current.contentWindow.postMessage(code, "*");
        },100)
    }, [code])
    
    return (
        <div className="preview-wrapper">
            <iframe  ref={iframe} srcDoc={html} title="preview" sandbox="allow-scripts"/>
            {/* Show some bundle error */}
            {err && <div className='preview-error'>{err}</div>}
        </div>
    )
}

export default Preview
