import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  SuperBlockStage,
  SuperBlocks,
  getStageOrder,
  superBlockStages
} from '../../../../shared/config/curriculum';
import { SuperBlockIcon } from '../../assets/icons/superblock-icon';
import LinkButton from '../../assets/icons/link-button';
import { Spacer, ButtonLink } from '../helpers';
import { getSuperBlockTitleForMap } from '../../utils/superblock-map-titles';
import {
  showUpcomingChanges,
  showNewCurriculum
} from '../../../config/env.json';

import './map.css';

import {
  isSignedInSelector,
  currentCertsSelector
} from '../../redux/selectors';

import { RibbonIcon } from '../../assets/icons/completion-ribbon';

import { CurrentCert, ClaimedCertifications } from '../../redux/prop-types';
import {
  certSlugTypeMap,
  superBlockCertTypeMap
} from '../../../../shared/config/certification-settings';
import { completedChallengesIdsSelector } from '../../templates/Challenges/redux/selectors';

interface MapProps {
  forLanding?: boolean;
  isSignedIn: boolean;
  currentCerts: CurrentCert[];
  claimedCertifications?: ClaimedCertifications;
  completedChallengeIds: string[];
  allChallenges: {
    id: string;
    superBlock: SuperBlocks;
  }[];
}

const linkSpacingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '15px'
};

const mapStateToProps = createSelector(
  isSignedInSelector,
  currentCertsSelector,
  completedChallengesIdsSelector,
  (isSignedIn: boolean, currentCerts, completedChallengeIds: string[]) => ({
    isSignedIn,
    currentCerts,
    completedChallengeIds
  })
);

function MapLi({
  superBlock,
  landing = false,
  completed,
  claimed,
  showProgressionLines = false,
  showNumbers = false,
  index
}: {
  superBlock: SuperBlocks;
  landing: boolean;
  completed: boolean;
  claimed: boolean;
  showProgressionLines?: boolean;
  showNumbers?: boolean;
  index: number;
}) {
  if (superBlock === SuperBlocks.A2English) return <></>;
  if (superBlock === SuperBlocks.B1English) return <></>;
  if (superBlock === SuperBlocks.CodingInterviewPrep) return <></>;
  if (superBlock === SuperBlocks.DataAnalysisPy) return <></>;
  if (superBlock === SuperBlocks.DataVis) return <></>;
  if (superBlock === SuperBlocks.FoundationalCSharp) return <></>;
  // if(superBlock === SuperBlocks.RespWebDesignNew) return <></>
  if (superBlock === SuperBlocks.RespWebDesign) return <></>;
  if (superBlock === SuperBlocks.JsAlgoDataStruct) return <></>;
  // if(superBlock === SuperBlocks.JsAlgoDataStructNew) return <></>
  // if(superBlock === SuperBlocks.FrontEndDevLibs) return <></>
  // if(superBlock === SuperBlocks.RelationalDb) return <></>
  // if(superBlock === SuperBlocks.BackEndDevApis) return <></>
  if (superBlock === SuperBlocks.QualityAssurance) return <></>;
  if (superBlock === SuperBlocks.SciCompPy) return <></>;
  if (superBlock === SuperBlocks.InfoSec) return <></>;
  if (superBlock === SuperBlocks.MachineLearningPy) return <></>;
  if (superBlock === SuperBlocks.TheOdinProject) return <></>;
  if (superBlock === SuperBlocks.ProjectEuler) return <></>;
  if (superBlock === SuperBlocks.CollegeAlgebraPy) return <></>;
  // if(superBlock === SuperBlocks.FrontEndDevelopment) return <></>
  if (superBlock === SuperBlocks.UpcomingPython) return <></>;
  if (superBlock === SuperBlocks.RosettaCode) return <></>;
  if (superBlock === SuperBlocks.PythonForEverybody) return <></>;
  return (
    <>
      <li
        data-test-label='curriculum-map-button'
        data-playwright-test-label='curriculum-map-button'
      >
        <div className='progress-icon-wrapper'>
          <div
            className={`progress-icon${showProgressionLines ? ' show-progression-lines' : ''}`}
          >
            <RibbonIcon
              value={index + 1}
              showNumbers={showNumbers}
              isCompleted={completed}
              isClaimed={claimed}
            />
          </div>
        </div>

        <ButtonLink
          block
          size='large'
          className='map-superblock-link'
          href={`/learn/${superBlock}/`}
        >
          <div style={linkSpacingStyle}>
            <SuperBlockIcon className='map-icon' superBlock={superBlock} />
            {getSuperBlockTitleForMap(superBlock)}
          </div>
          {landing && <LinkButton />}
        </ButtonLink>
      </li>
    </>
  );
}

function Map({
  forLanding = false,
  isSignedIn,
  currentCerts,
  completedChallengeIds,
  allChallenges
}: MapProps): React.ReactElement {
  const allSuperblockChallengesCompleted = (superblock: SuperBlocks) => {
    // array of all challenge ID's in the superblock
    const allSuperblockChallenges = allChallenges
      .filter(challenge => challenge.superBlock === superblock)
      .map(challenge => challenge.id);

    return allSuperblockChallenges.every(id =>
      completedChallengeIds.includes(id)
    );
  };

  const isClaimed = (stage: SuperBlocks) => {
    return isSignedIn
      ? Boolean(
          currentCerts?.find(
            (cert: { certSlug: string }) =>
              (certSlugTypeMap as { [key: string]: string })[cert.certSlug] ===
              (superBlockCertTypeMap as { [key: string]: string })[stage]
          )?.show
        )
      : false;
  };

  return (
    <div className='map-ui' data-test-label='curriculum-map'>
      {getStageOrder({ showNewCurriculum, showUpcomingChanges }).map(stage => (
        <Fragment key={stage}>
          <ul key={stage}>
            {superBlockStages[stage].map((superblock, i) => (
              <MapLi
                key={superblock}
                superBlock={superblock}
                landing={forLanding}
                index={i}
                claimed={isClaimed(superblock)}
                showProgressionLines={stage === SuperBlockStage.Core}
                showNumbers={stage === SuperBlockStage.Core}
                completed={allSuperblockChallengesCompleted(superblock)}
              />
            ))}
          </ul>
          <Spacer size='medium' />
        </Fragment>
      ))}
    </div>
  );
}

Map.displayName = 'Map';

export default connect(mapStateToProps)(Map);
