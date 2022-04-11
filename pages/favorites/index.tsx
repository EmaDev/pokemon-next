
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { FavoritePokemons } from "../../components/layouts/FavoritePokemons";
import { NoFavorites } from "../../components/layouts/NoFavorites";
import { localFavorites } from "../../utils";



const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(
      localFavorites.pokemonsArray()
    );
  }, []);

  return (
    <Layout title={'Favoritos'}>

      {
        (favoritePokemons.length === 0) ? 
        <NoFavorites />
        :
        <FavoritePokemons pokemonsIds={favoritePokemons}/>
      }
    </Layout>
  )
}

export default FavoritesPage;