import React from "react";
import { Card, Typography } from "@mui/material";

type Props = {
  headtitle?: string | JSX.Element;
  sub?: string | JSX.Element;
  link?: string; // URL untuk link
  sub1?: string; // Subtitle 1
  link1?: string; // URL untuk link 1
  sub2?: string; // Subtitle 2
  link2?: string; // URL untuk link 2
};

const TitleCard = ({ headtitle, sub, link, sub1, link1, sub2, link2 }: Props) => {
  return (
    <Card variant="outlined" sx={{ padding: '20px', border: 'none' }}>
      <Typography variant="h3">{headtitle}</Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mt: '5px' }}>
        {link ? (
          <a href={link}>{sub}</a>
        ) : (
          sub
        )}
        {sub1 && (
          <>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href={link1}>{sub1}</a>
          </>
        )}
        {sub2 && (
          <>
            <span style={{ margin: '0 5px' }}>|</span>
            <a href={link2}>{sub2}</a>
          </>
        )}
      </Typography>
    </Card>
  );
};

export default TitleCard;