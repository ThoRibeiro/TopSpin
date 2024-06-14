import React from 'react';
import './Presentation.css';

const Presentation: React.FC = () => {
  return (
    <section className="presentation">
      <h1>Nous aimons le ping-pong</h1>
      <p>
        À l'association de tennis de table de Lille, nous valorisons chaque joueur.
        Nous garantissons à nos membres toute l'expertise, les soins et la passion que nous avons à offrir.
        C'est cet engagement qui fait de nous ce que nous sommes.
      </p>
      <div className="presentation-buttons">
        <button>En savoir plus</button>
        <button>Rejoignez-nous</button>
      </div>
    </section>
  );
}

export default Presentation;
