"use client";
import { Box } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";

const Player = () => {
  return (
    <Box display={{ sm: "flex" }}>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          paddingTop: "56.25%",
          "& .player": {
            position: "absolute",
            top: 0,
            left: 0,
          },
        }}
      >
        <ReactPlayer
          className="player"
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width="100%"
          height="100%"
        />
      </Box>
      <Box flex={1}>scas</Box>
    </Box>
  );
};

export default Player;
