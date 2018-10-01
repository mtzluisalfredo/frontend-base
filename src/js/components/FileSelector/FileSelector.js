import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import './style.scss';

class FileSelector extends Component {
  static propTypes = {
    id: PropTypes.string,
    accept: PropTypes.string.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    onSelectFile: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      disabledButton: false,
    };
  }

  onSelectFile = ({ target }) => {
    const files = target.files;
    const { accept, name, onSelectFile } = this.props;
    const file = files[0];
    const regex = new RegExp(accept);

    if (name) {
      file.inputName = name;
    }

    if (regex.test(file.type) && onSelectFile) {
      onSelectFile(file);
    }
  }

  openFileSelector = () => {
    const { inputFile } = this;
    const { disabledButton } = this.state;

    if (!disabledButton) {
      inputFile.click();

      this.state.disabledButton = true;
      this.setState({
        disabledButton: true,
      }, () => {
        setTimeout(() => this.setState({ disabledButton: false }), 2000);
      });
    }
  }

  render() {
    const {
      id,
      className,
      accept,
      name,
    } = this.props;
    const { disabledButton } = this.state;

    return (<div styleName="file-selector" className={className}>
      <input
        id={id}
        type="file"
        accept={accept}
        name={name}
        onChange={this.onSelectFile}
        ref={(ele) => { this.inputFile = ele; }}
      />
      <Button color="info-outline" onClick={this.openFileSelector} disabled={disabledButton}>
        Selecciona un archivo
      </Button>
    </div>);
  }
}

export default FileSelector;
