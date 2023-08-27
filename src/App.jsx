import { useState, useLayoutEffect} from 'react';
import Editor from '@monaco-editor/react';
import rough from 'roughjs/bundled/rough.esm';
import './App.css';

const generator = rough.generator();
function createElement(x1,y1,x2,y2){
  const roughElement = generator.line(x1,y1,x2,y2);
  return {x1,y1,x2,y2, roughElement};
}
const App = () => {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);


  useLayoutEffect(()=>{
    const canvas =document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({roughElement}) => roughCanvas.draw(roughElement));



    

  }, [elements]);
  const handleMouseDown = (event)=>{
    setDrawing(true);

    const element = createElement(clientX,clientY, clientX,clientY);
    setElements(prevState => [...prevState, element]);
  };
  const handleMouseMove = (event)=>{
    if(!drawing) return;
    const {clientX,clientY} = event;
    const index = elements.length - 1;
    const{x1, y1} = elements[index];
    const updatedElement = createElement(x1,y1,clientX,clientY)

    const elementsCopy = [...elements];    
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);

    console.log(clientX,clientY);
  };
  const handleMouseUp = () => { 
      setDrawing(false);
  };
  return (
    <div className="App">
      <div className="header">
        <h1>Codespace</h1>
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
        <canvas 
          id="canvas" 
          width={window.innerWidth} 
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          >
            Canvas
          </canvas>
    </div>
    );

};

export default App
