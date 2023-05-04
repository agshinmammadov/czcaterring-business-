"use client"
import './globals.css';
import ProviderWrapper from '../redux/provider';



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
