import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InfoPage.css';
import Footer from './Footer';
import infoImage from '../assets/info.png';
import todosImage from '../assets/todoss.png';

const InfoPage = ({ onProceed }) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    onProceed();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.card, .pricing-card');
      cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 50) {
          card.classList.add('show');
          card.style.animationDelay = `${index * 0.2}s`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="info-page-container">
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
            <div className="cards">
              <div className="card">
                <h3>Panolar</h3>
                <p>ToDo panoları görevleri düzenli tutmanızı ve işleri ilerletmenizi sağlar.</p>
              </div>
              <div className="card">
                <h3>Listeler</h3>
                <p>Görevlerinizi farklı aşamalara ayırmak için listeleri kullanabilirsiniz.</p>
              </div>
              <div className="card">
                <h3>Kartlar</h3>
                <p>Her görevin detaylarını tutmak için kartlar kullanabilirsiniz.</p>
              </div>
            </div>
          </div>
          <div className="todos-illustration">
            <img src={todosImage} alt="ToDo uygulama örneği" />
          </div>
        </section>

        <section className="section section-3">
          <h2>Fiyatlandırma Planları</h2>
          <div className="pricing-table">
            <div className="pricing-card">
              <h3>Ücretsiz</h3>
              <div className="price">$0</div>
              <p>Herhangi bir projeyi organize etmek isteyen kişiler veya takımlar için.</p>
              <button className="cta-button">Kullanmaya Başla</button>
            </div>
            <div className="pricing-card">
              <h3>Standart</h3>
              <div className="price">$5</div>
              <p>İşleri yönetmesi ve iş birliğini ölçeklendirmesi gereken küçük takımlar için.</p>
              <button className="cta-button">Hemen Kaydolun</button>
            </div>
            <div className="pricing-card premium">
              <h3>Premium</h3>
              <div className="price">$10</div>
              <p>Çok sayıda projeyi panolar, zaman çizelgeleri, takvimler gibi çeşitli yollarla takip etmesi ve görselleştirmesi gereken takımlar için.</p>
              <button className="cta-button">Ücretsiz Deneyin</button>
            </div>
            <div className="pricing-card">
              <h3>Kurumsal</h3>
              <div className="price">$17.50</div>
              <p>Takımların çalışmalarını daha fazla güvenlik ve kontrol ile bir araya getirmek isteyen organizasyonlar için.</p>
              <button className="cta-button">Satış Birimiyle İletişime Geçin</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default InfoPage;
