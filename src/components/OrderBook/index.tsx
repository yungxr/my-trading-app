"use client";

interface Order {
  price: number;
  amount: number;
}

export default function OrderBook({
  bids,
  asks,
}: {
  bids: Order[];
  asks: Order[];
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Order Book</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between text-sm text-[#B0B4C4] mb-2">
            <span>Price</span>
            <span>Amount</span>
          </div>
          {bids.map((order, i) => (
            <div key={`bid-${i}`} className="flex justify-between text-sm py-1">
              <span className="text-green-400">
                {order.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-white">{order.amount.toFixed(4)}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-sm text-[#B0B4C4] mb-2">
            <span>Price</span>
            <span>Amount</span>
          </div>
          {asks.map((order, i) => (
            <div key={`ask-${i}`} className="flex justify-between text-sm py-1">
              <span className="text-red-400">
                {order.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-white">{order.amount.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}