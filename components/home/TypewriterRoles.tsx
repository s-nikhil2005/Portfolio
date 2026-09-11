"use client";

import { useEffect, useState } from "react";
import { profileData } from "@/data/profile";

export default function TypewriterRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = profileData.roles[roleIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(
            currentRole.substring(0, displayText.length + 1)
          );
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(
            currentRole.substring(0, displayText.length - 1)
          );
        }, 50);
      } else {
        setIsDeleting(false);

        setRoleIndex((previousIndex) => {
          return (previousIndex + 1) % profileData.roles.length;
        });
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [displayText, isDeleting, currentRole]);

  return (
     <p
    className="
      flex items-center
      font-sans
      text-xl
      sm:text-2xl
      md:text-3xl
      font-semibold
      tracking-tight
      text-[#3DDC84]
      min-h-[1.2em]
    "
    aria-label={currentRole}
  >
   <span className="mr-2 font-black text-base">&gt;</span>

    <span>
      {displayText}
      <span
        className="ml-1 inline-block animate-pulse"
        aria-hidden="true"
      >
        |
      </span>
    </span>
  </p>
  );
}