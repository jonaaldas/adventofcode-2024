const fs = require("fs");

const getData = () => {
  try {
    const data = fs.readFileSync("./input.txt", "utf8");
    const lines = data.split("\n").filter((line) => line.trim());
    const firstColumn = [];
    const secondColumn = [];
    lines.forEach((line) => {
      const [first, second] = line.split(/\s+/).filter(Boolean);
      firstColumn.push(Number(first));
      secondColumn.push(Number(second));
    });
    firstColumn.sort();
    secondColumn.sort();
    return {
      firstColumn,
      secondColumn,
    };
  } catch (err) {
    console.error(err);
  }
};

const phaseOne = (firstColumn, secondColumn) => {
  let difference = [];
  firstColumn.forEach((el, index) => {
    let diff = el - secondColumn[index];
    let num = Math.abs(diff);
    difference.push(num);
  });
  let total = 0;
  difference.forEach((el) => {
    total += el;
  });
  console.log(total);
};

const phaseTwo = (firstColumn, secondColumn) => {
  const dic = {};
  firstColumn.forEach((el) => {
    dic[el] = 0;
  });
  firstColumn.forEach((el, index) => {
    secondColumn.forEach((el2, index) => {
      if (el == el2) {
        dic[el]++;
      }
    });
  });
  // console.log(dic);
  const newObj = Object.fromEntries(
    Object.entries(dic).filter(([key, value]) => !isNaN(value) && value > 0),
  );
  let sum = 0;
  Object.entries(newObj).forEach(([key, value]) => {
    let a = Number(key) * Number(value);
    sum += a;
  });
  console.log(sum);
};

const { firstColumn, secondColumn } = getData();
phaseTwo(firstColumn, secondColumn);
