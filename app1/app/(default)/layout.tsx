export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <head></head>
            <body>
                <h1>hallo!</h1>
                <main>
                    <div>{children}</div>
                </main>
            </body>
        </>
    );
}
