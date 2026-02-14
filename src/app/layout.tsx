import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

export default function RootLayout({children}: {children: React.ReactNode;}) {
    return (
        <html lang="pl">
            <body className={`${inter.variable} antialiased`}>
                <main>{children}</main>
            </body>
        </html>
    )
}