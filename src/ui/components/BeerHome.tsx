import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/src/ui/styles/BeerHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const BeerHome = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false); // Cierra el menú al hacer clic
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('.fade-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom >= 0) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };

    onScroll(); // Inicializa visibilidad
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ✅ Nuevo efecto: cerrar el menú si cambia a vista escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleCatalogClick = () => {
    router.push('/catalogo');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="beer-home">
      <nav className="navbar">
        <div className="logo">CERVECERIA</div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a onClick={(e) => scrollToSection(e, 'inicio')} href="#inicio">Inicio</a></li>
          <li><a onClick={(e) => scrollToSection(e, 'productos')} href="#productos">Cervezas</a></li>
          <li><a onClick={(e) => scrollToSection(e, 'nosotros')} href="#nosotros">Nosotros</a></li>
          <li><a onClick={(e) => scrollToSection(e, 'contacto')} href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <section id="inicio" className="hero-image fade-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Bienvenido a la cerveceria</h1>
          <p className="hero-text">Cerveza artesanal con alma rebelde</p>
        </div>
      </section>

      <section id="productos" className="products-section fade-section">
        <h2 className="section-title">Productos destacados</h2>
        <div className="product-rows">
          <div className="product-card">Producto 1</div>
          <div className="product-card">Producto 2</div>
          <div className="product-card">Producto 3</div>
        </div>
      </section>

      <section id="nosotros" className="brand-info fade-section">
        <h3>Sobre la cerveceria</h3>
        <p>Somos una cervecería artesanal con pasión por lo auténtico.</p>
      </section>

      <section id="contacto" className="footer fade-section">
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>

        <button className="catalog-button" onClick={handleCatalogClick}>
          Ver catálogo
        </button>

        <p>© 2025 Cervecería Artesanal. Todos los derechos reservados.</p>
      </section>
    </div>
  );
};

export default BeerHome;
