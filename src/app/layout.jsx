import '../styles/globals.css';

import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });


export const metadata = {
  title: 'todo-app',
  description: 'Gerencie seu afazeres',
}



export default function RootLayout({ children }) {
 return (
    <html lang="en">
       <head>
        <link rel="icon" type="image/svg+xml" href="/notepad-light-custom.svg"/>
        <title>Tásku</title>
      </head>
      <body className={`${inter.className} bg-violet-200 font-montserrat min-h-full`}>{children}</body>
    </html>
  )
}
