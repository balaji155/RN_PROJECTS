import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  findNodeHandle,
  NativeModules,
  NativeSyntheticEvent,
  Platform,
  requireNativeComponent,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

export interface VideoSourcre {
  url?: string;
  headers?: Record<string, string>;
}

export interface SeekTime {
  seconds: number;
  tolerance?: number;
}

export type NaturalSize = {
  width: number;
  height: number;
  orientation: "landscape" | "potrait";
};

export type Track = {
  index: number;
  title: string;
  language: string;
  type: string;
};

export interface AudioTrack extends Track {
  type: "audio";
}

export interface Textrack extends Track {
  type: "text";
}

export interface OnVideoLoadProp {
  duration: number;
  naturalSize: NaturalSize;
  audioTracks: AudioTrack[] | [];
  subtitleTracks: Textrack[] | [];
}

export type OnVideoProgressProps = {
  currentTime: number;
  duration: number;
  progressTime: number;
};

export type OnVideoErrorProps = {
  error: {
    message: string;
    domain: "RCTVideoPlayer";
  };
};

export type OnVideoBufferProps = {
  isBuffering: boolean;
};

export type OnPlaybackStateChangeProps = {
  isPlaying: boolean;
  rate: number;
};

export type ResizeMode = "contain" | "cover" | "stretch";

export interface VideoPlayerProps {
  src: VideoSourcre;
  style?: ViewStyle;
  muted?: boolean;
  paused?: boolean;
  volume?: number;
  rate?: number;
  repeated?: boolean;
  resizeMode?: ResizeMode;
  useNativeControls?: boolean;
  seek: SeekTime;
  onVideoLoad?: (data: OnVideoLoadProp) => void;
  onVideoProgress?: (data: OnVideoProgressProps) => void;
  onVideoEnd?: (data: { target: number }) => void;
  onVideoError?: (data: OnVideoErrorProps) => void;
  onVideoBuffer?: (data: OnVideoBufferProps) => void;
  onPlaybackStateChange?: (data: OnPlaybackStateChangeProps) => void;
}

export type VideoRefProps = {
  seekTo: (toTime: number, tolerance?: number) => void;
  setRate: (rate: number) => void;
  presentFullMode: () => void;
  dismissFullScreen: () => void;
  getCurrentTime: () => Promise<{ currentTime: number }>;
};

export interface NativeVideoPlayerViewProps {
  src: VideoSourcre;
  style?: ViewStyle;
  muted?: boolean;
  paused?: boolean;
  volume?: number;
  rate?: number;
  repeated?: boolean;
  resizeMode?: ResizeMode;
  useNativeControls?: boolean;
  seek: SeekTime;
  onVideoLoad?: (data: NativeSyntheticEvent<OnVideoLoadProp>) => void;
  onVideoProgress?: (data: NativeSyntheticEvent<OnVideoProgressProps>) => void;
  onVideoEnd?: (data: NativeSyntheticEvent<{ target: number }>) => void;
  onVideoError?: (data: NativeSyntheticEvent<OnVideoErrorProps>) => void;
  onVideoBuffer?: (data: NativeSyntheticEvent<OnVideoBufferProps>) => void;
  onPlaybackStateChange?: (
    data: NativeSyntheticEvent<OnPlaybackStateChangeProps>,
  ) => void;
}

const NativeVideoPlayerView =
  Platform.OS == "ios"
    ? (requireNativeComponent(
        "RCTVideoPlayerView",
      ) as React.ComponentType<NativeVideoPlayerViewProps>)
    : null;

const VideoPlayer = forwardRef<VideoRefProps, VideoPlayerProps>(
  (
    {
      src,
      seek,
      style = {},
      muted = false,
      paused = false,
      rate = 1.0,
      repeated = false,
      resizeMode = "contain",
      useNativeControls = false,
      volume = 1.0,
      onVideoProgress,
      onVideoLoad,
      onVideoEnd,
      onPlaybackStateChange,
      onVideoBuffer,
      onVideoError,
    },
    ref,
  ) => {
    const { RCTVideoPlayer } = NativeModules;
    useEffect(() => {
      if (RCTVideoPlayer && RCTVideoPlayer.checkNativeModuleWorking) {
        RCTVideoPlayer.checkNativeModuleWorking();
      }
    }, []);
    const nativRef = useRef<any>(null);
    if (Platform.OS !== "ios" || !NativeVideoPlayerView) {
      return <Text>Video player is only for IOS</Text>;
    }

    const onVideoBufferHandler = useCallback(
      (e: NativeSyntheticEvent<OnVideoBufferProps>) => {
        onVideoBuffer?.(e.nativeEvent);
      },
      [onVideoBuffer],
    );

    const onVideoLoadHandler = useCallback(
      (e: NativeSyntheticEvent<OnVideoLoadProp>) => {
        onVideoLoad?.(e.nativeEvent);
      },
      [onVideoLoad],
    );

    const onVideoProgressHandler = useCallback(
      (e: NativeSyntheticEvent<OnVideoProgressProps>) => {
        onVideoProgress?.(e.nativeEvent);
      },
      [onVideoProgress],
    );

    const onVideoEndHandler = useCallback(
      (e: NativeSyntheticEvent<{ target: number }>) => {
        onVideoEnd?.(e.nativeEvent);
      },
      [onVideoEnd],
    );

    const onPlaybackStateChangeHandler = useCallback(
      (e: NativeSyntheticEvent<OnPlaybackStateChangeProps>) => {
        onPlaybackStateChange?.(e.nativeEvent);
      },
      [onPlaybackStateChange],
    );

    const onVideoErrorHandler = useCallback(
      (e: NativeSyntheticEvent<OnVideoErrorProps>) => {
        onVideoError?.(e.nativeEvent);
      },
      [onVideoError],
    );

    useImperativeHandle(ref, () => ({
      seekTo(toTime, tolerance) {
        const tag = findNodeHandle(nativRef.current);
        if (!!tag) {
          RCTVideoPlayer.seekTo(tag, toTime, tolerance);
        }
      },
      setRate(rate) {
        const tag = findNodeHandle(nativRef.current);
        if (!!tag) {
          RCTVideoPlayer.setRate(tag, rate);
        }
      },
      dismissFullScreen() {
        const tag = findNodeHandle(nativRef.current);
        if (!!tag) {
          RCTVideoPlayer.dismissFullScreen(tag);
        }
      },
      presentFullMode() {
        const tag = findNodeHandle(nativRef.current);
        if (!!tag) {
          RCTVideoPlayer.presentFullMode(tag);
        }
      },
      getCurrentTime(): Promise<{ currentTime: number }> {
        const tag = findNodeHandle(nativRef.current);
        if (!!tag) {
          return RCTVideoPlayer.getCurrentTime(tag);
        }

        Promise.reject(new Error("Player not ready"));
      },
    }));

    return (
      <NativeVideoPlayerView
        ref={nativRef}
        src={src}
        style={{ ...styles.base, ...style }}
        seek={seek}
        muted={muted}
        paused={paused}
        rate={rate}
        repeated={repeated}
        resizeMode={resizeMode}
        useNativeControls={useNativeControls}
        volume={volume}
        onVideoProgress={onVideoProgressHandler}
        onVideoLoad={onVideoLoadHandler}
        onVideoEnd={onVideoEndHandler}
        onPlaybackStateChange={onPlaybackStateChangeHandler}
        onVideoBuffer={onVideoBufferHandler}
        onVideoError={onVideoErrorHandler}
      />
    );
  },
);

export default VideoPlayer;

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#000",
    overflow: "hidden",
  },
});
