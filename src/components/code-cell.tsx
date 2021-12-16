import { useState, useEffect } from "react";
import bundler from "../bundler";
import CodeEditor from "./monaco-editor";
import Preview from "./preview";
import Resizable from "./resizable";
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Check when input changes and run after 1 second of stop typing
  useEffect(() => {
    const timer = setTimeout( async () => {
      // build the poject
      const result = await bundler(input);
      setCode(result.code);
      setError(result.err)
    },1000)

    // clear timer
    return () => {
      clearTimeout(timer);
    }
  },[input])



  return (
    <Resizable direction="vertical">
      <div style={{height:'100%', display:"flex", flexDirection:"row"}}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const root = document.querySelector('#root'); '// Write your code here...'" onChange={value => setInput(value)} />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} err={error}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;
