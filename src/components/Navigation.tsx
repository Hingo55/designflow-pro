'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { usePersona } from '@/hooks/usePersona'
import { useAuth } from '@/lib/auth-context'

export default function Navigation() {
  const pathname = usePathname()
  const { selectedPersona } = usePersona()
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { href: '/discover', label: 'Discover' },
    { href: '/define', label: 'Define' },
    { href: '/develop', label: 'Develop' },
    { href: '/deliver', label: 'Deliver' },
    { href: '/resources', label: 'Resources' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/admin', label: 'Admin' },
  ]

  // Get background color based on current page
  const getNavBackground = () => {
    switch (pathname) {
      case '/discover':
        return 'bg-design4-gold border-b border-design4-gold/20'
      case '/define':
        return 'bg-design4-purple border-b border-design4-purple/20'
      case '/develop':
        return 'bg-design4-green border-b border-design4-green/20'
      case '/deliver':
        return 'bg-design4-orange border-b border-design4-orange/20'
      default:
        return 'bg-design4-teal border-b border-design4-teal/20'
    }
  }

  // Get text colors based on current page
  const getTextColors = () => {
    switch (pathname) {
      case '/discover':
        return {
          logo: 'text-design4-ink',
          logoText: 'text-design4-ink',
          logoBackground: 'text-design4-gold',
          logoIcon: 'text-design4-gold bg-design4-ink',
          nav: 'text-design4-ink/80',
          navActive: 'text-design4-ink',
          activeBorder: 'border-design4-ink',
          button: 'bg-design4-ink text-design4-gold',
          mobile: 'text-design4-ink'
        }
      case '/develop':
        return {
          logo: 'text-design4-ink',
          logoText: 'text-design4-ink',
          logoBackground: 'text-design4-green',
          logoIcon: 'text-design4-green bg-design4-ink',
          nav: 'text-design4-ink/80',
          navActive: 'text-design4-ink',
          activeBorder: 'border-design4-ink',
          button: 'bg-design4-ink text-design4-green',
          mobile: 'text-design4-ink'
        }
      case '/define':
        return {
          logo: 'text-white',
          logoText: 'text-white',
          logoBackground: 'text-design4-purple',
          logoIcon: 'text-design4-primary bg-white',
          nav: 'text-white/80',
          navActive: 'text-white',
          activeBorder: 'border-white',
          button: 'bg-white text-design4-primary',
          mobile: 'text-white'
        }
      case '/deliver':
        return {
          logo: 'text-white',
          logoText: 'text-white',
          logoBackground: 'text-design4-orange',
          logoIcon: 'text-design4-primary bg-white',
          nav: 'text-white/80',
          navActive: 'text-white',
          activeBorder: 'border-white',
          button: 'bg-white text-design4-primary',
          mobile: 'text-white'
        }
      default:
        return {
          logo: 'text-white',
          logoText: 'text-white',
          logoBackground: 'text-design4-plum',
          logoIcon: 'text-design4-primary bg-white',
          nav: 'text-white/80',
          navActive: 'text-white',
          activeBorder: 'border-design4-gold',
          button: 'bg-white text-design4-primary',
          mobile: 'text-white'
        }
    }
  }

  const colors = getTextColors()

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${getNavBackground()}`}>
      <div className="mx-auto max-w-design4-container px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Home Link */}
          <Link 
            href="/" 
            className={`flex items-center space-x-2 ${colors.logo} font-bold text-2xl hover:opacity-90 transition-opacity`}
          >
            <img
              src={pathname === '/discover' || pathname === '/develop' ? '/design4_logo_black_v2.svg' : '/design4_logo_white_v2.svg'}
              alt="Design4 Logo"
              className="h-48 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors ${
                  pathname === item.href 
                    ? `${colors.navActive} border-b-2 ${colors.activeBorder} pb-1` 
                    : `${colors.nav} hover:opacity-90`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Link
              href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`}
              className={`${colors.button} px-6 py-3 rounded-full font-medium text-base hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2`}
            >
              Design4 Assistant
            </Link>

            {/* Logout Button - only show if user is authenticated */}
            {user && (
              <button
                onClick={handleSignOut}
                className={`${colors.nav} hover:opacity-90 px-4 py-2 rounded-md font-medium text-sm transition-opacity`}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${colors.mobile}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/20">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    pathname === item.href 
                      ? `${colors.navActive} bg-white/10 rounded-md` 
                      : `${colors.nav} hover:bg-white/5 rounded-md`
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`}
                className={`block px-3 py-2 mt-4 text-center ${colors.button} rounded-full font-medium text-base`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Design4 Assistant
              </Link>

              {/* Mobile Logout Button */}
              {user && (
                <button
                  onClick={handleSignOut}
                  className={`block px-3 py-2 mt-2 text-center ${colors.nav} hover:bg-white/5 rounded-md font-medium text-base w-full`}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}