'use client'

import {
  Mail,
  GitBranch,
  Link,
  Globe,
} from 'lucide-react'

export function Footer() {

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: GitBranch,
      href: 'https://github.com/Ankitnotnani',
    },
    {
      icon: Link,
      href: 'https://linkedin.com',
    },
    {
      icon: Mail,
      href: 'mailto:ankitnotnani6497@gmail.com',
    },
  ]

  return (

    <footer className="relative border-t border-white/10 bg-banana-dark">

      <div className="max-w-7xl mx-auto px-6">

        {/* CTA Section */}
        <div className="py-16 text-center">

          <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">

            Ready to transform your farm?

          </h3>

          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">

            Join thousands of farms using BananaSense AI
            to optimize ripeness detection and reduce waste.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="px-8 py-3 bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all duration-300">

              Start Detection

            </button>

            <button className="px-8 py-3 border border-neon-green/50 text-neon-green font-semibold rounded-lg hover:bg-neon-green/10 transition-all duration-300">

              Learn More

            </button>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-8 h-8 bg-gradient-to-r from-neon-green to-banana-yellow rounded-lg flex items-center justify-center text-banana-dark font-bold text-xs">

              B

            </div>

            <div>

              <p className="font-display font-bold text-slate-100">

                BananaSense AI

              </p>

              <p className="text-xs text-slate-500">

                © {currentYear} All rights reserved.

              </p>

            </div>

          </div>

          {/* Social Links */}
          <div className="flex gap-4">

            {socialLinks.map((social, i) => {

              const Icon = social.icon

              return (

                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300 hover:bg-neon-green/10"
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