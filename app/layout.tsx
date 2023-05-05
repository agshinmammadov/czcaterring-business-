"use client"
import '../styles/globals.css';
import ProviderWrapper from '../redux/provider';

export default function RootLayout({
  children,
  reduxData
}: {
  children: React.ReactNode,
  reduxData:any
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
