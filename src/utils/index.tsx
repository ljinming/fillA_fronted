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
