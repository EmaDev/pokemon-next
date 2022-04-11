import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from './Navbar';

interface Props {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location;
export const Layout: FC<Props> = ({ children, title = 'Pokemon NextJs' }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='author' content='Emanuel Cisterna' />
                <meta name='description' content={`Informacion sobre el pokemon ${title}`} />
                <meta name='keywords' content={`${title}, Pokemon, pokedex`} />

                <meta property="og:title" content={`Informacion sobre el pokemon ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}.`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar />
            <main style={{ padding: '10px 20px' }}>
                {children}
            </main>
        </>
    )
}
