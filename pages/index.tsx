import { Grid } from '@nextui-org/react';
import type { GetStaticProps, NextPage } from 'next'
import pokeApi from '../api/PokeApi';
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/Pokemon/PokemonCard';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemonInterface';


interface Props {
  pokemons: SmallPokemon[]
}
const HomePage: NextPage<Props> = ({pokemons}) => {

  return (
    <Layout title={'Listado de Pokemones'}>
      <Grid.Container gap={2} justify='flex-start'>
      {
        pokemons.map( (poke) => (
          <PokemonCard key={ `${poke.name}-${poke.id}` } pokemon={poke}/>
        ))
      }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async(ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  
  const pokemonsArr: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));
  
  return{
    props:{
      pokemons: pokemonsArr
    }
  }
}

export default HomePage;
