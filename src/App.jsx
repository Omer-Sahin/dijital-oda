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

  const arkaplanMuzikRef = useRef(null);
  const tiklamaSesRef = useRef(null);
  const kasetMuzikRef = useRef(null);
  const errorSesRef = useRef(null); 
  const roomRef = useRef(null);
  
  const acikKutuRef = useRef(null);
  const keysRef = useRef({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });
  const requestRef = useRef();

  // Matematik ve Kilit Mantığı (Asla Çökmez)
  const kesfedilenEsyaSayisi = bulunanObjeler.filter(id => id !== 'card').length;
  const kalanEsyaSayisi = 6 - kesfedilenEsyaSayisi;
  const kartvizitKilitli = kalanEsyaSayisi > 0;
  const tumObjelerBulundu = kesfedilenEsyaSayisi === 6;

  const tiklamaSesiCal = () => {
    try {
      if (sesAcik && tiklamaSesRef.current) {
        tiklamaSesRef.current.currentTime = 0;
        tiklamaSesRef.current.play();
      }
    } catch (e) { /* Çift tıklama ses hatasını sessizce yutar */ }
  };

  const hataSesiCal = () => {
    try {
      if (sesAcik && errorSesRef.current) {
        errorSesRef.current.currentTime = 0;
        errorSesRef.current.play();
      }
    } catch (e) { }
  };

  const sistemiBaslat = () => {
    tiklamaSesiCal();
    setSistemBasladi(true);
    if (sesAcik && arkaplanMuzikRef.current) {
      arkaplanMuzikRef.current.volume = 0.4;
      arkaplanMuzikRef.current.play();
    }
  };

  const kutuAc = (kutuID) => {
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

  const envanterGecis = () => {
    tiklamaSesiCal();
    setEnvanterAcik(!envanterAcik);
  };

  const sesGecis = () => {
    tiklamaSesiCal();
    const yeniSes = !sesAcik;
    setSesAcik(yeniSes);
    if (!yeniSes) {
      arkaplanMuzikRef.current?.pause();
      kasetMuzikRef.current?.pause();
    } else {
      if (sistemBasladi) arkaplanMuzikRef.current?.play();
      if (kasetCaliyor) kasetMuzikRef.current?.play();
    }
  };

  const kasetGecis = () => {
    tiklamaSesiCal();
    if (kasetCaliyor) {
      kasetMuzikRef.current?.pause();
      setKasetCaliyor(false);
    } else {
      setKasetCaliyor(true);
      if (sesAcik && kasetMuzikRef.current) {
        kasetMuzikRef.current.volume = 0.7;
        kasetMuzikRef.current.play();
      }
    }
  };

  useEffect(() => {
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

    let currentZoomVW = 150;
    const handleWheel = (e) => {
      if (acikKutuRef.current || e.ctrlKey) return;
      if (e.deltaY < 0) currentZoomVW += 5; else currentZoomVW -= 5;
      currentZoomVW = Math.max(100, Math.min(currentZoomVW, 300));
      if (roomRef.current) roomRef.current.style.width = `${currentZoomVW}vw`;
      e.preventDefault();
    };
    window.addEventListener('wheel', handleWheel, { passive: false });

    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (acikKutuRef.current) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (acikKutuRef.current) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const dx = touchStartX - touchX;
      const dy = touchStartY - touchY;
      window.scrollBy(dx, dy);
      touchStartX = touchX;
      touchStartY = touchY;
      if (e.cancelable) e.preventDefault();
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {!sistemBasladi && (
        <div id="welcome-modal" className="welcome-box">
         <h2>SİSTEM BAŞLATILDI: Dijital Oda</h2>
          <p>Sıradan bir özgeçmişe (CV) değil, bir bilgisayar mühendisinin zihninin dijital bir kopyasına adım atıyorsun.</p>
          <div className="controls-guide">
            <p>⌨️ <strong>Yön Tuşları / Dokunmatik:</strong> Odada gezinmeni sağlar.</p>
            <p>🖱️ <strong>Fare Tekerleği:</strong> Kamerayı yakınlaştırıp uzaklaştırır.</p>
            <p>🔍 <strong>Keşif:</strong> Etraftaki eşyalara tıklayarak teknik yetkinlikleri ve hikayeleri oku.</p>
            <p>🏆 <strong>Görev:</strong> Sol üstteki paneli kullanarak odadaki 6 gizli objeyi bul!</p>
          </div>
          <button id="start-btn" onClick={sistemiBaslat}>Sisteme Giriş Yap</button>
        </div>
      )}

      <button id="inventory-btn" onClick={envanterGecis} style={{ background: tumObjelerBulundu ? "rgba(0, 255, 136, 0.3)" : "" }}>
        {tumObjelerBulundu ? "Tüm Objeler Bulundu!" : `Gizli Objeler (${kesfedilenEsyaSayisi}/6)`}
      </button>

      <button id="mute-btn" onClick={sesGecis} style={{ color: sesAcik ? '#00ff88' : '#ff3366', borderColor: sesAcik ? '#00ff88' : '#ff3366' }}>
        {sesAcik ? "🔊 Ses Açık" : "🔇 Ses Kapalı"}
      </button>

      <audio ref={arkaplanMuzikRef} loop><source src="./assets/ambiance.mp3" type="audio/mpeg" /></audio>
      <audio ref={tiklamaSesRef}><source src="./assets/click.mp3" type="audio/mpeg" /></audio>
      <audio ref={kasetMuzikRef} loop><source src="./assets/kaset.mp3" type="audio/mpeg" /></audio>
      <audio ref={errorSesRef}><source src="./assets/error.mp3" type="audio/mpeg" /></audio>

      <div id="inventory-panel" className={envanterAcik ? "" : "hidden"}>
        <h3>Keşif İlerlemesi</h3>
        <p className="panel-desc">Odada gizlenmiş hikayeleri bul.</p>
        <div className="inventory-grid">
          {['gym', 'poster', 'coding', 'gaming', 'tablet', 'mp3', 'card'].map((item) => (
            <div key={item} className={`inv-item ${!bulunanObjeler.includes(item) ? 'silhouette' : ''}`} onClick={() => kutuAc(item)}>
              <img src={`./assets/${item === 'gym' ? 'dambil' : item === 'coding' ? 'code-icon' : item === 'gaming' ? 'game-icon' : item}.png`} alt={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="room-wrapper" id="room" ref={roomRef}>
        <img src="./assets/bos_oda.jpg" className="room-bg" alt="Oda" />
        <div id="fire-vfx"></div>
        <div id="snow-vfx"></div>
        
        <div id="light-1" className="vfx-light"></div>
        <div id="light-2" className="vfx-light"></div>
        <div id="light-3" className="vfx-light"></div>
        <div id="light-4" className="vfx-light"></div>
        <div id="light-5" className="vfx-light"></div>
        <div id="light-6" className="vfx-light"></div>
        <div id="light-7" className="vfx-light"></div>

        <SporPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <SinemaPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <KodPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <OyunPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <TabletPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} />
        <MuzikPaneli acikKutu={acikKutu} kutuAc={kutuAc} kutuKapat={kutuKapat} kasetCaliyor={kasetCaliyor} kasetGecis={kasetGecis} kasetMuzikRef={kasetMuzikRef} />
        
        <KartvizitPaneli 
          acikKutu={acikKutu} 
          kutuAc={kutuAc} 
          kutuKapat={kutuKapat} 
          kilitliMi={kartvizitKilitli} 
          hataSesiCal={hataSesiCal} 
          kalanEsya={kalanEsyaSayisi} 
        />
      </div>

      <div id="overlay" className={`overlay ${acikKutu ? '' : 'hidden'}`} onClick={kutuKapat}></div>
    </>
  );
}