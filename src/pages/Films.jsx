import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component

import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react";

// Define and export the Films component which displays individual item details.
export const Films = props => {
  // Access the global state using the custom hook.
  const { store, dispatch } = useGlobalReducer()
  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId } = useParams()

  const favUrl = `/films/${theId}`;
  const isFav = store.Favorites?.some(f => f.url === favUrl);
  const toggleFavorite = () => {
    if (!itemDetails) return;
    if (isFav) dispatch({ type: 'REMOVE_FAVORITE', payload: favUrl });
    else dispatch({ type: 'ADD_FAVORITE', payload: { name: itemDetails?.properties?.title || `Film ${theId}`, url: favUrl } });
  }

  const [itemDetails, setItemDetails] = useState(null);
  
  const details = async () => {
        try {
            await fetch(`https://www.swapi.tech/api/films/${theId}`)
                .then(response => response.json())
                .then(data => setItemDetails(data.result) )
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    }
  useEffect(() => {
    details()
  }, [])

  return (
    <div className="container text-center text-white m-3">
      <h1 className="">{itemDetails?.properties?.title} <span className="ms-3"><button className={`btn ${isFav ? 'btn-danger' : 'btn-outline-warning'} btn-sm`} disabled={!itemDetails} onClick={toggleFavorite}>{isFav ? 'Remove favorite' : 'Add favorite'}</button></span></h1><span className="ms-3"><i></i></span>
      <p className="mb-5">{itemDetails?.description}</p>
      <div className="row">
        <div className="col-md-6">
          <img
            src={store.imagesFilms[theId - 1]}
            alt={itemDetails?.properties?.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 text-start">
          <h3>Details</h3>
            <p><strong>Episode ID:</strong> {itemDetails?.properties?.episode_id}</p>
            <p><strong>Director:</strong> {itemDetails?.properties?.director}</p>
            <p><strong>Producer:</strong> {itemDetails?.properties?.producer}</p>
            <p><strong>Release Date:</strong> {itemDetails?.properties?.release_date}</p>
            <p><strong>Opening Crawl:</strong> {itemDetails?.properties?.opening_crawl}</p>
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

Films.propTypes = {
  match: PropTypes.object
};