import { useState, useRef, useEffect } from 'react';
import './index.css';
import { SporPaneli, SinemaPaneli, KodPaneli, OyunPaneli, TabletPaneli, MuzikPaneli, KartvizitPaneli } from './components/Moduller';

export default function App() {
  const [sistemBasladi, setSistemBasladi] = useState(false);
  const [acikKutu, setAcikKutu] = useState(null);
  const [envanterAcik, setEnvanterAcik] = useState(false);
  const [sesAcik, setSesAcik] = useState(true);
  const [kasetCaliyor, setKasetCaliyor] = useState(false);
  const [bulunanObjeler, setBulunanObjeler] = useState([]);

  // Referanslar (Sadece useRef kalsın, sesleri manuel kontrol edeceğiz)
  const roomRef = useRef(null);
  const acikKutuRef = useRef(null);
  const keysRef = useRef({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });
  const requestRef = useRef();

  // Mobil Ses Motoru İçin Manuel Ses Nesneleri (Audio Objects)
  const seslerRef = useRef({
    ambiance: null,
    click: null,
    kaset: null,
    error: null
  });

  // RPG Matematik
  const kesfedilenEsyaSayisi = bulunanObjeler.filter(id => id !== 'card').length;
  const kalanEsyaSayisi = 6 - kesfedilenEsyaSayisi;
  const kartvizitKilitli = kalanEsyaSayisi > 0;
  const tumObjelerBulundu = kesfedilenEsyaSayisi === 6;

  // Mobil Uyumlu Ses Çalma Fonksiyonu
  const sesCal = (sesAdi, loop = false, volume = 1.0) => {
    try {
      if (!sesAcik || !sistemBasladi) return;
      const ses = seslerRef.current[sesAdi];
      if (ses) {
        ses.currentTime = 0;
        ses.loop = loop;
        ses.volume = volume;
        // Mobil tarayıcılar için oynatma sözü (promise) kontrolü
        const playPromise = ses.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.warn(`${sesAdi} ses bloklandı (mobil engel):`, e));
        }
      }
    } catch (e) {}
  };

  const hataSesiCal = () => sesCal('error', false, 0.6);
  const tiklamaSesiCal = () => sesCal('click', false, 0.8);

  // MÜKEMMEL MOBİL SES BAŞLATMA DÖNGÜSÜ
  const sistemiBaslat = () => {
    // 1. Tıklama sesini doğrudan oynat (Mobil kilidi kıran ilk parmak teması)
    tiklamaSesiCal();
    setSistemBasladi(true);
    
    // 2. Ambiyans müziğini yükle ve oynat
    if (sesAcik && seslerRef.current.ambiance) {
      seslerRef.current.ambiance.volume = 0.3;
      seslerRef.current.ambiance.loop = true;
      const playPromise = seslerRef.current.ambiance.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.warn("Ambiyans bloklandı (mobil engel):", e));
      }
    }
  };

  // Kutu Açma Kapama Motoru
  const kutuAc = (kutuID) => {
    if (acikKutu) return; // Çift kutu açılmasını engelle
    tiklamaSesiCal();
    setAcikKutu(kutuID);
    acikKutuRef.current = kutuID; 
    if (!bulunanObjeler.includes(kutuID)) {
      setBulunanObjeler((prev) => [...prev, kutuID]);
    }
  };

  const kutuKapat = () => {
    if (acikKutu) {
      tiklamaSesiCal();
      setAcikKutu(null);
      acikKutuRef.current = null;
    }
  };

  // Ses ve Kaset Kontrol Motoru
  const sesGecis = () => {
    tiklamaSesiCal();
    const yeniSes = !sesAcik;
    setSesAcik(yeniSes);
    if (!yeniSes) {
      seslerRef.current.ambiance?.pause();
      seslerRef.current.kaset?.pause();
    } else {
      if (sistemBasladi) seslerRef.current.ambiance?.play();
      if (kasetCaliyor) seslerRef.current.kaset?.play();
    }
  };

  const kasetGecis = () => {
    tiklamaSesiCal();
    if (!sesAcik || !sistemBasladi) return;
    
    if (kasetCaliyor) {
      seslerRef.current.kaset?.pause();
      setKasetCaliyor(false);
    } else {
      setKasetCaliyor(true);
      if (seslerRef.current.kaset) {
        seslerRef.current.kaset.volume = 0.7;
        seslerRef.current.kaset.loop = true;
        seslerRef.current.kaset.play();
      }
    }
  };

  // ANA SİSTEM VE KAMERA MOTORU
  useEffect(() => {
    // 1. Ses Dosyalarını Manuel Yükle (Mobil Çökmesini Önleyen Kısım)
    // Rotalar mutlak yapıldı: ./assets/ değil /dijital-oda/assets/
    seslerRef.current.ambiance = new Audio('/dijital-oda/assets/ambiance.mp3');
    seslerRef.current.click = new Audio('/dijital-oda/assets/click.mp3');
    seslerRef.current.kaset = new Audio('/dijital-oda/assets/kaset.mp3');
    seslerRef.current.error = new Audio('/dijital-oda/assets/error.mp3');

    // 2. Klavye ve Kamera Döngüsü (PC İçin)
    const handleKeyDown = (e) => {
      if (keysRef.current.hasOwnProperty(e.key)) {
        keysRef.current[e.key] = true;
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) e.preventDefault();
      }
    };
    const handleKeyUp = (e) => {
      if (keysRef.current.hasOwnProperty(e.key)) keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    const cameraLoop = () => {
      if (!acikKutuRef.current) {
        let dx = 0, dy = 0;
        if (keysRef.current.ArrowUp) dy -= 15;
        if (keysRef.current.ArrowDown) dy += 15;
        if (keysRef.current.ArrowLeft) dx -= 15;
        if (keysRef.current.ArrowRight) dx += 15;
        if (dx !== 0 || dy !== 0) window.scrollBy(dx, dy);
      }
      requestRef.current = requestAnimationFrame(cameraLoop);
    };
    requestRef.current = requestAnimationFrame(cameraLoop);

    // 3. Yakınlaştırma (PC İçin) VW birimi telefonda 100vw'ya sabitlenecek
    let currentZoomVW = window.innerWidth < 768 ? 100 : 150; 
    const handleWheel = (e) => {
      if (acikKutuRef.current || e.ctrlKey || window.innerWidth < 768) return; // Telefonda zoomu engelle
      if (e.deltaY < 0) currentZoomVW += 5; else currentZoomVW -= 5;
      currentZoomVW = Math.max(100, Math.min(currentZoomVW, 300));
      if (roomRef.current) roomRef.current.style.width = `${currentZoomVW}vw`;
      e.preventDefault();
    };
    window.addEventListener('wheel', handleWheel, { passive: false });

    // 4. MÜKEMMEL MOBİL TOUCH MOTORU
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (acikKutuRef.current || window.innerWidth >= 768) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (acikKutuRef.current || window.innerWidth >= 768) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      // Dokunma farkını hesapla
      const dx = touchStartX - touchX;
      const dy = touchStartY - touchY;
      
      // Odayı kaydır
      window.scrollBy(dx, dy);
      
      // Son dokunma yerini güncelle
      touchStartX = touchX;
      touchStartY = touchY;
      
      // Telefonda varsayılan sayfa kaydırmasını engelle (Kritik Ayar)
      if (e.cancelable) e.preventDefault();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Temizlik
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(requestRef.current);
      // Sesleri kapat
      Object.values(seslerRef.current).forEach(s => s?.pause());
    };
  }, []);

  return (
    <>
      {/* Karşılama Ekranı (Mobil Ses Kilidini Kıran Buton) */}
      {!sistemBasladi && (
        <div id="welcome-modal" className="welcome-box">
          <h2>SİSTEM BAŞLATILDI: Dijital Oda</h2>
          <p>Sıradan bir özgeçmişe (CV) değil, bir bilgisayar mühendisinin zihninin dijital bir kopyasına adım atıyorsun.</p>
          <div className="controls-guide">
            <p>⌨️ <strong>Yön Tuşları / PC:</strong> Odada gezinmeni sağlar.</p>
            <p>📱 <strong>Dokunmatik / Mobil:</strong> Parmağını kaydırarak odayı gez.</p>
            <p>🔍 <strong>Keşif:</strong> Eşyalara tıklayarak teknik yetkinlikleri oku.</p>
            <p>🏆 <strong>Görev:</strong> Sol üstteki paneli kullanarak odadaki 6 gizli objeyi bul!</p>
          </div>
          <button id="start-btn" onClick={sistemiBaslat}>Sisteme Giriş Yap</button>
        </div>
      )}

      {/* Arayüz Butonları */}
      <button id="inventory-btn" onClick={() => {tiklamaSesiCal(); setEnvanterAcik(!envanterAcik); }} style={{ background: tumObjelerBulundu ? "rgba(0, 255, 136, 0.3)" : "" }}>
        {tumObjelerBulundu ? "Tüm Objeler Bulundu!" : `Gizli Objeler (${kesfedilenEsyaSayisi}/6)`}
      </button>

      <button id="mute-btn" onClick={sesGecis} style={{ color: sesAcik ? '#00ff88' : '#ff3366', borderColor: sesAcik ? '#00ff88' : '#ff3366' }}>
        {sesAcik ? "🔊 Ses Açık" : "🔇 Ses Kapalı"}
      </button>

      {/* Envanter Paneli */}
      <div id="inventory-panel" className={envanterAcik ? "" : "hidden"}>
        <h3>Keşif İlerlemesi</h3>
        <p className="panel-desc">Odada gizlenmiş hikayeleri bul.</p>
        <div className="inventory-grid">
          {['gym', 'poster', 'coding', 'gaming', 'tablet', 'mp3', 'card'].map((item) => (
            <div key={item} className={`inv-item ${!bulunanObjeler.includes(item) ? 'silhouette' : ''}`} onClick={() => kutuAc(item)}>
              <img src={`/dijital-oda/assets/${item === 'gym' ? 'dambil' : item === 'coding' ? 'code-icon' : item === 'gaming' ? 'game-icon' : item}.png`} alt={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Oda ve Eşyalar */}
      <div className="room-wrapper" id="room" ref={roomRef} style={{ width: window.innerWidth < 768 ? '100vw' : '150vw' }}>
        <img src="/dijital-oda/assets/bos_oda.jpg" className="room-bg" alt="Oda" />
        <div id="fire-vfx"></div>
        <div id="snow-vfx"></div>
        
        {/* Işıklar */}
        {[...Array(7)].map((_, i) => <div key={i} id={`light-${i+1}`} className="vfx-light"></div>)}

        {/* Paneller (kasetMuzikRef artık geçmiyor, sesler manuel kontrol ediliyor) */}
        <SporPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <SinemaPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <KodPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <OyunPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <TabletPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        
        {/* Muzik Paneli Güncellemesi: Manuel ses nesnesi ve kontrol fonksiyonunu geçiyoruz */}
        <MuzikPaneli 
          acikKutu={acikKutu} 
          kutuAc={kutuAc} 
          kutuKapat={kutuKapat} 
          kasetCaliyor={kasetCaliyor} 
          kasetGecis={kasetGecis} 
          kasetSesNesnesi={seslerRef.current.kaset} 
        />
        
        <KartvizitPaneli 
          acikKutu={acikKutu} 
          kutuAc={kutuAc} 
          kutuKapat={kutuKapat} 
          kilitliMi={kartvizitKilitli} 
          hataSesiCal={hataSesiCal} 
          kalanEsya={kalanEsyaSayisi} 
        />
      </div>

      {/* Karartma Overlay */}
      <div id="overlay" className={`overlay ${acikKutu ? '' : 'hidden'}`} onClick={kutuKapat}></div>
      {/* MOBİL PASKALYA YUMURTASI (Siyah Ekranda Gezinen Köpek) */}
      <div id="mobile-easter-egg">
        <div className="doggy">🐕</div>
        <p className="undertale-text" style={{ color: '#888' }}>* Burada görülecek bir şey yok...</p>
      </div>
    </>
  );
}