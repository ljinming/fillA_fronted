/** @format */
import BigNumber from "bignumber.js";

export const setStr = (str: string) => {
  return `${String(str).slice(0, 6)}...${String(str).slice(-4)}`;
};

export function getValueDivide(
  num: number | BigNumber,
  pow: number = 18,
  unit: number = 6
) {
  let res = new BigNumber(num).dividedBy(Math.pow(10, pow));
  return res.toFixed(unit);
}

export function getValueMultiplied(num: number | string, pow: number = 18) {
  return new BigNumber(num).multipliedBy(Math.pow(10, pow)).toFixed(0);
}


 export const debounce = <T extends (...args: any) => any>(
  fn: T,
  time?: number,
  immediate?: boolean
): ((...args: any) => any) => {
  let timeoutId: null | number |any
  let defaultImmediate = immediate || false
  let delay = time || 300
  return (...args: any) => {
    if (defaultImmediate) {
      fn.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
      defaultImmediate = false
      return
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}