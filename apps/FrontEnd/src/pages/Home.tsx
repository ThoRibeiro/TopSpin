import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <main className="home">
      <div className="content">
        <h1>Association de Tennis de Table</h1>
        <p>Bienvenue sur le site officiel de notre association.</p>
        <div className="buttons">
          <button className="btn order">Voir Actualités</button>
          <button className="btn demo">Voir Événements</button>
        </div>
      </div>
    </main>
  );
}

export default Home;
