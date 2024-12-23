import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPhotoDetails } from "../services/unsplashApi";
import { Box, Typography, CircularProgress } from "@mui/material";


interface PhotoDetail {
    id: string;
    urls: {
      full: string;
    };
    alt_description: string | null;
    user: {
      name: string;
    };
    location?: {
      name: string;
    };
  }
  
  const PhotoDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const { data, isLoading, isError } = useQuery<PhotoDetail>({
      queryKey: ['photoDetails', id],
      queryFn: () => fetchPhotoDetails(id!),
      enabled: !!id // რომ არ გაეშვას query თუ id არ არის
    });
  
    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Error loading photo details...</div>;
    if (!data) return null;
  
    return (
      <Box p={4}>
        <img src={data.urls.full} alt={data.alt_description || ''} style={{ maxWidth: "100%" }} />
        <Typography variant="h5" mt={2}>{data.alt_description || "Untitled"}</Typography>
        <Typography variant="subtitle1">By: {data.user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {data.location?.name || "Unknown"}
        </Typography>
      </Box>
    );
  };

export default PhotoDetails;
