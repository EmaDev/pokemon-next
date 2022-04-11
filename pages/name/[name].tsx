import { useEffect, useState } from "react";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import confetti from 'canvas-confetti';

import pokeApi from "../../api/PokeApi";
import { Layout } from "../../components/layouts"
import { Pokemon, PokemonListResponse } from "../../interfaces/pokemonInterface";
import { localFavorites } from "../../utils";


interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [existInFavorites, setExistInFavorites] = useState( localFavorites.verifyThatIdIsOnFavorites(pokemon.id) );

    const handleToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id);
        setExistInFavorites(!existInFavorites);

        if(existInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin:{
                x: 1,
                y: 0
            }
        })
    }

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    
    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default
                                    || 'no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />

                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header 
                        css={
                           (isMobile) ? 
                           {display: "flex",flexDirection: "column", justifyContent: 'center'}
                           :
                           {display: "flex", justifyContent: 'space-between'}
                        }>
                            <Text h1 transform="capitalize">{pokemon.name}</Text>
                            <Button onClick={handleToggleFavorite} color="gradient" 
                            ghost={ (!existInFavorites) ? true : false }
                            >
                                {
                                    (existInFavorites)
                                    ? <MdFavorite size={30} />
                                    :
                                    <MdFavoriteBorder size={30} />
                                }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites: </Text>

                            <Container display="flex" direction="row">
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                 <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                 <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemonNames: string[] = data.results.map( poke => poke.name);

    return {
        paths: pokemonNames.map( name => (
            {params: {name} }
        )),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

    const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

    return {
        props: {
            pokemon
        }
    }
}

export default PokemonByNamePage;
