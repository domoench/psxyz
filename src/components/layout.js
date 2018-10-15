import React from "react"
import Header from "../components/header"

export default ({ children }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `1rem 1rem` }}>
    <Header />
    {children}
  </div>
)
