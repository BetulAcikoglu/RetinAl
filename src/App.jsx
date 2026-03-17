// src/App.jsx
import React from 'react';

function App() {
  return (
    <div className="flex h-full flex-col min-h-screen">
      {/* Top Navigation Bar - Light Theme */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="text-primary size-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">visibility</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">RetinAL</h2>
        </div>
        <div className="flex gap-3">
        </div>
      </header>

      <main className="flex-1 px-6 py-8 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-brand-deep">Yeni Analiz Oluştur</h1>
            <p className="mt-2 text-slate-500">Kişisel bilgilerinizi giriniz ve göz (retina) görüntünüzü yükleyerek analizi başlatınız.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Section: Information */}
            <section className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <span className="material-symbols-outlined text-brand-teal">person</span>
                <h2 className="text-xl font-bold text-brand-deep">Kişisel Bilgiler</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Ad</label>
                    <input className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all" placeholder="Adınız" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Soyad</label>
                    <input className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all" placeholder="Soyadınız" type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Yaş</label>
                    <input className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all" placeholder="Örn: 45" type="number" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Cinsiyet</label>
                    <select className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all">
                      <option value="">Seçiniz</option>
                      <option value="erkek">Erkek</option>
                      <option value="kadin">Kadın</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                </div>


              </div>
            </section>

            {/* Right Section: Eye Image */}
            <section className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <span className="material-symbols-outlined text-brand-teal">visibility</span>
                <h2 className="text-xl font-bold text-brand-deep">Göz Görüntüsü (Retina)</h2>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl bg-slate-100 ring-4 ring-brand-teal/5 transition-all hover:ring-brand-teal/20">
                  <img className="h-full w-full object-cover" data-alt="Close up of a human eye retina fundus scan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQes98Jgl4LN-V9Tsc6Q1L0OQUUiiAKhFD8Ivi31tJ8RVMRYeEUeRFJDx6pK8CZulD3vr-pMDI0t4e5xkX0C_NpfYt4zuZLESUAknNxEjd1iz7_AcbMO8knCnUJx6oAkPqszMOheo6LTrGcQxMqh4UMPt1LSSJKNndmERQm-PGs64iUfmjMh_4FVUMe23yj5Ypk3sgLwfncx_DXUY_QLa12cWePS7YYK6CWAaBIIN_5fslaPEbtINHAUdyehCtt-9suDQDfh5XxZCj" alt="Retina" />
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-deep/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-white text-4xl">add_a_photo</span>
                  </div>
                </div>
                <button className="mt-6 flex items-center gap-2 rounded-lg bg-brand-teal/10 px-6 py-2.5 text-sm font-bold text-brand-deep hover:bg-brand-teal/20 transition-colors">
                  <span className="material-symbols-outlined text-lg">sync</span>
                  Görseli Değiştir
                </button>
              </div>
            </section>
          </div>

          {/* Bottom Section: AI Analysis Output */}
          <div className="mt-8 rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-brand-teal">psychology</span>
              <h2 className="text-xl font-bold text-brand-deep">Akıllı Analiz Sonucu</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Analiz Özeti</label>
                <textarea className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all italic text-slate-500" placeholder="Analiz yapıldıktan sonra sonuçlar burada görüntülenecektir..." rows="4"></textarea>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 rounded-xl bg-brand-deep hover:bg-primary px-10 py-4 text-base font-bold text-white shadow-lg shadow-brand-deep/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined">analytics</span>
                  Tahmin Et
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto bg-white border-t border-slate-200 px-10 py-6">
        <p className="text-center text-xs font-medium text-slate-400">
          © 2024 RetinAL Akıllı Göz Sağlığı Sistemi - Bilgilendirme Amaçlıdır
        </p>
      </footer>
    </div>
  );
}

export default App;
