"use client";

import { useState } from "react";

type Habit = {
  id: string;
  type: string;
  name: string;
  dailyCost: number;
  frequency: number;
  goalType: string;
  goalDays: number | null;
};

export function HabitForm({
  habit,
  action,
  onCancel,
}: {
  habit?: Habit;
  action: (formData: FormData) => void;
  onCancel?: () => void;
}) {
  const [goalType, setGoalType] = useState(habit?.goalType ?? "quit");

  return (
    <form action={action} className="flex flex-col gap-4">
      {habit && <input type="hidden" name="id" value={habit.id} />}

      <div>
        <label htmlFor="name" className="block text-sm text-text2 mb-1">
          名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={habit?.name}
          placeholder="例: ビール"
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-amber"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm text-text2 mb-1">
          タイプ
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue={habit?.type ?? "alcohol"}
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-amber"
        >
          <option value="alcohol">アルコール</option>
          <option value="tobacco">タバコ</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label htmlFor="dailyCost" className="block text-sm text-text2 mb-1">
          1日あたりの金額（円）
        </label>
        <input
          id="dailyCost"
          name="dailyCost"
          type="number"
          required
          min={1}
          defaultValue={habit?.dailyCost}
          placeholder="500"
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-amber"
        />
      </div>

      <div>
        <label htmlFor="frequency" className="block text-sm text-text2 mb-1">
          現在の頻度（週あたり日数）
        </label>
        <input
          id="frequency"
          name="frequency"
          type="number"
          required
          min={1}
          max={7}
          defaultValue={habit?.frequency}
          placeholder="5"
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-amber"
        />
      </div>

      <div>
        <label htmlFor="goalType" className="block text-sm text-text2 mb-1">
          目標タイプ
        </label>
        <select
          id="goalType"
          name="goalType"
          required
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-amber"
        >
          <option value="quit">完全にやめる</option>
          <option value="reduce">減らす</option>
          <option value="challenge30">30日チャレンジ</option>
        </select>
      </div>

      {goalType === "reduce" && (
        <div>
          <label htmlFor="goalDays" className="block text-sm text-text2 mb-1">
            目標日数（週あたり）
          </label>
          <input
            id="goalDays"
            name="goalDays"
            type="number"
            required
            min={0}
            max={7}
            defaultValue={habit?.goalDays ?? undefined}
            placeholder="2"
            className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-r2 bg-amber py-2 text-sm font-bold text-black hover:opacity-90 transition"
        >
          {habit ? "更新" : "追加"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-r2 border border-border py-2 text-sm text-text2 hover:text-text transition"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
