import SearchBar from '@/components/SearchBar';
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
      <SearchBar/>
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
