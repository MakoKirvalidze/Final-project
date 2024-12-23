import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos, searchPhotos } from '../services/unsplashApi';
import SearchBar from '../components/SearchBar';
import PhotoCard from '../components/PhotoCard';
import PhotoModal from '../components/PhotoModal';
import { Box, Grid, Button, Container, CircularProgress } from '@mui/material';
import { Photo } from '../types/photo';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);


  const { data: photos = [], isLoading, isError, isFetching } = useQuery({
    queryKey: ['photos', page, query],
    queryFn: () => query ? searchPhotos(query, page) : fetchPhotos(page),
    placeholderData: [], 
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  if (isError) {
    return (
      <Container>
        <Box py={4} textAlign="center">
          Error loading photos. Please try again later.
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <SearchBar onSearch={handleSearch} />
        
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} mt={2}>
            {photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                <PhotoCard
                  photo={photo}
                  onClick={handlePhotoClick}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {photos.length > 0 && (
          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1 || isFetching}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={photos.length < 20 || isFetching}
            >
              Next
            </Button>
          </Box>
        )}

        <PhotoModal
          photo={selectedPhoto}
          open={!!selectedPhoto}
          onClose={handleCloseModal}
        />
      </Box>
    </Container>
  );
};

export default Home;