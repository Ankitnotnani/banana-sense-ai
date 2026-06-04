'use client'

import {
  Mail,
  Github,
  Linkedin,
  Globe,
} from 'lucide-react'

export function Footer() {

  const currentYear = new Date().getFullYear()

  const footerLinks = {

    Platform: [
      'AI Detection',
      'Analytics',
      'Live Webcam',
      'Reports',
    ],

    Technology: [
      'TensorFlow',
      'FastAPI',
      'React',
      'SQLite',
    ],

    Resources: [
      'Documentation',
      'API',
      'Research',
      'Community',
    ],

    Company: [
      'About',
      'Contact',
      'GitHub',
      'Support',
    ],
  }

  const socialLinks = [

    {
      icon: Github,
      href: '#',
    },

    {
      icon: Linkedin,
      href: '#',
    },

    {
      icon: Globe,
      href: '#',
    },

    {
      icon: Mail,
      href: '#',
    },
  ]

  return (

    <footer className="relative border-t border-white/10 bg-banana-dark overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-neon-green/5 blur-3xl rounded-full opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* CTA */}
        <div className="py-20 text-center border-b border-white/10">

          <div className="inline-block mb-6 px-5 py-2 rounded-full border border-neon-green/30 bg-white/5 backdrop-blur-xl">

            <span className="text-neon-green text-sm font-semibold tracking-wide">

              AI Powered Agriculture

            </span>

          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">

            Ready to Transform{' '}

            <span className="text-neon-green">

              Banana Detection?

            </span>

          </h3>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">

            Experience real-time AI-powered banana ripeness analysis
            with advanced analytics, webcam detection,
            and enterprise-grade prediction systems.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold hover:scale-105 hover:shadow-[0_0_35px_rgba(57,255,20,0.45)] transition-all duration-300">

              Launch AI Platform

            </button>

            <button className="px-8 py-4 rounded-xl border border-neon-green/30 text-neon-green hover:bg-neon-green/10 transition-all duration-300">

              View Documentation

            </button>

          </div>

        </div>

        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-neon-green to-banana-yellow flex items-center justify-center text-banana-dark font-bold text-xl shadow-[0_0_30px_rgba(57,255,20,0.4)]">

                B

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  BananaSense AI

                </h2>

                <p className="text-slate-400 text-sm">

                  Intelligent Ripeness Detection

                </p>

              </div>

            </div>

            <p className="text-slate-400 leading-relaxed max-w-md">

              Advanced AI-powered banana ripeness classification
              system built with TensorFlow, FastAPI, and React
              for smart agriculture and supply chain optimization.

            </p>

          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(
            ([category, links]) => (

              <div key={category}>

                <h4 className="font-semibold text-white mb-5 text-lg">

                  {category}

                </h4>

                <ul className="space-y-3">

                  {links.map((link) => (

                    <li key={link}>

                      <a
                        href="#"
                        className="text-slate-400 hover:text-neon-green transition-all duration-300 text-sm"
                      >

                        {link}

                      </a>

                    </li>
                  ))}

                </ul>

              </div>
            )
          )}

        </div>

        {/* Bottom */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <div className="text-center md:text-left">

            <p className="text-slate-400 text-sm">

              © {currentYear} BananaSense AI.
              All rights reserved.

            </p>

            <p className="text-slate-500 text-xs mt-1">

              Built with AI for modern agriculture.

            </p>

          </div>

          {/* Social */}
          <div className="flex items-center gap-4">

            {socialLinks.map((social, i) => {

              const Icon = social.icon

              return (

                <a
                  key={i}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-neon-green hover:border-neon-green/30 hover:bg-neon-green/10 transition-all duration-300 hover:scale-110"
                >

                  <Icon size={18} />

                </a>
              )
            })}

          </div>

        </div>

      </div>

    </footer>
  )
}