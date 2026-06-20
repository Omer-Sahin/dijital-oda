import { useEffect } from 'react';

export default function BorsaTerminali() {
  useEffect(() => {
    let zamanlayici;

    const cizimiBaslat = () => {
      if (window.TradingView) {
        
        // 🔒 EMNİYET KİLİDİ: Kutular DOM'da hâlâ duruyor mu kontrol et. 
        // Eğer Kartvizit açıldıysa ve bu kutular silindiyse çizimi iptal et, çökme engellensin!
        if (!document.getElementById('tv_rklb') || !document.getElementById('tv_spacex')) {
          return;
        }

        try {
          // 🚀 1. ROCKET LAB EKRANI
          new window.TradingView.widget({
            "autosize": true,
            "symbol": "NASDAQ:RKLB",
            "interval": "D",
            "timezone": "Europe/Istanbul",
            "theme": "dark",
            "style": "1",
            "locale": "tr",
            "enable_publishing": false,
            "backgroundColor": "#0a0a0a",
            "gridColor": "rgba(255, 120, 0, 0.1)",
            "hide_top_toolbar": true,
            "hide_legend": true,
            "save_image": false,
            "container_id": "tv_rklb"
          });

          // 🌌 2. SPACEX EKRANI
          new window.TradingView.widget({
            "autosize": true,
            "symbol": "NASDAQ:ASTS",
            "interval": "D",
            "timezone": "Europe/Istanbul",
            "theme": "dark",
            "style": "1",
            "locale": "tr",
            "enable_publishing": false,
            "backgroundColor": "#0a0a0a",
            "gridColor": "rgba(0, 255, 136, 0.1)",
            "hide_top_toolbar": true,
            "hide_legend": true,
            "save_image": false,
            "container_id": "tv_spacex"
          });
        } catch (error) {
          console.warn("TradingView çizim hatası yutuldu:", error);
        }
      }
    };

    // Zamanlayıcıyı hafızaya alıyoruz
    if (!document.getElementById('tv-script')) {
      const script = document.createElement('script');
      script.id = 'tv-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = cizimiBaslat;
      document.body.appendChild(script);
    } else {
      zamanlayici = setTimeout(cizimiBaslat, 100); 
    }

    // 🧹 TEMİZLİK MOTORU: Bileşen ekrandan silinirse bekleyen asenkron görevleri iptal et
    return () => {
      if (zamanlayici) clearTimeout(zamanlayici);
    };
  }, []);

  return (
    <div style={{ marginTop: '20px', width: '100%' }}>
      <h3 style={{ color: '#fff', fontSize: '15px', marginBottom: '15px', textAlign: 'center', fontWeight: 'normal', letterSpacing: '1px' }}>
        Son zamanlarda ilgilendiğim hisseler:
      </h3>
      
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'row', height: '300px' }}>
        <div style={{ flex: 1, position: 'relative', background: '#0a0a0a', border: '1px solid #ff7800', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#ff7800', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>🚀 RKLB</span>
          <div id="tv_rklb" style={{ flex: 1, width: '100%' }}></div>
        </div>

        <div style={{ flex: 1, position: 'relative', background: '#0a0a0a', border: '1px solid #00ff88', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#00ff88', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>🌌 SPACEX</span>
          <div id="tv_spacex" style={{ flex: 1, width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}