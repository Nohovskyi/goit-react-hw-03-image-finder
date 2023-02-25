import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, clickOnItemImage }) => {
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => clickOnItemImage(largeImageURL, tags)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem__image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  clickOnItemImage: PropTypes.func.isRequired,
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
