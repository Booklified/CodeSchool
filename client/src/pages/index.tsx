import React from 'react';
import { graphql } from 'gatsby';
import { createSelector } from 'reselect';
import { useGrowthBook } from '@growthbook/growthbook-react';
import { connect } from 'react-redux';
import { SuperBlocks } from '../../../shared/config/curriculum';
import { Loader } from '../components/helpers';
import Certifications from '../components/landing/components/certifications';
import '../components/landing/landing.css';
import Intro from '../components/Intro';
import {
  isSignedInSelector,
  userSelector,
  userFetchStateSelector
} from '../redux/selectors';

interface FetchState {
  pending: boolean;
  complete: boolean;
  errored: boolean;
}

interface User {
  name: string;
  username: string;
  completedChallengeCount: number;
  isDonating: boolean;
}

const mapStateToProps = createSelector(
  userFetchStateSelector,
  isSignedInSelector,
  userSelector,
  (fetchState: FetchState, isSignedIn: boolean, user: User) => ({
    fetchState,
    isSignedIn,
    user
  })
);

interface FetchState {
  pending: boolean;
  complete: boolean;
  errored: boolean;
}
interface User {
  name: string;
  username: string;
  completedChallengeCount: number;
  isDonating: boolean;
}
interface Slug {
  slug: string;
}

type Props = {
  isSignedIn: boolean;
  fetchState: FetchState;
  state: Record<string, unknown>;
  user: User;
  data: {
    challengeNode: {
      challenge: {
        fields: Slug;
      };
    };
    allChallengeNode: {
      nodes: {
        challenge: {
          id: string;
          superBlock: SuperBlocks;
        };
      }[];
    };
  };
};

function IndexPage({
  isSignedIn,
  fetchState: { pending, complete },
  user: { name = '', completedChallengeCount = 0, isDonating = false },
  data: {
    allChallengeNode: { nodes: challengeNodes }
  }
}: Props): JSX.Element {
  const growthbook = useGrowthBook();
  const allChallenges = challengeNodes.map(node => node.challenge);
  if (growthbook && growthbook.ready) {
    return (
      <>
        <main className='landing-page landing-page-b'>
          <Intro
            complete={complete}
            completedChallengeCount={completedChallengeCount}
            isSignedIn={isSignedIn}
            name={name}
            pending={pending}
            onLearnDonationAlertClick={() => {}}
            isDonating={isDonating}
          />

          <Certifications allChallenges={allChallenges} />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Loader fullScreen={true} />
      </>
    );
  }
}

IndexPage.displayName = 'IndexPage';
export default connect(mapStateToProps)(IndexPage);

export const query = graphql`
  query AllChallengeNode {
    allChallengeNode {
      nodes {
        challenge {
          id
          superBlock
        }
      }
    }
  }
`;
