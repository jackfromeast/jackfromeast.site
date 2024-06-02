'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// import Logo from '@/data/favicon.png'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { useEffect } from 'react'

const Header = () => {
  useEffect(() => {
    const textElement = document.getElementById('headerTitle')
    const finalText = "jackfromeast's blog"
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let iterations = 0

    const animateText = () => {
      if (textElement === null) return
      if (iterations < finalText.length) {
        let currentText = ''
        for (let i = 0; i < finalText.length; i++) {
          if (i < iterations) {
            currentText += finalText[i]
          } else {
            currentText += characters.charAt(Math.floor(Math.random() * characters.length))
          }
        }
        textElement.textContent = currentText
        textElement.style.color = 'gray'
        iterations++
      } else {
        textElement.textContent = finalText
        textElement.style.color = 'white'
      }

      setTimeout(animateText, 70)
    }

    animateText()
  }, [])

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            {/* <div className="mr-3">
              <Logo />
            </div> */}
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div id="headerTitle" className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
