import { Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import './i18n';
import './styles/global.css';

function App() {
  return (
    <Suspense fallback={
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    }>
      <div className="app">
        <Header />
        <main className="main-content">
          <Home />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;