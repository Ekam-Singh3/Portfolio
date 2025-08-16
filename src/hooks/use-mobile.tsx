import React from "react"
import { useIsMobile } from "./useIsMobile"
import Projects from "./Projects"
import Skills from "./Skills"

export default function Portfolio() {
  const isMobile = useIsMobile()

  // 🔑 Don't block rendering while hook resolves
  if (isMobile === undefined) {
    // Optional: show a loader or fallback layout
    return <div className="text-center p-10">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">My Portfolio</h1>

      {/* Example conditional rendering */}
      {isMobile ? (
        <div className="p-4">
          <h2 className="text-xl">Mobile View</h2>
          <Projects compact />   {/* You can pass props for mobile-friendly UI */}
          <Skills compact />
        </div>
      ) : (
        <div className="p-8">
          <h2 className="text-xl">Desktop View</h2>
          <Projects />
          <Skills />
        </div>
      )}
    </div>
  )
}
