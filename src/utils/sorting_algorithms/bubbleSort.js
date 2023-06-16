export default function bubbleSort(arr)  {

    const steps = []
    
    const swap = (arr, i, j) => {

        let temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp

    }

    // * Start an outer loop from the top of the array
    for (let i = arr.length - 1; i >= 0; i--) {

        let currStep = {
            curr: [],
            comparisons: []
        }
        currStep.curr.push(0)
        // * If we iterate through a loop with no swaps,
        // * then the array is sorted and we can break.
        let noSwaps = true
        for (let j = 0; j < i; j++) {

            
            let currComparison = {
                index: j + 1,
                swapped: false
            }

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)

                currComparison.swapped = true
                noSwaps = false
            }

            currStep.comparisons.push(currComparison)

        }
        steps.push(currStep)
        if (noSwaps) {
            break
        }
    }
    return {sortedArray: arr, steps: steps}

}