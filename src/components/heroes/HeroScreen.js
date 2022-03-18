import { Navigate, useParams } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
	
	const { heroId } = useParams();

	const hero = getHeroById( heroId );

	if ( ! hero ) {
		return <Navigate to='/' />
	}

	console.log( hero )

	return (
		<div>
			<h1>{ hero.superhero }</h1>
		</div>
	);
}
  