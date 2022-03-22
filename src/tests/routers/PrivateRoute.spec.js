import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    Navigate: () => <span>Redireccionando</span>
}));

describe('Pruebas en el router PrivateRoute.', () => {

    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si está autenticado y guardar en el localStorage.', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Anya'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper.text().trim() ).toBe( 'Private Component' );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', '/' );

    });

    test('debe de bloquear el acceso al componente si no está autenticado.', () => {

        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper.text().trim() ).toBe( 'Redireccionando' );

    });

});