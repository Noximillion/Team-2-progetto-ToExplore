import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

export default function TextareaDecorators(props) {
  const [text, setText] = React.useState("");
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  let handleInputChange = (event) => {
    text.length < 200
      ? setText(event.target.value)
      : setText(text.slice(0, text.length - 1));
    props.passaState && props.passaState(event.target.value);
  };

  return (
    <Textarea
      placeholder="Insert description...."
      value={text}
      onChange={handleInputChange}
      minRows={2}
      maxRows={4}
      startDecorator={
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("👍")}
          >
            👍
          </IconButton>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("🏖")}
          >
            🏖
          </IconButton>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("😍")}
          >
            😍
          </IconButton>
        </Box>
      }
      endDecorator={
        <Typography level="body3" sx={{ ml: "auto" }}>
          {text.length}/200 character(s)
        </Typography>
      }
      sx={{ minWidth: 300 }}
    />
  );
}
