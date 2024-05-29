import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButon = () => {

    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const router = useRouter();
    const isMeetingOwner = localParticipant &&
        call?.state.createdBy && localParticipant.userId ===
        call.state.createdBy.id;

    if (!isMeetingOwner) return null;
    return (
        <Button className='bg-red-500 rounded-full'
            onClick={async () => {
                await call.endCall();
                router.push('/')
            }}>
            End call for everyone
        </Button>
    )
}

export default EndCallButon