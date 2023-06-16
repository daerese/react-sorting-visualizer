import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './App.css'

// * Sorting Algorithm imports

import insertionSort from './utils/sorting_algorithms/insertionSort'
import bubbleSort from './utils/sorting_algorithms/bubbleSort'
import selectionSort from './utils/sorting_algorithms/selectionSort'

// * utility functions
import fillArray from './utils/functions/randomArray'
import sleep from './utils/functions/sleep'


const Node = (props) => {

    return (
      <div
        className="node"

        style={{
          height: props.height,
          background: `${props.sorted ? 'lightgreen' : 'lightblue'}`,
          transitionDuration: '100ms',
          textAlign: 'center',
        }}
        >
      </div>
    )
  
}


const SorterWrapper = (props) => {
  
  const [arr, setArr] = useState([...fillArray(10)]);
  const [speed, setSpeed] = useState(500);
  const [sorted, setSorted] = useState(false);

  const MIN_LENGTH = 10;
  const MAX_LENGTH = 200;

  const MIN_SPEED = 10;
  const MAX_SPEED = 1000;

  const colors = {
    default: "lightblue",
    curr: "lightpink",
    comparison: "coral"
  };

  // * Utility functions
  const resetSorter = (length=MIN_LENGTH, speed=500) => {
    setArr([...fillArray(length)])


    if (sorted) {
      setSorted(false)
    }
  };
  
  // * Event handlers
  const changeSize = (e) => {
    let size = e.target.value
    if (e.target.value > MAX_LENGTH) {
      size = MAX_LENGTH
    }
    else if (e.target.value < MIN_LENGTH) {
      size = MIN_LENGTH
    }

    sorted ? resetSorter(size, speed) : setArr([...fillArray(size)])
  }

  const changeSpeed = (e) => {
    let speed = e.target.value
    if (speed > MAX_SPEED) {
      speed = MAX_SPEED
    }
    else if (speed < MIN_SPEED) {
      speed = MIN_SPEED
    }

    sorted ? resetSorter(arr.length, speed) : setSpeed(speed)

  }

  // * Main sorting visualizer function

  // * ---------------------------
  const basicSort = async (algorithm, speed=200) => {

    let isSelection = false

    switch (algorithm) {
      case "insertion":
        algorithm = insertionSort
        break
      case "bubble":
        algorithm = bubbleSort
        break
      case "selection":
        algorithm = selectionSort
        isSelection = true
    }
  
    const result = algorithm(arr)

    const steps = result.steps
    
    console.log(steps)

    const nodes = document.getElementsByClassName('node')


    if (!isSelection) {
      // * Insertion / Bubble Sort Visual
      // **********************
      for (let step of steps) {
  
        // * Index/style of the current node
  
        for (let comparison of step.comparisons) {
  
          let currNodeIndex = step.curr[0]
  
          let currNodeStyle = nodes[currNodeIndex].style
          let swapNodeStyle = nodes[comparison.index].style
  
          // * Highlight the current node pink
          currNodeStyle.background = 'lightpink'
          await sleep(speed)
  
          // * Set the swapNode color to orange
          swapNodeStyle.background = 'coral'
          await sleep(speed)
  
  
          if (comparison.swapped) {
  
              // * Swap the height (or styles) of the two nodes
              let tempHeight = currNodeStyle.height
              currNodeStyle.height = swapNodeStyle.height
              swapNodeStyle.height = tempHeight
              sleep(speed)
  
              // * Push the current comparison to the front of the 
              // * step.curr array.
              // console.log(`Swapped heights: (${currNodeStyle.height}, ${swapNodeStyle.height})`)
            }
            step.curr.unshift(comparison.index)
        }
        for (let node of nodes) {
          node.style.background = colors.default
        }
        sleep(speed)
      }
      // **********************
    }
    else {
      // * Selection Sort Visual
      for (let step of steps) {


        // * If a new minimum value was found, 
        // * the animation will swap the new min with the origin.
        let originNodeIndex = step.origin
        let originNodeStyle = nodes[originNodeIndex].style

        // * Set the first node as the minimum (to red)
        let minNodeStyle = originNodeStyle
        minNodeStyle.background = "red"
        await sleep(speed)

        for (let comparison of step.comparisons) {

          // * get the comparison node
          let nextNodeStyle = nodes[comparison.index].style

          // * highlight red if new min, othwerwise highlight pink
          if (comparison.newMin) {
            nextNodeStyle.background = "red"
            await sleep(speed)
            minNodeStyle.background = "pink"
            minNodeStyle = nextNodeStyle;

            step.min = comparison.index
            
          }
          else {
            nextNodeStyle.background = "pink"
            await sleep(speed)
          }
        }

        // * Swap with the origin
        originNodeStyle.background = "coral"
        minNodeStyle.background = "coral"
        await sleep(speed)

        let tempHeight = originNodeStyle.height
        originNodeStyle.height = minNodeStyle.height
        minNodeStyle.height = tempHeight
        await sleep(speed)

        // * Reset the nodes
        for (let node of nodes) {
          node.style.background = colors.default
        }
      }
    }
    
    setArr([...result.sortedArray])
    setSorted(true)
}
// * ---------------------------

  const nodeArr = arr.map((num, index) => {
    
    return <Node 
    key={index}
    num={num}
    height={num}
    sorted={sorted}
    />
  })


  return (
    <>
      <div 
          className="sorter-container"
          style={{
            gridTemplateColumns: `repeat(${arr.length}, 1fr)`,
            
          }}>
          {nodeArr}
      </div>
      

      <div className='input-container'>
        <label htmlFor="size-input">Size: </label>
        <input 
          className="input size-input"
          onChange={changeSize}
          placeholder='Min: 10, Max: 200'
          name='size-input'
        />
      </div>

      <div className='input-container'>
        <label htmlFor='speed-input'>Speed: </label>
        <input 
          className="input speed-input"
          onChange={changeSpeed}
          placeholder='Min: 10ms, Max: 1000ms'
          name="speed-input"
        />
      </div>

      <button onClick={() => basicSort("insertion", speed)}>Insertion Sort</button>
      <button onClick={() => basicSort("bubble", speed)}>Bubble Sort</button>
      <button onClick={() => basicSort("selection", speed)}>Selection Sort</button>
      
      <div style={{marginTop: "1rem"}}>
        <button onClick={() => resetSorter()}>Reset</button>
      </div>

    </>
  )
  
}


function App() {


  return (
    <>
      <main>

        <h1>Sorter</h1>

        <SorterWrapper />

      </main>
    </>
  )
}


export default App
