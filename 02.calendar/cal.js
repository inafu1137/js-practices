#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const options = minimist(process.argv.slice(2));
const now = dayjs();
const year = Number.isInteger(options.y) ? options.y : now.year();
const month = Number.isInteger(options.m) ? options.m : now.month() + 1;

if (year < 1970 || year > 2100 || month < 1 || month > 12) {
  console.error("有効な範囲は年: 1970〜2100、月: 1〜12です。");
  process.exit(1);
}

const startDate = dayjs(`${year}-${month}-01`);

const header = `${month}月 ${year}`;
console.log(header.padStart(13));
console.log("日 月 火 水 木 金 土");

let line = " ".repeat(startDate.day() * 3);
let current = startDate;

while (!current.isAfter(startDate.endOf("month"))) {
  line += String(current.date()).padStart(2, " ");

  if (current.day() === 6 || current.isSame(startDate.endOf("month"), "day")) {
    console.log(line);
    line = "";
  } else {
    line += " ";
  }

  current = current.add(1, "day");
}
