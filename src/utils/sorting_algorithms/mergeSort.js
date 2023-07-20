import sleep from '../functions/sleep'

class MergeSort {
    constructor(options) {
        this.steps = []
        this.arr = []
    }

    merge(arrA, arrB, leftIndexArr, rightIndexArr) {

        let result = []
        let i = 0
        let j = 0

        let start = leftIndexArr[0].index

        let currStep = {}

        // * For highlighting the range of values being focused on.
        currStep.range = [leftIndexArr[0].index, 
                          rightIndexArr[rightIndexArr.length - 1].index]

        let currMerge = []

        while (i < arrA.length && j < arrB.length) {


            const step = {
                pushPoint: start,
                left: leftIndexArr[i].index,
                right: rightIndexArr[j].index,
                target: 0,
                change: false
            }

            if (arrA[i] < arrB[j]) {
                result.push(arrA[i])

                step.target = step.left
                i++
            }
            else {
                result.push(arrB[j])
                step.target = step.right
                j++

                step.change = true
            }

            start++

            currMerge.push(step)
        }

        currStep.currMerge = currMerge

        while (i < arrA.length) {

            result.push(arrA[i])
            i++
            
        }

        while (j < arrB.length) {

            result.push(arrB[j])
            j++
   
        }

        this.steps.push(currStep)

        return [...result, ...arrA.slice(i), ...arrB.slice(j)]

    }

    mergeSort(arr, indexArr) {
        let steps = []

        if (arr.length <= 1) {
            return arr
        }

        let mid = Math.floor(arr.length / 2)

        let left = arr.slice(0, mid)
        let right = arr.slice(mid)

        let leftIndexArr = indexArr.slice(0, mid)
        let rightIndexArr = indexArr.slice(mid)

        left = this.mergeSort(left, leftIndexArr)
        right = this.mergeSort(right, rightIndexArr)

        // console.log("LEFT: ", left, " RIGHT: ", right)
        // console.log("Left indices: ", leftIndexArr, " Right indices: ", rightIndexArr)

        // * The left and right array should already be sorted...
        return this.merge(left, right, leftIndexArr, rightIndexArr)
    }

    async mergeSortAnim(speed, nodes, colors, setState) {

        // * Helper function to highlight the current nodes being sorted
        const highlight = (start, end) => {

            for (let i = start; i <= end; i++) {

                let nodeStyle = nodes[i].style

                nodeStyle.background = "lightpink"

            }

        }


        for (let step of this.steps) {
            // * 1. Highlight the current range of nodes
            highlight(step.range[0], step.range[1])
            await sleep(speed)

            // * 2. Intiate a loop through the current merge steps.
            for (let mergeStep of step.currMerge) {

                console.log("Current step: ", mergeStep)
                

                const leftStyle = nodes[mergeStep.left].style
                const rightStyle = nodes[mergeStep.right].style

                leftStyle.background = "coral"
                rightStyle.background = "coral"
                await sleep(speed)

                if (mergeStep.change) {

                    leftStyle.background = "red"
                    rightStyle.background = "red"

                    // * Target acquired
                    // * Pop the target, and place it before the push point.
                    const targetIndex = mergeStep.target

                    // * Get the index that the target needs to be placed in
                    const pushIndex = mergeStep.pushPoint

                    // * Get the value that needs to be moved
                    // * Then prepare to put it in the correct spot by
                    // * removing it from the original array
                    const targetValue = this.arr[targetIndex]
                    this.arr.splice(targetIndex, 1)
                    console.log("Target value: ", targetValue)


                   
                    this.arr = [
                        ...this.arr.slice(0, pushIndex),
                        targetValue,
                        ...this.arr.slice(pushIndex)
                    ]

                    setState(this.arr)

                    await sleep(speed)

                }

                highlight(step.range[0], step.range[1])
                await sleep(speed)

            }

            // * Reset all the node colors and move to the next step
            for (let node of nodes) {
                node.style.background = colors.default
            }
            await sleep(speed)
        }

    }

    getMergeSort(arr) {
        this.steps = []
        this.arr = arr


        const indexArr = []
        for (let i = 0; i < arr.length; i++) {
            indexArr.push({
                value: arr[i],
                index: i
            })
        }

        // console.log(indexArr)
    
        let result = this.mergeSort(arr, indexArr)
    
        // console.log("INSIDE MERGE SORT: ", result)
    
        return {sortedArray: result, steps: this.steps}
    }



}

const merge = (arrA, arrB, origin) => {

    let result = []
    let i = 0
    let j = 0



    let leftOrigin = origin.left
    let rightOrigin = origin.right

    

    while (i < arrA.length && j < arrB.length) {

        if (arrA[i] < arrB[j]) {
            result.push(arrA[i])
            i++
        }
        else {
            result.push(arrB[j])
            j++
        }
    }


    while (i < arrA.length) {
        result.push(arrA[i])
        i++
    }

    while (j < arrB.length) {
        result.push(arrB[j])
        j++
    }

    return [...result, ...arrA.slice(i), ...arrB.slice(j)]

}

const mergeSort = (arr, originIndices=null) => {

    let steps = []

    if (arr.length <= 1) {
        return arr
    }

    let mid = Math.floor(arr.length / 2)

    let left = arr.slice(0, mid)

    let right = arr.slice(mid)

    let origin = {}

    // * Origin will keep track of the indexes of the 
    // * original array for the animations. 
    // * THe left and right origin holds the start and end indices
    // * in an array. 
    if (!originIndices) {
        origin.left = [0, mid]
        origin.right = [mid, arr.length - 1]
    } else {

        let originMid = Math.floor(originIndices[1] / 2)
        origin.left = [originIndices[0], originMid]
        origin.right = [originMid, originIndices[1]]
    }


    left = mergeSort(left, origin.left)
    right = mergeSort(right, origin.right)

    // console.log("LEFT: ", left, " RIGHT: ", right)

    // * The left and right array should already be sorted...
    return merge(left, right, origin)
}

const getMergeSort = (arr) => {

    let steps = []

    console.log("ORIGINAL: ", arr)

    let result = mergeSort(arr)

    // console.log("INSIDE MERGE SORT: ", result)

    return {sortedArray: result, steps: steps}
}

export {getMergeSort, MergeSort}