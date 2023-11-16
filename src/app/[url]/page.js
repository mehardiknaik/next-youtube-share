// "use client";
import Player from "@/components/Player";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

export const ssg = false;
const page = ({ params: { url }, searchParams }) => {
  return (
    <Box>
      <Player url={decodeURIComponent(url)} />
    </Box>
  );
};

export default page;
