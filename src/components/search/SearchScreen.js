import { useForm } from "../../hooks/useForm";

export const SearchScreen = () => {

	const [ formValues, handleInputChange, reset ] = useForm({
		searchText: '',
	});

	const { searchText } = formValues;

	const handleSearch = ( e ) => {
		e.preventDefault();
		console.log( searchText )
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
			</div>
		</>
    )
  }
  