import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import { motion } from 'framer-motion';

interface DictaphoneProps {
    setTranscript: (transcript: string) => void;
    setListening: (listening: boolean) => void;
}

const Dictaphone = ({setTranscript, setListening}: DictaphoneProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    setListening(listening);
  }, [listening]);

  return (
    <motion.div onClick={() => !listening ? SpeechRecognition.startListening({ language: "pt-BR" }) : SpeechRecognition.stopListening()} style={{
        position: "relative",
        right: "10px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",

    }}>
       <MicIcon  style={{ position: "relative", right: "10px", color: "#CF39E8" }} />
    </motion.div>
  );
};
export default Dictaphone;