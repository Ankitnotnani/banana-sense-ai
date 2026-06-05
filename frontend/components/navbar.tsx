'use client'

import { useEffect, useState } from 'react'

import {
  Menu,
  X,
} from 'lucide-react'

export function Navbar()
{
  const [isOpen, setIsOpen] =
    useState(false)

  const [scrolled, setScrolled] =
    useState(false)

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  const navItems = [
    {
      label: 'Dashboard',
      href: '#dashboard',
    },

    {
      label: 'Analytics',
      href: '#analytics',
    },

    {
      label: 'History',
      href: '#history',
    },

    {
      label: 'About',
      href: '#about',
    },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-zinc-800'
          : 'bg-transparent'
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">

            <div className="w-11 h-11 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-extrabold text-lg transition-all duration-300 group-hover:scale-105">

              B

            </div>

            <div>

              <h1 className="font-bold text-2xl tracking-tight text-white">
                BananaSense AI
              </h1>

              <p className="text-xs text-zinc-400 -mt-1">
                Intelligent Ripeness Detection
              </p>

            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-zinc-300 hover:text-yellow-400 transition-all duration-300 text-sm font-medium group"
              >

                {item.label}

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />

              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">

            <button className="px-6 py-2.5 bg-yellow-400 text-black font-semibold text-sm rounded-xl hover:bg-yellow-300 transition-all duration-300">

              Start Detection

            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() =>
              setIsOpen(!isOpen)
            }
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

          <div className="bg-zinc-900 border border-zinc-800 backdrop-blur-xl rounded-2xl p-6 space-y-5">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className="block text-zinc-300 hover:text-yellow-400 transition-all duration-300 font-medium text-lg"
              >

                {item.label}

              </a>
            ))}

            <button className="w-full mt-4 px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300">

              Start Detection

            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}