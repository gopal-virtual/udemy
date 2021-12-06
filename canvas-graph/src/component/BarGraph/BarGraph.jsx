import React from 'react'
import PropTypes from 'prop-types'
import BarGraphCanvas from './BarGraphCanvas'

function BarGraph(){
    const canvasRef = React.useRef(null)
    React.useEffect(()=>{
        if(canvasRef && canvasRef.current){
            const canvas = new BarGraphCanvas(canvasRef.current, 100, 100);
            canvas.render();
        }
    },[canvasRef])
    return <>
        <div>
        Bar Graph
        </div>
        <canvas ref={canvasRef}></canvas>
    </>
}

BarGraph.propTypes = {}

export default BarGraph