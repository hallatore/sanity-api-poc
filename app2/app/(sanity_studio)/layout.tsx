export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <body style={{ margin: 0, padding: 0 }}>{children}</body>;
}
