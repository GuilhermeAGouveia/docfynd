import { useTheme } from "@/context/Theme";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styled from "styled-components";
import { DateCalendarClassKey } from "@mui/x-date-pickers";
import { FilterFields } from "@/libs/interfaces";
import dayjs from "dayjs";
import { filter } from "lodash";

interface FilterBoxProps {
  show: boolean;
  desactive?: () => void;
  onFilter: (filter: any) => void;
  filterFields: FilterFields;
}

export default function FilterBox({ show, onFilter, filterFields }: FilterBoxProps) {
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "access">(
    "relevance"
  );
  const [order, setOrder] = useState<"asc" | "dec">("asc");
  const { register, handleSubmit, watch, control } = useForm();
  // const handleOrder = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newOrder: "asc" | "dec"
  // ) => {
  //   setOrder(newOrder);
  // };

  useEffect(() => {
    // TypeScript users
    // const subscription = watch(() => handleSubmit(onSubmit)())
    const subscription = watch(() => handleSubmit(onFilter)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  const { theme } = useTheme();
  return (
    <AnimatePresence>
      {show && (
        <FilterBoxRoot
          onSubmit={handleSubmit(onFilter)}
          initial={{
            opacity: 0,
            height: 0,
            y: -100,
          }}
          animate={{
            opacity: 1,
            height: "auto",
            y: 0,
          }}
          exit={{
            opacity: 0,
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
              Sort By
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterFields.sortBy}
              label="Sort By"
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
              //onChange={(e) => setSortBy(e.target.value as any)}
              variant="outlined"
              {...register("sortBy")}
            >
              <MenuItem value={"relevance"}>Relevance</MenuItem>
              <MenuItem value={"date"}>Date</MenuItem>
              <MenuItem value={"access"}>Access</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <Controller
              name="orderBy"
              defaultValue={filterFields.orderBy}
              control={control}
              render={({
                field: { onChange, ...rest }
              }) => (
                <ToggleButtonGroup
                  ref={rest.ref}
                  value={rest.value}
                  exclusive
                  
                  aria-label="field order"
                  onChange={(e, newOrder) => {
                    onChange(newOrder || filterFields.orderBy);
                  }}
                >
                  <ToggleButton
                    value="asc"
                    aria-label="asc"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: theme.colors.section.primary,
                        color: theme.colors.text,
                      },
                    }}
                  >
                    <Typography sx={{ color: theme.colors.text }}>
                      Ascendent
                    </Typography>
                  </ToggleButton>
                  <ToggleButton
                    value="desc"
                    aria-label="dec"
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: theme.colors.section.primary,
                        color: theme.colors.text,
                      },
                    }}
                  >
                    <Typography sx={{ color: theme.colors.text }}>
                      Descendent
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            ></Controller>
          </FormControl>

          <Controller
            name="sinceYear"
            control={control}
            defaultValue={filterFields.sinceYear}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  maxDate={dayjs()}
                  value={dayjs(`${value}-01-01`)}
                  label="Since of"
                  onYearChange={(date: any) => {
                    console.log(date.$y);
                    onChange(date.$y);
                  }}
                  onChange={(date: any) => {
                    if (date?.$y && date.$y > 1901 && date.$y <= new Date(Date.now()).getFullYear()) onChange(date.$y);
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: theme.colors.text,
                      "&.Mui-focused": {
                        color: theme.colors.primary,
                      },
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
            )}
          ></Controller>
        </FilterBoxRoot>
      )}
    </AnimatePresence>
  );
}

const FilterBoxRoot = styled(motion.form)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  left: 10rem;
  margin: 20px;
`;
