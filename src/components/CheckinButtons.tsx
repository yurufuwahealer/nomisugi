import { checkin } from "@/actions/checkin";

type Props = {
  checkedIn: boolean;
  didDrink?: boolean;
};

export function CheckinButtons({ checkedIn, didDrink }: Props) {
  if (checkedIn) {
    return (
      <div className="rounded-r bg-bg2 border border-border p-4">
        <div
          className={`rounded-r2 p-4 text-center font-medium ${
            didDrink
              ? "bg-red-dim text-red"
              : "bg-green-dim text-green"
          }`}
        >
          {didDrink ? "今日は飲んでしまった" : "今日は飲まなかった"}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-r bg-bg2 border border-border p-4">
      <p className="text-sm text-text2 mb-3">今日の記録</p>
      <div className="flex gap-3">
        <form action={checkin} className="flex-1">
          <input type="hidden" name="didDrink" value="false" />
          <button
            type="submit"
            className="w-full rounded-r2 bg-green-dim text-green font-medium py-3 px-4"
          >
            飲まなかった
          </button>
        </form>
        <form action={checkin} className="flex-1">
          <input type="hidden" name="didDrink" value="true" />
          <button
            type="submit"
            className="w-full rounded-r2 bg-red-dim text-red font-medium py-3 px-4"
          >
            飲んでしまった
          </button>
        </form>
      </div>
    </div>
  );
}
