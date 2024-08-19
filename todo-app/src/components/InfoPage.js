import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InfoPage.css';
import Footer from './Footer';
import infoImage from '../assets/info.png';
import todosImage from '../assets/todoss.png';
import { useTranslation } from 'react-i18next';

const InfoPage = ({ onProceed }) => {
  const { t } = useTranslation();
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
            <h1>{t("Welcome to Your Application!")}</h1>
            <p>{t("Organize all your opinions together with your teammates and manage your projects.")}</p>
            <button className="cta-button" onClick={handleProceed}>{t("Go To Your Dashboard")}</button>
          </header>
          <div className="info-illustration">
            <img src={infoImage} alt="Application overview image" />
          </div>
        </section>

        <section className="section section-2">
          <div className="section-content">
            <h2>{t("Productivity center")}</h2>
            <p>{t("Easy, flexible and strong. Just use the boards, lists, and cards to see what everyone is doing and what needs to be done.")}</p>
            <div className="cards">
              <div className="card">
                <h3>{t("Boards")}</h3>
                <p>{t("ToDo dashboards allow you to keep tasks organized and keep things moving forward.")}</p>
              </div>
              <div className="card">
                <h3>{t("Lists")}</h3>
                <p>{t("You can use lists to divide your tasks into different stages.")}</p>
              </div>
              <div className="card">
                <h3>{t("Cards")}</h3>
                <p>{t("You can use cards to keep the details of each task.")}</p>
              </div>
            </div>
          </div>
          <div className="todos-illustration">
            <img src={todosImage} alt="ToDo app example" />
          </div>
        </section>

        <section className="section section-3">
          <h2>{t("Pricing Plans")}</h2>
          <div className="pricing-table">
            <div className="pricing-card">
              <h3>{t("Free")}</h3>
              <div className="price">$0</div>
              <p>{t("For people or teams who want to organize any project.")}</p>
              <button className="cta-button">{t("Start Using")}</button>
            </div>
            <div className="pricing-card">
              <h3>{t("Standard")}</h3>
              <div className="price">$5</div>
              <p>{t("For small teams that need to manage jobs and scale up collaboration.")}</p>
              <button className="cta-button">{t("Register Now")}</button>
            </div>
            <div className="pricing-card premium">
              <h3>{t("Premium")}</h3>
              <div className="price">$10</div>
              <p>{t("For teams that need to track and visualize a large number of projects in various ways, such as dashboards, timelines, calendars.")}</p>
              <button className="cta-button">{t("Try It for Free")}</button>
            </div>
            <div className="pricing-card">
              <h3>{t("Enterprise")}</h3>
              <div className="price">$17.50</div>
              <p>{t("For organizations that want to Decouple the work of teams with more security and control.")}</p>
              <button className="cta-button">{t("Contact the Sales Department")}</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default InfoPage;
