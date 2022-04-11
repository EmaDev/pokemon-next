import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { SmallPokemon } from "../../interfaces/pokemonInterface"

interface Props {
    pokemon: SmallPokemon;
}
export const PokemonCard = ({pokemon}:Props) => {

   const {image, name, id} = pokemon;
   const router = useRouter();
   
   const handleGoToPokemonPage = () => {
       router.push(`/name/${name}`);
   }
    return (
    <Grid xs={6} sm={3} md={2} xl={1} >
        <Card hoverable clickable onClick={handleGoToPokemonPage}>
            <Card.Body css={{p: 1}}>
                <Card.Image src={image} width="100%" height={140}/>
            </Card.Body>
            <Card.Footer>
                <Row justify="space-between">
                    <Text transform="capitalize">{name}</Text>
                    <Text>{`#${id}`}</Text>
                </Row>
            </Card.Footer>
        </Card>
    </Grid>
  )
}
