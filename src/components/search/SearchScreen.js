import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../heroes/HeroCard";

export const SearchScreen = () => {

	const navigate = useNavigate();
	const location = useLocation();

	const { q = '' } = queryString.parse( location.search );

	const [ formValues, handleInputChange ] = useForm({
		searchText: q,
	});

	const { searchText } = formValues;

	const heroes = getHeroesByName( q );

	const handleSearch = ( e ) => {
		e.preventDefault();
		navigate( `?q=${ searchText }` );
	};

    return (
		<>
			<h1>Búsquedas</h1>
			<hr />

			<div className="row">
				<div className="col-5">
					<h4>Buscar</h4>
					<hr />
					<form onSubmit={ handleSearch }>
						<input
							type="text"
							placeholder="Busca un héroe..."
							className="form-control"
							name="searchText"
							autoComplete="off"
							value={ searchText }
							onChange={ handleInputChange }
						/>
						<button
							type="submit"
							className="btn btn-outline-primary mt-1 btn-block"
						>
							Buscar...
						</button>
					</form>
				</div>
				<div className="col-7">
					<h4>Resultados</h4>
					<hr />
					{
						heroes.map( hero => (
							<HeroCard
								key={ hero.id }
								{ ...hero }
							/>
						))
					}
				</div>
			</div>
		</>
    )
  }
  