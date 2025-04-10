#!/usr/bin/env node
// ライブラリ読み込み
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
console.log(`     ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

// カレンダーの出力
let output = " ".repeat(firstDay * 3);
// 各日付のループ
for (let date = 1; date <= daysInMonth; date++) {
  output += date.toString().padStart(2, " ") + " ";
// 土曜日を判定して改行
  if ((firstDay + date - 1) % 7 === 6) output += "\n";
}

console.log(output);
