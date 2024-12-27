import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeEditor() {
  const [code, setCode] = useState("// Start coding...");
  const editorContainer = React.useRef();

  // Initialize CodeMirror
  useCodeMirror({
    container: editorContainer.current,
    value: code,
    extensions: [javascript()],
    onChange: (value) => setCode(value),
  });

  const handleShare = () => {
    console.log("Code shared:", code);
    alert("Code shared successfully!");
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Code Editor
      </Typography>
      <Box
        ref={editorContainer}
        sx={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          height: "400px",
          overflow: "auto",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleShare}
        sx={{ mt: 2 }}
      >
        Share Code
      </Button>
    </Box>
  );
}

export default CodeEditor;
