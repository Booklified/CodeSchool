import React, { useEffect } from 'react';
import { Col } from '@freecodecamp/ui';

import Map from '../../Map/index';
import { Spacer } from '../../helpers';
import { type SuperBlocks } from '../../../../../shared/config/curriculum';

const Certifications = ({
  allChallenges
}: {
  allChallenges: {
    id: string;
    superBlock: SuperBlocks;
  }[];
}): JSX.Element => {
  useEffect(() => {
    console.log(allChallenges);
  }, [allChallenges]);
  return (
    <Col
      className='certification-section'
      md={8}
      mdOffset={2}
      sm={10}
      smOffset={1}
      xs={12}
    >
      <Map allChallenges={allChallenges} forLanding={true} />
      <Spacer size='medium' />
    </Col>
  );
};

Certifications.displayName = 'Certifications';
export default Certifications;
