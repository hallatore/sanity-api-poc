import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'JSC - Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="no">
            <body>
            {children}
            </body>
        </html>;
}
