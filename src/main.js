import './style.css'

const header = document.querySelector('.site-header')
const nav = document.querySelector('#nav')
const navToggle = document.querySelector('.nav-toggle')

// Sombra del header al hacer scroll
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8)
}
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

// Menú móvil
if (navToggle && nav) {
  const closeNav = () => {
    nav.classList.remove('is-open')
    navToggle.setAttribute('aria-expanded', 'false')
    navToggle.setAttribute('aria-label', 'Abrir menú')
  }

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open')
    navToggle.setAttribute('aria-expanded', String(isOpen))
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú')
  })

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav)
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeNav()
  })
}

// Aparición suave de los bloques
const revealItems = document.querySelectorAll('[data-reveal]')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  )

  revealItems.forEach((item) => observer.observe(item))
}

// Año actual en el pie de página
const year = document.querySelector('#year')
if (year) year.textContent = String(new Date().getFullYear())
