

export function insertionSort(arr, stateSet) {

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