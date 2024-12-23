import React, { useState } from "react";
import { TextField } from "@mui/material";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  React.useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <TextField
      label="Search photos..."
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
