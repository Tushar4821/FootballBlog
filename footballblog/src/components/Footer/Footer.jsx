import React from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo"

function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 ">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* LOGO + DESCRIPTION */}
          <div>
            <Logo width="90px" />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Your daily source for football analysis, match reports,
              tactical breakdowns and transfer news.
            </p>
            <p className="mt-6 text-xs text-gray-500">
              © {new Date().getFullYear()} Football Blog. All rights reserved.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white mb-5 tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">About</Link></li>
              <li><Link className="footer-link" to="/">Features</Link></li>
              <li><Link className="footer-link" to="/">Careers</Link></li>
              <li><Link className="footer-link" to="/">Press</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white mb-5 tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Help Center</Link></li>
              <li><Link className="footer-link" to="/">Contact</Link></li>
              <li><Link className="footer-link" to="/">Community</Link></li>
              <li><Link className="footer-link" to="/">Status</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white mb-5 tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Terms</Link></li>
              <li><Link className="footer-link" to="/">Privacy</Link></li>
              <li><Link className="footer-link" to="/">Cookies</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM LINE */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
          Built with passion for football fans ⚽
        </div>

      </div>
    </footer>
  )
}

export default Footer