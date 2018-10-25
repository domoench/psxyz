import React from "react"
import Layout from "../components/layout"
import CreatorThumbList from "../components/creatorThumbList"
import { graphql } from "gatsby"

export default ({data}) => {
  return (
    <Layout>
      <CreatorThumbList data={data} />
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulCreator (sort: {fields: fields___sortId}) {
      edges {
        node {
          id
          slug
          name
          images {
            id
            file {
              url
            }
          }
          bio {
            id
            bio
          }
          mainImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
