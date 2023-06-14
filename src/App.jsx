import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import './App.css'

import { insertionSort } from './utils/sorting_algorithms/insertionSort'
import fillArray from './utils/functions/randomArray'


const Node = (props) => {

    // pos === position
    // const [pos, setPos] = useState(props.pos);

    const [current, setCurrent] = useState(props.current)
    const [sorted, setSorted] = useState(false)
    
    return (
      <div
        className="node"
        style={{
          height: props.height,
          background: current ? 'red' : 'lightblue'
      }}>
      </div>
    )
  
}

const SorterWrapper = (props) => {
  
  // const [size, setSize] = useState(10);
  const [arr, setArr] = useState([...fillArray(10)])
  

  // * This is called every time we input a new array size
  // useEffect(() => {
  //   if (size < 10) {
  //     setSize(10)
  //   }
  // }, [size])

  // const randomArr = fillArray(size);

  // Event handlers
  const handleChange = (e) => {
    let size = e.target.value
    if (e.target.value > 200) {
      size = 200
    }
    else if (e.target.value < 10) {
      size = 10
    }
    console.log("input changed")
    // setSize(e.target.value)
    setArr([...fillArray(size)])
  }


  const nodeArr = arr.map((num, index) => {
    
    return <Node 
    key={index}
    num={num}
    pos={index}
    height={num}
    current={false}
    />
  })

  console.log(nodeArr[0].props.num)

  return (
    <>
      {/* <Sorter 
        size={size}
        // arr={randomArr}
      /> */}
      <div 
          className="sorter-container"
          style={{
            gridTemplateColumns: `repeat(${arr.length}, 1fr)`,
            
          }}>
          {nodeArr}
      </div>
      {/* <button onClick={() => sort(insertionSort, unsortedArr)}>Sort</button> */}
      
      <input 
        className="size-input"
        onChange={handleChange}
        placeholder='Min: 10, Max: 200'
      />

      <button onClick={() => setArr(prevArr => {
        
        const result = insertionSort(prevArr)

        console.log(result.steps)
        return [...result.sortedArray]
        })}>Sort</button>
      {/* <button onClick={() => insertionSort(arr, setArr, nodeArr)}>Sort</button> */}
    </>
  )

  
}

// const Sorter = (props) => {

//   const [unsortedArr, setUnsortedArr] = useState()

//   const sort = (sortAlgo, arr) => {

//     /**
//      * @param {Function} sort --- The sorting algorithm to be used
//      * @param {Array} arr --- The array to be sorted.
//      */

//     setUnsortedArr(sortAlgo(arr))

//   }


//   // * Create the Node Components from the random array. 
  // const nodeArr = unsortedArr.map((num, index) => {
    
  //   return <Node 
  //   key={index}
  //   num={num}
  //   pos={index}
  //   height={num}
  //   current={false}
  //   />
  // })

//   return (
//     <>
//       <div 
//           className="sorter-container"
//           style={{
//             gridTemplateColumns: `repeat(${props.size}, 1fr)`,
            
//           }}>
//           {nodeArr}
//       </div>
//       {/* <button onClick={() => sort(insertionSort, unsortedArr)}>Sort</button> */}
//       <button onClick={() => setUnsortedArr(insertionSort(unsortedArr))}>Sort</button>
//     </>
//   )
// }

// const Sorter = forwardRef((props, ref) => {



//   const [unsortedArr, setUnsortedArr] = useState(props.arr)


//   useImperativeHandle(ref, () => ({
//     sort(sortAlgo=insertionSort, arr=unsortedArr) {

//       /**
//        * @param {Function} sort --- The sorting algorithm to be used
//        * @param {Array} arr --- The array to be sorted.
//        */

//       setUnsortedArr(sortAlgo(arr))
//       console.log("Function called from parent")
  
//     }

//   }))

//   const nodeArr = props.arr.map((num, index) => {
//     return <Node 
//     key={index}
//     num={num}
//     pos={index}
//     height={num}
//     current={false}
//     />
//   })

//   return (
//     <div 
//         className="sorter-container"
//         style={{
//           gridTemplateColumns: `repeat(${props.size}, 1fr)`,
          
//         }}>
//         {nodeArr}
//       </div>
//   )




// })
// Sorter.displayName = 'Sorter'

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
