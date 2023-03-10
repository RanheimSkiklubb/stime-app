import {ScrollView} from 'react-native';

import StarterParticipant from './StarterParticipant';

export default function Next({participants}) {
  return (
    <ScrollView>
      {participants.map(participant => (
        <StarterParticipant {...participant} />
      ))}
    </ScrollView>
  );
}
