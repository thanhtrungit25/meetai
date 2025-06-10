import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Channel as StreamChannel } from 'stream-chat';

import {
  useCreateChatClient,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import 'stream-chat-react/dist/css/v2/index.css';

interface ChatUIProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage?: string | null | undefined;
}

const ChatUI = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: ChatUIProps) => {

  console.log("🦀 meetingName", meetingName);

  const trpc = useTRPC();
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage ?? undefined,
    },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel('messaging', meetingId, {
      members: [userId],
    });
    
    setChannel(channel);
  }, [client, meetingId, userId]);

  if (!client || !channel) {
    return (
      <LoadingState
        title={`Loading ${meetingName} chat...`}
        descripiton="Please wait while we load the chat"
      />
    );
  }

  return (
    <div className='bg-white rounded-lg border overflow-hidden'>
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatUI
