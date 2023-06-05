import { useTheme } from "@/context/Theme";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styled from "styled-components";

interface FilterBoxProps {
  show: boolean;
  desactive?: () => void;
}

export default function FilterBox({ show }: FilterBoxProps) {
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "access">(
    "relevance"
  );
  const { theme } = useTheme();
  return (
    <AnimatePresence>
      {show && (
        <FilterBoxRoot
          initial={{
            opacity: 0,
            height: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            height: "auto",
            y: 0,
          }}
          exit={{
            opacity: 0,

            y: 100,
            height: 0,
          }}
        >
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                color: theme.colors.text,
                "&.Mui-focused": {
                  color: theme.colors.primary,
                },
              }}
            >
              Ordenar por
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Ordenar por"
              sx={{
                width: "120px",
                color: theme.colors.text,

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.colors.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.colors.primary,
                },
              }}
              onChange={(e) => setSortBy(e.target.value as any)}
              variant="outlined"
            >
              <MenuItem value={"relevance"}>Relevancia</MenuItem>
              <MenuItem value={"date"}>Date</MenuItem>
              <MenuItem value={"access"}>Acessos</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="A partir de"
              sx={{
                "& .MuiInputLabel-root": {
                  color: theme.colors.text,
                  "&.Mui-focused": {
                    color: theme.colors.primary,
                  }
                },
                "& .MuiInputBase-root": {
                  color: theme.colors.text,
                },
                "& .IconButton-root": {
                  color: theme.colors.text,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.colors.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.colors.primary,
                },
              }}
            />
          </LocalizationProvider>
        </FilterBoxRoot>
      )}
    </AnimatePresence>
  );
}

const FilterBoxRoot = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  left: 10rem;
`;
