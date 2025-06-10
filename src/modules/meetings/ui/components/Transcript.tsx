import { useState } from 'react';
import { format } from 'date-fns';
import { SearchIcon } from 'lucide-react';
import Highlighter from 'react-highlight-words';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { generatedAvatarUri } from '@/lib/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface Props {
  meetingId: string;
}

const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ meetingId }),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTranscript = data?.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full'>
      <p className='text-sm font-medium'>Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-9"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>

      <ScrollArea>
        <div className='flex flex-col gap-y-2'>
          {filteredTranscript?.map((item) => {
            return (
              <div
                key={item.start_ts}
                className='flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border'
              >
                <div className="flex gap-x-2 items-center">
                  <Avatar className='size-6'>
                    <AvatarImage
                      src={item.user.image ?? generatedAvatarUri({
                        seed: item.user.name,
                        variant: 'initials',
                      })}
                      alt="User Avatar"
                    />
                  </Avatar>
                  <p className='text-sm font-medium'>{item.user.name}</p>
                  <p className='text-sm text-blue-500 font-medium'>
                    {format(new Date(item.start_ts * 1000), 'HH:mm:ss')}
                  </p>
                </div>

                <Highlighter
                  highlightClassName="bg-yellow-200"
                  searchWords={[searchQuery]}
                  autoEscape={true}
                  textToHighlight={item.text}
                  className="text-sm text-muted-foreground"
                />
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Transcript
