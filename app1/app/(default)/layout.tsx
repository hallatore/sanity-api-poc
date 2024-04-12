export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <head></head>
            <body>
                <h1>Produktkatalog</h1>
                <main>
                    <div>Her er det ingenting å se</div>
                    <div>
                        Gå på <a href="/studio">studio</a> om du har tilgang.
                        Klikk <a href="swagger">her</a> for swagger
                    </div>
                </main>
            </body>
        </>
    );
}
