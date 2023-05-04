"use client"
import './globals.css';
import ProviderWrapper from '../redux/provider';
<<<<<<< HEAD

=======
>>>>>>> 5850c2d0fefd76bc0afa0250dd37dcf0f1a31094
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          {children}        
         </ProviderWrapper>
      </body>
    </html>
  )
}
