import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AnalysisResultPage = () => {
  const reportRef = useRef();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      .bg-grid-light {
        background-size: 50px 50px;
        background-image:
          linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
      }
      
      @media print {
        .no-print { display: none !important; }
        .print-only { display: block !important; }
        body { background-color: white !important; color: black !important; }
        .glass-card { background: white !important; border: 1px solid #eee !important; color: black !important; box-shadow: none !important; }
      }
    `;
    document.head.appendChild(style);
    
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#030712';
    
    return () => {
      document.head.removeChild(style);
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const generatePDF = async () => {
    const element = reportRef.current;
    
    // Temporarily apply white theme for PDF capture
    const originalStyle = element.getAttribute('style');
    const isDark = document.documentElement.classList.contains('dark');
    
    // Force a clean white look for PDF
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('report-content');
        clonedElement.style.background = 'white';
        clonedElement.style.color = 'black';
        clonedElement.querySelectorAll('*').forEach(el => {
            el.style.color = 'black';
            if (el.classList.contains('bg-white/5') || el.classList.contains('bg-cyan-500/10') || el.classList.contains('bg-white/[0.03]')) {
                el.style.background = '#f9fafb';
                el.style.borderColor = '#e5e7eb';
            }
            if (el.classList.contains('text-cyan-400') || el.classList.contains('text-cyan-500/80')) {
                el.style.color = '#1152d4';
            }
        });
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('RetinAL-Analiz-Raporu.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#030712' }}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-light pointer-events-none opacity-40 no-print"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none no-print">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-950/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/20 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md px-6 py-4 lg:px-10 no-print">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center text-cyan-400">
            <span className="material-symbols-outlined text-3xl">visibility</span>
          </div>
          <h2 className="text-xl font-light tracking-[0.2em] text-white">
            Retin<span className="font-bold text-cyan-400">AL</span>
          </h2>
        </div>
        <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center justify-center rounded-lg h-10 bg-white/5 border border-white/10 text-white gap-2 text-sm font-bold px-4 hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[20px]">print</span>
              <span className="hidden sm:inline">Yazdır</span>
            </button>
            <button 
              onClick={generatePDF}
              className="flex items-center justify-center rounded-lg h-10 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 gap-2 text-sm font-bold px-4 hover:bg-cyan-500/30 transition-colors backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span className="hidden sm:inline">İndir</span>
            </button>
            <button 
              onClick={generatePDF}
              className="flex items-center justify-center rounded-lg h-10 bg-white/5 border border-white/10 text-white gap-2 text-sm font-bold px-4 hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              <span className="hidden sm:inline">Paylaş</span>
            </button>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 justify-center py-8 px-4 md:px-0">
        <div id="report-content" ref={reportRef} className="flex flex-col max-w-[960px] flex-1 bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden mb-8 glass-card">
            {/* Report Header */}
            <div className="p-8 border-b border-white/10">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Analiz Sonucun</span>
                        <h1 className="text-white text-4xl font-black leading-tight tracking-tight">Göz Sağlığı Görünümü</h1>
                        <p className="text-slate-400 font-light text-base">Yapay Zeka Destekli Kişisel Sağlık Rehberi</p>
                    </div>
                </div>
                {/* Patient Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-white/10">
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">Kullanıcı</p>
                        <p className="text-white text-base font-medium">Ahmet Yılmaz</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">Doğum Tarihi</p>
                        <p className="text-white text-base font-medium">12.05.1978</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">Analiz Tarihi</p>
                        <p className="text-white text-base font-medium">24.05.2024</p>
                    </div>
                </div>
            </div>

            {/* Analysis Results */}
            <div className="p-8 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-cyan-400">analytics</span>
                        <h2 className="text-white text-xl font-bold tracking-tight">Model Sonucu</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <div className="flex flex-col gap-3 rounded-xl p-6 bg-cyan-500/10 border border-cyan-500/20">
                            <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest">Genel Risk Durumu</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-cyan-400 text-3xl font-black leading-tight">%85</p>
                                <p className="text-cyan-400 font-bold">Yüksek Risk</p>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                                <div className="bg-cyan-400 h-2 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.4)]" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Insight Section */}
                <section className="bg-white/5 rounded-xl p-8 border border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-cyan-400">psychology</span>
                        <h2 className="text-white text-xl font-bold tracking-tight">Yapay Zeka Yorumu</h2>
                    </div>
                    <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
                        <p>
                            Yapılan göz dibi görüntüsü analizi sonucunda, retina üzerinde yapısal değişimler gözlemlenmiştir. Sinir tabakası bölgelerinde belirgin incelmeler saptanmıştır.
                        </p>
                        <div className="bg-white/5 p-6 rounded-lg border-l-4 border-cyan-400">
                            <p className="italic text-slate-200">
                                "Görüntülerdeki damar yapılarında kayma ve doku değişimleri mevcuttur. %85'lik yüksek risk puanı, bu yapısal değişimlerle doğrudan ilişkilidir."
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-3">
                                <h4 className="font-medium text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-cyan-400">stars</span>
                                    Dikkat Çeken Noktalar
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-base ml-2 text-slate-400">
                                    <li>Göz dibi derinliğinde artış</li>
                                    <li>Sinir lifi tabakasında zayıflama</li>
                                    <li>Damar yapısında belirginleşme</li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-medium text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-cyan-400">lightbulb</span>
                                    Sonraki Adımlar
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-base ml-2 text-slate-400">
                                    <li>Göz tansiyonu kontrolü</li>
                                    <li>Uzman görüşü almanız önerilir</li>
                                    <li>Düzenli takip planı oluşturun</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Analysis Images */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-cyan-400">image</span>
                        <h2 className="text-white text-xl font-bold tracking-tight">Analiz Edilen Görüntü</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="relative group overflow-hidden rounded-lg border border-white/10">
                            <img alt="Fundus Image" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCipCPFITFtCHaJ9ru8TV9iz0f_IGM0D2a0dJJECFzaHttFigWooIyfe_MQgolI2zv-VIzlupLEAE2fY6SMqhpi5Ufqjxjv4o3csnFcRGJRarix0KfuGESyNE8prdzsvE4xnCuKBRgLTSXxo9fBDiIXDt0bxl3xTrMPV67mzz-M-EbcIr5s9Ipy6oX413wv67XXPsIz8p-M6B3LYMn4VuvqgUDbtO76qY_1Jpztr6xT-EF1zQs8PPdVRzlqaMUP844nrjtog5j__mf3"/>
                            <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay pointer-events-none"></div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer inside the card */}
            <div className="p-8 bg-white/5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-cyan-400 bg-cyan-400/10 p-2 rounded-full">info</span>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                        Bu analiz RetinAL yapay zeka teknolojisi kullanılarak oluşturulmuştur.<br/>
                        Sonuçlar bilgilendirme amaçlıdır ve profesyonel tıbbi teşhis yerine geçmez.
                    </p>
                </div>
                <div className="text-cyan-400 font-bold tracking-widest text-sm uppercase">
                    RetinAL Sağlık Insight
                </div>
            </div>
        </div>
      </main>

      <footer className="relative z-10 mt-auto border-t border-white/5 bg-black/40 px-10 py-8 backdrop-blur-sm no-print">
        <p className="text-center text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
          SECURE MEDICAL PROTOCOL // DIAGNOSTICS READY // © 2024 RetinAL
        </p>
      </footer>
    </div>
  );
};

export default AnalysisResultPage;
