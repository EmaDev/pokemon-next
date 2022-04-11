import { Container, Text } from "@nextui-org/react";
import { FcRemoveImage } from 'react-icons/fc';


export const NoFavorites = () => {

    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 100px)',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            }}
        >
            <Text h2>No hay favoritos</Text>
            <FcRemoveImage size='80px' />
        </Container>
    )
}
