import ToogleTheme from '@/components/ToogleTheme';
import TopBar from '@/components/TopBar';
import { useTheme } from '@/context/Theme';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function SearchPage() {
    const {theme} = useTheme();

  return (
    <SearchPageRoot animate={{
        backgroundColor: theme?.colors.bg
    }}>
      <TopBar/> 
      <SearchInput placeholder="Search for a movie, tv show, person..." />
    </SearchPageRoot>

    )
}

const SearchPageRoot = styled(motion.div)<
    { bg?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;

  min-height: 100vh;
`;

const SearchInput = styled.input`
  max-width: 500px;
  width: 80%;
  height: 50px;
  border-radius: 25px;
  border: none;
  padding: 0 20px;
  font-size: 20px;
  outline: none;
  margin-bottom: 50px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;
