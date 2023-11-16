"use client";
import { Box, Button, Card, CardContent, Slider, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LoadingButton from "@mui/lab/LoadingButton";

const Player = ({ url }) => {
  const ref = useRef();
  const [playing, setPlaying] = useState(false);
  const [onReady, setOnReady] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [played, setPlayed] = useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  const handleProgress = (state) => {
    if (!seeking) setPlayed(state.played);
  };
  const handleSeekChange = (x, newValue) => {
    setPlayed(parseFloat(newValue));
  };

  const handleSeekMouseUp = (e, x) => {
    ref.current.seekTo(parseFloat(x));
    setSeeking(false);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };
  return (
    <Box display={{ md: "flex" }} gap={1}>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          paddingTop: { xs: "56.25%", md: "28.12%" },
          "& .player": {
            position: "absolute",
            top: 0,
            left: 0,
          },
        }}
      >
        <ReactPlayer
          className="player"
          ref={ref}
          url={url}
          width="100%"
          height="100%"
          fallback={<div>asdcwa..</div>}
          playing={playing}
          onReady={() => setOnReady(true)}
          onProgress={handleProgress}
        />
      </Box>
      <Box flex={1} mt={2}>
        <Card>
          <CardContent>
            <Box textAlign={"center"}>
              <Tooltip title={playing ? "Pause" : "Play"} arrow>
                <LoadingButton
                  onClick={handlePlayPause}
                  color="primary"
                  size="large"
                  loading={!onReady}
                >
                  {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </LoadingButton>
              </Tooltip>
              <Button
                onClick={handlePlayPause}
                color="primary"
                size="large"
                disabled={!playing}
              >
                <LooksOneIcon />
              </Button>
            </Box>
            <Box mt={1}>
              <Slider
                value={played}
                min={0}
                max={0.999999}
                step={0.01}
                // getAriaValueText={valuetext}
                onChange={handleSeekChange}
                color="primary"
                onChangeCommitted={handleSeekMouseUp}
                loading={!onReady}
                onMouseDown={handleSeekMouseDown}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Player;
