import React from "react"
import { Link } from "gatsby"

// A list of creators, with name and picture
// creators is an array of Contentful creator objs. TODO implement propTypes
export default ({creators}) => {
  return (
    <div>
      <ul style={{listStyle: `none`, float: `left`}}>
        {
          creators.map(({node}) => {
            const creator = node
            const link = "/" + creator.slug
            const image = creator.images[0]
            return (
              <Link to={link} key={creator.id}>
                <li>
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
