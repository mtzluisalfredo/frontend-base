import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

class Avatar extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    shadow: PropTypes.bool,
    size: PropTypes.oneOf(['normal', 'medium', 'big', 'gigant']),
    src: PropTypes.string,
    type: PropTypes.oneOf(['circle', 'square', 'photo']),
  };

  static defaultProps = {
    type: 'square',
    size: 'normal',
    shadow: true,
  };

  state = {
    loading: true,
    brokenImg: false,
  };

  componentWillMount() {
    this.loadImage();
  }

  componentWillUpdate(nextProps) {
    const { src } = this.props;

    if (nextProps.src !== src) {
      this.loadImage(nextProps.src);
    }
  }

  loadImage = newImage => {
    const src = newImage || this.props.src;
    const img = new Image();

    if (src && src.length > 0) {
      this.state.loading = true;
      this.state.brokenImg = false;
    } else {
      this.setState({
        loading: false,
        brokenImg: true,
      });

      return;
    }

    img.onerror = () => {
      this.setState({ brokenImg: true, loading: false });
    };

    img.onload = () => {
      this.setState({ loading: false });
    };

    img.src = src;
  };

  render() {
    const { className, src, type, size, shadow, alt, placeholder, ...others } = this.props;
    const { loading, brokenImg } = this.state;
    const isImage = brokenImg === false && (src && src.length > 0);
    const styleNames = classnames({
      avatar: isImage,
      'empty-state': !isImage,
      shadow: !!shadow,
      [size]: true,
      [type]: true,
    });

    let item;
    if (!isImage || loading) {
      const placeholderText = placeholder || alt.substr(0, 2);
      item = <span>{placeholderText}</span>;
    }

    return (
      <figure className={className} styleName={styleNames}>
        {isImage ? <img src={src} alt={alt} {...others} /> : item}
      </figure>
    );
  }
}

export default Avatar;
