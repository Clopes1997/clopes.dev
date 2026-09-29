"use client";
import { useEffect, useRef, useState } from "react";
import { music } from "./music";
import YouTubeEmbed from "./YouTubeEmbed";

/** A deliberately quiet, optional interaction. Keep out of primary navigation. */
export default function SmallDetail() {
  const [isAwake, setIsAwake] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const clicks = useRef(0);
  const previousFocus = useRef<HTMLElement | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function awaken() {
    if (!dialog.current?.open) {
      previousFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.current?.showModal();
      setIsAwake(true);
    }
  }

  useEffect(() => {
    let letters = "";
    function listen(event: KeyboardEvent) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing ||
        dialog.current?.open
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))
      )
        return;
      if (event.key.length !== 1) {
        letters = "";
        return;
      }
      letters = (letters + event.key.toLowerCase()).slice(-10);
      if (letters === "necromancy") {
        awaken();
        letters = "";
      }
    }
    window.addEventListener("keydown", listen);
    return () => {
      window.removeEventListener("keydown", listen);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  function inspect() {
    clicks.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clicks.current === 3) {
      awaken();
      clicks.current = 0;
    }
    clickTimer.current = setTimeout(() => {
      clicks.current = 0;
    }, 2500);
  }

  return (
    <>
      <button
        className="footer-detail"
        aria-label="A small ornament"
        onClick={inspect}
      >
        ✳
      </button>
      <dialog
        className="necromancy-dialog"
        ref={dialog}
        aria-labelledby="quiet-title"
        onClose={() => {
          setIsAwake(false);
          previousFocus.current?.focus();
        }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">Something stirs.</span>
          <button
            className="dialog-dismiss"
            aria-label="Close"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        <h2 id="quiet-title">
          Some things refuse
          <br />
          to stay buried.
        </h2>
        <p>{music.description}</p>
        {isAwake && <YouTubeEmbed />}
        <p className="secret-credit">
          Ilithyia · Live, 2024 · Clopes — guest singer
        </p>
        <div className="dialog-links">
          <button
            className="button-link"
            onClick={() => dialog.current?.close()}
          >
            Let it rest
          </button>
        </div>
      </dialog>
    </>
  );
}
