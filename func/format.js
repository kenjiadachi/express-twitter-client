// 引数: オブジェクトの配列、オブジェクトの配列、String
function user (userObj) {
  const formattedUser = {
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
    status: {
      created_at: userObj.status.created_at || null,
      id: userObj.status.id || null,
      id_str: userObj.status.id_str || null,
      text: userObj.status.text || null
    }
  };
  return formattedUser;
}

module.exports = {
  user: user
};