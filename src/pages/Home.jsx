
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()


	const people = async () => {
		try {
			await fetch('https://www.swapi.tech/api/people')
				.then(response => response.json())
				.then(data => dispatch({ type: 'SET_PEOPLE', payload: data.results }))
		} catch (error) {
			console.error('Error fetching people:', error);
		}
	}
	useEffect(() => {
		people()
	}, [])
	
	const planets = async () => {
		try {
			await fetch('https://www.swapi.tech/api/planets')
				.then(response => response.json())
				.then(data => dispatch({ type: 'SET_PLANETS', payload: data.results }))
		} catch (error) {
			console.error('Error fetching planets:', error);
		}
	}
	useEffect(() => {
		planets()
	}, []) 

	

	const films = async () => {
		try {
			await fetch('https://www.swapi.tech/api/films')
				.then(response => response.json())
				.then(data => dispatch({ type: 'SET_FILMS', payload: data.result }))
		} catch (error) {
			console.error('Error fetching films:', error);
		}
	}
	useEffect(() => {
		films()
	}, []) 

	console.log(store.films);

	return (
		<div className="container-fluid d-flex flex-column justify-content-center align-items-center">


			<h2 className="text-white m-3">Persons</h2>
			<div id="carouselExampleIndicators" className="carousel slide w-100 h-100 m-3 mb-5">


				<div className="carousel-inner ">
					{store.people.map((person, index) => (
						<div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
							<div className="card mx-auto" style={{ width: 18 + 'rem' }}>
								<img src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${index + 1}.jpg`} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{person.name}</h5>
									<Link to={`/people/${index + 1}`}>
										<button className="btn btn-primary">Details</button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>

			</div>


			<h2 className="text-white m-3 mt-5">Planets</h2>
			<div id="carouselExampleIndicators2" className="carousel slide w-100 h-100 m-3 mb-5">


				<div className="carousel-inner ">
					{store.planets.map((planet, index) => (
						<div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
							<div className="card mx-auto" style={{ width: 18 + 'rem' }}>
								<img src={store.imagesPlanets[index]} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{planet.name}</h5>
									<Link to={`/planets/${index + 1}`}>
										<button className="btn btn-primary">Details</button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>

			</div>

			<h2 className="text-white m-3">Films</h2>
			<div id="carouselExampleIndicators3" className="carousel slide w-100 h-100 m-3 mb-5">


				<div className="carousel-inner ">
					{store.films.map((films, index) => (
						<div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
							<div className="card mx-auto" style={{ width: 18 + 'rem' }}>
								<img src={store.imagesFilms[index]} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{films.properties.title}</h5>
									<Link to={`/films/${index + 1}`}>
										<button className="btn btn-primary">Details</button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>

			</div>
		</div>
	);

}; 