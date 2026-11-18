"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CorporateFilmModal.module.css";

type CorporateFilmModalProps = {
  open: boolean;
  onClose: () => void;
};

const FILM_URL = "/videos/mfsys-corporate-film-web.mp4";

export default function CorporateFilmModal({ open, onClose }: CorporateFilmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      setVideoError(false);
      dialog.showModal();
    } else if (!open && dialog.open) {
      playerRef.current?.pause();
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [open]);

  const closeFilm = () => {
    playerRef.current?.pause();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="mfsys-film-title"
      aria-describedby="mfsys-film-description"
      onCancel={(event) => {
        event.preventDefault();
        closeFilm();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) closeFilm();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>MFSYS TECHNOLOGIES · CORPORATE FILM</p>
            <h2 id="mfsys-film-title" className={styles.heading}>
              Building Smarter Financial Futures
            </h2>
          </div>
          <button className={styles.close} type="button" onClick={closeFilm} aria-label="Close video">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={styles.playerWrap}>
          {open && (
            <video
              ref={playerRef}
              className={styles.player}
              controls
              autoPlay
              playsInline
              preload="metadata"
              aria-label="MFSYS corporate film, 1 minute and 59 seconds"
              onError={() => setVideoError(true)}
            >
              <source src={FILM_URL} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          )}
          {videoError && (
            <p className={styles.error} role="alert">
              The video could not be loaded. Please try again or use the download link below.
            </p>
          )}
        </div>
        <div className={styles.footer}>
          <p id="mfsys-film-description">
            Discover the people, technology and purpose behind MFSYS.
          </p>
          <a href={FILM_URL} download="MFSYS-Corporate-Film.mp4" className={styles.download}>
            Download film <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </dialog>
  );
}
