import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader';
import s from './AudioPlayer.module.css';

import { PauseIcon } from '../IconsSVG/PauseIcon';
import { PlayIcon } from '../IconsSVG/PlayIcon';
import { DownloadIcon } from '../IconsSVG/DownloadIcon';
import { CrossIcon } from '../IconsSVG/CrossIcon';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRecord, setCurrentRecord] = useState();

  const audioRef = useRef();
  const barRef = useRef();
  const { records } = useSelector((state) => state.callList);

  useEffect(() => {
    if (records.length) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlay = (bool) => {
    setIsPlaying(bool);
  };

  const onPlay = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    const progress = (currentTime / duration) * 100;

    setCurrentRecord({
      ...currentRecord,
      progress: progress,
      length: duration,
    });

    if (progress === 100) setIsPlaying(false);
  };

  const handleScrollRecord = (e) => {
    if (!currentRecord) return;
    let width = barRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const barProgress = (offset / width) * 100;
    audioRef.current.currentTime = (barProgress / 100) * currentRecord.length;
  };

  if (!records.length) return <Loader />;
  return (
    <div className={s.player}>
      <div className={s.player_duration}>12:06</div>
      <div className={s.playBtn} onClick={() => handlePlay(!isPlaying)}>
        <div className={s.play_puse_btn}>
          {(isPlaying && <PauseIcon />) || <PlayIcon />}
        </div>
      </div>

      <audio ref={audioRef} onTimeUpdate={onPlay}>
        <source src={records[0]} type="audio/mp3" />
      </audio>

      <span className={s.player_title}></span>
      <div className={s.player_bar} ref={barRef} onClick={handleScrollRecord}>
        <span style={{ width: `${currentRecord?.progress}%` }}></span>
      </div>
      <span className={s.download_icon}>
        <DownloadIcon />
      </span>
      <span className={s.cross_icon}>
        <CrossIcon />
      </span>
    </div>
  );
};
