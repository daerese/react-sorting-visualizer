import { useState, useEffect } from 'react'

import './App.css'

const Bar = (props) => {

    // pos === position
    const [pos, setPos] = useState(props.pos);
    
    return (
      <div
        className="bar"
        style={{
          height: props.height
      }}>
        {/* <p>{props.num}</p> */}
      </div>
    )
  
}

const Sorter = (props) => {
  
  const [size, setSize] = useState(props.size);

  // The numbers should be between 5 and 600.
  const randomInterval = (min=5, max=601) => {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

  // The random numbers have to have at least 10 values.
  const fillArray = (size=10) => {
    const arr = []

    for(let i = 0; i < size; i++) {
      arr.push(randomInterval())
    }
    return arr;
  }

  const randomArr = fillArray(props.size);
  
  return (
    <div 
      className="sorter-container"
      style={{
        gridTemplateColumns: `repeat(${props.size}, 1fr)`
      }}>
      {
        randomArr.map((num, index) => {
          return <Bar 
            key={index}
            num={num}
            pos={num}
            height={num}
            />
        })
      }

      <div className="bar"></div>
    </div>
  )

  
}

function App() {


  return (
    <>
      <main>

        <h1>Sorter</h1>

        <Sorter 
          size={25}
          />

      </main>
    </>
  )
}


export default App
