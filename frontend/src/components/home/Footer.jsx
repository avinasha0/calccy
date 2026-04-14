import { Link } from 'react-router-dom'

function Footer() {
  const logoSrc = `${import.meta.env.BASE_URL}calccy1.png`

  return (
    <footer id="footer" className="mt-10 border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2">
            <img src={logoSrc} alt="Calccy logo" className="h-8 w-auto rounded-md object-contain" />
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Finance calculator platform focused on salary clarity and smarter money decisions.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Tools</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/tools" className="transition hover:text-white">All Tools</Link></li>
            <li><Link to="/tools/salary-calculator" className="transition hover:text-white">Salary Calculator</Link></li>
            <li><Link to="/tools/home-loan-emi-calculator" className="transition hover:text-white">EMI Calculator</Link></li>
            <li><Link to="/tools/income-tax-calculator-india" className="transition hover:text-white">Tax Calculator</Link></li>
            <li><Link to="/tools/sip-calculator" className="transition hover:text-white">SIP Calculator</Link></li>
            <li><Link to="/tools/gst-calculator-india" className="transition hover:text-white">GST Calculator</Link></li>
            <li><Link to="/tools/profit-margin-calculator" className="transition hover:text-white">Profit Margin Calculator</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/#footer" className="transition hover:text-white">About</a></li>
            <li><a href="mailto:contact@calccy.com" className="transition hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/#footer" className="transition hover:text-white">Privacy Policy</a></li>
            <li><a href="/#footer" className="transition hover:text-white">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          Copyright © {new Date().getFullYear()} Calccy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
