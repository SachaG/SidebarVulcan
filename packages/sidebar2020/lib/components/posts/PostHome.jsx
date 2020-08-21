import React from 'react';
import { Components, registerComponent, useMulti2 } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import PostCell from './PostCell';
import SideColumnBottom from '../common/SideColumnBottom';
import groupBy from 'lodash/groupBy';
import range from 'lodash/range';
import { postStatus } from '../../modules/data';
import { LinkContainer } from 'react-router-bootstrap';
import { WeekdayPlaceholder, DatePlaceholder } from '../common/Placeholders';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const postCount = 35;
const pollInterval = 5 * 60 * 1000; // every 5 minutes
// const pollInterval = 5 * 1000; // every 5 seconds

const homepageQuery = `
query homepagePosts {
  homepagePosts
}
`;

const PostHome = () => {
  // const useMultiResults = useMulti2({
  //   collection: Posts,
  //   fragmentName: 'PostFragment',
  //   pollInterval,
  //   input: {
  //     limit: postCount,
  //     filter: { status: { _in: [postStatus.published] } },
  //     sort: { postedAt: 'desc' },
  //     enableCache: true,
  //   },
  // });
  // const { loading, results } = useMultiResults;
  const useQueryResults = useQuery(gql(homepageQuery), { pollInterval });
  const { loading, data = {} } = useQueryResults;
  const results = data.homepagePosts;
  return (
    <div className="post-list">
      {loading ? <PostDaysLoading /> : results.length > 0 ? <PostDays posts={results} /> : <PostDaysEmpty />}
      <PostLoadMore />
    </div>
  );
};

const PostDaysLoading = () => (
  <div className="post-days">
    {range(5).map((index) => (
      <PostDay index={index} key={index} loading={true} />
    ))}
  </div>
);

const PostDays = ({ posts }) => {
  const postsByDate = groupBy(posts, 'postedAtDate');
  return (
    <div className="post-days">
      {Object.keys(postsByDate)
        .sort((a, b) => b - a)
        .map((date, index) => (
          <PostDay index={index} key={date} date={date} posts={postsByDate[date]} />
        ))}
    </div>
  );
};

const PostDaysEmpty = () => (
  <div className="post-days">
    {range(1).map((index) => (
      <PostDay index={index} key={index} posts={[]} empty={true} />
    ))}
  </div>
);

const PostLoadMore = ({ loadMore, loadingMore }) => (
  <div className="post-load-more">
    <LinkContainer to="/archives">
      <Components.Button>
        <span className="post-load-more-label">Browse Archives</span>
      </Components.Button>
    </LinkContainer>
  </div>
);

// const PostLoadMore = ({ loadMore, loadingMore }) => (
//   <div className="post-load-more">
//     <Components.Button
//       onClick={() => {
//         loadMore();
//       }}
//     >
//       <span className="post-load-more-label">Load More</span>

//       {loadingMore && (
//         <span className="post-load-more-loading">
//           <Components.Loading />
//         </span>
//       )}
//     </Components.Button>
//   </div>
// );

const emptyPosts = range(5).map((i) => ({ _id: i }));

const PostDay = ({ posts, index, loading, empty }) => {
  // see https://stackoverflow.com/a/17387454
  const postsArray =
    loading || empty
      ? emptyPosts
      : posts.sort((x, y) => (x.isSponsored === y.isSponsored ? 0 : x.isSponsored ? -1 : 1));
  const { postedAtDateStamp, postedAtWeekdayStamp } = postsArray[0];

  return (
    <div className="day">
      {loading ? (
        <PostDateLoading />
      ) : empty ? (
        <PostDateLoading />
      ) : (
        <PostDate postedAtDateStamp={postedAtDateStamp} postedAtWeekdayStamp={postedAtWeekdayStamp} />
      )}

      <div className="postscolumn">
        <div className="day-postlist">
          {empty ? (
            <div className="postlist-empty">No links yet.</div>
          ) : (
            postsArray.map((post, i) => (
              <PostCell
                document={post}
                loading={loading}
                showLoadingAnimation={true}
                variant="medium"
                key={post._id}
                index={i + 1}
                showDate={false}
              />
            ))
          )}
        </div>
      </div>

      <SideColumnBottom index={index} />

      <div className="sidecolumn-spacer" />
    </div>
  );
};

const PostDate = ({ postedAtWeekdayStamp, postedAtDateStamp }) => (
  <div className="sidecolumn-image">
    <h3 className="day-date">
      <span className="day-weekdaystamp">
        <span>
          <span>{postedAtWeekdayStamp}</span>
        </span>
      </span>
      <span className="day-datestamp">
        <span>
          <span>{postedAtDateStamp}</span>
        </span>
      </span>
    </h3>
  </div>
);

const PostDateLoading = () => (
  <div className="sidecolumn-image">
    <h3 className="day-date">
      <span className="day-weekdaystamp">
        <WeekdayPlaceholder />
      </span>
      <span className="day-datestamp">
        <DatePlaceholder />
      </span>
    </h3>
  </div>
);

export default PostHome;
