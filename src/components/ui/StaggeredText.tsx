"use client"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

type StaggeredTextProps = {
  text: string
  el?: keyof JSX.IntrinsicElements
  className?: string
  once?: boolean
}

const defaultAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.1 },
}

export default function StaggeredText({ text, el: Wrapper = "p", className, once }: StaggeredTextProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { amount: 0.5, once })

  useEffect(() => {
    if (isInView) {
      animate("span", { opacity: 1 }, { delay: stagger(0.1) })
    } else {
      animate("span", { opacity: 0 }, { duration: 0 })
    }
  }, [isInView, animate])

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span ref={scope} initial="hidden" aria-hidden>
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-2">
            {Array.from(word).map((char, j) => (
              <motion.span key={`${i}-${j}`} className="inline-block" variants={defaultAnimation}>
                {char}
              </motion.span>
            ))}
            {/* Add actual space between words */}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
