import React from "react"

function CreatorThumbList({data}) {
  return (
    <div>
      <ul style={{listStyle: `none`, float: `left`}}>
        {data.allContentfulCreator.edges.map((creator) =>
          <li>
            {creator.node.images.map(image =>
              <img src={image.file.url} alt={creator.name} style={{maxWidth: `200px`}}/>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CreatorThumbList
