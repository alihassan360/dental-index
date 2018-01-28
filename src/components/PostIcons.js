import React from "react"
import ClockIcon from "react-icons/lib/md/access-time"
import TagIcon from "react-icons/lib/md/label"
import OpenIcon from "react-icons/lib/md/folder"
import PersonIcon from "react-icons/lib/md/person"
import Link from "gatsby-link"

import { rhythm } from "../utils/typography"

export default ({ node, className = `` }) => (
  <div css={{ marginTop: rhythm(-1 / 2) }} className={className}>
    <span style={{ marginRight: rhythm(0.5), marginBottom: rhythm(0.5), border: `1px solid rgb(240,240,240)`, borderRadius: `50px`, padding: `0 3px`, display: `inline-flex`, alignItems: `center` }}>
      <PersonIcon 
        size={18} 
        style={{ 
          position: `relative`, 
          borderRadius: `50px`, 
          backgroundColor: `rgb(133,133,133)`, 
          padding: `2px`,
          fill: `rgb(255,255,255)` 
        }} 
      />
      {` `}
      <span css={{ fontSize: `12px`, color: `rgb(133,133,133)`, padding: `0 4px` }}>{node.author.name}</span>
    </span>
    <span style={{ marginRight: rhythm(0.5), marginBottom: rhythm(0.5), border: `1px solid rgb(240,240,240)`, borderRadius: `50px`, padding: `0 3px`, display: `inline-flex`, alignItems: `center` }} className="date-field">
      <ClockIcon 
        size={18} 
        style={{
          position: `relative`,
          borderRadius: `50px`, 
          backgroundColor: `rgb(133,133,133)`, 
          padding: `2px`,
          fill: `rgb(255,255,255)`  
        }} 
      />
      {` `}
      <span css={{ fontSize: `12px`, color: `rgb(133,133,133)`, padding: `0 4px` }}>{node.date}</span>
    </span>
    {node.categories &&
      node.categories.map(category => (
        <span className="category-field" style={{ marginRight: rhythm(0.5), border: `1px solid rgb(240,240,240)`, borderRadius: `50px`, padding: `0 3px`, display: `inline-flex`, alignItems: `center` }} key={category.name}>
          <OpenIcon 
            size={18}
            style={{ 
              position: `relative`,
              borderRadius: `50px`, 
              backgroundColor: `rgb(133,133,133)`, 
              padding: `3px`,
              fill: `rgb(255,255,255)`
          }} 
        />
          {` `}
          <Link to={`/category/${category.slug}`} css={{ fontSize: `12px`, color: `rgb(133,133,133)`, padding: `0 4px` }}>{category.name}</Link>
        </span>
      ))}
    {/* {node.tags &&
      node.tags.map(tag => (
        <span key={tag.name}>
          <TagIcon size={14} style={{ position: `relative`, bottom: 1 }} />
          {` `}
          {tag.name}
        </span>
      ))} */}
  </div>
)

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    date(formatString: "MMM DD, YYYY")
    tags {
      name
    }
    categories {
      name
      slug
    }
    author {
      name
    }
  }
`
