"use client";

type Wish = {
  id: string;
  emoji: string;
  name: string;
  price: number;
  type: string;
};

export function WishForm({
  wish,
  action,
  onCancel,
}: {
  wish?: Wish;
  action: (formData: FormData) => void;
  onCancel?: () => void;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      {wish && <input type="hidden" name="id" value={wish.id} />}

      <div>
        <label htmlFor="emoji" className="block text-sm text-text2 mb-1">
          絵文字
        </label>
        <input
          id="emoji"
          name="emoji"
          type="text"
          required
          defaultValue={wish?.emoji}
          placeholder="🎧"
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-amber"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm text-text2 mb-1">
          名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={wish?.name}
          placeholder="例: AirPods Pro"
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-amber"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm text-text2 mb-1">
          金額（円）
        </label>
        <input
          id="price"
          name="price"
          type="number"
          required
          min={1}
          defaultValue={wish?.price}
          placeholder="39800"
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
          defaultValue={wish?.type ?? "item"}
          className="w-full rounded-r2 border border-border bg-bg3 px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-amber"
        >
          <option value="item">アイテム</option>
          <option value="invest">投資</option>
          <option value="experience">体験</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-r2 bg-amber py-2 text-sm font-bold text-black hover:opacity-90 transition"
        >
          {wish ? "更新" : "追加"}
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
