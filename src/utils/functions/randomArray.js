// The numbers should be between 5 and 600.
const randomInterval = (min=10, max=601) => {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

// The random numbers have to have at least 10 values.
export default function fillArray(size=10) {
  const arr = []

  for(let i = 0; i < size; i++) {
      arr.push(randomInterval())
  }
  return arr;
}