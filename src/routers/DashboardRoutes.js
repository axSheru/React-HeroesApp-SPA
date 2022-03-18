import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { DCScreen } from '../components/dc/DCScreen';
import { HeroScreen } from '../components/hero/HeroScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from "../ui/Navbar";

export const DashboardRoutes = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="marvel" element={<MarvelScreen />} />
            <Route path="dc" element={<DCScreen />} />

            <Route path="search" element={<SearchScreen />} />
            <Route path="hero" element={<HeroScreen />} />

            <Route path="/" element={<MarvelScreen />} />
        </Routes>
    </>
  )
}