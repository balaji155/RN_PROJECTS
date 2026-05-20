import VideoPlayer, {
  OnPlaybackStateChangeProps,
  OnVideoBufferProps,
  OnVideoErrorProps,
  OnVideoLoadProp,
  OnVideoProgressProps,
  VideoRefProps,
} from "@/components/VideoPlayer";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type VideoProgressDetails =
  | {
      currentTime: number;
      duration: number;
      progressTime: number;
    }
  | undefined;

const index = () => {
  const { top } = useSafeAreaInsets();
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<VideoRefProps | null>(null);
  const videoDetails = useRef<VideoProgressDetails>(null);
  const onVideoLoad = (data: OnVideoLoadProp) => {
    console.log(data, "onVideoLoad");
  };

  const onVideoProgress = (data: OnVideoProgressProps) => {
    videoDetails.current = data;
    console.log(data, "onVideoProgress");
  };

  const onVideoEnd = () => {
    console.log("Video Ended");
  };

  const onBuffer = (data: OnVideoBufferProps) => {
    console.log(data.isBuffering, "onBuffer");
  };

  const onVideoError = (data: OnVideoErrorProps) => {
    console.log(data.error, "onVideoError");
  };

  const onPlaybackStateChange = (data: OnPlaybackStateChangeProps) => {
    console.log(data, "onPlaybackStateChange");
  };

  const SampleButton = ({
    text,
    onPress,
  }: {
    text: string;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={{
          width: 120,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 5,
        }}
        onPress={onPress}
      >
        <Text style={{ color: "#fff", padding: 10 }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <VideoPlayer
        src={{
          url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
        }}
        seek={{
          seconds: 0,
        }}
        paused={paused}
        onVideoLoad={onVideoLoad}
        onVideoBuffer={onBuffer}
        onVideoEnd={onVideoEnd}
        onVideoError={onVideoError}
        onVideoProgress={onVideoProgress}
        onPlaybackStateChange={onPlaybackStateChange}
        style={{ width: "100%", height: "40%" }}
        resizeMode="contain"
        ref={videoRef}
        muted={muted}
      />
      <SampleButton text="Play" onPress={() => setPaused(false)} />
      <SampleButton text="Pause" onPress={() => setPaused(true)} />
      <SampleButton
        text="Seek +10s"
        onPress={() =>
          videoRef.current?.seekTo(
            (videoDetails.current?.currentTime || 0) + 10,
          )
        }
      />
      <SampleButton
        text="Seek -10s"
        onPress={() =>
          videoRef.current?.seekTo(
            (videoDetails.current?.currentTime || 0) - 10,
          )
        }
      />
      <SampleButton text="Mute" onPress={() => setMuted((prev) => !prev)} />
      <SampleButton text="2x" onPress={() => videoRef.current?.setRate(2.0)} />
      <SampleButton
        text="full screen"
        onPress={() => videoRef.current?.presentFullMode()}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 20,
  },
});
