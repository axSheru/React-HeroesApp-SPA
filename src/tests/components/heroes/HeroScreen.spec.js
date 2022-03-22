import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

const mockNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en el <HeroScreen />.', () => {

    test('debe de hacer match con el snapshot.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] } >
                <Routes>
                    <Route path="/hero" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find( 'h1' ).text().trim() ).toBe( 'No hero page' );

    });

    test('debe de mostrar un héroe si el parámetro existe y es válido.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] } >
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find( '.row' ) ).toBeTruthy();

    });

    test('no debe de mostrar un héroe si el parámetro existe pero no es válido.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-fake'] } >
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find( 'h1' ).text().trim() ).toBe( 'No hero page' );

    });

    test('debe de regresar a la pantalla anterior.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] } >
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen /> } />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find( 'button' ).prop( 'onClick' )();

        expect( mockNavigate ).toHaveBeenCalledWith( -1 );

    });

});