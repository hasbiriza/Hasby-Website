"use client"

import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
const CHAR_COUNT = 80 // Lebih ringan, cukup untuk efek visual

function getRandomChar(chars = CHARS) {
  return chars[Math.floor(Math.random() * chars.length)] ?? chars[0] ?? ""
}

interface RainChar {
  char: string
  x: number
  y: number
  speed: number
  isHighlight: boolean
}

class TextScramble {
  el: HTMLElement
  chars: string
  queue: Array<{ from: string; to: string; start: number; end: number; char?: string }>
  frame: number
  frameRequest: number
  resolve: () => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#"
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve
    })
    this.queue = []

    for (let i = 0; i < length; i++) {
      this.queue.push({
        from: oldText[i] ?? "",
        to: newText[i] ?? "",
        start: Math.floor(Math.random() * 40),
        end: 40 + Math.floor(Math.random() * 40),
      })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update = () => {
    let output = ""
    let complete = 0
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i]
      if (!item) continue

      const { from, to, start, end } = item
      let { char } = item
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = getRandomChar(this.chars)
          item.char = char
        }
        output += `<span class="hero-scramble-dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frame++
      this.frameRequest = requestAnimationFrame(this.update)
    }
  }
}

function ScrambledTitle() {
  const elRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)

  useEffect(() => {
    if (!elRef.current) return

    if (!scramblerRef.current) {
      scramblerRef.current = new TextScramble(elRef.current)
    }

    if (!scramblerRef.current) return

    const phrases = [
      "Hi, I'm Hasby",
      "Shopify Expert",
      "Software Engineer",
      "Growth Partner",
      "Building The Future",
      "Let's Create Together",
    ]

    let i = 0
    let timeoutId = 0
    let active = true

    const next = () => {
      if (!active || !scramblerRef.current) return
      const phrase = phrases[i] ?? phrases[0] ?? ""
      scramblerRef.current.setText(phrase).then(() => {
        timeoutId = window.setTimeout(next, 2000)
      })
      i = (i + 1) % phrases.length
    }

    next()

    return () => {
      active = false
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <h1
      ref={elRef}
      className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider"
      style={{ fontFamily: "monospace" }}
    >
      HASBY
    </h1>
  )
}

export default function RainingLetters() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const charsRef = useRef<RainChar[]>([])
  const animRef = useRef<number>(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const h = window.innerHeight
      const progress = Math.min(window.scrollY / (h * 1.2), 1)
      setScrollProgress(progress)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const initChars = useCallback(() => {
    const arr: RainChar[] = []
    for (let i = 0; i < CHAR_COUNT; i++) {
      arr.push({
        char: getRandomChar(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.08 + Math.random() * 0.2,
        isHighlight: false,
      })
    }
    return arr
  }, [])

  useEffect(() => {
    charsRef.current = initChars()
  }, [initChars])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
      ctx.font = "1.25rem monospace"
    }
    resize()
    window.addEventListener("resize", resize)

    const tick = () => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)

      const chars = charsRef.current
      const numHighlight = Math.floor(Math.random() * 2) + 2
      const highlightIndices = new Set<number>()
      while (highlightIndices.size < numHighlight) {
        highlightIndices.add(Math.floor(Math.random() * chars.length))
      }

      for (let i = 0; i < chars.length; i++) {
        const c = chars[i]
        if (!c) continue

        c.y += c.speed
        if (c.y >= 100) {
          c.y = -2
          c.x = Math.random() * 100
          c.char = getRandomChar()
        }
        c.isHighlight = highlightIndices.has(i)
      }

      ctx.font = "1.25rem monospace"
      for (const c of chars) {
        const x = (c.x / 100) * width
        const y = (c.y / 100) * height
        if (c.isHighlight) {
          ctx.fillStyle = "#00ff00"
          ctx.font = "bold 1.4rem monospace"
          ctx.shadowColor = "rgba(255,255,255,0.8)"
          ctx.shadowBlur = 8
        } else {
          ctx.fillStyle = "rgba(100, 116, 139, 0.5)"
          ctx.font = "1.25rem monospace"
          ctx.shadowBlur = 0
        }
        ctx.fillText(c.char, x, y)
      }
      ctx.shadowBlur = 0

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
        aria-hidden
      />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center px-4 will-change-transform"
        style={{
          transform: `translateY(${scrollProgress * 35}vh)`,
          filter: `blur(${Math.max(0, (scrollProgress - 0.6) * 2.5)}px)`,
          opacity: Math.max(0, 1 - scrollProgress * 1.2),
          transition: "none",
        }}
      >
        <ScrambledTitle />
        <p className="text-slate-400 text-base sm:text-lg max-w-md">
          A passionate developer crafting digital experiences with modern web technologies.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-[#6ea8ff] text-white rounded-full font-semibold text-sm transition-all duration-200 hover:bg-[#89bbff] hover:-translate-y-0.5 shadow-[0_0_20px_rgba(110,168,255,0.35)]"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-transparent text-slate-300 border border-white/10 rounded-full font-semibold text-sm transition-all duration-200 hover:text-white hover:border-white/20 hover:-translate-y-0.5"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .hero-scramble-dud {
          color: #0f0;
          opacity: 0.7;
        }
      `}</style>
    </div>
  )
}
