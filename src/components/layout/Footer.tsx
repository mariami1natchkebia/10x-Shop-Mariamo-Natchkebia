import React from 'react';

function Footer() {
  return (
    <footer className="bg-surface text-text-primary border-t border-border py-6 px-6 font-sans transition-colors duration-250">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
          <h3 className="tracking-widest font-serif uppercase font-semibold">
            10x-shop
          </h3>
          <span className="hidden md:inline text-text-secondary">|</span>
          <p className="text-xs text-text-secondary max-w-xs">
            Get 10% off your first order. Subscribe for updates.
          </p>
        </div>

        
        <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        className="flex w-full md:w-auto gap-2 max-w-sm"
        >
        <label htmlFor="footer-email" className="sr-only">
            Your email address
        </label>

        <input
            id="footer-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            aria-label="Your email address"
            className="bg-background border border-border focus:border-border-hover px-3 py-1.5 text-xs text-text-primary placeholder-text-secondary outline-none w-full rounded-lg"
        />

        <button
            type="submit"
            className="bg-brand text-[#354137] hover:bg-brand-dark hover:text-white px-4 py-1.5 text-xs tracking-wider uppercase font-medium transition-colors whitespace-nowrap rounded-lg"
        >
            Sign Up
        </button>
        </form>


        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-3">
            <p className="hover:text-text-primary transition-colors">Terms</p>
            <span>•</span>
            <p className="hover:text-text-primary transition-colors">Privacy</p>
            <span>•</span>
            <p className="hover:text-text-primary transition-colors">Refund</p>
          </div>
          <span className="hidden md:inline">|</span>
          <div>© 2026 10x-shop by Maro.</div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;