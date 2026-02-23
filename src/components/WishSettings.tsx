"use client";

import { useState } from "react";
import { WishForm } from "./WishForm";

type Wish = {
  id: string;
  emoji: string;
  name: string;
  price: number;
  type: string;
};

const TYPE_LABELS: Record<string, string> = {
  item: "アイテム",
  invest: "投資",
  experience: "体験",
};

export function WishSettings({
  wishes,
  createAction,
  updateAction,
  deleteAction,
}: {
  wishes: Wish[];
  createAction: (formData: FormData) => void;
  updateAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-text">Wishリスト</h2>
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
          <h3 className="text-sm font-bold text-text mb-3">新しいWishを追加</h3>
          <WishForm
            action={createAction}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {wishes.length === 0 && !showAddForm && (
        <div className="rounded-r bg-bg2 border border-border p-6 text-center">
          <p className="text-text2">まだWishが登録されていません</p>
          <p className="text-sm text-text3 mt-1">
            「追加」ボタンから欲しいものを登録しましょう
          </p>
        </div>
      )}

      {wishes.map((wish) => (
        <div
          key={wish.id}
          className="rounded-r bg-bg2 border border-border p-4"
        >
          {editingId === wish.id ? (
            <div>
              <h3 className="text-sm font-bold text-text mb-3">Wishを編集</h3>
              <WishForm
                wish={wish}
                action={updateAction}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text">
                    {wish.emoji} {wish.name}
                  </span>
                  <span className="text-xs text-text3 bg-bg3 px-2 py-0.5 rounded-r2">
                    {TYPE_LABELS[wish.type] ?? wish.type}
                  </span>
                </div>
                <p className="text-sm text-text2">
                  ¥{wish.price.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(wish.id);
                    setShowAddForm(false);
                  }}
                  className="text-xs text-text3 hover:text-text transition"
                >
                  編集
                </button>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={wish.id} />
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
