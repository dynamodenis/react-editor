import MonacoEditor from "@monaco-editor/react";
import React,{useRef} from "react";
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './monaco-editor.css'

interface CodeEditorProps {
    initialValue: string,
    onChange(value: string): void
}

const CodeEditor:React.FC<CodeEditorProps> = ({onChange,initialValue}) => {
    const editorValue:any = useRef();
    const onEditorDidMount = (value: any, event:any) => {
        // get the code in the editor pass the value to onChange function in index.tsx
        editorValue.current = value;
        // console.log(value)
        onChange(editorValue.current);
    }
    // format code using prettier
    const onFormatClick = () => {
        // Get the current code
        const unformated:any = editorValue.current;
        //Format the code
        const formated:any = prettier.format(unformated,{
            parser:"babel",
            plugins:[parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, "")
        
        // set formated code back 
        editorValue.current = formated;
    }
  return (
      <div className="editor-wrapper">
            <button onClick={onFormatClick} className="button button-format is-primary is-small">Format</button>
            <MonacoEditor 
                onChange = {onEditorDidMount}
                value={initialValue}
                theme="vs-dark" 
                language="javascript" 
                height="100%" 
                options={{
                    wordWrap: "on", 
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars:3,
                    fontSize:16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }} 
            />;
      </div>
  )
};

export default CodeEditor;
