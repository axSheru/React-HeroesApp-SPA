import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />

                <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoutes />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
