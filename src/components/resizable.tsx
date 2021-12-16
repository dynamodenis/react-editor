import React, {useEffect, useState} from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css'

interface ResizableProps{
    direction:"vertical"| "horizontal"
}

const Resizable:React.FC<ResizableProps> = ({direction, children}) => {
    const [innerHeight, setInnerHeigt] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.8);

    useEffect(() => {
        let timer: any;

        const listener = () => {
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                // set the inner height when the browser is resized
                setInnerHeigt(window.innerHeight);
                // update width too
                setInnerWidth(window.innerWidth);
                // update resizable width
                if(window.innerWidth * 0.8 < width){
                    setWidth(window.innerWidth * 0.8)
                }
            }, 100)

        }

        window.addEventListener("resize", listener);

        // clean up the event listener after
        return (() => {
            window.removeEventListener("resize", listener);
        })
    },[])
    // check if horiontall  or vertical
    let resizableProps: ResizableBoxProps;
    if(direction ===  "horizontal"){
        resizableProps = {
            className:"resize-horizontal",
            width:width, 
            height:Infinity,
            resizeHandles:['e'],
            maxConstraints:[innerWidth * 0.8, Infinity],
            minConstraints:[innerWidth * 0.2, Infinity],
            onResizeStop:(event, data) =>{
                setWidth(data.size.width)
            }
        }
    } else {
        resizableProps = {
            width:Infinity, 
            height:300,
            resizeHandles:['s'],
            maxConstraints:[Infinity, innerHeight * 0.9],
            minConstraints:[Infinity, 50],
        }
    }
    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )
}

export default Resizable
