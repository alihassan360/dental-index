import React from "react"
// import TagIcon from "react-icons/lib/md/label"
import Link from "gatsby-link"

import { rhythm } from "../utils/typography"

export default ({ node, className = `` }) => (
  <div css={{ marginTop: rhythm(-1 / 2), marginBottom: rhythm(1), textAlign: `center`, position: `relative` }} className={className}>
    <div className="tags">
      {node.tags && 
        <div 
        css={{ 
          backgroundColor: `rgb(217,217,217)`,
          borderRadius: 50,
          padding: `0.4em 1em`,
          display: `table`,
          textTransform: `uppercase`,
          fontSize: 12,
          color: `rgb(99,99,99)`,
          ':after': {
            content: `""`,
            border: `1px solid rgb(217,217,217)`,
            position: `absolute`,
            left: `0`,
            right: `0`,
            top: `1.2em`,
            zIndex: `-1`,
          }
        }}
        >
        Tags
        </div>
      }
      {node.tags &&
        node.tags.map(tag => (
          <Link
            to={`/tag/${tag.slug}`}
            css={{ 
              backgroundColor: `rgb(217,217,217)`, 
              borderRadius: 50, padding: `0.4em 1em`, 
              marginRight: `1em`, 
              color: `rgb(99,99,99)`, 
              marginTop: `.5em`, 
              display: `inline-flex`, 
              fontSize: 14,
              ":last-child": {
                marginRight: 0,
              }
            }} 
              key={tag.name}
          >
            {/* <TagIcon size={14} style={{ position: `relative`, bottom: 1 }} /> */}
            {tag.name}
          </Link>
        ))}
    </div>
  </div>
)

export const query = graphql`
  fragment PostFooter on wordpress__POST {
    tags {
      name
      slug
    }
  }
`
