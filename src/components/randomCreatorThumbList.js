import React from "react"
import CreatorThumbList from "./creatorThumbList"

// Fisher-Yates randomized array in-place shuffle algo
function shuffle(a) {
  // Array index pointers
  let curr = a.length
  let rand = a.length

  // Temp data for swaps
  let temp

  // Walk from right to left
  while (curr > 0) {
    // Randomly pick an index in the left partition
    rand = Math.floor(Math.random() * curr--)

    // Swap current with randomly picked
    temp = a[rand]
    a[rand] = a[curr]
    a[curr] = temp
  }

  return a
}

// A randomized list of creators, with name and picture
function RandomCreatorThumbList({data}) {
  let creators = shuffle(data.allContentfulCreator.edges.slice(0))
  return (
    <CreatorThumbList creators={creators} />
  )
}

export default RandomCreatorThumbList
