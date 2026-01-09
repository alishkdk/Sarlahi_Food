"use client";
import React from "react";

export default function InviteButton() {
  function handleClick() {
    alert("Invite (mock)");
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
    >
      Invite
    </button>
  );
}
