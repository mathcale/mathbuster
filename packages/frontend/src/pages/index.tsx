import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mathbuster</title>
        <meta
          name="description"
          content="An old-school movie rental app, built with modern tech for Digital Ocean's Hackathon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home!</h1>
      </main>
    </>
  );
}
