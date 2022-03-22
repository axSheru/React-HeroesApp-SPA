import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en el <LoginScreen />', () => {

    const contextValue = {
        user: {
            logged: false,
        },
        dispatch: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <Routes>
                    <Route path="login" element={ <LoginScreen /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('debe de hacer match con el snapshot.', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de realizar el dispatch y la navegación.', () => {

        const handleClick = wrapper.find( 'button' ).prop( 'onClick' );
        
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
              name: 'Alex',
            } });

        expect( mockNavigate ).toHaveBeenCalledWith( '/', { replace: true });

        localStorage.setItem( 'lastPath', '/dc' );

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith( '/dc', { replace: true });

    });

});