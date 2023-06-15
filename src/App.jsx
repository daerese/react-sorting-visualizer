import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './App.css'

// * Sorting Algorithm imports
import { insertionSort } from './utils/sorting_algorithms/insertionSort'

// * utility functions
import fillArray from './utils/functions/randomArray'
import sleep from './utils/functions/sleep'
import { bubbleSort } from './utils/sorting_algorithms/bubbleSort'



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
  
  const [arr, setArr] = useState([...fillArray(10)])
  const [sorted, setSorted] = useState(false)

  const MIN_LENGTH = 10
  const MAX_LENGTH = 200

  const colors = {
    default: "lightblue",
    curr: "lightpink",
    comparison: "coral"
  }


  const resetSorter = (length=MIN_LENGTH) => {
    setArr([...fillArray(length)])

    if (sorted) {
      setSorted(false)
    }
  }
  
  // Event handlers
  const handleChange = (e) => {
    let size = e.target.value
    if (e.target.value > MAX_LENGTH) {
      size = MAX_LENGTH
    }
    else if (e.target.value < MIN_LENGTH) {
      size = MIN_LENGTH
    }

    sorted ? resetSorter(size) : setArr([...fillArray(size)])
  }

  // * Sorting algorithms (Kind of works)

  // * ---------------------------
  const basicSort = async (algorithm, speed=200) => {



    switch (algorithm) {
      case "insertion":
        algorithm = insertionSort
        break
      case "bubble":
        algorithm = bubbleSort
        break
    }
  
    const result = algorithm(arr)

    const steps = result.steps
    
    console.log(steps)

    const nodes = document.getElementsByClassName('node')

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

  console.log(nodeArr[0].props.num)

  return (
    <>
      <div 
          className="sorter-container"
          style={{
            gridTemplateColumns: `repeat(${arr.length}, 1fr)`,
            
          }}>
          {nodeArr}
      </div>
      
      <input 
        className="size-input"
        onChange={handleChange}
        placeholder='Min: 10, Max: 200'
      />

      <button onClick={() => basicSort("insertion", 500)}>Insertion Sort</button>
      <button onClick={() => basicSort("bubble", 500)}>Bubble Sort</button>
      <button onClick={() => basicSort("selection", 500)}>Selection Sort</button>
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
