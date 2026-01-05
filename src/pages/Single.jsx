// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component

import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Single component which displays individual item details.
export const Single = props => {
  // Access the global state using the custom hook.
  const { store, dispatch } = useGlobalReducer()
  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId } = useParams()

  const [itemDetails, setItemDetails] = useState(null);

  const favUrl = `/people/${theId}`;
  const isFav = store.Favorites?.some(f => f.url === favUrl);
  const toggleFavorite = () => {
    if (!itemDetails) return;
    if (isFav) dispatch({ type: 'REMOVE_FAVORITE', payload: favUrl });
    else dispatch({ type: 'ADD_FAVORITE', payload: { name: itemDetails?.properties?.name || `Person ${theId}`, url: favUrl } });
  }
  
  const details = async () => {
		try {
			await fetch(`https://www.swapi.tech/api/people/${theId}`)
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
            src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${theId}.jpg`}
            alt={itemDetails?.properties?.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 text-start">
          <h3>Details</h3>
          <p><strong>Height:</strong> {itemDetails?.properties?.height}</p>
          <p><strong>Mass:</strong> {itemDetails?.properties?.mass}</p>
          <p><strong>Hair Color:</strong> {itemDetails?.properties?.hair_color}</p>
          <p><strong>Skin Color:</strong> {itemDetails?.properties?.skin_color}</p>
          <p><strong>Eye Color:</strong> {itemDetails?.properties?.eye_color}</p>
          <p><strong>Birth Year:</strong> {itemDetails?.properties?.birth_year}</p>
          <p><strong>Gender:</strong> {itemDetails?.properties?.gender}</p>
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

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
