#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const options = minimist(process.argv.slice(2));
const now = dayjs();
const year = Number.isInteger(options.y) ? options.y : now.year();
const month = Number.isInteger(options.m) ? options.m : now.month() + 1;

// 入力チェック
if (year < 1970 || year > 2100 || month < 1 || month > 12) {
  console.error("有効な範囲は年: 1970〜2100、月: 1〜12です。");
  process.exit(1);
}

// 月初オブジェクト
const startDate = dayjs()
  .set("year", year)
  .set("month", month - 1)
  .set("date", 1);

// 見出しの表示
const header = `${month}月 ${year}`;
console.log(header.padStart(13));
console.log("日 月 火 水 木 金 土");

// カレンダーの出力
let line = " ".repeat(startDate.day() * 3);
for (let date = 1; date <= startDate.endOf("month").date(); date++) {
  const current = startDate.set("date", date);
  line += `${String(date).padStart(2, " ")} `;
  if (current.day() === 6) {
    console.log(line);
    line = "";
  }
}
if (line !== "") {
  console.log(line);
}
