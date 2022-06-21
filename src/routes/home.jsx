import React, { useEffect, useRef, useState } from "react";
import {Card, Container, Typography} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";

import contentUrl from "../assets/home.md";

export default function HomeComponent() {
  const [content, setContent] = useState("");
  const [imageIndex, setImageIndex] = useState(1);
  const swapImageRef = useRef();
  
  const swapImage = () => {
    setImageIndex((imageIndex + 1) % 3);
  };

  useEffect(() => {
    fetch(contentUrl)
      .then((res) => res.text())
      .then((text) => setContent(text));
  });

  useEffect(() => {
    swapImageRef.current = swapImage;
  });

  useEffect(() => {
    const interval = setInterval(function() {
      swapImageRef.current();
    }.bind(this), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg">
      <Card sx={{ marginY: 2, paddingX: 1 }}>
        <Typography variant="h3" sx={{ marginY: 2 }}>
          Институт математики и информатики СВФУ
        </Typography>
      </Card>

      <Card onClick={swapImage}>
        <AnimatePresence>
          <motion.img
            key={imageIndex}
            src={"/header" + imageIndex + ".jpg"}
            animate={{ x: 0 }}
            initial={{ x: "100%" }}
            transition={{ x: { type: "just", duration: 0.5 } }}
            style={{
              display: "block",
              width: "100%",
            }}
          />
        </AnimatePresence>
      </Card>

      <Card sx={{ marginY: 2, paddingX: 2 }}>
        <ReactMarkdown children={content} />
      </Card>
    </Container>
  );
}
