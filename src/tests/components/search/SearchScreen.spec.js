import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

// Creamos un mock de use navigate. Debe de llevar la palabra mock para poder ser accesado.
const mockNavigate = jest.fn();

// Creamos un mock de todo el react-router-dom.
jest.mock( 'react-router-dom', () => ({
    // Dispersamos el react-router-dom para decir que todo va a funcionar igual.
    ...jest.requireActual( 'react-router-dom' ),
    // Solamente sobreescribimos el useNavigate usando el mock del mismo que creamos anteriormente.
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <SearchScreen />', () => {

    test('debe de hacer match con el snapshot con valores por defecto.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.alert-info' ).text().trim() ).toBe( 'Buscar un héroe' );

    });

    test('debe de mostrar a Batman y el input con el valor del queryString.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find( 'input' ).prop( 'value' ) ).toBe( 'batman' );
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de mostrar un error si no se encuentra el héroe.', () => {

        const busqueda = 'batman123434234';

        const wrapper = mount(
            <MemoryRouter initialEntries={ [`/search?q=${ busqueda }`] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find( '.alert-danger' ).text().trim() ).toBe( `No hay resultados para: ${ busqueda }` );

    });

    test('debe de llamar al navigate() con la nueva URL.', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        const searchValue = 'batman';

        // Escribimos 'batman' en el input.
        wrapper.find( 'input' ).simulate( 'change', {
            target: {
                name: 'searchText',
                value: searchValue
            }
        });

        // Simulamos el envío del formulario.
        wrapper.find( 'form' ).prop( 'onSubmit' )({
            preventDefault: () => {}
            // preventDefault(){} Alternativa.
        });

        expect( mockNavigate ).toHaveBeenCalled();
        expect( mockNavigate ).toHaveBeenCalledWith( `?q=${ searchValue }` );

    });

});