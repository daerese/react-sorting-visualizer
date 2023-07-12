import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './App.css'

// * Sorting Algorithm imports
import { insertionSort, insertionSortAnim} from './utils/sorting_algorithms/insertionSort'
import bubbleSort from './utils/sorting_algorithms/bubbleSort'
import { selectionSort, selectionSortAnim } from './utils/sorting_algorithms/selectionSort'
import { getMergeSort, MergeSort } from './utils/sorting_algorithms/mergeSort'


// * utility functions
import fillArray from './utils/functions/randomArray'
// import sleep from './utils/functions/sleep'
import sleepMain from './utils/functions/sleep'

// * Tone.js import + notes
import * as Tone from 'tone'
import songs from './utils/Music/songs'


const Node = (props) => {

  useEffect(() => {
    console.log("Node change")
  })

    return (
      <div
        className="node"

        style={{
          height: props.height,
          background: `${props.sorted ? 'lightgreen' : 'lightblue'}`,
          transitionDuration: '75ms',
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

  // * Local sleep with music
  // function sleep(ms, sampler=null, notes=null, noteIndex=0) {

  //   if (noteIndex >= notes.length) {
  //     noteIndex = 0
  //   }

  //   if (sampler && notes) {

  //       Tone.loaded().then(() => {
  //           // * In case the current note is a chord, just destrecture
  //           // * the chord array into this array.
  //           sampler.triggerAttackRelease(notes[noteIndex]);
  //           console.log(notes[noteIndex])
  //       })
  //       // sampler.triggerAttackRelease(...notes[noteIndex], "8n")
  //   }

  //   // console.log(...notes[noteIndex])

  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
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
    let isMerge = false

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
        isMerge = true
        break
    }

    // * Sound Effect intialization with Tone.js
    const sampler = new Tone.Sampler({
      urls: {
        C3: "/src/assets/c3-95007.mp3",
      },
      // onload: () => {
      //   sampler.triggerAttackRelease(["A1"], 1);
      // }
    }).toDestination();

    // sampler.volume.value = -10
    // const sampler = new Tone.Synth().toDestination();
    const notes = songs.twinkle
    let noteIndex = 0

    // console.log("ORIGINAL ARRAY: ", arr)
    // const result = algorithm(arr)
    // const result = algorithm.getMergeSort(arr)

    const result = isMerge ? algorithm.getMergeSort(arr) : algorithm(arr)

    const steps = result.steps
    
    console.log("STEPS: ", steps)

    const nodes = document.getElementsByClassName('node')

    


    if (!isSelection && !isMerge) {
      // * Insertion / Bubble Sort Visual
      // **********************
      await insertionSortAnim(steps, speed, nodes, colors)
      // **********************
    }
    else if (isMerge) {
      await algorithm.mergeSortAnim(speed, nodes, colors, setArr)
      console.log("Do merge...")
    }
    else {
      // * Selection Sort Visual
      await selectionSortAnim(steps, speed, nodes, colors)
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

      <button onClick={() => basicSort("merge", speed)}>Merge Sort</button>
      
      <div style={{marginTop: "1rem"}}>
        <button onClick={() => resetSorter()}>Reset</button>
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
      <main>

        <h1>Sorter</h1>

        <SorterWrapper />

        <SoundTest />

      </main>
    </>
  )
}


export default App
