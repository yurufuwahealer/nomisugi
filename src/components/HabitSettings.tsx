"use client";

import { useState } from "react";
import { HabitForm } from "./HabitForm";

type Habit = {
  id: string;
  type: string;
  name: string;
  dailyCost: number;
  frequency: number;
  goalType: string;
  goalDays: number | null;
};

const TYPE_LABELS: Record<string, string> = {
  alcohol: "アルコール",
  tobacco: "タバコ",
  other: "その他",
};

const GOAL_LABELS: Record<string, string> = {
  quit: "完全にやめる",
  reduce: "減らす",
  challenge30: "30日チャレンジ",
};

export function HabitSettings({
  habits,
  createAction,
  updateAction,
  deleteAction,
}: {
  habits: Habit[];
  createAction: (formData: FormData) => void;
  updateAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-text">習慣一覧</h2>
        {!showAddForm && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
            }}
            className="rounded-r2 bg-amber px-4 py-1.5 text-sm font-bold text-black hover:opacity-90 transition"
          >
            追加
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="rounded-r bg-bg2 border border-border p-4">
          <h3 className="text-sm font-bold text-text mb-3">新しい習慣を追加</h3>
          <HabitForm
            action={createAction}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {habits.length === 0 && !showAddForm && (
        <div className="rounded-r bg-bg2 border border-border p-6 text-center">
          <p className="text-text2">まだ習慣が登録されていません</p>
          <p className="text-sm text-text3 mt-1">
            「追加」ボタンから習慣を登録しましょう
          </p>
        </div>
      )}

      {habits.map((habit) => (
        <div
          key={habit.id}
          className="rounded-r bg-bg2 border border-border p-4"
        >
          {editingId === habit.id ? (
            <div>
              <h3 className="text-sm font-bold text-text mb-3">習慣を編集</h3>
              <HabitForm
                habit={habit}
                action={updateAction}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text">{habit.name}</span>
                  <span className="text-xs text-text3 bg-bg3 px-2 py-0.5 rounded-r2">
                    {TYPE_LABELS[habit.type] ?? habit.type}
                  </span>
                </div>
                <p className="text-sm text-text2">
                  ¥{habit.dailyCost.toLocaleString()}/日 ・ 週{habit.frequency}日
                </p>
                <p className="text-xs text-text3">
                  {GOAL_LABELS[habit.goalType] ?? habit.goalType}
                  {habit.goalType === "reduce" &&
                    habit.goalDays != null &&
                    ` → 週${habit.goalDays}日に`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(habit.id);
                    setShowAddForm(false);
                  }}
                  className="text-xs text-text3 hover:text-text transition"
                >
                  編集
                </button>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={habit.id} />
                  <button
                    type="submit"
                    className="text-xs text-red hover:opacity-80 transition"
                  >
                    削除
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
