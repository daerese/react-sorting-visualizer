import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './App.css'

// * Sorting Algorithm imports
import { insertionSort, insertionBubbleAnim} from './utils/sorting_algorithms/insertionSort'
import bubbleSort from './utils/sorting_algorithms/bubbleSort'
import { selectionSort, selectionAnim } from './utils/sorting_algorithms/selectionSort'
import MergeSort from './utils/sorting_algorithms/mergeSort'
import QuickSort from './utils/sorting_algorithms/quickSort'

// * utility functions
import fillArray from './utils/functions/randomArray'
// import sleep from './utils/functions/sleep'
import sleepMain from './utils/functions/sleep'

// * Tone.js import + notes
import * as Tone from 'tone'
import songs from './utils/Music/songs'

// * Font awesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Node = (props) => {

  useEffect(() => {
    // console.log("Node change")
  })

    return (
      <div
        className="node"

        style={{
          height: props.height,
          background: `${props.sorted ? 'lightgreen' : 'lightblue'}`,
          transitionDuration: '20ms',
          textAlign: 'center',
        }}
        >
      </div>
    )
  
}


const SorterWrapper = (props) => {
  
  const [speed, setSpeed] = useState(500);
  const [size, setSize] = useState(10)
  const [arr, setArr] = useState([...fillArray(size)]);
  const [sorted, setSorted] = useState(false);

  // * Color names for each theme:
  // *** Default/Unsorted -- Blue
  // *** Loop -- Pink
  // *** Target -- Orange
  // *** Special target -- Red
  // *** Loop Swap -- Orange
  // *** Special Swap -- Red
  const colors = {
    default: "lightblue",
    curr: "lightpink",
    comparison: "coral"
  };

  // * Utility functions
  const resetSorter = () => {
    // setArr([...fillArray(length)])

    setArr([...fillArray(size)])
    setSpeed(speed)


    if (sorted) {
      setSorted(false)
    }
  };
  
  // * Event handlers
  const changeSize = (e) => {
    let tempSize = e.target.value

    setSize(tempSize)
    sorted ? resetSorter(tempSize, speed) : setArr([...fillArray(tempSize)])
  }

  const changeSpeed = (e) => {
    let speed = e.target.value
    
    sorted ? resetSorter(arr.length, speed) : setSpeed(speed)

  }

  // * Main sorting visualizer function

  // * ---------------------------
  const basicSort = async (algorithm, speed) => {

    let isSelection = false
    let isAdvanced = false

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
        break
      case "merge":
        algorithm = new MergeSort()
        isAdvanced = true
        break
      case "quick":
        algorithm = new QuickSort()
        isAdvanced = true
        break
    }

    const result = isAdvanced ? algorithm.getResult(arr) : algorithm(arr)

    const steps = result.steps
    
    // console.log("STEPS: ", steps)

    const nodes = document.getElementsByClassName('node')

    if (!isSelection && !isAdvanced) {
      // * Insertion / Bubble Sort Visual
      // **********************
      await insertionBubbleAnim(steps, speed, nodes, colors)
      // **********************
    }
    else if (isAdvanced) {
      await algorithm.getAnimation(speed, nodes, colors, setArr)
    }
    else {
      // * Selection Sort Visual
      await selectionAnim(steps, speed, nodes, colors)
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

      <div className='wrapper'>

        <main>
        {/* Show the name of the current algorithm here... */}
          <h1>Sorting Visualizer</h1>
          <div 
              className="sorter-container"
              style={{
                gridTemplateColumns: `repeat(${arr.length}, 1fr)`,
                
              }}>
              {nodeArr}
          </div>

        </main>
        
        
        <aside className='sidenav'>

          <div className='input-container'>
            <label htmlFor="size-input">Size: </label>
            <input 
              className="input size-input slider"
              onChange={changeSize}
              name='size-input'
              type="range"
              min="10"
              value={size}
              max="200"
              step="10"
            />
          </div>

          <div className='input-container'>
            <label htmlFor='speed-input'>Speed: </label>
            <input 
              className="input speed-input slider"
              onChange={changeSpeed}
              placeholder='Min: 10ms, Max: 1000ms'
              name="speed-input"
              type='range'
              min='10'
              value={speed}
              max='310'
              step="20"
            />
          </div>
          
          <div className='btns-algo-container'>
            <button className='btn-algo' onClick={() => basicSort("insertion", speed)}>Insertion Sort</button>
            <button className='btn-algo' onClick={() => basicSort("bubble", speed)}>Bubble Sort</button>
            <button className='btn-algo' onClick={() => basicSort("selection", speed)}>Selection Sort</button>

            <button className='btn-algo' onClick={() => basicSort("merge", speed)}>Merge Sort</button>
            <button className='btn-algo' onClick={() => basicSort("quick", speed)}>Quick Sort</button>
          </div>
          
          <div>
            <button className="btn btn-reset" onClick={() => resetSorter()}>Reset</button>
          </div>

          <a className='btn-link' href='https://github.com/daerese'>
            <span><FontAwesomeIcon icon={faGithub} /></span>Daerese
          </a>

        </aside>
        

      </div>
      


    </>
  )
  
}

const SoundTest = () => {
  // const sampler = new Tone.Sampler({
  //   urls: {
  //     C3: "/src/assets/c3-95007.mp3",
  //   },
  //   // onload: () => {
  //   //   sampler.triggerAttackRelease(["A1"], 1);
  //   // }
  // }).toDestination();

  const sampler = new Tone.Synth().toDestination();

  const playSound = () => {

    sampler.triggerAttackRelease("C4", "8n")
    // sampler.triggerAttackRelease("G4", "8n")
  }

  return (
    <button onClick={() => playSound()}>Play a sound...</button>
  )
}


function App() {


  return (
    <>
        <SorterWrapper />
    </>
  )
}


export default App
