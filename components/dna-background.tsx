"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

export function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

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

    let animationFrameId: number
    let particlesArray: Particle[] = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()

    // Add subtle glow effect
    ctx.shadowBlur = 15
    ctx.shadowColor = "rgba(16, 185, 129, 0.3)"

    window.addEventListener("resize", setCanvasDimensions)

    // DNA particle class
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
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
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
    const particleCount = isReducedMotion ? Math.min(50, window.innerWidth / 40) : Math.min(150, window.innerWidth / 15)

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particlesArray.push(new Particle(x, y))
    }

    // Connect particles with lines - optimize by reducing connections
    function connectParticles() {
      const maxDistance = isReducedMotion ? 150 : 200
      const skipFactor = isReducedMotion ? 3 : 2 // Skip particles for better performance

      for (let a = 0; a < particlesArray.length; a += skipFactor) {
        for (let b = a; b < particlesArray.length; b += skipFactor) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.4})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        if (!isReducedMotion) {
          particlesArray[i].update()
        }
        particlesArray[i].draw()
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
      particlesArray = []
    }
  }, [inView, isReducedMotion])

  return (
    <div ref={inViewRef} className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full bg-white opacity-85" />
    </div>
  )
}
