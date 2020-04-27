function user (userObj) {
  let formattedUser = {
    id: userObj.id || null,
    id_str: userObj.id_str || null,
    name: userObj.name || null,
    screen_name: userObj.screen_name || null,
    description: userObj.description || null,
    followers_count: userObj.followers_count || null,
    friends_count: userObj.friends_count || null,
    listed_count: userObj.listed_count || null,
    created_at: userObj.created_at || null,
    favourites_count: userObj.favourites_count || null,
    statuses_count: userObj.statuses_count || null,
    profile_image_url: userObj.profile_image_url || null,
  };

  if (userObj.status) {
    formattedUser.status = {
      created_at: userObj.status.created_at || null,
      id: userObj.status.id || null,
      id_str: userObj.status.id_str || null,
      text: userObj.status.text || null
    };
  }
  return formattedUser;
}

function tweet (tweetObj) {
  let formattedTweet = {
    id: tweetObj.id || null,
    id_str: tweetObj.id_str || null,
    text: tweetObj.text || null,
    created_at: tweetObj.created_at || null,
  };

  if (tweetObj.user) {
    formattedTweet.user = {
      id: tweetObj.user.id || null,
      id_str: tweetObj.user.id_str || null,
      name: tweetObj.user.name || null,
      screen_name: tweetObj.user.screen_name || null,
      description: tweetObj.user.description || null,
      followers_count: tweetObj.user.followers_count || null,
      friends_count: tweetObj.user.friends_count || null,
      listed_count: tweetObj.user.listed_count || null,
      created_at: tweetObj.user.created_at || null,
      favourites_count: tweetObj.user.favourites_count || null,
      statuses_count: tweetObj.user.statuses_count || null,
      profile_image_url: tweetObj.user.profile_image_url || null
    };
  }

  if (tweetObj.media) {
    formattedTweet.media = {
      id: tweetObj.media.id || null,
      id_str: tweetObj.media.id_str || null,
      media_url: tweetObj.media.media_url || null,
      media_url_https: tweetObj.media.media_url_https || null,
    };
  }
  
  return formattedTweet;
}

module.exports = {
  user: user,
  tweet: tweet
};