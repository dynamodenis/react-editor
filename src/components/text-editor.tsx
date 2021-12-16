import './text-editor.css'
import React, {useState, useEffect, useRef} from 'react'
import MDEditor from '@uiw/react-md-editor';


const TextEditor:React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState("**Please edit here!!!**")
    const [editing, setEditing] = useState(false)

    // turn off editor
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // close editor only when clicked outside the editor
            if(ref.current && event.target && ref.current.contains(event.target as Node)) return;
            setEditing(false)
        }

        document.addEventListener("click", listener, {capture: true})

        // clean up
        return () => {
            document.removeEventListener("click", listener, {capture: true})
        }
    },[])

    if(editing){
        return (
            <div className='text-editor' ref={ref}><MDEditor value={value} onChange={(value = '') => setValue(value)}/></div>
        )
    }
    return (
        <div className='text-editor card' onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )
}

export default TextEditor
