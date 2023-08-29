import { useState, useLayoutEffect, useRef} from 'react';
import Editor from '@monaco-editor/react';
import {ReactSketchCanvas} from 'react-sketch-canvas';
import './App.css';


const App = () => {
  const sketchCanvasRef = useRef(null);

  const [eraseMode, setEraseMode] = useState(false);
  
  const clearCanvas = () => {
    if(sketchCanvasRef.current){
      sketchCanvasRef.current.clearCanvas();
    }
  }

  const toggleEraseMode = () => {
    setEraseMode(prevMode => !prevMode);
    };


  return (
    <div className="App">
      <div className="header">
        <h1>Codespace</h1>
      </div>
      <div className="canvas-editor">
        <button className="canvas" onClick={clearCanvas}>CLEAR</button>
        <button className="canvas" onClick={toggleEraseMode}>{eraseMode ? 'Draw' : 'Erase'}</button>
        
      </div>
      <div className = "outer-containter">
        <div className = "centered-cs">
          <Editor className="editor"
              height = "400px"
              width ="600px"
              theme="vs-dark"
              defaultLanguage="python"
            />
        </div>
        </div>
        <ReactSketchCanvas
          ref={sketchCanvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          strokeWidth={4}
          strokeColor={eraseMode ? 'white' : 'black'}
          readOnly={eraseMode}
        />
    </div>
    );

};

export default App
