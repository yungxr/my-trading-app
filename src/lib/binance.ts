export async function getMarketData(pair: string) {
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}USDT`
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
}