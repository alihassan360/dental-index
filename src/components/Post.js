import React, { Component } from 'react';
import PropTypes from "prop-types"
import Link from "gatsby-link"
import ClockIcon from "react-icons/lib/md/access-time"
import TagIcon from "react-icons/lib/md/label"
import OpenIcon from "react-icons/lib/md/folder"
import Img from "gatsby-image";

import PostIcons from "../components/PostIcons"
import { rhythm } from "../utils/typography"

class Post extends Component {
    removeEntities (str) {
        return str.replace(/&[^;]+;/g, " ")
    }
    render() {
        const node = this.props.node;
        return (
            <div 
                css={{
                border: `1px solid rgb(240,240,240)`,
                borderRadius: `4px`,
                boxShadow: `0 1px 4px rgb(240,240,240)`,
                margin: `${rhythm(0.5)}`,
                transition: `all 0.2s ease`,
                position: `relative`,
                width: `100%`,
                "@media screen and (min-width: 780px)": {
                    maxWidth: `calc(50% - ${rhythm(2)})`,
                    width: `calc(50% - ${rhythm(2)})`,
                    margin: rhythm(1),
                    ":hover": {
                    boxShadow: `0px 2px 15px rgb(220,220,220)`,
                    transition: `all 0.5s ease`
                    },
                },
                "@media screen and (min-width: 1281px)": {
                    maxWidth: `calc(33.33% - ${rhythm(2)})`,
                    width: `calc(33.33% - ${rhythm(2)})`,
                }
                }} 
                key={node.slug}
            >
                <Link to={"/"+node.slug} css={{ textDecoration: `none`, ":hover": { textDecoration: `none` } }}>
                {node.featured_media && <Img css={{ borderRadius: `4px 4px 0 0`, maxHeight: 200, minHeight: 200, }} sizes={node.featured_media.localFile.childImageSharp.sizes} />}
                <div css={{ background: `linear-gradient(rgba(255,255,255,0) 50%,rgba(255,255,255,1) 95%)`, width: `100%`, height: 200, position: `absolute`, top: 0, left: 0 }}></div>
                <h5 css={{ padding: `1em 1em 0`, marginBottom: `.8rem`, marginTop: `-2em`, color: `rgb(133,133,133)`, position: `relative` }}>{this.removeEntities(node.title)}</h5>
                </Link>
                <div css={{ padding: `0 1em 0.5em` }}>
                <div 
                    css={{ 
                    color: `rgb(180,180,180)`, 
                    display: `block`, 
                    textOverflow: `ellipsis`, 
                    wordWrap: `break-word`, 
                    overflow: `hidden`, 
                    maxHeight: 50, 
                    marginBottom: `1.5em`, 
                    fontSize: 14,
                    position: `relative`,
                    }} 
                    dangerouslySetInnerHTML={{ __html: node.excerpt }} 
                />
                <PostIcons css={{ display: `flex`, flexWrap: `wrap` }} node={node} />
                </div>
            </div>
        );
    }
}

export default Post;