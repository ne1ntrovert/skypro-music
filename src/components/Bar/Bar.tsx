'use client';

import { useEffect, useRef, useState } from 'react';
import PlayerControls from '@/components/PlayerControls/PlayerControls';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import TrackPlay from '@/components/TrackPlay/TrackPlay';
import Volume from '@/components/Volume/Volume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { nextTrack, setIsPlaying } from '@/store/features/playerSlice';
import { formatTime } from '@/utils/formatTime';
import styles from './Bar.module.css';

export default function Bar() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((error: DOMException) => {
        if (error.name !== 'AbortError') dispatch(setIsPlaying(false));
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, currentTrack]);

  if (!currentTrack) return null;

  const handleEnded = () => {
    dispatch(setIsPlaying(false));
    dispatch(nextTrack());
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        loop={isLoop}
        onEnded={handleEnded}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          setCurrentTime(event.currentTarget.currentTime);
        }}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <PlayerControls
              isLoop={isLoop}
              onToggleLoop={() => setIsLoop(!isLoop)}
            />
            <TrackPlay track={currentTrack} />
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.bar__time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <Volume volume={volume} onChange={setVolume} />
          </div>
        </div>
      </div>
    </div>
  );
}
