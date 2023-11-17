"use client";
import LinkIcon from "@mui/icons-material/Link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/${encodeURIComponent(input)}`);
  };
  return (
    <Card>
      <CardContent
        sx={{
          form: {
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          },
        }}
      >
        <form onSubmit={onSubmit}>
          <TextField
            label="Url"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            onChange={(e) => setInput(e.target.value)}
            focused
          />
          <Button
            type="submit"
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
          >
            Open
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Hero;
