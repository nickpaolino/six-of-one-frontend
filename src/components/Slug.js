import React, { Component } from "react";

class Slug extends Component {
  // immediately adds random characters to end of slug
  componentDidMount() {
    this.props.changeSlug(this.slugify(this.props.title) + this.randomChars());
  }

  // makes and changes slug when title changes
  componentWillReceiveProps(nextProps) {
    if (!(this.props.title === nextProps.title)) this.makeSlug(nextProps.title);
  }

  render() {
    return (
      <div>
        Slug:
        {this.props.slug ? this.props.slug : "please enter a post title"}
      </div>
    );
  }

  // slugifies title and adds random characters if it already exists
  makeSlug = title => {
    if (!title) return this.props.changeSlug("");

    let slug = this.slugify(title);

    return fetch("http://localhost:3000/api/v1/posts/" + slug).then(resp =>
      resp.json().then(json => {
        if (json) slug += this.randomChars();
        this.props.changeSlug(slug);
      })
    );
  };

  slugify = text => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-"); // Replace multiple - with single -
  };

  randomChars = () => {
    return (
      "-" +
      Math.random()
        .toString(36)
        .substr(2, 5)
    );
  };
}

export default Slug;
