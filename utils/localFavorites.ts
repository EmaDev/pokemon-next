const toggleFavorite = (id: number) => {


    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if( favorites.includes(id) ){
        favorites = favorites.filter( pokeId => pokeId !== id);
    }else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const verifyThatIdIsOnFavorites = (id: number): boolean => {
    
    if( typeof window === 'undefined') return false;
    
    const favorites : number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
       
}

const pokemonsArray = (): number[] => {
    const favorites : number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites;
}
export default{
    toggleFavorite,
    verifyThatIdIsOnFavorites,
    pokemonsArray
}