import React from "react"
import { Link } from "gatsby"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default (props) =>
  <header style={{ marginBottom: `1.5rem` }}>
		<Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
			[PSxyz]
		</Link>
		<ul style={{ listStyle: `none`, float: `right` }}>
			<ListLink to="/">Home</ListLink>
			<ListLink to="/about/">About</ListLink>
		</ul>
  </header>
