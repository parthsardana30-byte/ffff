"use client";

import { useEffect, useRef, useState } from "react";

type Mood = "asking" | "yes" | "no";

const hearts = ["♡", "♥", "♡", "♥", "♡", "♥", "♡", "♥", "♡", "♥"];
const confetti = Array.from({ length: 30 }, (_, index) => index);
const raindrops = Array.from({ length: 38 }, (_, index) => index);

export default function Home() {
  const [mood, setMood] = useState<Mood>("asking");
  const [noCount, setNoCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [audioMissing, setAudioMissing] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const sayYes = () => {
    setMood("yes");
    audioRef.current?.pause();
    videoRef.current?.pause();
    setIsPlaying(false);
    setShowVideo(false);
  };

  const sayNo = async () => {
    setMood("no");
    setNoCount((count) => count + 1);
    audioRef.current?.pause();
    setIsPlaying(false);
    setShowVideo(true);
    const video = videoRef.current;
    try {
      if (video) {
        video.currentTime = 0;
        await video.play();
      }
    } catch {
      // Native video controls remain available if autoplay is blocked.
    }
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const noOffsetX = ((noCount * 47) % 111) - 55;
  const noOffsetY = ((noCount * 29) % 51) - 25;
  const yesScale = Math.min(1 + noCount * 0.07, 1.35);

  return (
    <main className={`love-page mood-${mood}`}>
      <div className="ambient" aria-hidden="true">
        {hearts.map((heart, index) => (
          <span
            className="floating-heart"
            key={index}
            style={
              {
                "--i": index,
                "--left": `${5 + ((index * 29) % 91)}%`,
              } as React.CSSProperties
            }
          >
            {heart}
          </span>
        ))}
        {Array.from({ length: 18 }, (_, index) => (
          <span
            className="sparkle"
            key={`sparkle-${index}`}
            style={
              {
                "--i": index,
                "--left": `${3 + ((index * 37) % 94)}%`,
                "--top": `${5 + ((index * 23) % 89)}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {mood === "yes" && (
        <div className="confetti" aria-hidden="true">
          {confetti.map((piece) => (
            <span
              key={piece}
              style={
                {
                  "--i": piece,
                  "--x": `${(piece * 37) % 100}vw`,
                } as React.CSSProperties
              }
            >
              {piece % 3 === 0 ? "♥" : piece % 3 === 1 ? "♡" : "✦"}
            </span>
          ))}
        </div>
      )}

      {mood === "no" && (
        <>
          <div className="rain" aria-hidden="true">
            {raindrops.map((drop) => (
              <span
                key={drop}
                style={
                  {
                    "--i": drop,
                    "--left": `${(drop * 31) % 101}%`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="crying-clouds" aria-hidden="true">
            <span>🥺</span>
            <span>😭</span>
            <span>🥺</span>
          </div>
        </>
      )}

      <div
        className={`video-modal ${showVideo ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-title"
        aria-hidden={!showVideo}
      >
        <button
          className="video-backdrop"
          type="button"
          aria-label="Video band karein"
          tabIndex={showVideo ? 0 : -1}
          onClick={() => {
            videoRef.current?.pause();
            setShowVideo(false);
          }}
        />
        <div className="video-card">
          <div className="video-heading">
            <div>
              <span>ek aur chhoti si request…</span>
              <h2 id="video-title">Please maan jao na 🥺</h2>
            </div>
            <button
              className="video-close"
              type="button"
              aria-label="Video band karein"
              tabIndex={showVideo ? 0 : -1}
              onClick={() => {
                videoRef.current?.pause();
                setShowVideo(false);
              }}
            >
              ×
            </button>
          </div>
          {videoMissing ? (
            <div className="video-placeholder">
              <span aria-hidden="true">🎥🥺</span>
              <strong>Bas aapki video ka wait hai</strong>
              <p>
                Apni video ko <code>public/assets/video.mp4</code> naam se add
                karein.
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="sorry-video"
              src="/assets/video.mp4"
              controls
              playsInline
              preload="metadata"
              onError={() => setVideoMissing(true)}
            >
              Aapka browser video playback support nahi karta.
            </video>
          )}
          <p className="video-caption">
            Gussa valid hai… par ek baar meri baat sun lo na ❤️
          </p>
        </div>
      </div>

      <section className="sorry-card" aria-labelledby="page-title">
        <div className="card-ribbon" aria-hidden="true">
          <span />
          dil se
          <span />
        </div>

        <div className="heart-seal" aria-hidden="true">
          ♥
        </div>

        <p className="eyebrow">ek chhoti si baat…</p>
        <h1 id="page-title">I&apos;m really sorry.</h1>

        <div className="message">
          <p>
            Sorry yaar… maine kal jo bhi kaha, mera woh matlab bilkul nahi tha.
            Main bahut sleepy tha aur bina soche bol gaya. Mujhe genuinely bahut
            bura lag raha hai. Please mujhse ek baar baat kar lo na… 🥺😭
          </p>
          <p>
            Tumhara naraz hona valid hai, but please mujhe tumhe properly sorry
            bolne aur sab theek karne ka ek chance de do. I&apos;m really sorry.
            ❤️
          </p>
        </div>

        <div className="plea" aria-live="polite">
          {mood === "yes" ? (
            <>
              <span className="reaction-emoji">🥹❤️</span>
              <strong>Thank youuu!</strong>
              <p>
                I promise main tumhari baat properly sununga aur tumhe manaunga.
                ❤️🥹
              </p>
            </>
          ) : mood === "no" ? (
            <>
              <span className="reaction-emoji">😭🥺</span>
              <strong>Please maan jao na…</strong>
              <p>itni badi saza mat do 😭🥺</p>
            </>
          ) : (
            <strong>Please maan jao na… 😭🥺</strong>
          )}
        </div>

        {mood !== "yes" ? (
          <div className="actions" aria-label="Aapka jawab">
            <button
              className="button button-yes"
              type="button"
              onClick={sayYes}
              style={{ transform: `scale(${yesScale})` }}
            >
              <span>Haan, baat karungi</span> ❤️
            </button>
            <button
              className="button button-no"
              type="button"
              onClick={sayNo}
              style={{
                transform: `translate(${noOffsetX}px, ${noOffsetY}px)`,
              }}
            >
              Nahi 😤
            </button>
          </div>
        ) : (
          <a
            className="button whatsapp-button"
            href="https://wa.me/?text=Okay%2C%20baat%20karte%20hain%20%E2%9D%A4%EF%B8%8F"
            target="_blank"
            rel="noreferrer"
          >
            Ab mujhe message karo 💬
          </a>
        )}

        <div className="music-player">
          <audio
            ref={audioRef}
            src="/assets/song.mp3"
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
            onError={() => setAudioMissing(true)}
          />
          <button
            className="music-toggle"
            type="button"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Music pause karein" : "Music play karein"}
            aria-pressed={isPlaying}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div className="track-copy">
            <span>{isPlaying ? "playing softly…" : "a little song for you"}</span>
            <small>
              {audioMissing
                ? "Apni audio file assets/song.mp3 par add karein"
                : "I Think They Call This Love"}
            </small>
          </div>
          <label className="volume">
            <span className="sr-only">Music volume</span>
            <span aria-hidden="true">{volume === 0 ? "🔇" : "♫"}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>
        </div>

        <p className="tiny-note">no pressure, bas ek honest sorry ♡</p>
      </section>
    </main>
  );
}
