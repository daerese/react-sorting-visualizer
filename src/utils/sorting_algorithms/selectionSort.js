import sleep from '../functions/sleep';

export function selectionSort(arr) {

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

export async function selectionSortAnim(steps, speed, nodes, colors) {

    // * Selection Sort Visual
    for (let step of steps) {
    
    
        // * If a new minimum value was found, 
        // * the animation will swap the new min with the origin.
        let originNodeIndex = step.origin
        let originNodeStyle = nodes[originNodeIndex].style
    
        // * Set the first node as the minimum (to red)
        let minNodeStyle = originNodeStyle
        minNodeStyle.background = "red"
        await sleep(speed)
    
        for (let comparison of step.comparisons) {
    
          // * get the comparison node
          let nextNodeStyle = nodes[comparison.index].style
    
          // * highlight red if new min, othwerwise highlight pink
          if (comparison.newMin) {
            nextNodeStyle.background = "red"
            await sleep(speed)
            minNodeStyle.background = "pink"
            minNodeStyle = nextNodeStyle;
    
            step.min = comparison.index
            
          }
          else {
            nextNodeStyle.background = "pink"
            await sleep(speed)
          }
        }
    
        // * Swap with the origin
        originNodeStyle.background = "coral"
        minNodeStyle.background = "coral"
        await sleep(speed)
    
        let tempHeight = originNodeStyle.height
        originNodeStyle.height = minNodeStyle.height
        minNodeStyle.height = tempHeight
        await sleep(speed)
    
        // * Reset the nodes
        for (let node of nodes) {
          node.style.background = colors.default
        }
    }
}
