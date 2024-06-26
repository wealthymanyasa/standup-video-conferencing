import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButon from './EndCallButon';
import Loader from './Loader';


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />

  const layouts = ['Grid', 'Speaker-Left', 'Speaker-Right']

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <SpeakerLayout />
      case 'speaker-right':
        return <SpeakerLayout
          participantsBarPosition='left' />
      default:
        return <SpeakerLayout
          participantsBarPosition='right' />

    }
  }
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center justify-center">
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',
          { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() =>
            setShowParticipants(false)
          } />

        </div>
      </div>
      <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5">
        
          <CallControls onLeave={() => router.push('/')} />
    
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {layouts.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer'
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button onClick={() => setShowParticipants
          ((prev) => !prev)}>
          <div className="cursour-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className='text-white' />
          </div>
        </Button>
        {!isPersonalRoom &&
          <EndCallButon />}
      </div>
    </section>
  )
}

export default MeetingRoom