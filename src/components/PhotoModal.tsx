import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Photo } from '../types/photo';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotoDetails } from '../services/unsplashApi';

interface PhotoModalProps {
  photo: Photo | null;
  open: boolean;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, open, onClose }) => {
    const { data: photoDetails } = useQuery({
      queryKey: ['photoDetails', photo?.id],
      queryFn: () => fetchPhotoDetails(photo!.id),
      enabled: !!photo?.id && open,
      staleTime: 1000 * 60 * 5, 
      gcTime: 1000 * 60 * 30, // cacheTime
    });

  if (!photo) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="photo-modal"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8, bgcolor: 'white' }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
          <CardMedia
            component="img"
            image={photoDetails?.urls.full || photo.urls.regular}
            alt={photo.alt_description || 'Photo'}
            sx={{ maxHeight: '70vh', objectFit: 'contain' }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6">
            {photoDetails?.description || photo.description || 'Untitled'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            By: {photoDetails?.user.name || photo.user.name}
          </Typography>
          {photoDetails?.location?.name && (
            <Typography variant="body2">
              Location: {photoDetails.location.name}
            </Typography>
          )}
          <Typography variant="body2" mt={1}>
            Downloads: {photoDetails?.downloads || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Resolution: {photoDetails?.width}x{photoDetails?.height}
          </Typography>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default PhotoModal;