import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Works from './pages/Works';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Contact from './pages/Contact';
import Izvodaci from './pages/Izvodaci';
import IzvodacSingle from './pages/IzvodacSingle';
import PolitikaPrivatnosti from './pages/PolitikaPrivatnosti';
import PolitikaKolacica from './pages/PolitikaKolacica';

// Vježbe
import Products from './components/vjezbe/Products';
import Recipes from './components/vjezbe/Recipes';
import Posts from './components/vjezbe/Posts';
import Users from './components/vjezbe/Users';


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/izvodaci" element={<Izvodaci />} />
        <Route path="/izvodac/:slug" element={<IzvodacSingle />} />
        <Route path="/politika-privatnosti" element={<PolitikaPrivatnosti />} />
        <Route path="/politika-kolacica" element={<PolitikaKolacica />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;