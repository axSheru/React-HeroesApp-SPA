import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { DCScreen } from '../components/dc/DCScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from "../ui/Navbar";

export const DashboardRoutes = () => {
  return (
    <>
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="marvel" element={<MarvelScreen />} />
                <Route path="dc" element={<DCScreen />} />

                <Route path="search" element={<SearchScreen />} />
                <Route path="hero/:heroId" element={<HeroScreen />} />

                <Route path="/" element={<MarvelScreen />} />
            </Routes>
        </div>
    </>
  )
}
