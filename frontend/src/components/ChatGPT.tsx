import { useTheme } from "@/context/Theme";
import openai from "@/service/openai";
import { Avatar, Chip, List, Tooltip, Typography } from "@mui/material";
import { color } from "framer-motion";
import { useEffect, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import Result from "./Result";
import { Result as IResult } from "@/libs/interfaces";
import Banner, { Message } from "./Banner";

interface ChatGPTPros {
  search: string;
  style: CSSProperties;
  info?: Message;
}

export default function ChatGPT({ search, style, info }: ChatGPTPros) {
  const { theme } = useTheme();
  const [completion, setCompletion] = useState("");
  const [results, setResults] = useState<IResult[]>([]);

  const adapterChatGptResultToResult = (
    resultsChatGpt: Array<{
      title: string;
      abs: string;
      keywords: string[];
      url: string;
    }>
  ): IResult[] => {
    return resultsChatGpt.map((result) => {
      return {
        title: result.title,
        abs: result.abs,
        keywords: result.keywords.map((keyword) => ({ text: keyword })),
        url: result.url,
        highlight_abs: result.abs,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      };
    });
  };

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Tell me what you know about: ${search}`,
          temperature: 0.9,
          max_tokens: 200,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
        });
        console.log(completion);
        setCompletion(response.data.choices[0].text);
      } catch (error) {
        setCompletion("Não foi possível completar a pesquisa.");
        console.log(error);
      }
    };

    const fetchResults = async () => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Bring two useful links about ${search} in an array in json format, each array object must contain the following properties: title, abs (abstract), keywords (string array) and url. Use a maximum of 300 tokens.`,
        temperature: 0.9,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      });
      console.log(response.data.choices[0]);
      console.log(JSON.parse(response.data.choices[0].text));
      try {
        setResults(
          adapterChatGptResultToResult(
            JSON.parse(response.data.choices[0].text) as any
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (search) {
      try {
        fetchCompletion();
        fetchResults();
      } catch (error) {
        console.log(error);
      }
    }
  }, [search]);

  return (
    <ChatGPTBox
      style={{
        ...style,
      }}
    >
      {info && <Banner message={info} />}
      <MetaInfoChatGPT>
        <Tooltip title="Modelo">
          <Chip
            avatar={
              <Avatar sx={{ backgroundColor: theme.colors.section.secondary }}>
                <ModelTrainingIcon
                  sx={{ width: 18, color: theme.colors.section.primary }}
                />
              </Avatar>
            }
            label="Modelo text-davinci-003"
            sx={{
              backgroundColor: theme.colors.bg_secondary,
              color: theme.colors.section.primary,
            }}
          />
        </Tooltip>
        <Tooltip title="Modelo">
          <Chip
            avatar={
              <Avatar sx={{ backgroundColor: theme.colors.section.secondary }}>
                <ModelTrainingIcon
                  sx={{ width: 18, color: theme.colors.section.primary }}
                />
              </Avatar>
            }
            label="No máximo 200 palavras"
            sx={{
              backgroundColor: theme.colors.bg_secondary,
              color: theme.colors.section.primary,
            }}
          />
        </Tooltip>
      </MetaInfoChatGPT>
      <TextBox
        style={{
          border: `1px solid ${theme.colors.section.secondary}`,
          backgroundColor: theme.colors.bg_secondary,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.colors.text_secondary,
          }}
        >
          {completion}
        </Typography>
      </TextBox>

      <List
        style={{
          padding: "10px 0",
        }}
      >
        {results.map((result) => (
          <Result key={result.url} result={result} />
        ))}
        {results.length === 0 && (
          <NoResultContainer variant="body1" color={theme?.colors.text}>
            Nenhum resultado encontrado {":("}
          </NoResultContainer>
        )}
      </List>
    </ChatGPTBox>
  );
}

const ChatGPTBox = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

const TextBox = styled.div`
  position: relative;
  margin: 10px 0;
  border-radius: 5px;
  padding: 10px;
`;

const MetaInfoChatGPT = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const NoResultContainer = styled(Typography)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
