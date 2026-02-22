type Wish = {
  emoji: string;
  name: string;
  price: number;
  savedYen: number;
};

type Props = {
  wishes: Wish[];
};

export function WishList({ wishes }: Props) {
  return (
    <div className="rounded-r bg-bg2 border border-border p-4">
      <p className="text-sm text-text2 mb-3">Wishリスト</p>
      <div className="flex flex-col gap-4">
        {wishes.map((wish) => {
          const progress = Math.min((wish.savedYen / wish.price) * 100, 100);
          return (
            <div key={wish.name}>
              <div className="flex items-center justify-between mb-2">
                <span>
                  {wish.emoji} {wish.name}
                </span>
                <span className="font-mono text-sm text-text2">
                  &yen;{wish.savedYen.toLocaleString()} / &yen;{wish.price.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-bg3 rounded-full">
                <div
                  className="h-2 bg-amber rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
