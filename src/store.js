export const initialStore=()=>{
  return{
    people: [
      ],
    planets: [
      ],
    films: [
    ],
    imagesPlanets: [
		'https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357',
		'https://static.wikia.nocookie.net/esstarwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20100723184830',
		'https://static.wikia.nocookie.net/esstarwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20170924222729https://static.wikia.nocookie.net/esstarwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20170924222729',
		'https://static.wikia.nocookie.net/esstarwars/images/1/1d/Hoth_SWCT.png/revision/latest?cb=20170802030704',
		'https://static.wikia.nocookie.net/esstarwars/images/1/1c/Dagobah.jpg/revision/latest?cb=20061117132132',
		'https://static.wikia.nocookie.net/esstarwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20170527220537',
		'https://upload.wikimedia.org/wikipedia/en/d/d4/PlanetEndor.jpg',
		'https://static.wikia.nocookie.net/esstarwars/images/f/f0/Naboo_planet.png/revision/latest?cb=20190928214307',
		'https://static.wikia.nocookie.net/esstarwars/images/8/84/CoruscantGlobeE1.png/revision/latest?cb=20221030204600',
		'https://static.wikia.nocookie.net/esstarwars/images/a/a9/Eaw_Kamino.jpg/revision/latest?cb=20210616005549'
	],
  imagesFilms:[
    'https://m.media-amazon.com/images/I/91YXgocJn5L._UF1000,1000_QL80_.jpg',
    'https://play-lh.googleusercontent.com/CVjXDRl_cWclSbas_w3w3JNkNF8dGxhO7intuVq44t1Kho6CTz-l9r0RIBv69de0IjKK',
    'https://m.media-amazon.com/images/I/81cY-e6u0OL._AC_UF894,1000_QL80_.jpg',
    'https://play-lh.googleusercontent.com/B81TitZ4MgBuOXNlipsz3V2sI3gMmoyBnnfS1yYmnTapTMl6Te283SPn_Mxx30K5tLI',
    'https://play-lh.googleusercontent.com/mbU1Wih6XfkrnDHpVaR9lAwuc2MljhDJa8mTWAHpkB3MVPC4vWzzEDHnAYrweKo4Wso',
    'https://m.media-amazon.com/images/I/81cUuRhZw+L._AC_UF894,1000_QL80_.jpg'
  ],
  Favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'SET_PEOPLE':
      return {
        ...store,
        people: action.payload
      };
    case 'SET_PLANETS':
      return {
        ...store,
        planets: action.payload
      };
    case 'SET_FILMS':
      return {
        ...store,
        films: action.payload
      };
    case 'ADD_FAVORITE':
      // avoid duplicates by url
      if (!action.payload || !action.payload.url) return store;
      if (store.Favorites?.some(f => f.url === action.payload.url)) return store;
      return {
        ...store,
        Favorites: [...store.Favorites, action.payload]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...store,
        Favorites: store.Favorites.filter(f => f.url !== action.payload)
      };
    case 'CLEAR_FAVORITES':
      return {
        ...store,
        Favorites: []
      };
    default:
      return store;
  }  }  

