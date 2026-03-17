import React, { useEffect } from 'react';

const NewAnalysisPage = () => {
  useEffect(() => {
    // Apply global fonts and styles consistent with HomePage
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      .bg-grid-light {
        background-size: 50px 50px;
        background-image:
          linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
      }
    `;
    document.head.appendChild(style);
    
    // Set a consistent light-dark theme for the body (not too dark, matching first page's spirit)
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#030712'; // Keep it dark but the content will use glassmorphism
    
    return () => {
      document.head.removeChild(style);
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#030712' }}>
      {/* Background elements consistent with HomePage */}
      <div className="absolute inset-0 bg-grid-light pointer-events-none opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-950/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/20 blur-[120px]"></div>
      </div>

      {/* Header - Glassmorphism */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center text-cyan-400">
            <span className="material-symbols-outlined text-3xl">visibility</span>
          </div>
          <h2 className="text-xl font-light tracking-[0.2em] text-white">
            Retin<span className="font-bold text-cyan-400">AL</span>
          </h2>
        </div>

      </header>

      <main className="relative z-10 flex-1 px-6 py-8 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl tracking-tight mb-2">
              <span className="font-bold text-cyan-400">Yeni Analiz Oluştur</span>
            </h1>
            <p className="text-slate-400 max-w-2xl font-light">Kişisel bilgilerinizi giriniz ve göz (retina) görüntünüzü yükleyerek analizi başlatınız.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Section: Information */}
            <section className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm p-8 shadow-2xl transition-all hover:bg-white/[0.05]">
              <div className="mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                <span className="material-symbols-outlined text-cyan-400">person</span>
                <h2 className="text-lg font-medium tracking-wide text-white">Kişisel Bilgiler</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-500/80">Ad</label>
                    <input className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none transition-all placeholder:text-slate-600" placeholder="Adınız" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-500/80">Soyad</label>
                    <input className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none transition-all placeholder:text-slate-600" placeholder="Soyadınız" type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-500/80">Yaş</label>
                    <input className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none transition-all placeholder:text-slate-600" placeholder="Örn: 45" type="number" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-500/80">Cinsiyet</label>
                    <select className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none transition-all appearance-none cursor-pointer">
                      <option className="bg-slate-900" value="">Seçiniz</option>
                      <option className="bg-slate-900" value="erkek">Erkek</option>
                      <option className="bg-slate-900" value="kadin">Kadın</option>
                      <option className="bg-slate-900" value="diger">Diğer</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Section: Eye Image */}
            <section className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm p-8 shadow-2xl transition-all hover:bg-white/[0.05]">
              <div className="mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                <span className="material-symbols-outlined text-cyan-400">visibility</span>
                <h2 className="text-lg font-medium tracking-wide text-white">Göz Görüntüsü (Retina)</h2>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="group relative aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-4 border-cyan-500/20 bg-slate-900 shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400/40">
                  <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Close up of a human eye retina fundus scan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQes98Jgl4LN-V9Tsc6Q1L0OQUUiiAKhFD8Ivi31tJ8RVMRYeEUeRFJDx6pK8CZulD3vr-pMDI0t4e5xkX0C_NpfYt4zuZLESUAknNxEjd1iz7_AcbMO8knCnUJx6oAkPqszMOheo6LTrGcQxMqh4UMPt1LSSJKNndmERQm-PGs64iUfmjMh_4FVUMe23yj5Ypk3sgLwfncx_DXUY_QLa12cWePS7YYK6CWAaBIIN_5fslaPEbtINHAUdyehCtt-9suDQDfh5XxZCj" alt="Retina" />
                  <div className="absolute inset-0 flex items-center justify-center bg-cyan-950/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white text-4xl">add_a_photo</span>
                  </div>
                  {/* Scan effect placeholder consistent with HomePage eye */}
                  <div className="absolute inset-0 pointer-events-none border border-cyan-400/20 rounded-full animate-pulse"></div>
                </div>
                <button className="mt-8 flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-8 py-3 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/10 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-lg">sync</span>
                  Görseli Değiştir
                </button>
              </div>
            </section>
          </div>

          {/* Bottom Section: AI Analysis Output */}
          <div className="mt-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm p-8 shadow-2xl">
            <div className="mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="material-symbols-outlined text-cyan-400">psychology</span>
              <h2 className="text-lg font-medium tracking-wide text-white">Akıllı Analiz Sonucu</h2>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-[0.15em] text-cyan-500/80">Analiz Özeti</label>
                <textarea className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 focus:border-cyan-400 outline-none transition-all italic placeholder:text-slate-600" placeholder="Analiz yapıldıktan sonra sonuçlar burada görüntülenecektir..." rows="4"></textarea>
              </div>

              <div className="flex justify-center lg:justify-end">
                <button className="flex items-center gap-3 rounded-full bg-cyan-600 hover:bg-cyan-500 px-12 py-4 text-base font-bold text-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.05] active:scale-[0.95] transition-all">
                  <span className="material-symbols-outlined">analytics</span>
                  ANALİZİ BAŞLAT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-auto border-t border-white/5 bg-black/40 px-10 py-8 backdrop-blur-sm">
        <p className="text-center text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
          SECURE MEDICAL PROTOCOL // DIAGNOSTICS READY // © 2024 RetinAL
        </p>
      </footer>
    </div>
  );
};

export default NewAnalysisPage;
