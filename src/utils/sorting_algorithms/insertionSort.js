import sleep from '../functions/sleep'

export function insertionSort(arr) {

  // * Stores the steps taken to sort the array 
  // * This will be used for animating the algorithm
  const steps = []

    if (arr.length > 1) {

      for (let i = 1; i < arr.length; i++) {

        // * Highlight the current number

          let curr = arr[i]

          let currStep = {
            curr: [],
            comparisons: []
          }
          currStep.curr.push(i)
          // console.log(curr)
          for (let j = i - 1; j >= 0; j--) {

            let currComparison = {
              index: j,
              swapped: false
            }            
            // * Highlight the compared number (arr[j])
              if (arr[j] > curr) {

                arr[j + 1] = arr[j]
                arr[j] = curr
                currComparison.swapped = true
              }
              // comparisons.push(currComparison)
              else {
                currStep.comparisons.push(currComparison)
                break
              }
              currStep.comparisons.push(currComparison)
          }
          steps.push(currStep)
      }
    }

    return {sortedArray: arr, steps: steps}

  }


export async function insertionSortAnim(steps, speed, nodes, colors) {

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
            
            // * Push the current comparison to the front of the 
            // * step.curr array.
            // console.log(`Swapped heights: (${currNodeStyle.height}, ${swapNodeStyle.height})`)
            // await sleep(speed, sampler, notes, noteIndex++)
          }
          step.curr.unshift(comparison.index)
      }
      for (let node of nodes) {
        node.style.background = colors.default
      }
      await sleep(speed)
    }
    // **********************
}