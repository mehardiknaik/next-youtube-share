"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import LoadingButton from "@mui/lab/LoadingButton";
import Duration, { format } from "./Duration";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import { forward, rewind } from "@/common/rewindButtons";
import ReplayIcon from "@mui/icons-material/Replay";
import Divider from "@mui/material/Divider";

const Player = ({ url }) => {
  const ref = useRef();
  const [playing, setPlaying] = useState(false);
  const [onReady, setOnReady] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [info, setInfo] = useState({});

  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  const handleProgress = (state) => {
    if (!seeking) setPlayed(state.played);
    setPlayedSeconds(state.playedSeconds);
  };
  const handleSeekChange = (x, newValue) => {
    setPlayed(parseFloat(newValue));
  };

  const handleSeekMouseUp = (e, x) => {
    ref.current.seekTo(parseFloat(x));
    setSeeking(false);
    setPlaying(true);
  };
  const handleBackFor = (x) => {
    ref.current.seekTo(playedSeconds + parseFloat(x));
    // setPlayed(playedSeconds + parseFloat(x));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };
  const handleMute = (x, y) => {
    setMuted(y);
  };

  const handleStop = () => {
    setPlaying(false);
    ref.current.seekTo(0);
    setPlayed(0);
  };

  const share = async () => {
    setPlaying(false);
    const shareUrl = `${url.split("&")[0]}&t=${parseInt(playedSeconds)}`;
    console.log(shareUrl);
    try {
      await navigator.share({
        title: info?.title || "",
        text: `${info?.title} start from ${format(playedSeconds)}`,
        url: shareUrl,
      });
      console.log("Data was shared successfully");
    } catch (err) {
      console.error("Share failed:", err.message);
    }
  };
  useEffect(() => {
    fetch(`https://noembed.com/embed?url=${url}`)
      .then((x) => x.json())
      .then((y) => {
        console.log(y);
        setInfo(y);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1.5} mt={1}>
      <Card
        sx={{
          gridColumn: { xs: "span 12", md: "span 6" },
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
          ref={ref}
          url={url}
          width="100%"
          height="100%"
          fallback={<div>asdcwa..</div>}
          playing={playing}
          onReady={() => setOnReady(true)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          muted={muted}
        />
      </Card>
      <Card
        sx={{
          gridColumn: { xs: "span 12", md: "span 6" },
          gridRowStart: 2,
        }}
      >
        <CardContent>
          <Typography variant="body1" gutterBottom noWrap>
            {info?.title}
          </Typography>
          <Typography variant="body2" noWrap>
            {info?.author_name}
          </Typography>
        </CardContent>
      </Card>
      <Box gridColumn={{ xs: "span 12", md: "span 6" }}>
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
              <Tooltip title={"Stop"} arrow>
                <Button
                  onClick={handleStop}
                  color="primary"
                  size="large"
                  disabled={!playing}
                >
                  <StopIcon />
                </Button>
              </Tooltip>
              <Tooltip title={muted ? "Unmute" : "Mute"} arrow>
                <Checkbox
                  checked={muted}
                  onChange={handleMute}
                  icon={<VolumeUpIcon color="primary" />}
                  checkedIcon={<VolumeOffIcon />}
                  sx={{ ml: 1.4 }}
                />
              </Tooltip>
            </Box>
            <Box mt={-1}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="subtitle1">
                  <Duration seconds={duration * played} />
                </Typography>
                <Typography variant="subtitle1">
                  <Duration seconds={duration} />
                </Typography>
              </Box>
              <Slider
                disabled={!onReady}
                value={played}
                min={0}
                max={0.999999}
                step={0.01}
                // getAriaValueText={valuetext}
                onChange={handleSeekChange}
                color="primary"
                onChangeCommitted={handleSeekMouseUp}
                onMouseDown={handleSeekMouseDown}
              />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mt: 1.5 }}>
          <CardContent>
            <Box
              textAlign={"center"}
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={{ md: "space-between" }}
            >
              {rewind.map((x) => (
                <Button
                  disabled={playedSeconds < Math.abs(x.time)}
                  variant="text"
                  startIcon={<ReplayIcon />}
                  onClick={() => handleBackFor(x.time)}
                >
                  {x.title}
                </Button>
              ))}
              <Divider orientation="vertical" flexItem />
              <Tooltip
                title={`Share at time ${format(duration * played)}`}
                arrow
              >
                <IconButton aria-label="share" color="primary" onClick={share}>
                  <ScheduleSendIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Share`} arrow>
                <IconButton
                  aria-label="share"
                  color="primary"
                  onClick={share}
                  sx={{ ml: 2 }}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              {forward.map((x) => (
                <Button
                  disabled={duration - playedSeconds < Math.abs(x.time)}
                  variant="text"
                  endIcon={
                    <ReplayIcon
                      sx={{
                        transform: "scaleX(-1)",
                      }}
                    />
                  }
                  onClick={() => handleBackFor(x.time)}
                >
                  {x.title}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Player;
