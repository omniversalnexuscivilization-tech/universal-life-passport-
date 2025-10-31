import React from "react";

// ULP Homepage - Single-file React component (Tailwind CSS required in host project) // Features: // - Top navigation with ULP logo and actions // - Hero with tagline and quick actions (Enroll, Scan QR, Learn) // - Dashboard cards: Identity, Health, Education, Culture, Sustainability // - Live status / quick QR preview and Offline mode indicator // - Footer with links and small donate/partner CTA // This component is designed to be dropped into a React + Tailwind project.

export default function ULPHomepage() { const modules = [ { key: "identity", title: "Identity", desc: "Global recognition & documents", icon: IdentityIcon }, { key: "health", title: "Health", desc: "Medical records & continuity", icon: HealthIcon }, { key: "education", title: "Education", desc: "Lifelong learning & badges", icon: EducationIcon }, { key: "culture", title: "Culture", desc: "Heritage & creative contributions", icon: CultureIcon }, { key: "sustainability", title: "Sustainability", desc: "Eco-actions & regenerative credits", icon: LeafIcon }, ];

return ( <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased"> <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between"> <div className="flex items-center gap-3"> <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg"> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 2C13.1046 2 14 2.89543 14 4V6H10V4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"/> <path d="M4 8H20V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V8Z" fill="currentColor" opacity="0.9"/> </svg> </div> <div> <div className="text-lg font-semibold">ULP</div> <div className="text-xs text-slate-500">Universal Life Passport</div> </div> </div>

<nav className="flex items-center gap-4">
      <a className="text-sm text-slate-700 hover:text-slate-900" href="#about">About</a>
      <a className="text-sm text-slate-700 hover:text-slate-900" href="#how">How it works</a>
      <a className="text-sm text-slate-700 hover:text-slate-900" href="#pilot">Pilots</a>
      <button className="ml-2 inline-flex items-center gap-2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:opacity-95">
        Sign In
      </button>
    </nav>
  </header>

  <main className="max-w-7xl mx-auto px-6">
    {/* Hero */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">One Earth. One Humanity. One Passport.</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-xl">ULP is your lifelong digital identity — portable, private, and verifiable online & offline. Carry your health, education, culture and contribution with dignity.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#enroll" className="inline-flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
            Enrol Now
          </a>
          <a href="#scan" className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg text-slate-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 7V5a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 17v2a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>
            Scan QR
          </a>
          <a href="#learn" className="inline-flex items-center gap-2 text-sm text-slate-600 px-3 py-2">How ULP works →</a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-600">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Pilot</div>
            <div className="mt-1 font-semibold">Dhuli Moradiring, Assam</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Status</div>
            <div className="mt-1 font-semibold text-green-600">Village Node Active</div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="rounded-2xl bg-gradient-to-tr from-white to-slate-50 p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Your ULP ID</div>
              <div className="text-lg font-semibold">ULP-IND-AS-000123</div>
            </div>
            <div className="text-xs text-slate-400">Offline Mode</div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <div className="w-full h-48 rounded-lg bg-slate-100 flex items-center justify-center"> 
                <div className="text-slate-400">QR / Card Preview</div>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Name</div>
                <div className="font-medium">Asha Patel</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="text-xs text-slate-500">Health Summary</div>
                <div className="font-medium">Vaccinated • No allergies</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg">Open Passport</button>
            <button className="flex-1 border border-slate-200 px-4 py-2 rounded-lg">Share (Selective)</button>
          </div>
        </div>

        <div className="absolute -right-6 -top-6 w-44 h-44 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 opacity-80 blur-2xl" />
      </div>
    </section>

    {/* Modules */}
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">ULP Modules</h2>
      <p className="text-slate-600 mt-2">Access your core life modules anytime — online or offline.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <article key={m.key} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <m.icon className="w-6 h-6 text-slate-700"/>
              </div>
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-slate-500">{m.desc}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">Last updated</div>
              <div className="text-sm font-medium">2 days ago</div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-50 text-slate-800 px-3 py-2 rounded-lg text-sm">Open</button>
              <button className="flex-1 border border-slate-200 px-3 py-2 rounded-lg text-sm">Share</button>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Footer CTA */}
    <section className="mt-12 mb-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 p-6 rounded-2xl">
      <div className="md:col-span-2">
        <div className="text-lg font-semibold">Join the Dhuli Moradiring ULP Pilot</div>
        <div className="text-slate-600 mt-2">Become part of the first Neo-Sustainable Civilization node. Help co-create protocols and get priority access to ULP services.</div>
      </div>
      <div className="md:col-span-1 text-right">
        <a href="#join" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg">Apply to Join</a>
      </div>
    </section>

  </main>

  <footer className="border-t border-slate-100 mt-6 py-6">
    <div className="max-w-7xl mx-auto px-6 text-sm text-slate-500 flex items-center justify-between">
      <div>© {new Date().getFullYear()} ULP — Universal Life Passport</div>
      <div className="flex items-center gap-4">
        <a href="#privacy" className="hover:underline">Privacy</a>
        <a href="#terms" className="hover:underline">Terms</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>
    </div>
  </footer>
</div>

); }

/* ---------------------- Icons (inline SVG components) ---------------------- */

function IdentityIcon(props){ return ( <svg viewBox="0 0 24 24" fill="none" {...props}> <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M3 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg> ) }

function HealthIcon(props){ return ( <svg viewBox="0 0 24 24" fill="none" {...props}> <path d="M21 10.5a5.5 5.5 0 0 0-11 0V12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M12 19v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg> ) }

function EducationIcon(props){ return ( <svg viewBox="0 0 24 24" fill="none" {...props}> <path d="M12 2L3 7l9 5 9-5-9-5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> <path d="M21 8.5V13a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> </svg> ) }

function CultureIcon(props){ return ( <svg viewBox="0 0 24 24" fill="none" {...props}> <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> <path d="M2 12h20M12 2c2.5 3 2.5 9 0 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> </svg> ) }

function LeafIcon(props){ return ( <svg viewBox="0 0 24 24" fill="none" {...props}> <path d="M20 4c-4 4-8 8-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M7 7c2 1 3 3 3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg> ) }

