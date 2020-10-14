import { Components } from 'meteor/vulcan:core';
import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

const leaderboardQuery = `
query leaderboardQuery {
  leaderboards
}
`;

const Leaderboard = () => {
  const { loading, data = {} } = useQuery(gql(leaderboardQuery));

  const users = get(data, 'leaderboards.users', []);
  const domains = get(data, 'leaderboards.domains', []);

  return (
    <div className="page page-rankings">
      <div className="page-heading">
        <h2 className="page-heading-title">Leaderboard</h2>
      </div>
      {loading ? (
        <Components.Loading />
      ) : (
        <div className="leaderboard">
          <div className="leaderboard-column leaderboard-users">
            <div className="leaderboard-heading">
              <h3>Submitter</h3>
              <span>Post Count</span>
            </div>
            {users.map((user, i) => (
              <LeaderboardItem
                url={`https://twitter.com/${user.twitterScreenName}`}
                count={user.count}
                label={user.displayName}
                rank={i + 1}
                avatarUrl={user.avatarUrl}
                key={user.displayName}
              />
            ))}
          </div>
          <div className="leaderboard-column leaderboard-domains">
            <div className="leaderboard-heading">
              <h3>Domain</h3>
              <span>Post Count</span>
            </div>
            {domains.map((domain, i) => (
              <LeaderboardItem
                url={`https://${domain._id}`}
                count={domain.count}
                rank={i + 1}
                domain={domain._id}
                label={domain._id}
                key={domain._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LeaderboardItem = ({ url, label, domain, count, rank, avatarUrl }) => (
  <div className="leaderboard-item">
    <div className="leaderboard-label">
      <span className="leaderboard-rank">{rank}.</span>
      {avatarUrl && <Components.Avatar user={{ avatarUrl }} link={false} />}
      {domain ? (
        <Link to={`/domain/${domain}`}>
          <span>{label}</span>
        </Link>
      ) : (
        <a className="leaderboard-link" href={url} target="_blank" rel="noreferrer noopener">
          <span>{label}</span>
        </a>
      )}
    </div>
    <span className="leaderboard-count">{count}</span>
  </div>
);

export default Leaderboard;
