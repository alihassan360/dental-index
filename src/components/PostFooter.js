import React from "react"
import TagIcon from "react-icons/lib/md/label"

import { rhythm } from "../utils/typography"

export default ({ node, className = `` }) => (
  <div css={{ marginTop: rhythm(-1 / 2) }} className={className}>
    {node.tags &&
      node.tags.map(tag => (
        <span key={tag.name}>
          <TagIcon size={14} style={{ position: `relative`, bottom: 1 }} />
          {` `}
          {tag.name}
        </span>
      ))}
  </div>
)

export const query = graphql`
  fragment PostIcons on wordpress__POST {
    tags {
      name
    }
  }
`
