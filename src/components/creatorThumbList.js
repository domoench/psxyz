import React from "react"
import { Link } from "gatsby"

// A list of creators, with name and picture
// creators is an array of Contentful creator objs. TODO implement propTypes
export default ({creators}) => {
  console.log("[CreatorThumbList] creators: ", creators)
  return (
    <div>
      <ul style={{listStyle: `none`, float: `left`}}>
        {
          creators.map(({node}) => {
            const creator = node
            console.log("[CreatorThumbList] map node: ", creator)
            const link = "/" + creator.slug
            const image = creator.mainImage.file.url
            console.log("image: ", image)
            return (
              <li key={creator.id}>
                <Link to={link}>
                  <p style={{clear: `both`, padding: `1rem 0`}}>
                    {creator.name}
                    <img src={image} alt={creator.name} style={{maxWidth: `200px`, float: `right`, padding: `0 1rem`}}/>
                  </p>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
