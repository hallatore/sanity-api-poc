export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <head></head>
            <body>
                <main>
                    <div>{children}</div>
                </main>
            </body>
        </>
    );
}
