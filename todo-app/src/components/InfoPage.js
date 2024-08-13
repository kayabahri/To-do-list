import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InfoPage.css';
import Footer from './Footer';
import infoImage from '../assets/info.png'; // Görseli import ediyoruz

const InfoPage = ({ onProceed }) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    onProceed();
    navigate('/');
  };

  return (
    <div className="info-page-container"> {/* Yeni sınıf eklendi */}
      <div className="info-page">
        <section className="section section-1">
          <header className="info-header">
            <h1>Uygulamanıza Hoş Geldiniz!</h1>
            <p>Takım arkadaşlarınızla birlikte tüm görevlerinizi organize edin ve projelerinizi yönetin.</p>
            <button className="cta-button" onClick={handleProceed}>Panonuza Git</button>
          </header>
          <div className="info-illustration">
            <img src={infoImage} alt="Uygulama açıklama görseli" />
          </div>
        </section>
        <section className="section section-2">
          <div className="section-content">
            <h2>Üretkenlik merkezi</h2>
            <p>Kolay, esnek ve güçlü. Herkesin ne yaptığını ve neler yapılması gerektiğini görmek için panoları, listeleri ve kartları kullanmanız yeterli.</p>
          </div>
        </section>
        <section className="section section-3">
          <div className="section-content">
            <h2>Çalışma sürecine yeni bir bakış</h2>
            <p>Takımınızı projenizi her açıdan görüntüleyin ve elinizdeki göreve yeni bir bakış açısı getirin.</p>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default InfoPage;
