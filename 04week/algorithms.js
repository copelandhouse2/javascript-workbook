'use strict';

const assert = require('assert');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];
let flip = false;

for (let i = 0; i < 10; i++) {
  arr.push(getRandomInt(0, 1000));
}

function bubbleSort(ary) {
  /*********************** WHITE BOARD NOTES **************************
  // Using bubble sort alrgorithm to sort passed array.
  // set flip flag equal to false
  // Loop through array
  //   Compare array[n] to array[n+1]
  //   if array[n] is larger, then flip
  //   set flip flag equal to true.
  // End Loop
  // if flip flag = true
  //   set flip flag back to false
  //   return bubbleSort(arr)
  // else // array should be sorted
  //   return arr
  // end if
  ********************************************************************/

  for (let i = 0; i< ary.length; i++){
    if (ary[i] > ary[i + 1]) {
      flip = true;
      // using the swap without temp algorithm!  Ex: ary[i] = 10, ary[i+1] = 6
      ary[i+1] = ary[i+1] - ary[i];  //Ex. 6 - 10 = -4
      ary[i]   = ary[i] + ary[i+1];  //Ex.  10 + (-4) = 6
      ary[i+1] = ary[i] - ary[i+1];  //Ex.  6 - (-4) = 10
    }
  }
  // flip? (flip = false, return bubbleSort(ary)) : return(ary); // doesn't work.
  if (flip) {
    flip = false;  // setting my check
    return bubbleSort(ary);
  } else {
    return ary;
  }
}

console.log(arr);
console.log(bubbleSort(arr));

function mergeSort(ary) {
  /*********************** WHITE BOARD NOTES **************************
  // Merge sort is a recursive algorithm.
  // It is a divide in half approach.  Keep dviding until you get to
  // only 1 element on either the left or right side.
  // Now call merge.  Merge compares the two sub arrays and orders them.
  // Ultimately, you get back to 2 sorted sub-arrays.  Merge will finally order them.
  if (ary.length < 2) return ary;
  ********************************************************************/


  let middle = Math.floor(ary.length / 2);
  let leftSide = ary.slice(0, middle);
  let rightSide = ary.slice(middle);

  return merge(mergeSort(leftSide), mergeSort(rightSide));
}

function merge (left, right) {
  let result = [];
  while (left.length && right.length)
    result.push(left[0] < right[0]? left.shift() : right.shift());
  return result.concat(left.length? left : right);
}

console.log(arr);
console.log(mergeSort(arr));

function binarySearch(ary, item, start=0, end = ary.length-1) {
  /*********************** WHITE BOARD NOTES **************************
  // Assumptions...
  // You are given a sorted data array to search on.
  // Given a value to search for...
  // ****** DID NOT WORK!  ARRAY IS BROKEN DOWN UNTIL VALUE IS 0 ELEMENT *****
  // Binary Search.
  //   Locate the middle of the data array
  //   Compare search value with middle.
  //   If search value = middle value then
  //     Congrats youfound it!
  //     return index position in array.
  //   else if search value < middle value
  //     Change array to be subArray[0 - middle value-1]
  //     return binarySearch[subArray]
  //   else if search value > middle value then
  //     Change array to be subArray[0 - middle value-1]
  //     Change array to be subArray[middle value+1 - endArray.]
  //     return binarySearch[subArray]
  //   end if
  //   return -1 // did not find the search value in the data array
  // *** RESEARCHED.  FOUND RECURSIVE EXAMPLE PASSING IN START, END *********
  //   Keep array intact (no splice, slice).  Pass in start, end search elements.
  //   Locate the middle of the data array
  //   Compare search value with middle.
  //   If search value = middle value then
  //     Congrats youfound it!
  //     return index position in array.
  //   else if start element = end element then
  //     return false.  Value not in array
  //   else if search value < middle value
  //     Change end search = middle-1
  //     return binarySearch(array, item, start end)
  //   else if search value > middle value then
  //     Change start search = middle+1
  //     return binarySearch(array, item, start end)
  //   end if
  ********************************************************************/

  let middle = Math.floor(start + (end-start)/2);
  console.log(start, end, middle, ary[middle]);
  if (item == ary[middle]) return middle;
  else if (start>=end) return false;
  else if (item < ary[middle]) return binarySearch(ary, item, start, middle-1);
  else if (item > ary[middle]) return binarySearch(ary, item, middle+1, end);
  }
}

// Tests

if (typeof describe === 'function') {

  function comparator(a, b) {
    if (Number(a) < Number(b)) return -1;
    if (Number(a) > Number(b)) return 1;
    return 0;
  }

  describe('#bubbleSort()', () => {
    it('should sort array', () => {
      const sorted = bubbleSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#mergeSort()', () => {
    it('should sort array', () => {
      const sorted = mergeSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#binarySearch()', () => {
    it('should return the index of given item if sorted array contains it', () => {
      const idx = binarySearch([1, 2, 3, 4], 3);
      assert.equal(idx, 2);
    });
    it('should return false if item not in sorted array', () => {
      const idx = binarySearch([1, 2, 3, 4], 5);
      assert.equal(idx, false);
    });
  });

} else {

  console.log('Run the tests!')

}
