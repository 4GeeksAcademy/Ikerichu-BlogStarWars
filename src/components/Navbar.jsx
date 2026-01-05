import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFav = (url, e) => {
    e.preventDefault();
    dispatch({ type: 'REMOVE_FAVORITE', payload: url });
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">

        <span className="navbar-brand mb-0 h1"><Link to="/"><img className="img-fluid img-thumbnail w-25" src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg" alt="" /></Link></span>

        <div className="ml-auto">
          <div className="dropstart">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Favorites ({store.Favorites?.length || 0})
            </button>
            <ul className="dropdown-menu p-2" style={{ minWidth: '220px' }}>
              {store.Favorites && store.Favorites.length > 0 ? (
                store.Favorites.map((fav, idx) => (
                  <li key={idx} className="dropdown-item d-flex justify-content-between align-items-center">
                    <Link to={fav.url} className="me-2">{fav.name}</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={(e) => removeFav(fav.url, e)}>Remove</button>
                  </li>
                ))
              ) : (
                <li className="dropdown-item text-muted">No favorites</li>
              )}
              {store.Favorites && store.Favorites.length > 0 && (
                <li className="mt-2">
                  <hr className="dropdown-divider" />
                  <button className="btn btn-sm btn-danger w-100" onClick={() => dispatch({ type: 'CLEAR_FAVORITES' })}>Clear all</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};