import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  )

  // Use useLayoutEffect for faster updates after DOM changes (client only)
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Throttle updates to avoid excessive re-renders
    let ticking = false
    const onChange = (e: MediaQueryListEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsMobile(prev => {
            if (prev !== e.matches) return e.matches
            return prev
          })
          ticking = false
        })
        ticking = true
      }
    }

    // Add listener (cross-browser support)
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      mql.addListener(onChange) // Safari fallback
    }

    // Set initial state
    setIsMobile(mql.matches)

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        mql.removeListener(onChange)
      }
    }
  }, [])

  return isMobile
}


