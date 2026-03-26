'use client'
import { useEffect, useRef, useState } from 'react'
import GradientText from '@/components/effects/GradientText'

const articles = [
  {
    id: '01',
    year: '2025',
    area: 'BRACIS 2025',
    title: 'When Does TDA Help in LLM Monitoring?',
    titleItalic: 'in LLM Monitoring?',
    abstract: 'Investigação empírica sistemática da Análise Topológica de Dados (TDA) aplicada a representações de LLMs para detecção de incerteza epistêmica. Cobrindo alucinações factuais (TruthfulQA, n=817), detecção de jailbreaks (n=120) e monitoramento de streams adversariais em três cenários, encontramos que TDA produz sinal coletivo significativo (Wasserstein H₁ até 3.0×) mas falha na pontuação individual (AUC 0.43–0.51), enquanto entropia de saída atinge 0.55–0.93 com zero overhead computacional. Formalizamos a Topological Coverage Boundary (TCB) hypothesis.',
    link: '#',
    featured: true,
  },
  {
    id: '02',
    year: '2025',
    area: 'Workshop · NeurIPS',
    title: 'TDA for LLM Monitoring — A Systematic Study',
    titleItalic: 'A Systematic Study',
    abstract: 'Versão workshop do estudo sobre TDA aplicada a LLMs. Apresentamos a TCB hypothesis, que formaliza três condições onde TDA oferece valor complementar: shift de domínio em dados estruturados de baixa dimensionalidade, entradas adversariais fluentes projetadas para minimizar entropia, e monitoramento de streams onde o sinal populacional pode ser explorado.',
    link: '#',
    featured: false,
  },
]

/* ─── Featured article — full width ─── */
function FeaturedArticle({ a }: { a: typeof articles[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: .08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isAvailable = a.link !== '#'

  const inner = (
    <div style={{
      display: 'block', textDecoration: 'none', borderRadius: 'var(--r-xl)', overflow: 'hidden',
      border: `1px solid ${hov && isAvailable ? 'rgba(200,255,0,.25)' : 'var(--border-md)'}`,
      background: 'var(--bg-card)', transition: 'border-color .4s, box-shadow .4s',
      boxShadow: hov && isAvailable ? '0 32px 80px rgba(0,0,0,.6)' : '0 8px 32px rgba(0,0,0,.35)',
      cursor: isAvailable ? 'none' : 'default',
    }}>
      {/* Top accent */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--lime), rgba(200,255,0,.3))', boxShadow: '0 0 18px rgba(200,255,0,.5)' }} />

      <div style={{ padding: '3.5rem 4rem' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.2em', color: 'var(--lime)', textTransform: 'uppercase', background: 'rgba(200,255,0,.1)', border: '1px solid rgba(200,255,0,.2)', borderRadius: 'var(--r-pill)', padding: '.3rem .9rem' }}>
            {a.area}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.16em', color: 'var(--gray-mid)', textTransform: 'uppercase' }}>
            {a.year}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', color: 'var(--gray-mid)', marginLeft: 'auto' }}>
            {a.id} / {String(articles.length).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '1.75rem', maxWidth: 760 }}>
          {a.title.replace(a.titleItalic, '').trim()}{' '}
          <em style={{ fontStyle: 'italic', color: hov && isAvailable ? 'var(--lime)' : 'var(--white-60)', fontWeight: 400, transition: 'color .3s' }}>
            {a.titleItalic}
          </em>
        </h3>

        {/* Abstract */}
        <p className="body-lg" style={{ maxWidth: 680, marginBottom: '2.5rem' }}>{a.abstract}</p>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          {isAvailable ? (
            <>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', textTransform: 'uppercase', color: hov ? 'var(--lime)' : 'var(--gray-light)', transition: 'color .3s, letter-spacing .3s', letterSpacing: hov ? '.28em' : '.2em' }}>
                Ler artigo completo →
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${hov ? 'rgba(200,255,0,.4)' : 'rgba(255,255,255,.06)'}, transparent)`, transition: 'background .3s' }} />
            </>
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', textTransform: 'uppercase', color: 'var(--gray-mid)', letterSpacing: '.2em' }}>
              Em processo de publicação
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(36px)', transition: 'all .85s var(--ease-expo)' }}>
      {isAvailable ? (
        <a href={a.link} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}>
          {inner}
        </a>
      ) : (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
          {inner}
        </div>
      )}
    </div>
  )
}

/* ─── Regular article row — editorial newspaper style ─── */
function ArticleRow({ a, index, total }: { a: typeof articles[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: .15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isAvailable = a.link !== '#'

  const inner = (
    <div style={{
      display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: '2.5rem', alignItems: 'start',
      padding: '2.5rem 0',
      borderBottom: index < total - 1 ? '1px solid var(--border)' : 'none',
      textDecoration: 'none', cursor: isAvailable ? 'none' : 'default',
      transition: 'background .2s', borderRadius: 'var(--r-sm)',
    }}>
      {/* Index number */}
      <div style={{ paddingTop: '.25rem' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.4rem', color: hov && isAvailable ? 'var(--lime)' : 'var(--gray)', transition: 'color .25s' }}>
          {a.id}
        </span>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.85rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', color: 'var(--lime)', textTransform: 'uppercase' }}>{a.area}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--gray)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', color: 'var(--gray-mid)', textTransform: 'uppercase' }}>{a.year}</span>
          {!isAvailable && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.1em', color: 'var(--gray-mid)', textTransform: 'uppercase', marginLeft: '.5rem', opacity: .6 }}>· em publicação</span>
          )}
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-.02em', color: 'var(--white)', marginBottom: '1rem' }}>
          {a.title.replace(a.titleItalic, '').trim()}{' '}
          <em style={{ fontStyle: 'italic', color: hov && isAvailable ? 'var(--lime)' : 'var(--white-60)', fontWeight: 400, transition: 'color .3s' }}>
            {a.titleItalic}
          </em>
        </h3>

        <p className="body-md" style={{ fontSize: '.88rem', maxWidth: 620 }}>{a.abstract}</p>
      </div>

      {/* Arrow (only if available) */}
      {isAvailable && (
        <div style={{ paddingTop: '.25rem', opacity: hov ? 1 : 0, transform: hov ? 'translateX(0)' : 'translateX(-8px)', transition: 'all .3s var(--ease-expo)', color: 'var(--lime)', fontFamily: 'var(--font-mono)', fontSize: '.7rem' }}>
          →
        </div>
      )}
    </div>
  )

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)', transition: `all .7s var(--ease-expo) ${index * .1}s` }}>
      {isAvailable ? (
        <a href={a.link} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
          onMouseEnter={e => { setHov(true); (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.02)' }}
          onMouseLeave={e => { setHov(false); (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
          {inner}
        </a>
      ) : (
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
          {inner}
        </div>
      )}
    </div>
  )
}

export default function Publications() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headIn, setHeadIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setHeadIn(true), { threshold: .08 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  const featured = articles.filter(a => a.featured)
  const rest = articles.filter(a => !a.featured)

  return (
    <section id="publications" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Diagonal top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'var(--bg)', clipPath: 'polygon(0 0,100% 0,100% 100%,0 0)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '11rem 4rem 10rem' }}>

        {/* Header */}
        <div ref={headRef} style={{ marginBottom: '5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span className="s-tag" style={{ opacity: headIn ? 1 : 0, transition: 'opacity .5s var(--ease-expo)' }}>
              03 — Publicações
            </span>
            <h2 className="s-h2" style={{ opacity: headIn ? 1 : 0, transform: headIn ? 'none' : 'translateY(28px)', transition: 'all .8s var(--ease-expo) .1s' }}>
              Artigos <em>científicos</em>
            </h2>
          </div>

          {/* Article count badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.85rem', paddingBottom: '.5rem', opacity: headIn ? 1 : 0, transition: 'opacity .7s var(--ease-expo) .3s' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '3rem', fontWeight: 900, color: 'var(--lime)', lineHeight: 1 }}>{articles.length}</span>
            <span className="body-md" style={{ fontSize: '.9rem', maxWidth: 100, lineHeight: 1.5 }}>artigos publicados</span>
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            {featured.map(a => <FeaturedArticle key={a.id} a={a} />)}
          </div>
        )}

        {/* Editorial list */}
        {rest.length > 0 && (
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-md)', padding: '0 2.5rem', overflow: 'hidden' }}>
            {rest.map((a, i) => (
              <ArticleRow key={a.id} a={a} index={i} total={rest.length} />
            ))}
          </div>
        )}

      </div>

      {/* Diagonal bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'var(--bg)', clipPath: 'polygon(0 100%,100% 0,100% 100%)', zIndex: 1 }} />
    </section>
  )
}
