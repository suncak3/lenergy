import { Suspense, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Products from './pages/Products';
import './i18n';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Function to handle page changes with optional category
  const handlePageChange = (page, category = null) => {
    setCurrentPage(page);
    if (page === 'products' && category) {
      setSelectedCategory(category);
    } else if (page !== 'products') {
      setSelectedCategory('all');
    }
  };

  // Function to render the current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'contact':
        return <Contact onPageChange={handlePageChange} />;
      case 'about':
        return <About onPageChange={handlePageChange} />;
      case 'products':
        return <Products onPageChange={handlePageChange} initialCategory={selectedCategory} />;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <Suspense fallback={
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    }>
      <div className="app">
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        <main className="main-content">
          {renderCurrentPage()}
        </main>
        <Footer currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </Suspense>
  );
}

export default App;