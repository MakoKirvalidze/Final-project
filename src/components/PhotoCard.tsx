import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Photo } from '../types/photo';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => onClick(photo)}>
        <CardMedia
          component="img"
          height="200"
          image={photo.urls.regular}
          alt={photo.alt_description || 'Photo'}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography variant="body2" noWrap>
            {photo.description || 'Untitled'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            By: {photo.user.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PhotoCard;