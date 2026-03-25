'use client'
import { useEffect, useRef, useState } from 'react'
import StarBorder from '@/components/effects/StarBorder'


const projects = [
  { id: '01', year: '2024', accent: '#B4FF00', featured: true,  category: 'Streamlit · Python',       title: 'Dashboard de Análise',      titleItalic: 'de Análise',    desc: 'Pipeline de dados em tempo real com +50k linhas, filtros dinâmicos e cache otimizado. Reduziu 80% do tempo de análise manual.',          descShort: 'Pipeline +50k linhas, filtros dinâmicos.', tech: ['Python','Pandas','Plotly','Streamlit'], link: '#', img: null as string|null, bars: [60,85,45,90,70,55,80,65,95,40] },
  { id: '02', year: '2024', accent: '#00d4ff', featured: false, category: 'Power Platform',            title: 'Automação Power Platform',  titleItalic: 'Power Platform', desc: 'Fluxo end-to-end de aprovação com SharePoint e Teams. Processo 70% mais rápido.',                                                       descShort: 'Aprovação automática, 70% mais rápido.',   tech: ['Power Apps','Power Automate','SharePoint'], link: '#', img: null as string|null, bars: [40,70,55,85,60,75,50,80,45] },
  { id: '03', year: '2023', accent: '#ff6b35', featured: false, category: 'Python · HTML',             title: 'Web Scraper & Reporter',    titleItalic: '& Reporter',    desc: 'Coleta automatizada com relatórios HTML diários e alertas por email.',                                                                        descShort: 'Relatórios HTML automáticos.',             tech: ['Python','BeautifulSoup','Selenium'], link: '#', img: null as string|null, bars: [75,50,90,65,80,45,70,85,55] },
  { id: '04', year: '2024', accent: '#B4FF00', featured: false, category: 'Scikit-learn · Streamlit',  title: 'ML Classifier App',         titleItalic: 'Classifier App', desc: 'Interface no-code para treinar e exportar modelos. Matriz de confusão e CSV.',                                                            descShort: 'ML sem código, exportação CSV.',           tech: ['Python','Scikit-learn','Streamlit'], link: '#', img: null as string|null, bars: [50,80,65,95,55,75,85,60,70] },
  { id: '05', year: '2023', accent: '#b388ff', featured: false, category: 'HTML · CSS · JS',           title: 'Landing Page Interativa',   titleItalic: 'Interativa',    desc: 'Site de produto com parallax, micro-animações e 98/100 Lighthouse.',                                                                        descShort: 'Parallax, animações, 98/100 Lighthouse.',  tech: ['HTML','CSS','JavaScript'], link: '#', img: null as string|null, bars: [70,55,80,60,90,45,75,85,50] },
]

function MockWin({ p, h }: { p: typeof projects[0]; h: number }) {
  return (
    <div style={{ width: '100%', height: h, background: `linear-gradient(160deg,${p.accent}08,var(--bg))`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: h > 200 ? '2rem' : '1rem', borderRadius: 8, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden' }}>
        <div style={{ padding: '.4rem .7rem', borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', gap: '.3rem' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c, opacity: .7 }} />)}
        </div>
        <div style={{ padding: '.85rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          <div style={{ display: 'flex', gap: '.2rem', alignItems: 'flex-end', height: h > 200 ? 52 : 36 }}>
            {p.bars.map((bh, i) => (
              <div key={i} style={{ flex: 1, height: `${bh}%`, background: p.accent, opacity: .12 + (i / p.bars.length) * .4, borderRadius: '2px 2px 0 0' }} />
            ))}
          </div>
          {[70,50,85].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, background: 'rgba(255,255,255,.07)', borderRadius: 2 }} />)}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.accent},${p.accent}40)`, boxShadow: `0 0 16px ${p.accent}70` }} />
      <div style={{ position: 'absolute', bottom: '.5rem', right: '1rem', fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'rgba(255,255,255,.04)', lineHeight: 1, userSelect: 'none' }}>{p.id}</div>
    </div>
  )
}

function FeaturedCard({ p }: { p: typeof projects[0] }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: .06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ marginBottom: '1.5rem', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(36px)', transition: 'all .85s var(--ease-expo)' }}>
      <div className="dash-card detail-grid" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', borderColor: hov ? `${p.accent}35` : undefined }}>
        {p.img ? <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 360 }} /> : <MockWin p={p} h={360} />}
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid var(--dashboard-border)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.16em', color: p.accent, textTransform: 'uppercase', background: `${p.accent}12`, border: `1px solid ${p.accent}28`, borderRadius: 'var(--r-pill)', padding: '.28rem .85rem' }}>{p.category}</span>
              <span className="mono-sm">{p.year}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '1.25rem' }}>
              {p.title.replace(p.titleItalic, '').trim()}{' '}
              <em style={{ fontStyle: 'italic', color: hov ? p.accent : 'var(--white-60)', fontWeight: 400, transition: 'color .3s' }}>{p.titleItalic}</em>
            </h3>
            <p className="body-md" style={{ marginBottom: '1.75rem', fontSize: '.9rem' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
              {p.tech.map(t => <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.1em', color: 'var(--gray-light)', border: '1px solid var(--border)', padding: '.24rem .65rem', borderRadius: 'var(--r-pill)', textTransform: 'uppercase' }}>{t}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.75rem', borderTop: '1px solid var(--border)', marginTop: '1.75rem' }}>
            <a href={p.link} className="glass-btn glass-btn-lime" style={{ fontSize: '.6rem', padding: '.45rem 1rem', letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Ver →</a>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '3rem', color: 'rgba(255,255,255,.04)', userSelect: 'none' }}>{p.id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SmallCard({ p, delay = 0 }: { p: typeof projects[0]; delay?: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: .06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="glass glass-hover" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: vis ? 1 : 0, transform: vis ? (hov ? 'translateY(-5px)' : 'none') : 'translateY(36px)', transition: `all .7s var(--ease-expo) ${delay}s`, borderColor: hov ? `${p.accent}28` : undefined }}>
      {p.img ? <img src={p.img} alt={p.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} /> : <MockWin p={p} h={180} />}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.65rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.14em', color: p.accent, textTransform: 'uppercase' }}>{p.category}</span>
          <span className="mono-sm">{p.year}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem,1.8vw,1.6rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '.75rem' }}>
          {p.title.replace(p.titleItalic, '').trim()}{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--white-60)', fontWeight: 400 }}>{p.titleItalic}</em>
        </h3>
        <p className="body-md" style={{ fontSize: '.82rem', marginBottom: '1.25rem' }}>{p.descShort}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginBottom: '1.25rem' }}>
          {p.tech.map(t => <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.08em', color: 'var(--gray-light)', border: '1px solid var(--border)', padding: '.2rem .55rem', borderRadius: 'var(--r-pill)', textTransform: 'uppercase' }}>{t}</span>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
          <a href={p.link} style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: p.accent, textDecoration: 'none', transition: 'letter-spacing .25s' }}
            onMouseEnter={e => (e.currentTarget.style.letterSpacing = '.22em')}
            onMouseLeave={e => (e.currentTarget.style.letterSpacing = '.14em')}>Ver →</a>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', color: 'rgba(255,255,255,.04)', userSelect: 'none' }}>{p.id}</span>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headIn, setHeadIn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setHeadIn(true), { threshold: .06 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" style={{ background: 'var(--bg)', padding: 'clamp(6rem,11vw,11rem) clamp(1rem,4vw,4rem) clamp(5rem,10vw,10rem)' }}>
      <div ref={headRef} style={{ marginBottom: '4rem' }}>
        <span className="s-tag" style={{ opacity: headIn ? 1 : 0, transition: 'opacity .5s' }}>02 — Trabalhos</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <h2 className="s-h2" style={{ opacity: headIn ? 1 : 0, transform: headIn ? 'none' : 'translateY(24px)', transition: 'all .8s var(--ease-expo) .1s' }}>
            Projetos <em>selecionados</em>
          </h2>
          <p className="body-md" style={{ maxWidth: 240, opacity: headIn ? 1 : 0, transition: 'opacity .7s .35s' }}>
            {projects.length} projetos entregues.
          </p>
        </div>
      </div>

      {/* Featured */}
      {projects.filter(p => p.featured).map(p => <FeaturedCard key={p.id} p={p} />)}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {projects.filter(p => !p.featured).map((p, i) => <SmallCard key={p.id} p={p} delay={i * .08} />)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href="https://github.com/luisignacio" className="glass-btn">
          Ver todos no GitHub →
        </a>
      </div>
    </section>
  )
}