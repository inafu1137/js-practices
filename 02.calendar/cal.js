#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

// コマンドライン引数の取得や年/月の決定
const args = minimist(process.argv.slice(2));
const year = parseInt(args.y || args.year) || dayjs().year();
const month = parseInt(args.m || args.month) || dayjs().month() + 1;

// 入力チェック
if (year < 1970 || year > 2100 || month < 1 || month > 12) {
  console.error("有効な範囲は年: 1970〜2100、月: 1〜12です。");
  process.exit(1);
}

// 日付範囲の取得
const start = dayjs(`${year}-${month}-01`);
const end = start.endOf("month");
// 曜日, 日数の取得
const firstDay = start.day();
const daysInMonth = end.date();

// 見出しの表示
const header = `${month}月 ${year}`;
console.log(header.padStart(10 + Math.floor(header.length / 2), " "));
console.log("日 月 火 水 木 金 土");

// カレンダーの出力
let line = " ".repeat(firstDay * 3);
for (let date = 1; date <= daysInMonth; date++) {
  line += date.toString().padStart(2, " ") + " ";
  // 土曜日の判定
  if ((firstDay + date) % 7 === 0) {
    console.log(line.trimEnd());
    line = "";
  }
}
// 残った日付を出力（改行なし）
if (line.trim() !== "") {
  console.log(line.trimEnd());
}
