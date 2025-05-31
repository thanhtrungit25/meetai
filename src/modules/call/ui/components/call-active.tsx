"use client";

import Image from "next/image";
import Link from "next/link";

import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

type Props = {
  onLeave: () => void;
  meetingName: string;
};

export const CallActive = ({ meetingName, onLeave }: Props) => (
  <div className="flex flex-col justify-between p-4 h-full text-white">
    <div className="bg-[#101213] rounded-full p-4 items-center gap-4">
      <Link
        href="/"
        className="flex items-center justify-center p-1 bg-white w-fit rounded-full"
      >
        <Image src="/logo.svg" width={22} height={22} alt="logo" />
      </Link>
      <h4 className="text-base">{meetingName}</h4>
    </div>
    <SpeakerLayout />
    <div className="bg-[#101213] rounded-full p-4 gap-4">
      <CallControls onLeave={onLeave} />
    </div>
  </div>
);
