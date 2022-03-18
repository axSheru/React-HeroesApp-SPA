import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export const PrivateRoute = ({ children }) => {
	//NOTE: En un high order component (componente con hijos) sus hijos pasan como props.

	const { user } = useContext( AuthContext );

	return user.logged
		? children
		: <Navigate to='/login' />;
}
