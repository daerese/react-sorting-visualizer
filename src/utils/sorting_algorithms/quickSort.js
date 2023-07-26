import sleep from '../functions/sleep'

class QuickSort {

    constructor() {
        this.steps = []
        this.arr = []
    }

    swap(arr, i, j) {
        // * Swaps two indexes in the array
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
    }

    pivot(arr, start=0, end=arr.length) {

        // * 1. select the pivot.
        // * 2. Set the index of the swap point
        // * 3. Loop through the array after the pivot
        // *    3a. If a value smaller than the pivot is found, 
        // *        increment the swap point, then swap the smaller value
        // *        into the swap point
        // * 4. After the loop is finished, swap the pivot with the swap point


        const swap = (arr, i, j) => {
            // * Swaps two indexes in the array
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        } 

        const pivot = start
        let swapIdx = start


        // * currPartition will be used to store the current step for
        // * the animation later.
        const currPartition = {
            pivot: pivot,
            values: [],
            finalSwap: 0
        }

        for (let i = start + 1; i <= end; i++) {


            let swapped = false

            if (arr[i] < arr[pivot]) {

                swapped = true
                swapIdx++

                swap(arr, swapIdx, i)
            }

            const step = {
                index: i,
                swapIdx: swapIdx,
                swapped: swapped
            }

            currPartition.values.push(step)

        }

        currPartition.finalSwap = swapIdx
        this.steps.push(currPartition)

        swap(arr, pivot, swapIdx)

        // * The swap index is the final position of the pivot,
        // * Return that index
        return swapIdx

    }

    quickSort(arr, left=0, right=arr.length - 1) {

        if (left < right) {


            const pivot = this.pivot(arr, left, right)
    
            this.quickSort(arr, left, pivot - 1)
            this.quickSort(arr, pivot + 1, right)
        }

    }

    async getAnimation(speed, nodes, colors, setState) {

        // * Helper function to highlight the current nodes being sorted
        const highlight = (start, end) => {

            for (let i = start; i <= end; i++) {

                let nodeStyle = nodes[i].style

                nodeStyle.background = "lightpink"

            }

        }

        const resetHighlight = () => {
            for (let node of nodes) {
                node.style.background = colors.default
            }
        }

        for (let step of this.steps) {

            // * 1. Highlight the pivot red

            // * 2. Start looping and highlighting other values pink
            
                // * 2a. Highlight each swap orange

                // * 2b. Swap the values in the auxiliary array

                // * 2c. Set the state of the on-screen array
            
            // * 3. Highlight the final swap green

            // * 4. Set the state of the on-screen array
            

            const pivotStyle = nodes[step.pivot].style
            const finalSwapStyle = nodes[step.finalSwap].style

            pivotStyle.background = "red"

            await sleep(speed)


            for (let value of step.values) {

                const indexStyle = nodes[value.index].style

                indexStyle.background = "lightpink"
                await sleep(speed)

                if (value.swapped) {

                    const swapStyle = nodes[value.swapIdx].style

                    indexStyle.background = "coral"
                    swapStyle.background = "green"

                    await sleep(speed)

                    this.swap(this.arr, value.index, value.swapIdx)
                    
                    setState([...this.arr])

                    await sleep(speed)

                    highlight(step.pivot + 1, value.index)

                    await sleep(speed)

                }

            }

            pivotStyle.background = "lightgreen"
            finalSwapStyle.background = "lightgreen"

            await sleep(speed)

            this.swap(this.arr, step.pivot, step.finalSwap)
            setState([...this.arr])
            await sleep(speed)

            resetHighlight()
            await sleep(speed)

        }

    }

    getResult(arr) {

        this.steps = []

        // * this.arr will be used to animate the algorithm later.
        // * We don't want it to directly refrence the original array. Why?
        // * Because changing the original array will also change this.arr.
        // * Slice returns a whole new array. Now both arrays reference different
        // * places in memory, so changing one doesn't affect the other.
        this.arr = arr.slice(0)



        this.quickSort(arr)

        return {sortedArray: arr, steps: this.steps}

    }

}

export default QuickSort