import { Player, Controls } from "@lottiefiles/react-lottie-player";
import sunnyLottie from "../../assets/lottie/sunny_day.json";
import partialCloudlyLottie from "../../assets/lottie/partial_cloud_day.json";
import cloudlyLottie from "../../assets/lottie/cloud_day.json";
import clearLottie from "../../assets/lottie/clear_night.json";
import partialClearLottie from "../../assets/lottie/partial_clear_night.json";
import cloudlyNightLottie from "../../assets/lottie/cloud_night.json";
import overcastDayLottie from "../../assets/lottie/overcast_day.json";
import overcastNightLottie from "../../assets/lottie/overcast_night.json";

export default function WeatherLottieHandler({
  weatherCode,
  isDay,
  optionalImg,
}: {
  weatherCode: keyof typeof srcLottie;
  optionalImg?: string;
  isDay?: boolean;
}) {
  const srcLottie = {
    1000: isDay ? sunnyLottie : clearLottie,
    1003: isDay ? partialCloudlyLottie : partialClearLottie,
    1006: isDay ? cloudlyLottie : cloudlyNightLottie,
    1009: isDay ? overcastDayLottie : overcastNightLottie,
    1030: isDay ? overcastDayLottie : overcastNightLottie,
    default: isDay ? sunnyLottie : clearLottie,
  };

  if (srcLottie[weatherCode])
    return (
      <Player
        autoplay
        loop
        src={srcLottie[weatherCode]}
        style={{ height: "50px", width: "50px" }}
      ></Player>
    );
  else return <img src={optionalImg} alt="Imagem do tempo" />;
}
