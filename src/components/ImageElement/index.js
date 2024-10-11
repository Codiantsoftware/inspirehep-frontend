import React from 'react';
import { IMAGE_URL_USER } from '../../config/index';


function ImageElement({ previewSource = '', source, alt = 'image', ...rest }) {
  return (
    <>
      {previewSource ? (
        <img src={previewSource} alt={alt} {...rest} />
      ) : (
        <img src={`${IMAGE_URL_USER}/${source}`} alt={alt} {...rest} />
      )}
    </>
  );
}

export default ImageElement;