import React, { Component } from "react";
import { ShareButtons, ShareCounts, generateShareIcon } from "react-share";
import { css } from "glamor"

import config from "../data/SiteConfig";

const IconStyle = css({
    position: `relative`,
    marginBottom: `2em`,
    "& .SocialMediaShareButton": {
        marginRight: `1em`
    },
    "& .SocialMediaShareCount": {
        textAlign: `center`,
    }
})

class SocialLinks extends Component {
    removeEntities (str) {
        var length = 250;
        var str = str.substring(0, length);
        return str.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ");
    }
  render() {
    const { postNode, postPath, mobile } = this.props;
    const post = postNode;
    const url = config.siteUrl + config.pathPrefix + postPath;
    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      TelegramShareButton,
      RedditShareButton
    } = ShareButtons;
    const {
      FacebookShareCount,
      GooglePlusShareCount,
      LinkedinShareCount,
      RedditShareCount
    } = ShareCounts;

    const FacebookIcon = generateShareIcon("facebook");
    const TwitterIcon = generateShareIcon("twitter");
    const TelegramIcon = generateShareIcon("telegram");
    const GooglePlusIcon = generateShareIcon("google");
    const LinkedinIcon = generateShareIcon("linkedin");
    const RedditIcon = generateShareIcon("reddit");
    const iconSize = mobile ? 36 : 48;
    const filter = count => (count > 0 ? count : null);

    return (
      <div {...IconStyle}>
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
        Share This Article
        </div>
        <div css={{ display: `flex`, justifyContent: `center`, marginTop: `1em` }}>
            <FacebookShareButton
                url={url}
                title={post.title}
                picture={post.featured_media}
                description={postNode.excerpt}
                >
                <FacebookIcon round size={iconSize} />
                <FacebookShareCount url={url}>
                    {count =>
                    <div className="share-count">
                        {filter(count)}
                    </div>}
                </FacebookShareCount>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={`${this.removeEntities(post.title)}`}>
            <TwitterIcon round size={iconSize} />
            </TwitterShareButton>
            <LinkedinShareButton
                url={url}
                title={`${this.removeEntities(post.title)}`}
                description={`${this.removeEntities(postNode.excerpt)}`}
                >
                <LinkedinIcon round size={iconSize} />
                <LinkedinShareCount url={url}>
                    {count =>
                    <div className="share-count">
                        {filter(count)}
                    </div>}
                </LinkedinShareCount>
            </LinkedinShareButton>
            <GooglePlusShareButton url={url}>
            <GooglePlusIcon round size={iconSize} />
            <GooglePlusShareCount url={url}>
                {count =>
                <div className="share-count">
                    {filter(count)}
                </div>}
            </GooglePlusShareCount>
            </GooglePlusShareButton>
        </div>
      </div>
    );
  }
}

export default SocialLinks;