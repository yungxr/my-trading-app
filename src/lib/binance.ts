export async function getMarketData(pair: string) {
  try {
    // Убираем USDT если он уже есть в паре
    const cleanPair = pair.replace(/USDT$/, '').replace('-', '');
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${cleanPair}USDT`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${pair}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data for ${pair}:`, error);
    throw error;
  }
}