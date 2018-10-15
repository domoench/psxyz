import React from "react"
import { Link } from "gatsby"

export default ({data}) => {
  return (
    <div>
      <ul style={{listStyle: `none`, float: `left`}}>
        {
          data.allContentfulCreator.edges.map(({node}) => {
            const creator = node
            const link = "/" + creator.slug
            const image = creator.images[0]
            return (
              <Link to={link}>
                <li key={creator.id}>
                  <p style={{clear: `both`, padding: `1rem 0`}}>
                    {creator.name}
                    <img src={image.file.url} alt={creator.name} style={{maxWidth: `200px`, float: `right`, padding: `0 1rem`}}/>
                  </p>
                </li>
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}
