let spakerIndex = 5; // 说话人index
let isGong = false; //是否存在共享
let currentIndex = 0; // 用户所在视觉页

const arr = [
  {
    type: 'me',
    index: 1,
    sperk: true,
  },
  {
    type: 'zhu',
    index: 1,
    sperk: true,
  },
  {
    type: 'gong',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: 'main',
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
  {
    type: 'default',
    index: 1,
    sperk: true,
  },
];

function CurrentPageCalc(arr) {
  const sort = ['me', 'gong', 'zhu', 'default'];
  const newArr = arr.sort((a, b) => {
    return sort.indexOf(a.type) > sort.indexOf(b.type) ? 1 : -1;
  });
  return newArr;
}

function currentPage() {
  let pageSize = isGong ? 6 : 9;
  //:当前第几页
  const num = Math.floor(spakerIndex / pageSize); // 向下取整 当前说话人在第几页  0代表为第1页
  const index = spakerIndex % pageSize; // 代表在当前页的第几位。
  //返回speaker 应在当前第几页
  return {
    speakNum: num,
    index: index,
  };
}

function totalPage() {
  let pageSize = isGong ? 6 : 9;
  const totalPage = Math.ceil(arr / pageSize); // 向上取整
}

function changePeople(index, peoples) {
  if (index === 0) {
    ////替换规则： 没有开麦 -> 音量最轻-> 最早As
    return 3;
  } else {
    // 替换规则： 第一位替换
  }
}

function changeIndex(index, nextIndex) {
  const temp_A = arr[index];
  const temp_B = arr[nextIndex];
  arr[index] = temp_B;
  arr[nextIndex] = temp_A;
  return arr;
}

function speakers(arr) {
  let pageSize = isGong ? 6 : 9;
  const {speakNum, index} = currentPage();
  if (currentIndex === speakNum) {
    //index 位置 标绿框 颜色更高
  } else {
    // 非当前页
    if (currentIndex === 0) {
      // 可视页在第一页时
      ////替换规则： 没有开麦 -> 音量最轻-> 最早As ，假设没有开麦者index 为3
      const changeIndex = 3;
      changeIndex(3, spakerIndex);
    } else {
      // 可视页在非当前页
      const index = 8; // 假设可视页的第一位index 为8
      changeIndex(index, spakerIndex);
    }
  }
}

const init = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 1是‘我’，2是‘主持人’

let activeUser = null;

const 获取当前页面需要渲染的用户 = () => {};

const setActive = (userId) => {};

const 用户进房 = () => {};

const 用户退房 = () => {};

const 翻页 = () => {};

用户进房(10);
用户进房(11);

console.log(获取当前页面需要渲染的用户());
// 1 2 3 4 5 6 7 8 9
setActive(1);
翻页(1);
翻页(2);
console.log(获取当前页面需要渲染的用户());
// 3 4 5 6 7 8 9 10 11  保证一页有9个用户

setActive(4);

console.log(获取当前页面需要渲染的用户());

// 3 4 5 6 7 8 9 10 11  ， 位置不换，4会亮蓝框

setActive(1);

// 1 4 5 6 7 8 9 10 11  ， 1会出现在第一个位置，和三做交换
翻页(1);
console.log(获取当前页面需要渲染的用户());
// 1 2 3 4 5 6 7 8 9  我 主持人  其他用户

setActive(10);
console.log(获取当前页面需要渲染的用户());
// 1 2 3 10 5 6 7 8 9    4 是最不活跃的用户(3 是过活跃用户，4是相对来说进房最早，又不活跃的，1是我，2是主持人，在前面)
// 1 2 3 10 5 6 7 8 9 4 11

翻页(2);
console.log(获取当前页面需要渲染的用户());
// 10 3 5 6 7 8 9 4 11  10 是活跃用户，要放在第一位
