"use client"

import { useEffect, useRef, useState, memo } from "react"
import { useInView } from "react-intersection-observer"

// Define the Particle interface
interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  baseSize: number
  pulse: number
  pulseDirection: number
  update: () => void
  draw: () => void
}

// Memoize the component to prevent unnecessary re-renders
export const DNABackground = memo(function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Animation frame reference for proper cleanup
  const animationFrameRef = useRef<number>()
  // Store particles array in a ref to avoid recreating it on each render
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleMediaChange)
    return () => mediaQuery.removeEventListener("change", handleMediaChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !inView) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()

    // Add subtle glow effect
    ctx.shadowBlur = 15
    ctx.shadowColor = "rgba(16, 185, 129, 0.3)"

    window.addEventListener("resize", setCanvasDimensions)

    // DNA particle class - optimized
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      baseSize: number
      pulse: number
      pulseDirection: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.baseSize = Math.random() * 4 + 1
        this.pulse = Math.random() * 0.1
        this.pulseDirection = 1
        this.speedX = Math.random() * 1.2 - 0.6
        this.speedY = Math.random() * 1.2 - 0.6
        this.color = `rgba(${Math.random() > 0.5 ? "16, 185, 129" : "5, 150, 105"}, ${Math.random() * 0.7 + 0.3})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1
      }

      draw() {
        // Add pulsing effect
        if (!isReducedMotion) {
          this.size += this.pulse * this.pulseDirection
          if (this.size > this.baseSize + 1.5 || this.size < this.baseSize - 0.5) {
            this.pulseDirection *= -1
          }
        }

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - reduce count for better performance
    const particleCount = isReducedMotion
      ? Math.min(30, Math.floor(window.innerWidth / 60))
      : Math.min(100, Math.floor(window.innerWidth / 20))

    // Clear previous particles
    particlesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      particlesRef.current.push(new Particle(x, y))
    }

    // Connect particles with lines - optimize by reducing connections
    function connectParticles() {
      const maxDistance = isReducedMotion ? 150 : 200
      const skipFactor = isReducedMotion ? 3 : 2 // Skip particles for better performance
      const particles = particlesRef.current

      for (let a = 0; a < particles.length; a += skipFactor) {
        for (let b = a; b < particles.length; b += skipFactor) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.4})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop with performance optimizations
    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and draw particles
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        if (!isReducedMotion) {
          particles[i].update()
        }
        particles[i].draw()
      }

      connectParticles()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      particlesRef.current = []
    }
  }, [inView, isReducedMotion])

  return (
    <div ref={inViewRef} className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full bg-white opacity-85" />
    </div>
  )
})
