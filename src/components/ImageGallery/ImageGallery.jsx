import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';



export const ImageGallery = ({ question, images, clickOnImage }) => {
  return (
    <>
      {images.length !== 0 && (
        <ul className={css.ImageGallery}>
          {images.map(item => {
            const { id } = item;
            return (
              <ImageGalleryItem
                key={id}
                image={item}
                clickOnItemImage={clickOnImage}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  clickOnImage: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};