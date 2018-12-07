import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import List from "../components/List";

const CategoryTemplate = props => {
  const {
    pageContext: { category },
    data: {
      allContentPage: { totalCount, edges },
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline theme={theme}>
                <span>Posts in category</span> <FaTag />
                {category}
              </Headline>
              <p className="meta">
                There {totalCount > 1 ? "are" : "is"} <strong>{totalCount}</strong> post{totalCount >
                1
                  ? "s"
                  : ""}{" "}
                in the category.
              </p>
              <List edges={edges} theme={theme} />
            </header>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default CategoryTemplate;

// eslint-disable-next-line no-undef
export const categoryQuery = graphql`
  query PostsByCategory($category: String) {
    allContentPage(
      limit: 1000
      sort: { fields: [published], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          slug
          excerpt
          timeToRead
          frontmatter {
            title
            category
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
