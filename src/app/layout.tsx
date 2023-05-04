"use client"
import './globals.css';
import ProviderWrapper from '../redux/provider';
<<<<<<< HEAD

=======
>>>>>>> 5517cf6c17c23a205b17083e58d0c1cbb9485ed5
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
