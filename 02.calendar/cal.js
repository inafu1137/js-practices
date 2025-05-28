#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isSameOrBefore);

const options = minimist(process.argv.slice(2));
const now = dayjs();
const year = Number.isInteger(options.y) ? options.y : now.year();
const month = Number.isInteger(options.m) ? options.m : now.month() + 1;

if (year < 1970 || year > 2100 || month < 1 || month > 12) {
  console.error("有効な範囲は年: 1970〜2100、月: 1〜12です。");
  process.exit(1);
}

const startDate = dayjs()
  .year(year)
  .month(month - 1)
  .date(1);

const endDate = startDate.endOf("month");

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

let line = " ".repeat(startDate.day() * 3);

for (
  let currentDate = startDate;
  currentDate.isSameOrBefore(endDate);
  currentDate = currentDate.add(1, "day")
) {
  line += String(currentDate.date()).padStart(2, " ");

  if (currentDate.day() === 6 || currentDate.isSame(endDate, "day")) {
    console.log(line);
    line = "";
  } else {
    line += " ";
  }
}
