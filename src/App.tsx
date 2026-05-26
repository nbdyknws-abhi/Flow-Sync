import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  BarChart3,
  Shield,
  Zap,
  Menu,
  X,
  ChevronDown,
  Lock,
  Layers,
  Workflow,
} from 'lucide-react'



// TYPES FOR THE INTERACTIVE KANBAN BOARD
interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  assignee: {
    name: string
    avatar: string
  }
  column: 'todo' | 'progress' | 'done'
  completed: boolean
}

export default function App() {
  // Navigation Mobile Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Announcement bar dismiss state
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  // Dashboard Mockup State
  const [activeDashboardTab, setActiveDashboardTab] = useState<'tasks' | 'analytics' | 'automations'>('tasks')

  // 1. Kanban Board State
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Redesign settings billing portal',
      priority: 'high',
      assignee: { name: 'Sarah L.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
      column: 'progress',
      completed: false
    },
    {
      id: 'task-2',
      title: 'Optimize API serialization endpoints',
      priority: 'medium',
      assignee: { name: 'David K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
      column: 'todo',
      completed: false
    },
    {
      id: 'task-3',
      title: 'Integrate Stripe Customer Portal webhook',
      priority: 'high',
      assignee: { name: 'Alex M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
      column: 'progress',
      completed: false
    },
    {
      id: 'task-4',
      title: 'Release version v2.4.0 documentation',
      priority: 'low',
      assignee: { name: 'Emma T.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80' },
      column: 'done',
      completed: true
    }
  ])


  // Pricing Toggle State
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annually'>('annually')

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Quick CTA Email Signup Form State
  const [heroEmail, setHeroEmail] = useState('')
  const [heroSuccess, setHeroSuccess] = useState(false)
  const [heroError, setHeroError] = useState(false)

  const [footerEmail, setFooterEmail] = useState('')
  const [footerSuccess, setFooterSuccess] = useState(false)

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (heroEmail && heroEmail.includes('@') && heroEmail.length > 5) {
      setHeroSuccess(true)
      setHeroError(false)
      setHeroEmail('')
      setTimeout(() => setHeroSuccess(false), 5000)
    } else {
      setHeroError(true)
    }
  }

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (footerEmail && footerEmail.includes('@')) {
      setFooterSuccess(true)
      setFooterEmail('')
      setTimeout(() => setFooterSuccess(false), 5000)
    }
  }

  // FAQ Items
  const faqItems = [
    {
      question: "How does FlowSync differ from traditional project managers like Jira or Trello?",
      answer: "Unlike heavy enterprise PM suites that require specialized administration or simple visual boards that lack integrations, FlowSync combines lightweight keyboard-first task tracking with robust native tool automations. Tasks sync in real-time across your stack (Github, Slack, Stripe, Notion) automatically, so engineers and designers never have to duplicate status updates."
    },
    {
      question: "Can we migrate our existing projects from Jira, Asana, or Linear?",
      answer: "Absolutely. With our 1-click importer, you can connect your existing workspaces and pull over all active sprints, backlogs, custom fields, and assignee mappings in less than two minutes. We guarantee zero downtime and zero lost metadata during the import process."
    },
    {
      question: "What tool integrations are supported out of the box?",
      answer: "FlowSync features deep, two-way native integrations with Slack, GitHub, GitLab, Linear, Notion, Figma, Stripe, Salesforce, and Sentry. Custom webhooks and a fully-documented REST API are also available on all Pro and Enterprise tiers for bespoke software pipelines."
    },
    {
      question: "Is FlowSync SOC2 compliant? How secure is our workspace data?",
      answer: "Trust and security are our highest priorities. FlowSync is SOC2 Type II certified. All data is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. We support single sign-on (SSO) with Okta, Google Workspace, and Microsoft Azure Active Directory on the Enterprise plan."
    },
    {
      question: "Is there a limit to the number of members on the Free plan?",
      answer: "Our Free plan supports up to 5 members and includes basic task boards, 3 native integrations, and 250 automated workflow syncs per month. There are no credit card requirements to start—just sign up and invite your core team."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col antialiased bg-textured">
      {/* 1. ANNOUNCEMENT BAR */}
      {announcementVisible && (
        <div className="w-full bg-slate-900 px-4 py-2 text-center text-xs font-medium text-slate-100 flex items-center justify-center gap-x-2 border-b border-slate-800">
          <span className="inline-flex items-center gap-1 rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 uppercase tracking-wider shrink-0">New</span>
          <span className="truncate">FlowSync 2.0: Linear &amp; Slack bidirectional syncing is live.</span>
          <a href="#features" className="underline hover:text-indigo-200 transition-colors shrink-0 hidden sm:inline">See features</a>
          <button
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Dismiss announcement"
            className="ml-auto shrink-0 text-slate-400 hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 glass transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-[1.02] transition-transform">
              <Workflow className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-950 font-sans">
              Flow<span className="text-indigo-600">Sync</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">Benefits</a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">Customers</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>

          {/* Nav CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#pricing" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors px-3 py-2">
              Book a Demo
            </a>
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all hover:shadow-md active:scale-95"
            >
              Start Free
            </a>
          </div>

          {/* Mobile Menu Burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg px-4 py-6 md:hidden flex flex-col gap-4 z-40"
            >
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-100"
              >
                Features
              </a>
              <a
                href="#benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-100"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-100"
              >
                Customers
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-100"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-100"
              >
                FAQ
              </a>
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  Book a Demo
                </a>
                <a
                  href="#cta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-500"
                >
                  Start Free
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-12 sm:pb-20 md:pt-20 md:pb-28 lg:pt-28">
        {/* Subtle decorative mesh gradients background */}
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-indigo-100/40 via-violet-50/10 to-indigo-150/15 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          {/* Accent Pill badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-indigo-700 shadow-sm mb-6 hover:bg-indigo-100/50 transition-colors">
            <Sparkles className="w-4 h-4 text-indigo-600 fill-indigo-100" />
            <span>Simplify your team synchronization</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            Coordinate Team Workflow <br className="hidden sm:inline" />
            <span className="text-gradient">Without The Chaos.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-800 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            FlowSync coordinates your daily tasks, automates native tool integrations, and aligns your engineers, designers, and managers—in one incredibly fast, intuitive dashboard.
          </p>

        {/* Hero Form CTAs */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-2.5 justify-center items-stretch">
            <div className="relative flex-grow">
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => {
                  setHeroEmail(e.target.value)
                  setHeroError(false)
                }}
                placeholder="Enter your work email..."
                className={`w-full h-12 rounded-xl border px-4 py-3 text-slate-800 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all ${heroError ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200'
                  }`}
                aria-label="Work email address"
                required
              />
              {heroSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -bottom-6 text-xs font-semibold text-success-600 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Demo request sent! We'll reach out shortly.
                </motion.p>
              )}
              {heroError && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -bottom-6 text-xs font-semibold text-red-500"
                >
                  Please enter a valid work email address.
                </motion.p>
              )}
            </div>
            <button
              type="submit"
              className="h-12 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold rounded-xl px-6 flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md whitespace-nowrap cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 mt-8 sm:mt-10 text-xs sm:text-sm text-slate-800 font-semibold">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-indigo-600" /> Free 14-day trial</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-indigo-600" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-indigo-600" /> SOC2 certified security</span>
          </div>
        </div>

        {/* 4. INTERACTIVE DASHBOARD PREVIEW */}
        <div className="relative max-w-5xl mx-auto z-20 mt-6 select-none hidden md:block">
          <div className="absolute inset-x-12 bottom-0 top-12 bg-indigo-500/10 rounded-[2.5rem] filter blur-3xl pointer-events-none" />
          <div className="relative border border-slate-200/90 rounded-2xl bg-slate-900 shadow-2xl overflow-hidden text-left flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-3 h-3 rounded-full bg-red-500/95 block shrink-0" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/95 block shrink-0" />
                <span className="w-3 h-3 rounded-full bg-green-500/95 block shrink-0" />
                <span className="text-xs text-slate-500 font-semibold ml-3 font-mono truncate">flowsync-app/Q3-roadmap</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
                </span>
                <span className="text-xs font-semibold text-success-500 uppercase tracking-widest font-mono">Live</span>
              </div>
            </div>
            <div className="flex flex-grow bg-[#0b0f19]">
              <aside className="w-56 bg-slate-950 border-r border-slate-900 p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">FS</div>
                    <span className="text-sm font-bold text-slate-200">FlowSync Corp</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>
                <button
                  onClick={() => setActiveDashboardTab('tasks')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeDashboardTab === 'tasks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Tasks & Board</span>
                </button>
                <button
                  onClick={() => setActiveDashboardTab('analytics')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeDashboardTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Team Velocity</span>
                </button>
                <button
                  onClick={() => setActiveDashboardTab('automations')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeDashboardTab === 'automations' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Automations</span>
                </button>
              </aside>
              <main className="flex-grow p-6 bg-[#0b0f19] text-slate-300">
                {activeDashboardTab === 'tasks' && (
                   <div className="grid grid-cols-3 gap-4">
                     {/* Column Renderings */}
                     <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col gap-2">
                       <span className="text-[10px] font-bold text-slate-400">TO DO</span>
                       {tasks.filter(t => t.column === 'todo').map(t => (
                         <div key={t.id} className="bg-slate-900 p-3 rounded text-xs">{t.title}</div>
                       ))}
                     </div>
                     <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col gap-2">
                       <span className="text-[10px] font-bold text-indigo-400">IN PROGRESS</span>
                       {tasks.filter(t => t.column === 'progress').map(t => (
                         <div key={t.id} className="bg-slate-900 p-3 rounded text-xs">{t.title}</div>
                       ))}
                     </div>
                     <div className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 flex flex-col gap-2">
                       <span className="text-[10px] font-bold text-success-500">DONE</span>
                       {tasks.filter(t => t.column === 'done').map(t => (
                         <div key={t.id} className="bg-slate-900 p-3 rounded text-xs">{t.title}</div>
                       ))}
                     </div>
                   </div>
                )}
              </main>
            </div>
          </div>
        </div>

        {/* MOBILE DASHBOARD PREVIEW */}
        <div className="md:hidden relative max-w-md mx-auto z-20 mt-8 select-none px-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-200">Q3 Launch Board</span>
              <span className="text-[10px] bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded">Live</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-lg text-center"><div className="text-lg font-black text-slate-200">1</div><div className="text-[9px] uppercase text-slate-500">Todo</div></div>
              <div className="bg-slate-950 p-3 rounded-lg text-center"><div className="text-lg font-black text-indigo-400">2</div><div className="text-[9px] uppercase text-slate-500">Doing</div></div>
              <div className="bg-slate-950 p-3 rounded-lg text-center"><div className="text-lg font-black text-emerald-400">1</div><div className="text-[9px] uppercase text-slate-500">Done</div></div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24 relative z-10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 mb-8">
            TRUSTED BY HIGH-GROWTH STARTUPS WORLDWIDE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-85">
            <span className="text-lg sm:text-xl font-black text-slate-500">stripe</span>
            <span className="text-lg sm:text-xl font-extrabold text-slate-500">LINEAR</span>
            <span className="text-lg sm:text-xl font-bold text-slate-500">Notion</span>
            <span className="text-lg sm:text-xl font-black text-slate-500">slack</span>
            <span className="text-lg sm:text-xl font-black text-slate-500">airbnb</span>
          </div>
        </div>

    </div>
      </section>

    {/* 6. FEATURES SECTION (Bento Grid) */}
      <section id="features" className="py-12 md:py-20 lg:py-28 bg-slate-50 border-y border-slate-200/50 relative overflow-visible">

      {/* Soft backlighting */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-indigo-200/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              High-Velocity Features For Modern Creators
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              FlowSync strips away Jira's complexity and gives your team direct sync integrations, intuitive drag-drop tasking, and high-performance velocity metrics.
            </p>

          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Box 1: Real-time Collaboration (Large 2-column on md) */}
            <div className="md:col-span-2 border border-slate-200/70 rounded-2xl bg-white shadow-premium hover:shadow-premium-hover p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group">
              <div className="max-w-md">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Bidirectional Slack & Team Syncing</h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  Say goodbye to chasing down status reports. Integrate your Slack or Discord teams and push progress automatically. When a status updates in FlowSync, it syncs instantly without double entry.
                </p>
              </div>

              {/* High fidelity static UI visual representation */}
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-inner flex flex-col gap-3 font-sans">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-success-500 block animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Live Sync Queue</span>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#4a154b] flex items-center justify-center text-white text-[9px] font-bold">SL</div>
                    <span className="text-slate-300 font-semibold">Slack Dispatcher</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">Triggered automatically</span>
                  <span className="rounded bg-success-500/10 px-1.5 py-0.5 text-[10px] font-bold text-success-500 border border-success-500/20">Success</span>
                </div>
              </div>
            </div>

            {/* Box 2: Time Saved (Standard 1-column) */}
            <div className="border border-slate-200/70 rounded-2xl bg-white shadow-premium hover:shadow-premium-hover p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-success-50 border border-success-100/80 flex items-center justify-center text-success-500 mb-5 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Time Tracker & Metrics</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  Quantify precisely where your sprint minutes go. Gain clear visual cues on blocker delays, cycle velocity, and deployment queues immediately.
                </p>
              </div>

              {/* UI preview illustration */}
              <div className="bg-success-50/40 rounded-xl p-4 border border-success-100 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Uptime</span>
                  <span className="text-lg font-black text-success-600 font-mono">99.99%</span>
                </div>
                <span className="h-8 w-px bg-success-100 block" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Average Speed</span>
                  <span className="text-lg font-black text-slate-800 font-mono">140ms</span>
                </div>
              </div>
            </div>

            {/* Box 3: Advanced Analytics (Standard 1-column) */}
            <div className="border border-slate-200/70 rounded-2xl bg-white shadow-premium hover:shadow-premium-hover p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Performance Metrics</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  Create customized dashboards that fit your team. Monitor ticket closure speed, workload distribution, and automated task dispatches dynamically.
                </p>
              </div>

              {/* Mini CSS Bar Chart visual */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col gap-1.5">
                <div className="h-10 flex items-end justify-between gap-2.5">
                  <span className="h-2/5 w-4 bg-indigo-300 rounded-t block" />
                  <span className="h-3/5 w-4 bg-indigo-400 rounded-t block" />
                  <span className="h-5/6 w-4 bg-indigo-600 rounded-t block" />
                  <span className="h-full w-4 bg-indigo-500 rounded-t block" />
                </div>
                <div className="border-t border-slate-200 pt-1.5 text-center text-[10px] text-slate-600 font-bold uppercase">Sprint Resolution</div>
              </div>
            </div>

            {/* Box 4: Enterprise-grade Security (Large 2-column on md) */}
            <div className="md:col-span-2 border border-slate-200/70 rounded-2xl bg-white shadow-premium hover:shadow-premium-hover p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group">
              <div className="max-w-md">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Enterprise-Grade Architecture & Security</h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  FlowSync is built with security first. Your workflows, tasks, and credentials are protected with end-to-end encryption, multi-factor SSO logins, and daily isolated ledger snapshots.
                </p>
              </div>

              {/* Secure illustration lock */}
              <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/60 flex items-center gap-3">
                <Lock className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-xs font-semibold text-indigo-800">AES-256 Bit Encryption Active & SOC2 Type II Certified Uptime</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    {/* 7. PRACTICAL OUTCOMES / BENEFITS SECTION */}
      <section id="benefits" className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Proven Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Focus On High-Impact Results
          </h2>
          <p className="text-base sm:text-lg text-slate-800">
            Stop managing databases of endless cards and start building. FlowSync simplifies operations so your startup can deploy features faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">

          {/* Benefit Item 1 */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-150">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-2">Save 12+ Hours Weekly</h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              By automating tool triggers and removing duplicate update logs, developers reclaim hours of pure coding time every single week.
            </p>
          </div>

          {/* Benefit Item 2 */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-150">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-2">Unify Team Coordination</h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              Engineers, marketers, and designers collaborate in one space. Align project files, briefs, and deadlines instantly with no communication breakdown.
            </p>
          </div>

          {/* Benefit Item 3 */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-150">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-2">Accelerate Velocity</h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              Ship software products on schedule. View clear resolution speeds, identify capacity blockers, and clear roadblocks with robust pipelines.
            </p>
          </div>

        </div>

        <div className="mt-16 md:mt-24 border border-slate-200/80 rounded-2xl bg-white shadow-premium p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-600">65%</div>
            <div className="text-[10px] sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mt-1.5">Fewer Meetings</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-600">3x</div>
            <div className="text-[10px] sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mt-1.5">Faster Deploys</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-600">99.98%</div>
            <div className="text-[10px] sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mt-1.5">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-600">14 Days</div>
            <div className="text-[10px] sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mt-1.5">Free Trial</div>
          </div>
        </div>

      </div>
      </section>

    {/* 8. SOCIAL PROOF / TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-12 md:py-20 lg:py-28 bg-slate-50 border-t border-slate-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Engineered For Modern Builders
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            Read how high-velocity startups leverage FlowSync to streamline sprints, remove communication blockers, and deploy products faster.
          </p>

        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="border border-slate-200/60 rounded-2xl bg-white shadow-premium p-6 flex flex-col justify-between">
            <div>
              {/* 5 stars */}
              <div className="flex gap-1 mb-4 text-yellow-500 font-bold">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-slate-800 text-sm leading-relaxed italic mb-6">
                "FlowSync replaced a complex Jira board and three redundant custom scripts we maintained for Slack updates. Reclaiming hours of developer productivity every week has completely transformed our Q3 velocity."
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Marcus V." className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Marcus V.</h4>
                <p className="text-[11px] font-semibold text-slate-600">VP of Engineering, Apex Ledger</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-slate-200/60 rounded-2xl bg-white shadow-premium p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 text-yellow-500 font-bold">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-slate-800 text-sm leading-relaxed italic mb-6">
                "The interactive Kanban board and direct, 2-way Slack notifications keep our non-technical managers, product designers, and lead developers entirely synced. The absolute smoothest workspace we have used in years."
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" alt="David K." className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">David K.</h4>
                <p className="text-[11px] font-semibold text-slate-600">Director of Operations, HyperV</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-slate-200/60 rounded-2xl bg-white shadow-premium p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4 text-yellow-500 font-bold">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-slate-800 text-sm leading-relaxed italic mb-6">
                "Uptime, SOC2 compliance, SSO integration, and direct API customizability were absolute prerequisites for us. FlowSync delivered on everything instantly. High-fidelity layouts that simply convert."
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Sarah L." className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Sarah L.</h4>
                <p className="text-[11px] font-semibold text-slate-600">Co-founder, Horizon AI</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      </section>

    {/* 9. PRICING PREVIEW SECTION */}
      <section id="pricing" className="py-12 md:py-20 lg:py-28 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Flexible Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple, Fully Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            No hidden fees, no onboarding retainers. Choose a plan that matches your development pace, with a risk-free 14-day trial.
          </p>

          {/* Monthly / Annual billing switch toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => setBillingInterval('monthly')}
              className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-all ${billingInterval === 'monthly' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'annually' : 'monthly')}
              className="w-12 h-7 bg-indigo-600 rounded-full p-1 transition-colors relative flex items-center shrink-0"
              aria-label="Toggle pricing billing interval"
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${billingInterval === 'annually' ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <button
              type="button"
              onClick={() => setBillingInterval('annually')}
              className={`text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${billingInterval === 'annually' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Annually
              <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-black text-emerald-600 border border-emerald-500/20">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">

          {/* Tier 1: Starter */}
          <div className="border border-slate-200/70 rounded-2xl bg-white shadow-premium p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Starter</h3>
              <p className="text-xs text-slate-600 mb-6">Perfect for small initial teams &amp; creators.</p>
              <div className="flex items-baseline mb-6 font-sans">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-slate-500 text-sm font-semibold ml-1">/ forever</span>
              </div>
              <hr className="border-slate-100 my-6" />
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Up to 5 team members</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Basic Kanban Sprint boards</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>3 basic native integrations</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>250 workflow automated runs/mo</span>
                </li>
              </ul>
            </div>
            <a href="#cta" className="w-full text-center py-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/20 text-slate-700 hover:text-indigo-600 font-bold text-sm transition-all block">
              Sign up free
            </a>
          </div>

          {/* Tier 2: Pro — highlighted */}
          <div className="relative border-2 border-indigo-600 rounded-2xl bg-white shadow-xl shadow-indigo-100/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
            <div className="absolute right-6 top-0 -translate-y-1/2">
              <span className="inline-flex items-center rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-black text-white uppercase tracking-wider shadow-sm">
                Most Popular
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pro</h3>
              <p className="text-xs text-slate-600 mb-6">Designed for high-growth tech teams.</p>
              <div className="flex items-baseline mb-6 font-sans">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingInterval === 'annually' ? '$15' : '$19'}
                </span>
                <span className="text-slate-500 text-sm font-semibold ml-1">/ user / mo</span>
              </div>
              <hr className="border-slate-100 my-6" />
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3.5 text-sm font-semibold text-slate-950">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm font-semibold text-slate-950">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Advanced backlog, custom fields</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm font-semibold text-slate-950">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Unlimited native integrations</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm font-semibold text-slate-950">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>10,000 automated runs/mo</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm font-semibold text-slate-950">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Velocity analytics &amp; Lead Times</span>
                </li>
              </ul>
            </div>
            <a href="#cta" className="w-full text-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all block">
              Get Started Free
            </a>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="border border-slate-200/70 rounded-2xl bg-white shadow-premium p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-xs text-slate-600 mb-6">For secure, scale-driven corporations.</p>
              <div className="flex items-baseline mb-6 font-sans">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
              </div>
              <hr className="border-slate-100 my-6" />
              <ul className="flex flex-col gap-3.5 mb-8">
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Unlimited automated runs</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Single Sign-On (SSO / SAML)</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>SOC2 certification access reports</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Isolated dedicated ledgers</span>
                </li>
                <li className="flex items-start gap-3.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Dedicated success manager &amp; SLAs</span>
                </li>
              </ul>
            </div>
            <a href="#cta" className="w-full text-center py-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/20 text-slate-700 hover:text-indigo-600 font-bold text-sm transition-all block">
              Contact Sales
            </a>
          </div>

        </div>

      </div>
      </section>

    {/* 10. FAQ SECTION */}
      <section id="faq" className="py-12 md:py-20 lg:py-28 bg-slate-50 border-t border-slate-200/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Answering Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-700 max-w-xl mx-auto">
            Find immediate, transparent details regarding compliance, tool migrations, workspace configurations, and security credentials.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, idx) => {
            const isExpanded = expandedFaq === idx
            return (
              <div
                key={idx}
                className="border border-slate-200/60 rounded-xl bg-white shadow-premium overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 text-sm sm:text-base focus:outline-none transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
      </section>

    {/* 11. FINAL CTA SECTION */}
      <section id="cta" className="py-12 md:py-20 lg:py-28 bg-white relative overflow-hidden">

      {/* Soft Indigo Backlight */}
      <div className="absolute inset-x-0 bottom-[-100px] w-full h-[300px] bg-gradient-to-t from-indigo-100/50 via-slate-50/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-850 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">

            {/* Grid decorative backdrop pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                Start Managing Work <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Smarter Today.</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10">
                Join over 15,000+ workspaces globally who coordinate projects with FlowSync. Reclaim hours of redundant logs, automate tool endpoints, and align your developers.
              </p>

              {/* Form conversion block */}
              <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto items-stretch justify-center">
                <input
                  type="email"
                  value={heroEmail}
                  onChange={(e) => {
                    setHeroEmail(e.target.value)
                    setHeroError(false)
                  }}
                  placeholder="Enter your work email..."
                  className={`flex-grow h-12 rounded-xl border bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${heroError ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-850'
                    }`}
                  aria-label="Work email address"
                  required
                />
                <button
                  type="submit"
                  className="h-12 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-xl px-6 flex items-center justify-center gap-2 shadow hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs text-slate-400">
                <span>✓ 14-day free trial</span>
                <span>✓ No credit card required</span>
                <span>✓ Cancel anytime</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Logo and brief company summary */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Workflow className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-lg text-slate-100 tracking-tight">
                Flow<span className="text-indigo-400">Sync</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              FlowSync coordinates daily sprints, automates tool sync pipelines, and aligns developers, designers, and operations managers in real-time. Eliminating startup operational chaos.
            </p>
            <div className="text-slate-400 text-xs font-semibold uppercase mt-2">
              © 2026 FlowSync Technologies Inc. All rights reserved.
            </div>
          </div>

        {/* Nav Categories */}
        <div>
          <h4 className="text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">Product</h4>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-400">
            <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
            <li><a href="#benefits" className="hover:text-indigo-400 transition-colors">Benefits</a></li>
            <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing Tiers</a></li>
            <li><a href="#faq" className="hover:text-indigo-400 transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Security Audits</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">Resources</h4>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">System Uptime</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">API Changelog</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Community Forum</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Support Portal</a></li>
          </ul>
        </div>

        {/* Legal and Newsletter sign up */}
        <div>
          <h4 className="text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">Legal & Policy</h4>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-400 mb-6">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Security Ledger</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">GDPR & CCPA</a></li>
          </ul>
        </div>

      </div>

  {/* Small footer newsletter row */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="text-slate-400 text-xs">
      FlowSync coordinates 3.2M+ automated issues monthly. SOC2 certified compliance framework active.
    </div>

    <form onSubmit={handleFooterSubmit} className="flex gap-2 w-full sm:w-auto">
      <input
        type="email"
        value={footerEmail}
        onChange={(e) => setFooterEmail(e.target.value)}
        placeholder="Newsletter signup..."
        className="px-3 py-1.5 rounded-lg border border-slate-900 bg-slate-950 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:w-56"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap active:scale-95 transition-transform"
      >
        Subscribe
      </button>
    </form>
    {footerSuccess && (
      <span className="text-xs text-success-500 font-bold">✓ Subscribed!</span>
    )}
  </div>
      </footer>

    </div>
  )
}
