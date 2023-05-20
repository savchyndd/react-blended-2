import { useEffect, useState } from 'react';

import { getImages } from 'service/image-service';

import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
  Modal,
} from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (query === '') return;

    const fetchGallery = () => {
      setIsLoading(true);

      getImages(query, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            setIsEmpty(true);
            setList([]);
            setShowLoadMore(page < Math.ceil(total_results / 15));
            return;
          }
          setList(prevList => [...prevList, ...photos]);
          setShowLoadMore(page < Math.ceil(total_results / 15));
        })
        .finally(() => setIsLoading(false));
    };

    fetchGallery();
  }, [query, page]);

  const handleSubmit = query => {
    setIsEmpty(false);
    setList([]);

    setQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = url => setLargeImage(url);

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      <Grid>
        {list.map(({ id, alt, src, avg_color }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img
                src={src.large}
                alt={alt}
                onClick={() => showModal(src.large)}
              />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {showLoadMore && <Button onClick={handleLoadMore}>Load more</Button>}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {isLoading && <Loader />}

      {largeImage && <Modal onClose={showModal} largeImage={largeImage} />}
    </>
  );
};
