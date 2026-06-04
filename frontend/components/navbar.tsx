'use client'

import { useEffect, useState } from 'react'

import {
  Menu,
  X,
} from 'lucide-react'

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )

  }, [])

  const navItems = [

    {
      label: 'Detection',
      href: '#detection',
    },

    {
      label: 'Technology',
      href: '#technology',
    },

    {
      label: 'Applications',
      href: '#applications',
    },
  ]

  return (

    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-banana-dark/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">

            <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-banana-yellow rounded-xl flex items-center justify-center text-banana-dark font-bold text-lg shadow-[0_0_20px_rgba(57,255,20,0.4)] group-hover:scale-110 transition-all duration-300">

              B

            </div>

            <div>

              <h1 className="font-display font-bold text-xl tracking-tight text-white">

                BananaSense

              </h1>

              <p className="text-xs text-slate-400 -mt-1">

                AI Detection System

              </p>

            </div>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {navItems.map((item) => (

              <a
                key={item.label}
                href={item.href}
                className="relative text-slate-300 hover:text-neon-green transition-all duration-300 text-sm font-medium group"
              >

                {item.label}

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-neon-green transition-all duration-300 group-hover:w-full" />

              </a>
            ))}

          </div>

          {/* CTA */}
          <div className="hidden md:block">

            <button className="px-6 py-2.5 bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold text-sm rounded-xl hover:scale-105 hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] transition-all duration-300">

              Launch AI

            </button>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >

            {isOpen
              ? <X size={28} />
              : <Menu size={28} />}

          </button>

        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isOpen
              ? 'max-h-96 opacity-100 mt-6'
              : 'max-h-0 opacity-0'
          }`}
        >

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-5">

            {navItems.map((item) => (

              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-slate-300 hover:text-neon-green transition-all duration-300 font-medium text-lg"
              >

                {item.label}

              </a>
            ))}

            <button className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold hover:scale-[1.02] transition-all duration-300">

              Launch AI

            </button>

          </div>

        </div>

      </div>

    </nav>
  )
}