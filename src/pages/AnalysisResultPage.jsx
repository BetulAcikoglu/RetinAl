import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const AnalysisResultPage = () => {
  const reportRef = useRef();
  
  const rawScore = parseFloat(localStorage.getItem("riskScore")); // 0-1 arası model çıktısı
  const [riskScore, setRiskScore] = useState(Math.round(rawScore)); // % şeklinde
  const [riskLabel, setRiskLabel] = useState(rawScore > 50 ? "Glaucoma" : "Normal");
  const [patientInfo, setPatientInfo] = useState({
    name: localStorage.getItem("patientName"),
    surname: localStorage.getItem("patientSurname"),
    tc: localStorage.getItem("patientTcNo"),
    dob: localStorage.getItem("patientDob"),
    gender: localStorage.getItem("patientGender") || "-",
    analysisDate: new Date().toLocaleDateString("tr-TR"),
  });

  const patientImage = localStorage.getItem("patientImage") || "https://via.placeholder.com/400";

  const [llmReport, setLlmReport] = useState(
    localStorage.getItem("report") || "Rapor hazırlanırken bir hata oluştu."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
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

  // Risk seviyesine göre renk belirleme fonksiyonu
  const getRiskColors = (score) => {
    if (score >= 70) {
      return { 
        text: 'text-red-500', 
        bg: 'bg-red-500/10', 
        border: 'border-red-500/20', 
        bar: 'bg-red-500',
        label: 'Yüksek Risk' 
      };
    } else if (score >= 40) {
      return { 
        text: 'text-yellow-500', 
        bg: 'bg-yellow-500/10', 
        border: 'border-yellow-500/20', 
        bar: 'bg-yellow-500',
        label: 'Orta Risk' 
      };
    } else {
      return { 
        text: 'text-green-500', 
        bg: 'bg-green-500/10', 
        border: 'border-green-500/20', 
        bar: 'bg-green-500',
        label: 'Düşük Risk' 
      };
    }
  };

  const riskStyles = getRiskColors(riskScore);
  const displayLabel = riskLabel === "Glaucoma" ? riskStyles.label : "Düşük Risk"; 

  const generatePDF = async () => {
    const element = reportRef.current;
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
        });
        // PDF'de ikon ve metin renklerini korumak için manuel atamalar gerekebilir
        const riskBox = clonedDoc.querySelector('.risk-container');
        if (riskBox) riskBox.style.borderColor = '#fee2e2'; // High risk için örnek
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('RetinAI-Analiz-Raporu.pdf');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RetinAI Göz Analiz Raporu',
          text: 'RetinAI yapay zeka tarafından hazırlanan göz sağlığı raporumu inceleyin.',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi veya bir hata oluştu', error);
      }
    } else {
      // Web Share API desteklenmiyorsa linki kopyala
      navigator.clipboard.writeText(window.location.href);
      alert('Paylaşım bağlantısı kopyalandı!');
    }
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
            Retin<span className="font-bold text-cyan-400">AI</span>
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
              onClick={handleShare}
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
                        <p className="text-white text-base font-medium">{patientInfo.name} {patientInfo.surname}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">Doğum Tarihi</p>
                        <p className="text-white text-base font-medium">{patientInfo.dob}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">T.C. Kimlik No</p>
                        <p className="text-white text-base font-medium">{patientInfo.tc || "----------"}</p>
</div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">Cinsiyet</p>
                        <p className="text-white text-base font-medium capitalize">{patientInfo.gender}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cyan-500/80 text-xs font-bold uppercase tracking-widest">Analiz Tarihi</p>
                        <p className="text-white text-base font-medium">{patientInfo.analysisDate}</p>
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
                    <div className="grid grid-cols-1 gap-4">
                        <div className={`risk-container flex flex-col gap-3 rounded-xl p-6 ${riskStyles.bg} border ${riskStyles.border}`}>
                            <p className={`${riskStyles.text} text-sm font-bold uppercase tracking-widest`}>Genel Risk Durumu</p>
                            <div className="flex items-baseline gap-2">
                                <p className={`${riskStyles.text} text-3xl font-black leading-tight`}>%{riskScore}</p>
                                <p className={`${riskStyles.text} font-bold`}>{riskLabel} ({riskStyles.label})</p>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                                <div className={`${riskStyles.bar} h-2 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.2)]`} style={{ width: `${riskScore}%` }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Insight Section */}
                <section className="bg-white/5 rounded-xl p-8 border border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-cyan-400">psychology</span>
                        <h2 className="text-white text-xl font-bold tracking-tight">Ön Değerlendirme Yorumu</h2>
                    </div>
                    <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
                        <div className="whitespace-pre-wrap">
                          {llmReport}
                        </div>
                        
                        
                    </div>
                </section>

                {/* Analysis Images */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-cyan-400">image</span>
                        <h2 className="text-white text-xl font-bold tracking-tight">Analiz Edilen Görüntü</h2>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <div className="relative group overflow-hidden rounded-lg border border-white/10 w-full md:w-2/3 lg:w-1/2">
                            <img alt="Fundus Image" className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105" src={patientImage}/>
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
                        Bu analiz RetinAI yapay zeka teknolojisi kullanılarak oluşturulmuştur.<br/>
                        Sonuçlar bilgilendirme amaçlıdır ve profesyonel tıbbi teşhis yerine geçmez.
                    </p>
                </div>
            </div>
        </div>
      </main>

      <footer className="relative z-10 mt-auto border-t border-white/5 bg-black/40 px-10 py-8 backdrop-blur-sm no-print">
        <p className="text-center text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
          SECURE MEDICAL PROTOCOL // DIAGNOSTICS READY // © 2024 RetinAI
        </p>
      </footer>
    </div>
  );
};

export default AnalysisResultPage;
