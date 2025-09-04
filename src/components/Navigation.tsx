'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePersona } from '@/hooks/usePersona'

export default function Navigation() {
  const pathname = usePathname()
  const { selectedPersona } = usePersona()

  const navItems = [
    { href: '/discover', label: 'Discover' },
    { href: '/define', label: 'Define' },
    { href: '/develop', label: 'Develop' },
    { href: '/deliver', label: 'Deliver' },
    { href: '/resources', label: 'Resources' },
  ]

  // Get background color based on current page
  const getNavBackground = () => {
    switch (pathname) {
      case '/discover':
        return 'bg-design4-gold border-b border-design4-gold/20'
      case '/define':
        return 'bg-design4-plum border-b border-design4-plum/20'
      case '/develop':
        return 'bg-design4-green border-b border-design4-green/20'
      case '/deliver':
        return 'bg-design4-orange border-b border-design4-orange/20'
      default:
        return 'bg-design4-primary border-b border-design4-plum/20'
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
          button: 'bg-design4-ink text-design4-green',
          mobile: 'text-design4-ink'
        }
      case '/define':
        return {
          logo: 'text-white',
          logoText: 'text-white',
          logoBackground: 'text-design4-plum',
          logoIcon: 'text-design4-primary bg-white',
          nav: 'text-white/80',
          navActive: 'text-white',
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
          button: 'bg-white text-design4-primary',
          mobile: 'text-white'
        }
    }
  }

  const colors = getTextColors()

  return (
    <nav className={getNavBackground()}>
      <div className="mx-auto max-w-design4-container px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <Link 
            href="/" 
            className={`flex items-center space-x-2 ${colors.logo} font-bold text-xl hover:opacity-90 transition-opacity`}
          >
            <img 
              src={pathname === '/discover' || pathname === '/develop' ? '/design4_logo_black_v2.svg' : '/design4_logo_white_v2.svg'}
              alt="Design4 Logo" 
              className="h-36 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href 
                    ? `${colors.navActive} border-b-2 border-design4-gold pb-1` 
                    : `${colors.nav} hover:opacity-90`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`}
            className={`${colors.button} px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2`}
          >
            Design4 Assistant
          </Link>

          {/* Mobile Menu Button */}
          <button className={`md:hidden ${colors.mobile}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}