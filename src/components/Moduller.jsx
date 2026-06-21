import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BorsaTerminali from './BorsaTerminali';

const pencereAnimasyonu = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { type: "spring", stiffness: 300, damping: 25 }
};

const sekmeAnimasyonu = {
  initial: { opacity: 0, x: -15 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.25, ease: "easeOut" }
};

export function SporPaneli({ acikKutu, kutuAc, kutuKapat }) {
  return (
    <div className={`morph-object ${acikKutu === 'gym' ? 'active' : ''}`} id="gym" onClick={() => acikKutu !== 'gym' && kutuAc('gym')}>
      {acikKutu === 'gym' && (
        <motion.div className="content-inside" {...pencereAnimasyonu}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
          <h2>Fiziksel Disiplin ve Güç</h2>
          <div className="scrollable-content">
            <div className="info-section">
              <h3>💪 Bilek Güreşi (Arm Wrestling)</h3>
              <p>Antrenman rutinlerim standart vücut geliştirmenin çok ötesinde. Masada milimetrik açıların ve kavrama gücünün konuştuğu profesyonel bilek güreşi mekanikleri ana odağım. Özellikle toproll, backpressure ve pronasyon teknikleri üzerine ciddi mesai harcıyor, spesifik kas gruplarını izole ederek güçlendiriyorum.</p>
            </div>
            <hr />
            <div className="info-section">
              <h3>🤸‍♂️ Calisthenics & Vücut Ağırlığı</h3>
              <p>Sadece demiri değil, kendi vücut ağırlığımı da mutlak bir kontrolde tutmayı seviyorum. Statik tutuşlar, patlayıcı güç ve tam vücut koordinasyonu gerektiren calisthenics antrenmanları, sistemimin temel taşlarından biri.</p>
            </div>
            <hr />
            <div className="info-section">
              <h3>🏋️‍♂️ Klasik Fitness</h3>
              <p>Temel kuvveti inşa etmek ve genel hipertrofiyi sağlamak için ağır presleri ve çekişleri rutinime entegre ediyorum. Bu temel güç, hem masadaki patlayıcılığımı destekliyor hem de dayanıklılığımı artırıyor.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function SinemaPaneli({ acikKutu, kutuAc, kutuKapat }) {
  return (
    <div className={`morph-object ${acikKutu === 'poster' ? 'active' : ''}`} id="poster" onClick={() => acikKutu !== 'poster' && kutuAc('poster')}>
      {acikKutu === 'poster' && (
        <motion.div className="content-inside" {...pencereAnimasyonu}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
          <h2>Sinematik Estetik ve İlham</h2>
          <div className="scrollable-content">
            <div className="info-section">
              <h3>🎬 Görsel Hikaye Anlatıcılığı</h3>
              <p>Kurgusal dünyaların sunduğu derin hikayeler, karakter analizleri ve kusursuz sebep-sonuç ilişkileri benim için büyük bir vizyon kaynağı. Olayların sadece gerçekleşmesi değil, bir domino etkisi gibi adeta kusursuz bir sistem mimarisiyle birbirine bağlanması beni her zaman etkilemiştir.</p>
            </div>
            <hr />
            <div className="info-section">
              <h3>🎞️ En Sevdiğim 3 Film</h3>
              <div className="poster-gallery">
                <img src="/dijital-oda/assets/film_1.jpg" alt="Favori Film 1" className="gallery-image" />
                <img src="/dijital-oda/assets/film_2.jpg" alt="Favori Film 2" className="gallery-image" />
                <img src="/dijital-oda/assets/film_3.jpg" alt="Favori Film 3" className="gallery-image" />
              </div>
            </div>
            <hr />
            <div className="info-section">
              <h3>📺 En Sevdiğim 3 Dizi</h3>
              <div className="poster-gallery">
                <img src="/dijital-oda/assets/dizi_1.jpg" alt="Favori Dizi 1" className="gallery-image" />
                <img src="/dijital-oda/assets/dizi_2.jpg" alt="Favori Dizi 2" className="gallery-image" />
                <img src="/dijital-oda/assets/dizi_3.jpg" alt="Favori Dizi 3" className="gallery-image" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function KodPaneli({ acikKutu, kutuAc, kutuKapat }) {
  return (
    <div className={`morph-object ${acikKutu === 'coding' ? 'active' : ''}`} id="coding" onClick={() => acikKutu !== 'coding' && kutuAc('coding')}>
      {acikKutu === 'coding' && (
        <motion.div className="content-inside" {...pencereAnimasyonu}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
          <h2>Sistem Mimarisi ve Kod</h2>
          <div className="scrollable-content">
            <div className="info-section">
              <h3>⚙️ Mühendislik Felsefesi</h3>
              <p>Benim için kod yazmak, ekrana rastgele satırlar dizmek değil; tıkır tıkır işleyen, sağlam ve bütünsel bir sistem mimarisi inşa etmektir. Python ve C dillerinde attığım güçlü temellerle, sadece çalışan değil, "kusursuz çalışan" yapılar kurmayı hedefliyorum.</p>
            </div>
            <hr />
            <div className="info-section">
              <h3>🛠️ Geliştirme Çalışmaları</h3>
              <p>Özellikle arka plan (backend) ve arayüz (GUI) entegrasyonu gerektiren ağır projeler üzerinde çalışmaktan keyif alıyorum:</p>
              <ul>
                <li style={{ marginBottom: '10px' }}><strong>Media Management System (gp-proje):</strong> PyQt5 ve SQLite veritabanı mimarisi kullanılarak sıfırdan geliştirilmiş, PDF çıktı entegrasyonuna sahip kapsamlı bir yönetim aracı.</li>
                <li><strong>Nesne Yönelimli Programlama:</strong> Python üzerinden OOP (Object-Oriented Programming) mantığını derinlemesine incelediğim analizler ve sistem tasarımları.</li>
              </ul>
            </div>
            <hr />
            <div className="info-section">
              <h3>🌐 Açık Kaynak ve Depolar</h3>
              <p>Geliştirdiğim sistemlerin kod yapılarını, komit geçmişimi ve projelerimi incelemek istersen GitHub profilime göz atabilirsin:</p>
              <div className="stock-links" style={{ marginTop: '15px', marginBottom: '15px' }}>
                <a href="https://github.com/Omer-Sahin" target="_blank" rel="noreferrer" className="cyber-btn">📂 Ana GitHub Profili</a>
                <a href="https://github.com/Omer-Sahin/python_OOP_studies" target="_blank" rel="noreferrer" className="cyber-btn">🐍 Python OOP Reposu</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function OyunPaneli({ acikKutu, kutuAc, kutuKapat }) {
  const [aktifSekme, setAktifSekme] = useState('strateji');
  const aoeAdimlar = [
    "Adım 1: İlk 3 İşçi ev yapar, ardından doğrudan Koyuna (Sheep) yönelir.",
    "Adım 2: İşçi 4, 5 ve 6 Town Center (TC) altındaki Koyun toplayıcılarına katılır.",
    "Adım 3: İşçi 7 ormana gider, Oduncu Kampı (Lumber Camp) kurar.",
    "Adım 4: İşçi 8 ve 9 odun kesmeye katılır.",
    "Adım 5: İşçi 10 ilk Domuzu (Boar) vurup TC altına çeker."
  ];
  const [aoeAdim, setAoeAdim] = useState(0);

  const [suspansiyon, setSuspansiyon] = useState(50);
  const [lastik, setLastik] = useState(50);
  const yolTutusu = Math.round(50 + (lastik * 0.4) - (suspansiyon * 0.1));
  const sonHiz = Math.round(220 + (suspansiyon * 0.5) - (lastik * 0.2));

  const [chRenk, setChRenk] = useState('#00ff88');
  const [chBoyut, setChBoyut] = useState(12);
  const [chBosluk, setChBosluk] = useState(4);

  return (
    <div className={`morph-object ${acikKutu === 'gaming' ? 'active' : ''}`} id="gaming" onClick={() => acikKutu !== 'gaming' && kutuAc('gaming')}>
      {acikKutu === 'gaming' && (
        <motion.div className="content-inside" {...pencereAnimasyonu}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
          <h2>Oyun Motorları ve Zihinsel Arenalar</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            <button onClick={(e) => { e.stopPropagation(); setAktifSekme('strateji'); }} className="cyber-btn" style={{ borderColor: aktifSekme === 'strateji' ? '#00ff88' : '#333', color: aktifSekme === 'strateji' ? '#00ff88' : '#ffaa00' }}>♟️ Strateji</button>
            <button onClick={(e) => { e.stopPropagation(); setAktifSekme('mekanik'); }} className="cyber-btn" style={{ borderColor: aktifSekme === 'mekanik' ? '#00ff88' : '#333', color: aktifSekme === 'mekanik' ? '#00ff88' : '#ffaa00' }}>🏎️ Mekanik</button>
            <button onClick={(e) => { e.stopPropagation(); setAktifSekme('taktik'); }} className="cyber-btn" style={{ borderColor: aktifSekme === 'taktik' ? '#00ff88' : '#333', color: aktifSekme === 'taktik' ? '#00ff88' : '#ffaa00' }}>🎯 Taktik</button>
            <button onClick={(e) => { e.stopPropagation(); setAktifSekme('profil'); }} className="cyber-btn" style={{ borderColor: aktifSekme === 'profil' ? '#00ff88' : '#333', color: aktifSekme === 'profil' ? '#00ff88' : '#ffaa00' }}>🎮 Profiller</button>
          </div>

         <div className="scrollable-content" style={{ textAlign: 'left' }}>
            {aktifSekme === 'strateji' && (
              <motion.div className="info-section" {...sekmeAnimasyonu}>
                <h3 style={{ textAlign: 'center' }}>♟️ Strateji ve Kriz Yönetimi</h3>
                <p>Oyun dünyasında sıfırdan bir sistem kurmak ve o sistemi zorlu şartlar altında hayatta tutmak en büyük tutkularımdan. <strong>Frostpunk</strong>'ın -80 derecelik ekstrem koşullarında kaynak optimizasyonu ve kriz yönetiminin sınırlarını zorlarken, <strong>Age of Empires II</strong> ile kusursuz makro/mikro dengesini, ekonomi yönetimini ve zamanlama algoritmalarını deneyimliyorum.</p>
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.6)', border: '1px dashed #ff7800', borderRadius: '8px' }}>
                  <h4 style={{ color: '#ffaa00', marginBottom: '10px' }}>⚙️ AoE2: Standart Açılış Algoritması (Build Order)</h4>
                  <div style={{ height: '50px', display: 'flex', alignItems: 'center', background: '#111', padding: '10px', borderRadius: '5px', borderLeft: '3px solid #00ff88' }}>
                    <span style={{ color: '#fff', fontSize: '14px' }}>{aoeAdimlar[aoeAdim]}</span>
                  </div>
                  <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <button className="cyber-btn" onClick={(e) => { e.stopPropagation(); setAoeAdim(Math.max(0, aoeAdim - 1)); }}>Geri</button>
                    <span style={{ color: '#777', lineHeight: '40px' }}>Adım {aoeAdim + 1} / 5</span>
                    <button className="cyber-btn" onClick={(e) => { e.stopPropagation(); setAoeAdim(Math.min(4, aoeAdim + 1)); }}>İleri</button>
                  </div>
                </div>
              </motion.div>
            )}

            {aktifSekme === 'mekanik' && (
              <motion.div className="info-section" {...sekmeAnimasyonu}>
                <h3 style={{ textAlign: 'center' }}>🏎️ Simülasyon ve Mekanik</h3>
                <p>Araç fizikleri ve motor dinamikleri benim için bir mühendislik pratiği. <strong>Forza Horizon</strong> evreninde telemetri verilerini okuyarak, motor ve süspansiyon sınırlarını zorlayan ince ayarlar (tuning/powerbuild) yapmak işin tamamen analitik kısmı. İşin sokak kültürü, tavizsiz hız ve modifiye estetiği tarafında ise <strong>Need for Speed (NFS)</strong> ruhu her zaman garajımın baş köşesinde yer alıyor.</p>
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.6)', border: '1px dashed #00ff88', borderRadius: '8px' }}>
                  <h4 style={{ color: '#00ff88', marginBottom: '15px' }}>🔧 Mitsubishi Starion ESI-R Powerbuild Telemetrisi</h4>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#ccc', marginBottom: '5px' }}>Süspansiyon Sertliği</label>
                    <input type="range" min="10" max="100" value={suspansiyon} onChange={(e) => setSuspansiyon(Number(e.target.value))} style={{ width: '100%', accentColor: '#ff7800' }} onClick={(e) => e.stopPropagation()} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#ccc', marginBottom: '5px' }}>Lastik Basıncı (Grip)</label>
                    <input type="range" min="10" max="100" value={lastik} onChange={(e) => setLastik(Number(e.target.value))} style={{ width: '100%', accentColor: '#ff7800' }} onClick={(e) => e.stopPropagation()} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', background: '#111', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '12px', color: '#888' }}>Tahmini Son Hız</span>
                      <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{sonHiz} km/h</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '12px', color: '#888' }}>Yol Tutuş İndeksi</span>
                      <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{yolTutusu} / 100</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {aktifSekme === 'taktik' && (
              <motion.div className="info-section" {...sekmeAnimasyonu}>
                <h3 style={{ textAlign: 'center' }}>🎯 Taktiksel Odak ve Kaos</h3>
                <p>Birinci şahıs nişancı arenasında iki farklı ekolün dinamiğine de saygı duyuyorum. <strong>Counter-Strike 2 (CS2)</strong> arenasında milimetrik nişangah konumlandırması, sunucu taraflı ağ optimizasyonları (tickrate/ping) ve saf takım taktiği konuşurken; <strong>Battlefield</strong> evreninde devasa haritalarda, savaşın saf kaosu içinde mangayla birlikte anlık kararlar alıp cephe hattını yönetmenin hissini seviyorum.</p>
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.6)', border: '1px dashed #ffaa00', borderRadius: '8px' }}>
                  <h4 style={{ color: '#ffaa00', marginBottom: '15px' }}>⚙️ Dinamik Crosshair (Nişangah) Analizi</h4>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '120px', height: '120px', background: '#333', border: '1px solid #555', borderRadius: '5px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.2, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: `-${chBosluk + chBoyut}px`, left: '-1px', width: '2px', height: `${chBoyut}px`, background: chRenk }}></div>
                        <div style={{ position: 'absolute', bottom: `-${chBosluk + chBoyut}px`, left: '-1px', width: '2px', height: `${chBoyut}px`, background: chRenk }}></div>
                        <div style={{ position: 'absolute', left: `-${chBosluk + chBoyut}px`, top: '-1px', height: '2px', width: `${chBoyut}px`, background: chRenk }}></div>
                        <div style={{ position: 'absolute', right: `-${chBosluk + chBoyut}px`, top: '-1px', height: '2px', width: `${chBoyut}px`, background: chRenk }}></div>
                        <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '2px', height: '2px', background: chRenk }}></div>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#ccc' }}>Uzunluk</span>
                        <input type="range" min="4" max="25" value={chBoyut} onChange={(e) => setChBoyut(Number(e.target.value))} style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}/>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', color: '#ccc' }}>Boşluk</span>
                        <input type="range" min="0" max="15" value={chBosluk} onChange={(e) => setChBosluk(Number(e.target.value))} style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}/>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button onClick={(e) => { e.stopPropagation(); setChRenk('#00ff88'); }} style={{ width: '20px', height: '20px', background: '#00ff88', border: 'none', cursor: 'pointer' }}></button>
                        <button onClick={(e) => { e.stopPropagation(); setChRenk('#ff7800'); }} style={{ width: '20px', height: '20px', background: '#ff7800', border: 'none', cursor: 'pointer' }}></button>
                        <button onClick={(e) => { e.stopPropagation(); setChRenk('#00d8ff'); }} style={{ width: '20px', height: '20px', background: '#00d8ff', border: 'none', cursor: 'pointer' }}></button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {aktifSekme === 'profil' && (
              <motion.div className="info-section" {...sekmeAnimasyonu}>
                <h3 style={{ textAlign: 'center' }}>🎮 Oyuncu Profilleri</h3>
                <p style={{ textAlign: 'center' }}>İstatistiklerimi incelemek veya rekabete ortak olmak istersen:</p>
                <div className="stock-links" style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <a href="https://steamcommunity.com/profiles/76561199775427478/" target="_blank" rel="noreferrer" className="cyber-btn" onClick={(e) => e.stopPropagation()}>💨 Steam Profili</a>
                  <a href="https://xboxgamertag.com/search/SileniusTR" target="_blank" rel="noreferrer" className="cyber-btn" onClick={(e) => e.stopPropagation()}>🟢 Xbox Profili</a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function TabletPaneli({ acikKutu, kutuAc, kutuKapat }) {
  return (
    <div className={`morph-object ${acikKutu === 'tablet' ? 'active' : ''}`} id="tablet" onClick={() => acikKutu !== 'tablet' && kutuAc('tablet')}>
      {acikKutu === 'tablet' && (
        <motion.div className="content-inside" {...pencereAnimasyonu}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
          <h2>Terminal: Finans ve Analiz</h2>
          <div className="scrollable-content">
            <div className="info-section">
              <h3>📈 Veri Okuma ve Piyasalar</h3>
              <p>Dünyadaki hiçbir sistem rastgele işlemez; küresel piyasalar da öyle. Analitik düşünce yapımı sadece kod yazarken değil, makroekonomik verileri okurken ve yüksek büyüme potansiyeli olan teknoloji/havacılık şirketlerinin grafiklerini incelerken de kullanıyorum.</p>
            </div>
            <hr />
            <div className="info-section">
              <BorsaTerminali />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// GÜNCELLENEN MUZIK PANELI: Çubukların kaybolma hatası çözüldü
export function MuzikPaneli({ acikKutu, kutuAc, kutuKapat, kasetCaliyor, kasetGecis, kasetSesNesnesi }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // ANA SPEKTRUM MOTORU (Kalıcı ve Hata Dayanıklı)
  useEffect(() => {
    let loopAktif = true;

    const spektrumuCiz = () => {
      // 1. Temel Kontroller
      if (!loopAktif || !canvasRef.current || !kasetCaliyor || !kasetSesNesnesi) return;
      animationRef.current = requestAnimationFrame(spektrumuCiz);

      // 2. Global Ses Motorunu Kur (Sadece Bir Kez Çalışır)
      if (!window.sabitSesSpektrumu) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const ctx = new AudioContext();
          
          // Ses Analizörü
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64; // Çubuk sayısı (Daha az, daha performanslı)

          // Kaynak (Kaset ses nesnesi)
          // ÖNEMLİ: Kaset nesnesini sadece bir kez bağlıyoruz
          const source = ctx.createMediaElementSource(kasetSesNesnesi);
          source.connect(analyser);
          analyser.connect(ctx.destination);

          // Motoru global hafızaya kaydet
          window.sabitSesSpektrumu = { ctx, analyser, source, dataArray: new Uint8Array(analyser.frequencyBinCount) };
          console.log("Ses spektrum motoru kalıcı olarak kuruldu.");
        } catch (e) {
          console.warn("Ses motoru kurulamadı (Kaset çalar bağlı değil):", e);
          return;
        }
      }

      // 3. Çizim Başlangıcı
      const canvas = canvasRef.current;
      const ctx2d = canvas.getContext('2d');
      const { analyser, dataArray } = window.sabitSesSpektrumu;
      const bufferLength = analyser.frequencyBinCount;

      // Ses verilerini al
      analyser.getByteFrequencyData(dataArray);

      // Canvası temizle
      ctx2d.fillStyle = '#0a0a0a';
      ctx2d.fillRect(0, 0, canvas.width, canvas.height);

      // Çubukları çiz
      const barWidth = (canvas.width / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Yüksekliği ses şiddetine göre hesapla
        barHeight = dataArray[i] / 1.6;
        if (barHeight > 0) {
          // Renk geçişi (Turuncudan Sarıya)
          const gradient = ctx2d.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
          gradient.addColorStop(0, '#ff5500');
          gradient.addColorStop(0.5, '#ff7800');
          gradient.addColorStop(1, '#ffaa00');
          ctx2d.fillStyle = gradient;
          
          // Çubuğu çiz
          ctx2d.fillRect(x, canvas.height - barHeight, barWidth - 3, barHeight);
        }
        x += barWidth;
      }
    };

    // Panel açıksa ve kaset çalıyorsa çizime başla
    if (acikKutu === 'mp3' && kasetCaliyor) {
      // Eğer AudioContext kapalıysa (mobil engel), açılmasını dene
      if (window.sabitSesSpektrumu && window.sabitSesSpektrumu.ctx.state === 'suspended') {
        window.sabitSesSpektrumu.ctx.resume();
      }
      requestAnimationFrame(spektrumuCiz);
    } else {
      // Değilse çizim döngüsünü durdur
      cancelAnimationFrame(animationRef.current);
    }

    // Temizlik Motoru
    return () => {
      loopAktif = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [acikKutu, kasetCaliyor, kasetSesNesnesi]);

  return (
    <div className={`morph-object ${acikKutu === 'mp3' ? 'active' : ''}`} id="mp3" onClick={() => acikKutu !== 'mp3' && kutuAc('mp3')}>
      {acikKutu === 'mp3' && (
        <motion.div className="content-inside" {...pencereAnimasyonu}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
          <h2>Frekanstaki İzler</h2>
          <div className="scrollable-content">
            <div className="info-section">
              <h3>🎧 Spektrum ve Ruh Hali</h3>
              <p>Müzik benim için sadece bir arka plan gürültüsü değil; zihnimin çalışma frekansını belirleyen bir işletim sistemi bileşenidir. Ağır kod mimarilerinde klasik müziğin matematiğine sığınırken, rekabetin ve disiplinin tavan yaptığı anlarda metal, rock ve tekno frekanslarına geçerim.</p>
            </div>
            <hr />
            <div className="info-section undertale-box">
              <p className="undertale-text">*Yatağın üzerinde eski bir kasetçalar duruyor...</p>
              <p className="undertale-text" style={{ color: '#ffaa00' }}>* Bir kaset takılı. Bunu çalmak ister misin?</p>
              
              {/* Çubukların Çizildiği Alan */}
              <div style={{ width: '100%', display: kasetCaliyor ? 'flex' : 'none', justifyContent: 'center', margin: '20px 0 10px 0' }}>
                <canvas ref={canvasRef} width={300} height={100} style={{ background: '#0a0a0a', borderRadius: '6px', border: '1px solid rgba(255,120,0,0.3)' }} />
              </div>

              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button id="cassette-btn" className="cyber-btn undertale-btn" onClick={(e) => { e.stopPropagation(); kasetGecis(); }}>
                  {kasetCaliyor ? "[ ⏹️ Kaseti Durdur ]" : "[ 🎚️ Kaseti Çal ]"}
                </button>
              </div>
              <p className="undertale-subtext">* Müziği kapatmak istersen buraya dönüp kapat.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function KartvizitPaneli({ acikKutu, kutuAc, kutuKapat, kilitliMi, hataSesiCal, kalanEsya }) {
  const [uyarilar, setUyarilar] = useState([]);

  const handleTiklama = (e) => {
    if (acikKutu === 'card') return;

    if (kilitliMi) {
      e.stopPropagation();
      hataSesiCal();

      const yeniUyariID = Date.now() + Math.random();
      const uyariMetni = `⚠️ SİSTEM KİLİTLİ: ÖNCE KALAN ${kalanEsya} EŞYAYI KEŞFET!`;
      
      setUyarilar((prev) => [...prev, { id: yeniUyariID, text: uyariMetni }]);

      setTimeout(() => {
        setUyarilar((prev) => prev.filter((u) => u.id !== yeniUyariID));
      }, 2000);
      
    } else {
      kutuAc('card');
    }
  };

  return (
    <>
      <div className={`morph-object ${acikKutu === 'card' ? 'active' : ''}`} id="card" onClick={handleTiklama}>
        {acikKutu === 'card' && (
          <motion.div className="content-inside" {...pencereAnimasyonu}>
            <button className="close-btn" onClick={(e) => { e.stopPropagation(); kutuKapat(); }}>X</button>
            <h2>Ömer</h2>
            <p style={{ color: '#00ff88', fontWeight: 'bold', marginBottom: '15px' }}>Bilgisayar Mühendisliği Öğrencisi</p>
            
            {/* GÜNCELLENEN METİN ALANI */}
            <p style={{ marginBottom: '15px' }}>
              Zihnimi, projelerimi ve çalışma odamı sonuna kadar keşfettiğin için teşekkürler. Mühendislik dünyasındaki üretimlerime ortak olmak veya benimle iletişime geçmek istersen aşağıdaki kanalları kullanabilirsin.
            </p>
            <p style={{ color: '#ffaa00', fontStyle: 'italic', fontSize: '16px', marginBottom: '20px' }}>
              * Bu sayfayı mimari veya görsel olarak daha nasıl geliştirebileceğime dair fikirleriniz varsa, e-posta yoluyla bana iletmenizden büyük mutluluk duyarım.
            </p>

            <div className="contact-buttons">
              <a href="https://github.com/Omer-Sahin" target="_blank" rel="noreferrer" className="contact-btn">🌐 GitHub Profili</a>
              <a href="mailto:omer.sahin.ceng@gmail.com" className="contact-btn">✉️ E-Posta Gönder</a>
              <a href="https://www.linkedin.com/in/%C3%B6mer-%C5%9Fahin-042706418" target="_blank" rel="noreferrer" className="contact-btn">💼 LinkedIn</a>
            </div>
          </motion.div>
        )}
      </div>

      {uyarilar.map((uyari) => (
        <div key={uyari.id} className="floating-warning" style={{ top: '68%', left: '85%' }}>
          {uyari.text}
        </div>
      ))}
    </>
  );
}