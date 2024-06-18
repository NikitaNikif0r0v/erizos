const matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

const matrixSpiral = (matrix: number[][]): number[] => {
  const result: number[] = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;
    if (top > bottom) break;

    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    if (left > right) break;

    for (let i = right; i >= left; i--) {
      result.push(matrix[bottom][i]);
    }
    bottom--;
    if (top > bottom) break;

    for (let i = bottom; i >= top; i--) {
      result.push(matrix[i][left]);
    }
    left++;
    if (left > right) break;
  }

  return result;
};

console.log(matrixSpiral(matrix1));
console.log(matrixSpiral(matrix2));
