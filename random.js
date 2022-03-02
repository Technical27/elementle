const getNumber = () => Math.floor(Math.random() * 119);

let nums = [];

for (let i = 0; i < 119; i++) {
  let n;
  do {
    n = getNumber();
  } while (nums.indexOf(n) !== -1);
  nums.push(n);
}

console.log(JSON.stringify(nums));
