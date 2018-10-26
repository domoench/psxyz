import React from "react"
import { Link } from "gatsby"

// A list of creators, with name and picture
// creators is an array of Contentful creator objs. TODO implement propTypes
export default (props) => {
  const creators = props.creators
  return (
    <div>
      <ul style={{listStyle: `none`, float: `left`}}>
        {
          creators.map(({node}) => {
            const creator = node
            const link = "/" + creator.slug
            const image = "https:" + creator.mainImage.file.url
            return (
              <li key={creator.id}>
                <Link to={link}>
                  <p style={{clear: `both`, padding: `1rem 0`}}>
                    {creator.name}
                    <img src={image} alt={creator.name} style={{maxWidth: `300px`, float: `right`, padding: `0 1rem`}}/>
                  </p>
                </Link>
                <button onClick={() => props.setToFirst(creator.id)}>Set to first</button>
                <CategoryTags creator={creator} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const CategoryTags = ({creator}) => {
  return (
    <ul>
    {
      creator.categories.map(({name, id}) => {
        return <li key={id}>{name}</li>
      })
    }
    </ul>
  )
}
