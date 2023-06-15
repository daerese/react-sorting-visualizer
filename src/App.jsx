import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './App.css'

// * Sorting Algorithm imports
import { insertionSort } from './utils/sorting_algorithms/insertionSort'

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
          transitionDuration: '100ms'
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


  const resetSorter = (length) => {
    setArr([...fillArray(length)])
    setSorted(false)
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
  const sort = async () => {
  
  const result = insertionSort(arr)
  const steps = result.steps
  
  const nodes = document.getElementsByClassName('node')

  for (let step of steps) {

    // * Index/style of the current node

    for (let comparison of step.comparisons) {

      let currNodeIndex = step.curr[0]

      let currNodeStyle = nodes[currNodeIndex].style
      let swapNodeStyle = nodes[comparison.index].style

      // * Highlight the current node pink
      currNodeStyle.background = 'lightpink'
      await sleep(200)


      if (comparison.swapped) {

          // * Set the swapNode color to orange
          swapNodeStyle.background = 'coral'
          await sleep(200)

          // * Swap the height (or styles) of the two nodes
          let tempHeight = currNodeStyle.height
          currNodeStyle.height = swapNodeStyle.height
          swapNodeStyle.height = tempHeight
          sleep(200)

          // * Push the current comparison to the front of the 
          // * step.curr array.
          step.curr.unshift(comparison.index)
          // console.log(`Swapped heights: (${currNodeStyle.height}, ${swapNodeStyle.height})`)
      }
    }
  }
  
  // setArr([...result.sortedArray])
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

      <button onClick={sort}>Sort</button>
    </>
  )
  
}

const StateTest = () => {
  const [count, setCount] = useState(0)

  return (

    <>
      <p>{count}</p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>increase count</button>
    </>
  )
}


function App() {


  return (
    <>
      <main>

        <h1>Sorter</h1>

        <SorterWrapper />

        <StateTest />
      </main>
    </>
  )
}


export default App
