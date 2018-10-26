import React from "react"
import Layout from "../components/layout"
import CreatorThumbList from "../components/creatorThumbList"
import { graphql } from "gatsby"

class Index extends React.Component {
  constructor(props) {
    super(props)
    console.log("Index: constructor(). props: ", props)
    this.setToFirst = this.setToFirst.bind(this)
    this.state = {
      creators: props.data.allContentfulCreator.edges,
    }
    console.log("Index: constructor(). creators: ", this.state.creators)
  }

  // Set the given creator as the first in the list
  setToFirst(creatorId) {
    let creators = this.state.creators
    // linear search for the index of the specified creator
    let creatorIdx = 0
    for (let i = 0; i < creators.length; ++i) {
      if (creatorId === creators[i].node.id) {
        creatorIdx = i
        break
      }
    }

    // Swap the selected creator's position with first
    let updated = creators.slice()
    let tmp = updated[0]
    updated[0] = updated[creatorIdx]
    updated[creatorIdx] = tmp
    this.setState({creators: updated})
    console.log("Index: setToFirst(). creators: ", this.state.creators)
  }

  render() {
    console.log("Index: render(). creators: ", this.state.creators)
    return (
      <Layout>
        <CreatorThumbList creators={this.state.creators} setToFirst={this.setToFirst} />
      </Layout>
    )
  }
}

export default Index

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
          categories {
            id
            name
          }
        }
      }
    }
  }
`
