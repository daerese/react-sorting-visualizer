export default function selectionSort(arr) {

    const swap = (arr, i, j) => {

        let temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp

    }

    const steps = []

    for (let i = 0; i < arr.length; i++) {

        let currStep = {
            origin: i,
            mins: i,
            comparisons: []
        }

        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {

            let currComparison = {
                index: j,
                newMin: false
            }

            if (arr[j] < arr[minIndex]) {
                minIndex = j
                currComparison.newMin = true
            }

            currStep.comparisons.push(currComparison)
        }
        if(minIndex !== i) {
            swap(arr, i, minIndex)
        }

        steps.push(currStep)

    }

    return {sortedArray: arr, steps: steps}
}