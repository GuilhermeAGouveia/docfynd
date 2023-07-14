import { useTheme } from "@/context/Theme";
import { Typography } from "@mui/material";
import styled from "styled-components";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function DocCount({countDocs} : {countDocs: number}) {
    const {theme} = useTheme();
    return (
        <DocCountRoot>
            <Typography variant="body2" color={theme.colors.text}>
            Search between more than
            </Typography>
            <Typography variant="body1" sx={{
                fontWeight: "bold",
                color: "#CF39E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                {countDocs} documents
            
            </Typography>
        </DocCountRoot>
    )
}

const DocCountRoot = styled.div`
    position: relative;

`;