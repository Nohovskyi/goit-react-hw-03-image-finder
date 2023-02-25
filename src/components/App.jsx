import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImage } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    question: '',
    images: [],
    currentPage: 1,
    totalHits: 0,
    error: null,
    status: 'idle',
    visibility: false,
    image: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, question } = this.state;

    if (
      prevState.question !== question ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ status: 'pending' });
      fetchImage(question, currentPage)
        .then(images =>
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images.hits],
              status: 'resolved',
              totalHits: images.totalHits,
            };
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = searchImages => {
    console.log(searchImages);
    this.setState({
      question: searchImages,
      currentPage: 1,
      images: [],
    });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  showToggleModal = (image, tags) => {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility,
        image,
        tags,
      };
    });
  };

  render() {
    const {
      error,
      images,
      status,
      totalHits,
      question,
      image,
      tags,
      visibility,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && <h2 className={css.text}>Введите имя фото</h2>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <div>{error.message}</div>}

        {status === 'resolved' && (
          <ImageGallery
            images={images}
            question={question}
            clickOnImage={this.showToggleModal}
          />
        )}

        {images.length >= 12 && (
          <Button
            disabled={this.state.totalHits === images.length}
            onClick={this.handleLoadMoreBtn}
            textChenge={
              totalHits === images.length ? 'No more picture' : 'Load More'
            }
          />
        )}
        {visibility && (
          <Modal
            closeModal={this.showToggleModal}
            image={image}
            tags={tags}
            state={visibility}
          />
        )}
      </div>
    );
  }
}
