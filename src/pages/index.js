import React from "react"
import Layout from "../components/layout"
import RandomCreatorThumbList from "../components/randomCreatorThumbList"
import { graphql } from "gatsby"

export default ({data}) => (
  <Layout>
  <RandomCreatorThumbList data={data} />
  </Layout>
)

export const query = graphql`
  {
    allContentfulCreator {
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
        }
      }
    }
  }
`
