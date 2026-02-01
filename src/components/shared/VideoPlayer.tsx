"use client";

import type { CSSProperties, ReactElement } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string | undefined | null;
  thumbnail?: string | false | ReactElement;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
}

export default function VideoPlayer({
  url,
  thumbnail,
  width = "100%",
  height = "600px",
  className,
  style,
}: VideoPlayerProps) {
  return (
    <div className={className} style={style}>
      <ReactPlayer
        src={url || undefined}
        controls={true}
        width={width}
        height={height}
        light={thumbnail || false}
        playing={false}
      />
    </div>
  );
}


