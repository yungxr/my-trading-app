// lib/binance.ts
export async function getMarketData(pair: string) {
  try {
    const cleanPair = pair.replace(/USDT$/, '').replace('-', '');
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${cleanPair}USDT`
    );
    
    if (!response.ok) throw new Error(`Failed to fetch data for ${pair}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data for ${pair}:`, error);
    throw error;
  }
}

// Добавляем WebSocket подключение
export function setupBinanceWebSocket(pair: string, callback: (data: { price: number; change: number }) => void) {
  const cleanPair = pair.replace(/USDT$/, '').replace('-', '').toLowerCase();
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${cleanPair}usdt@ticker`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback({
      price: parseFloat(data.c), // текущая цена
      change: parseFloat(data.P) // процент изменения
    });
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return () => ws.close();
}