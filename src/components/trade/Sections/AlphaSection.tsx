"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MemeCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
  last_updated: string;
  image?: string;
}

export default function MemeCoinCreator() {
  // Состояния для создания мем-коина
  const [coinName, setCoinName] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  // Состояния для данных API
  const [memeCoins, setMemeCoins] = useState<MemeCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Настройки CoinGecko API
  const fetchMemeCoins = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin,shiba-inu,dogelon-mars,floki-inu,pepe&order=market_cap_desc&price_change_percentage=24h&sparkline=false"
      );
      
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      
      setMemeCoins(data);
      setError(null);
    } catch (err) {
      setError("Failed to load meme coins data");
      console.error("API Error:", err);
      
      // Fallback данные
      setMemeCoins([
        {
          id: "dogecoin",
          name: "Dogecoin",
          symbol: "doge",
          current_price: 0.12,
          price_change_percentage_24h: 5.4,
          total_volume: 500000000,
          market_cap: 16000000000,
          last_updated: new Date().toISOString(),
          image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png"
        },
        // ... другие fallback данные
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных и настройка интервала обновления
  useEffect(() => {
    fetchMemeCoins();
    const interval = setInterval(fetchMemeCoins, 60000); // Обновление каждую минуту

    return () => clearInterval(interval);
  }, []);

  // Обработчики формы
  const handleCreateCoin = () => {
    console.log("Creating meme coin:", {
      coinName,
      coinSymbol,
      totalSupply,
      description,
      socialLinks
    });
    alert(`Meme Coin ${coinName} (${coinSymbol}) creation started!`);
  };

  const addSocialLink = (type: string) => {
    if (!socialLinks.includes(type)) {
      setSocialLinks([...socialLinks, type]);
    }
  };

  const removeSocialLink = (type: string) => {
    setSocialLinks(socialLinks.filter(link => link !== type));
  };

  // Форматирование данных
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 6 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      {/* Секция создания мем-коина */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent mb-4">
          Create Meme Coin
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-pink-300/80 text-sm mb-2">Coin Name</label>
              <input 
                type="text" 
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
                placeholder="e.g. Doge Killer" 
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
            <div>
              <label className="block text-pink-300/80 text-sm mb-2">Symbol</label>
              <input 
                type="text" 
                value={coinSymbol}
                onChange={(e) => setCoinSymbol(e.target.value)}
                placeholder="e.g. LEASH" 
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
            <div>
              <label className="block text-pink-300/80 text-sm mb-2">Total Supply</label>
              <input 
                type="number" 
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                placeholder="e.g. 1000000" 
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-pink-300/80 text-sm mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your meme coin..." 
                rows={3}
                className="w-full p-3 bg-white/5 border resize-none overflow-hidden border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
            <div>
              <label className="block text-pink-300/80 text-sm mb-2">Social Links</label>
              <div className="flex flex-wrap gap-2">
                {['Twitter', 'Telegram', 'Discord'].map((social) => (
                  <button
                    key={social}
                    type="button"
                    onClick={() => 
                      socialLinks.includes(social) 
                        ? removeSocialLink(social) 
                        : addSocialLink(social)
                    }
                    className={`px-3 py-1 rounded-full text-sm flex items-center ${
                      socialLinks.includes(social)
                        ? 'bg-pink-600/90 text-white'
                        : 'bg-white/10 text-pink-300/80 hover:bg-white/20'
                    }`}
                  >
                    {social}
                    {socialLinks.includes(social) && (
                      <span className="ml-1 text-xs">×</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateCoin}
          className="mt-6 w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition-all"
          disabled={!coinName || !coinSymbol}
        >
          Create Meme Coin
        </motion.button>
      </motion.div>

      {/* Таблица мем-коинов */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm overflow-x-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Trending Meme Coins
          </h2>
          <button 
            onClick={fetchMemeCoins}
            className="text-pink-300/80 hover:text-pink-300 text-sm flex items-center"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Refresh Data'}
            {!loading && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </button>
        </div>
        
        {error && (
          <div className="text-center py-4 text-rose-400 bg-white/5 rounded-lg mb-4">
            {error}. Showing fallback data.
          </div>
        )}

        {loading && memeCoins.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="min-w-full overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-3 pl-2 text-pink-300/80 font-medium">#</th>
                  <th className="pb-3 text-pink-300/80 font-medium">Coin</th>
                  <th className="pb-3 text-pink-300/80 font-medium text-right">Price</th>
                  <th className="pb-3 text-pink-300/80 font-medium text-right">24h</th>
                  <th className="pb-3 text-pink-300/80 font-medium text-right">Volume</th>
                  <th className="pb-3 text-pink-300/80 font-medium text-right">Market Cap</th>
                  <th className="pb-3 pr-2 text-pink-300/80 font-medium text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {memeCoins.map((coin, index) => (
                  <tr key={coin.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-2 text-pink-300/60">{index + 1}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        {coin.image ? (
                          <img 
                            src={coin.image} 
                            alt={coin.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                            {coin.symbol.toUpperCase().charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{coin.name}</div>
                          <div className="text-sm text-pink-300/60">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      {formatCurrency(coin.current_price)}
                    </td>
                    <td className={`py-4 text-right ${
                      coin.price_change_percentage_24h >= 0 
                        ? 'text-emerald-400' 
                        : 'text-rose-400'
                    }`}>
                      {coin.price_change_percentage_24h?.toFixed(2) || '0.00'}%
                    </td>
                    <td className="py-4 text-right">
                      {formatLargeNumber(coin.total_volume)}
                    </td>
                    <td className="py-4 text-right">
                      {formatLargeNumber(coin.market_cap)}
                    </td>
                    <td className="py-4 pr-2 text-right text-sm text-pink-300/80">
                      {formatDate(coin.last_updated)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}