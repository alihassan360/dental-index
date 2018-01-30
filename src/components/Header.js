import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import HamburgerMenu from "react-hamburger-menu"
import ArrowRight from "react-icons/lib/md/arrow-forward"
//import Flickity from "react-flickity-component"


import { rhythm, scale } from "../utils/typography"
import config from "../data/SiteConfig"
import './flickity.css'

const isBrowser = typeof window !== 'undefined';
const Flickity = isBrowser ? require( 'react-flickity-component') : undefined;

const containerStyle = {
  maxWidth: 700,
  margin: `0 auto`,
  padding: rhythm(3 / 4),
}
const menu = {
    flexDirection: `row`,
    display: `flex`,
    position: `relative`,
    "@media screen and (min-width: 750px)": {
        "&.navigation": {
            width: `100%`,
            outline: 0,
            margin: `-1em auto`,
            "&:after": {
                content: 'flickity',
                display: `none`
            },
        },
        "& .flickity-viewport": {
            width: `90%`,
            height: `50px !important`,
            margin: `auto`,
        },
        "& .flickity-prev-next-button": {
            width: 30,
            "&[disabled]":{
                display: `none`,
            }
        },
        "& .flickity-slider": {
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`
        },
    },
    "body.menu-opened &": {
        flexDirection: `column`,
        "@media screen and (max-width:789px)": {
            display: "flex",
        }
    },
    "@media screen and (max-width:789px)": {
        display: "none"
    },
    "& .navBarItem a": {
        textDecoration: `none`, 
        color: `rgb(133,133,133)`,
        "@media screen and (max-width: 789px)": {
            "&.active": {
                // color: `rgb(133,133,133) !important`,
                borderBottom: `none !important`,
                padding: `0 !important`
            }
        },
        "@media screen and (min-width: 750px)": {
            transition: `all .3s ease`,
            ":hover": {
                color: `rgb(35, 148, 184)`,
                textDecoration: `none`,
                borderBottom: `3px solid rgb(35, 148, 184)`,
                padding: `${rhythm(0.6)} 0px`,
                transition: `all .3s ease`,
            },
        }
    }
}

const menuButton = {
    "body.menu-opened &": {
        position: `fixed`,
        top: 35,
        right: 35
    },
    "@media screen and (min-width:790px)": {
        display: "none"
    },
    "@media screen and (max-width:789px)": {
        display: "inline-flex",
        justifyContent: "flex-end"
    }
}

const navBar = {
    padding: `${rhythm(0.5)} 0px`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    "& .navBarItem": {
        marginRight: rhythm(1),
        ':last-child': {marginRight: 0}
    },
    "& .goToCM": {
        fontSize: 14,
        backgroundColor: `rgb(35,148,184)`,
        color: `rgb(255,255,255)`,
        padding: `0 0.3em 0 0.8em`,
        borderRadius: 50,
        justifyContent: `center`,
        alignItems: `center`,
        display: `flex`,
        border: `1px solid rgb(35,148,184)`,
        transition: `all .3s linear`,
        "&:hover": {
            textDecoration: `none`,
            backgroundColor: `rgb(255,255,255)`,
            color: `rgb(35,148,184)`,
            transition: `all .3s linear`,
            "& .arrowIcon": {
                backgroundColor: `rgb(35,148,184)`,
                color: `rgb(255,255,255)`,
                transition: `all .3s linear`,
            }
        }
    },
    "body.menu-opened &": {
        backgroundColor: `white`,
        flexDirection: `column`,
        position: `fixed`,
        width: `100vw`,
        height: `100vh`,
        top: 0,
        zIndex: 1000,
        "& .navBarItem": {
            margin: `.4em 0`,

        },
        "@media screen and (max-width:789px)": {
            "& .goToCM": {
                justifyContent: `center`,
                marginTop: 15
            }
        }
    },
    "@media screen and (max-width:789px)": {
        "& .buttonWrapper": {
            display: `flex`,
            justifyContent: `space-between`,
            width: `100%`,
            padding: `0 2em`,
            alignItems: `center`,
            "body.menu-opened &": {
                justifyContent: `center`
            }
        },
    },
    "@media screen and (min-width:790px)": {
        justifyContent: `space-between`,
        margin: `auto`,
        maxWidth: 1200,
        fontSize: 14,
        textTransfrom: `uppercase`
    },
    "@media screen and (min-width:790px) and (max-width:1279px)": {
        margin: `auto 2em`
    }
}

const flickityOptions = {
    initialIndex: 0,
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    freeScroll: true,
    adaptiveHeight: true,
    watchCSS: true,
    groupCells: true,
    groupCells: '100%'
}

class Header extends Component {
    constructor (props){
        super(props);
        this.state = {open: false};

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            open: !this.state.open
        });
        document.querySelector("body").className = this.state.open ? "" : "menu-opened";
    }
    handleClose(){
        this.setState({
            open: false
        });
        document.querySelector("body").classList.remove("menu-opened");
    }

    render() {
        const data = this.props.data
        return (
            <header
                css={{
                    borderBottom: `1px solid rgb(240,240,240)`,
                    textAlign: `center`,
                }}
            >
                <div
                    css={{
                        background: `rgb(255,255,255)`,
                        padding: `${rhythm(1)} 0px`,
                        borderBottom: `1px solid rgb(240,240,240)`,
                        "@media screen and (max-width: 789px)": {
                            padding: `0px`,
                        },
                    }}
                    >
                    <div css={containerStyle}>
                        <h1
                        css={{
                            margin: 0,
                            fontSize: scale(1.5).fontSize,
                            textAlign: `center`,
                            lineHeight: 1,
                            "@media screen and (min-width: 500px)": {
                            fontSize: scale(1.9).fontSize,
                            lineHeight: 1,
                            },
                        }}
                        >
                        <span
                            css={{
                                display: `none`,
                            }}
                        >{config.siteTitle}</span>
                        <Link
                            css={{
                                color: `rgb(35,148,184)`
                            }}
                            to="/"
                        >
                            <img
                                css={{
                                    width: `60px`,
                                    margin: `0 auto`,
                                }}
                                src={config.siteLogo} alt="Casemasters" 
                            />
                        </Link>
                        </h1>
                    </div>
                </div>
                <nav css={navBar}>
                    {Flickity && <Flickity 
                        className={'navigation'}
                        elementType={'div'} // default 'div'
                        options={flickityOptions} // takes flickity options {}
                        disableImagesLoaded={false} // default false
                        reloadOnUpdate // default false
                        css={menu}
                    >
                        <div className="navBarItem">
                            <Link 
                                to="/"
                                onClick={this.handleClose.bind(this)}
                            >
                            Home
                            </Link>
                        </div>
                        {/* {data.allWordpressPage.edges.map(({ node }) => (
                            <div className="navBarItem" key={node.slug}>
                                <Link 
                                    to={node.slug}
                                    css={{ 
                                        textDecoration: `none`, 
                                        color: `rgb(133,133,133)`,
                                        "@media screen and (min-width: 750px)": {
                                            transition: `all .3s ease`,
                                            ":hover": {
                                                color: `rgb(35, 148, 184)`,
                                                textDecoration: `none`,
                                                borderBottom: `3px solid rgb(35, 148, 184)`,
                                                padding: `${rhythm(0.6)} 0px`,
                                                transition: `all .3s ease`,
                                            },
                                        }
                                    }}
                                    onClick={this.handleClose.bind(this)}
                                >
                                    {node.title}
                                </Link>
                            </div>
                        ))} */}
                        {data.allWordpressCategory.edges.map(({ node }) => (
                            <div className="navBarItem" key={node.slug}>
                                <Link 
                                    to={`/category/${node.slug}`}
                                    activeStyle={{
                                        color: `rgb(35, 148, 184)`,
                                        textDecoration: `none`,
                                        borderBottom: `3px solid rgb(35, 148, 184)`,
                                        padding: `${rhythm(0.6)} 0px`,
                                    }}
                                    onClick={this.handleClose.bind(this)}
                                >
                                    {node.name}
                                </Link>
                            </div>
                        ))}
                    </Flickity>
                    }
                    <div className="buttonWrapper">
                        <div>
                            <a className="goToCM" href="https://www.casemasters.com/?utm_source=cmblog&utm_medium=referral">
                            CASEMASTERS
                            <ArrowRight 
                                size="16" 
                                className="arrowIcon"
                                css={{
                                    display: `inline-flex`,
                                    justifyContent: `center`,
                                    alignItems: `center`,
                                    background: `rgb(255,255,255)`,
                                    color: `rgb(35, 148, 184)`,
                                    borderRadius: 50,
                                    marginLeft: 8,
                                    transition: `all .3s linear`,
                                }} 
                            />
                            </a>
                        </div>
                        <div css={menuButton}>
                            <HamburgerMenu
                                isOpen={this.state.open}
                                menuClicked={this.handleClick.bind(this)}
                                width={18}
                                height={15}
                                strokeWidth={1}
                                rotate={0}
                                color='rgb(35, 148, 184)'
                                borderRadius={0}
                                animationDuration={0.5}
                            />
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
