/**
 * JST日付ユーティリティ
 * Checkin の date カラムは「JST 00:00 固定」で保存する。
 * UTC に対して +9h した上で 00:00 に丸める。
 */

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** 今日の JST 00:00:00 を UTC の Date として返す */
export function getTodayJST(): Date {
  const now = new Date();
  const jstNow = new Date(now.getTime() + JST_OFFSET_MS);
  // JST の年月日だけ取り出して UTC 0時として Date を作る
  const y = jstNow.getUTCFullYear();
  const m = jstNow.getUTCMonth();
  const d = jstNow.getUTCDate();
  return new Date(Date.UTC(y, m, d));
}

/** 指定日から n 日ずらした JST 00:00 Date を返す */
export function addDaysJST(base: Date, days: number): Date {
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
}

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"] as const;

type WeekDay = {
  date: Date;
  label: string;
};

/**
 * 今週の月曜〜日曜の範囲を返す（JST基準）
 * todayIndex（0-based, 月曜=0）も返す
 */
export function getWeekRangeJST(): { days: WeekDay[]; todayIndex: number } {
  const today = getTodayJST();

  // JST での曜日を求める（Date は UTC 0時格納なので +9h して曜日判定）
  const jstDay = new Date(today.getTime() + JST_OFFSET_MS).getUTCDay(); // 0=日 1=月 ... 6=土
  // 月曜 = 0 にするオフセット
  const mondayOffset = jstDay === 0 ? -6 : 1 - jstDay;
  const monday = addDaysJST(today, mondayOffset);

  const days: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = addDaysJST(monday, i);
    const jstD = new Date(d.getTime() + JST_OFFSET_MS);
    const dayOfWeek = jstD.getUTCDay(); // 0=日 1=月 ...
    days.push({ date: d, label: DAY_LABELS[dayOfWeek] });
  }

  const todayIndex = -mondayOffset; // 月曜からの差分

  return { days, todayIndex };
}
