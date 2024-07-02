import React, { useEffect, useState } from "react";
import "./About.css";
import background from "../../assets/about-background.jpg";
import memberManageService from "../../services/memberService.ts";
import { Member } from "../../data/interfaces/Member.ts";
import Footer from "../../components/Footer/Footer.tsx";

const About: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await memberManageService.getAllMembers();
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="about">
      <div className="about-hero">
        <img className="about-hero-images" src={background} alt="Background" />
        <h1 className="about-title">À propos de TopSpin Lille</h1>
      </div>

      <div className="about-content">
        <div className="about-section">
          <p className="about-text">
            TopSpin Lille est une association dédiée à la promotion et à la pratique du tennis de table dans la région
            de Lille. Notre mission est de fournir une plateforme où les passionnés de ce sport peuvent se réunir,
            s'entraîner, et participer à des compétitions de tous niveaux.
          </p>
          <p className="about-text">
            Depuis notre création, nous avons travaillé sans relâche pour créer un environnement inclusif et accueillant
            pour tous nos membres, qu'ils soient débutants ou joueurs confirmés. Nous croyons fermement que le tennis de
            table est plus qu'un simple sport; c'est un moyen de développer des compétences, de la discipline, et de
            créer des amitiés durables.
          </p>
        </div>

        <div className="stats-section">
          <div className="stats-numbers">
            <div className="stat-item">
              <div className="number">10</div>
              <div className="label">Années de création</div>
            </div>
            <div className="stat-item">
              <div className="number">200</div>
              <div className="label">Membres par an</div>
            </div>
            <div className="stat-item">
              <div className="number">1</div>
              <div className="label">Salle avec 40 tables de ping pong</div>
            </div>
            <div className="stat-item">
              <div className="number">4</div>
              <div className="label">Catégories d'âge</div>
            </div>
          </div>
          <div className="stats-text">
            <h2 className="about-subtitle">Nos Activités</h2>
            <p className="about-text">
              Nous organisons régulièrement des entraînements, des tournois, et des événements sociaux pour nos membres.
              Nos coachs expérimentés sont là pour aider chaque joueur à atteindre ses objectifs...
            </p>
            <p className="about-text">
              En plus des entraînements et des compétitions, nous nous engageons à promouvoir le tennis de table dans
              les écoles et les communautés locales, en offrant des sessions de découverte et des programmes de
              formation pour les jeunes.
            </p>
          </div>
        </div>
        <div className="title-members">
          <h2> Les membres de notre association </h2>
        </div>
        <div className="members-section">
        {members.map((member) => (
            <div className="member-card" key={member._id}>
              <div className="member-image-container">
                <img className="member-image" src={member.image} alt={`${member.firstname} ${member.lastname}`} />
                <div className="member-role">{member.role}</div>
              </div>
              <div className="member-details">
                <h3 className="member-name">{member.firstname} {member.lastname}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
