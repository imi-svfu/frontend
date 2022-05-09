import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HomeComponent() {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!content) {
      fetch(`/api/pages/`)
        .then((response) => response.json())
        .then((pages) => setContent(pages[0].markdown));
    }
  });

  return <ReactMarkdown children={content} />;
}
