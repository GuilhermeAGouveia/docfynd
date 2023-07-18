import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingWrapper from "../LoadingWrapper";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { useTheme } from "@/context/Theme";
import useDeviceDetect from "@/hook/useDetectDevice";
import WeatherLottieHandler from "./WeatherImageHandler";

const fetchWeather = async (lat: number, lon: number) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`
  );

  return response.data;
};

export default function Weather() {

  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const { theme } = useTheme();

  const { data, isLoading } = useQuery(["weather", coords], () =>
    fetchWeather(coords.lat, coords.lon)
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);
  return (
    <WeatherRoot>
      <LoadingWrapper
        isLoading={isLoading}
        sx={{
          width: 200,
          height: 100,
          borderRadius: 1,
        }}
      >
        <WeatherRoot
          style={{ flexDirection: "row", gap: 10, overflow: "visible" }}
        >
          <WeatherLottieHandler
            weatherCode={data?.current?.condition?.code}
            optionalImg={data?.current?.condition?.icon}
            isDay={!!data?.current?.is_day}
          />
          <Typography
            sx={{
              color: theme?.colors.primary,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            {data?.current?.temp_c}°C
          </Typography>
        </WeatherRoot>
        <CityInfo>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: theme?.colors.text,
            }}
          >
            {data?.location?.name}, {data?.location?.region}
          </Typography>
        </CityInfo>
      </LoadingWrapper>
    </WeatherRoot>
  );
}

const CityInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const WeatherRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
