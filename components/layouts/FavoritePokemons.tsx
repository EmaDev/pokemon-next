import { useRouter } from "next/router";
import { Card, Grid } from "@nextui-org/react";


interface Props {
    pokemonsIds: number[];
}

export const FavoritePokemons = ({ pokemonsIds }: Props) => {

    const router = useRouter();
    const handleGoToPokemonPage = (id:number) => {
        router.push(`/pokemon/${id}`);
    }

    return (
        <Grid.Container gap={2} direction='row' justify="flex-start">
            {
                pokemonsIds.map((id) => (
                    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
                        <Card hoverable clickable css={{ padding: 10 }} onClick={() => handleGoToPokemonPage(id)}>
                            <Card.Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                                width={'100%'}
                                height='140px'
                            />
                        </Card>
                    </Grid>
                ))
            }
        </Grid.Container>
    )
}
