// Import necessary components from react-router-dom and other parts of the application.
// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component

import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Demo component which displays individual item details.
export const Demo = props => {
  // Access the global state using the custom hook.
  const { store, dispatch } = useGlobalReducer()
  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId } = useParams()

  const [itemDetails, setItemDetails] = useState(null);

  const favUrl = `/planets/${theId}`;
  const isFav = store.Favorites?.some(f => f.url === favUrl);
  const toggleFavorite = () => {
    if (!itemDetails) return;
    if (isFav) dispatch({ type: 'REMOVE_FAVORITE', payload: favUrl });
    else dispatch({ type: 'ADD_FAVORITE', payload: { name: itemDetails?.properties?.name || `Planet ${theId}`, url: favUrl } });
  }
  
  const details = async () => {
		try {
			await fetch(`https://www.swapi.tech/api/planets/${theId}`)
				.then(response => response.json())
				.then(data => setItemDetails(data.result) )
		} catch (error) {
			console.error('Error fetching people:', error);
		}
	}
  useEffect(() => {
    details()
  }, [])

  return (
    <div className="container text-center text-white m-3">
      <h1 className="">{itemDetails?.properties?.name} <span className="ms-3"><button className={`btn ${isFav ? 'btn-danger' : 'btn-outline-warning'} btn-sm`} disabled={!itemDetails} onClick={toggleFavorite}>{isFav ? 'Remove favorite' : 'Add favorite'}</button></span></h1>
      <p className="mb-5">{itemDetails?.description}</p>
      <div className="row">
        <div className="col-md-6">
          <img
            src={store.imagesPlanets[theId - 1]}
            alt={itemDetails?.properties?.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 text-start">
          <h3>Details</h3>
          <p><strong>Diameter:</strong> {itemDetails?.properties?.diameter}</p>
          <p><strong>Rotation Period:</strong> {itemDetails?.properties?.rotation_period}</p>
          <p><strong>Orbital Period:</strong> {itemDetails?.properties?.orbital_period}</p>
          <p><strong>Gravity:</strong> {itemDetails?.properties?.gravity}</p>
          <p><strong>Population:</strong> {itemDetails?.properties?.population}</p>
          <p><strong>Climate:</strong> {itemDetails?.properties?.climate}</p>
          <p><strong>Terrain:</strong> {itemDetails?.properties?.terrain}</p>
          <p><strong>Surface Water:</strong> {itemDetails?.properties?.surface_water}</p>
        </div>
      </div>
      <Link to="/">
        <span className="btn btn-primary btn-lg m-3" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Demo.propTypes = {
  match: PropTypes.object
};