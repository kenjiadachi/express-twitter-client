const fs = require('fs');
const path = require('path');
const diff = require('./diff');
const twitter = require('./twitter');


let sample_follows = [
  {
    "id": 742980947021303800,
    "id_str": "742980947021303808",
    "name": "【公式】 予約投稿・アカウント管理なら SocialDog (ソーシャルドッグ)",
    "screen_name": "SocialDog_JP",
    "location": "",
    "description": "Twitterアカウント運用ツール「SocialDog」公式アカウント／\n アップデート、障害情報をお知らせします。AutoScale, Inc.が運営しています。お問い合わせはサイト内チャットフォームよりお願いいたします！\niPhone/Androidアプリ:  https://t.co/ZGoLggbBlQ",
    "url": "https://t.co/3HbGgmdT2v",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/3HbGgmdT2v",
            "expanded_url": "https://social-dog.net/?utm_source=twitter&utm_medium=twitter&utm_campaign=socialdog_twitter_profile",
            "display_url": "social-dog.net/?utm_source=tw…",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": [
          {
            "url": "https://t.co/ZGoLggbBlQ",
            "expanded_url": "http://go.onelink.me/DKtw/twitter",
            "display_url": "go.onelink.me/DKtw/twitter",
            "indices": [
              133,
              156
            ]
          }
        ]
      }
    },
    "protected": false,
    "followers_count": 22794,
    "friends_count": 17629,
    "listed_count": 90,
    "created_at": "Wed Jun 15 07:23:56 +0000 2016",
    "favourites_count": 4703,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 3418,
    "lang": null,
    "status": {
      "created_at": "Tue Apr 14 04:43:01 +0000 2020",
      "id": 1249921075993067500,
      "id_str": "1249921075993067520",
      "text": "緊急メンテナンスは、13:40までに無事終了いたしました。\nご協力いただきましてありがとうございました。\n#SocialDog #SocialDog障害情報",
      "truncated": false,
      "entities": {
        "hashtags": [
          {
            "text": "SocialDog",
            "indices": [
              53,
              63
            ]
          },
          {
            "text": "SocialDog障害情報",
            "indices": [
              64,
              78
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": []
      },
      "source": "<a href=\"https://social-dog.net/\" rel=\"nofollow\">SocialDog for Twitter</a>",
      "in_reply_to_status_id": 1249918048649138200,
      "in_reply_to_status_id_str": "1249918048649138177",
      "in_reply_to_user_id": 742980947021303800,
      "in_reply_to_user_id_str": "742980947021303808",
      "in_reply_to_screen_name": "SocialDog_JP",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 2,
      "favorite_count": 4,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1196728732305637376/hpCbW6dc_normal.png",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1196728732305637376/hpCbW6dc_normal.png",
    "profile_link_color": "E0542F",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 846864988417409000,
    "id_str": "846864988417409025",
    "name": "ジョン（サラリーマン大学生・慶應通信経済71期生）",
    "screen_name": "keiotsushin71th",
    "location": "⬇︎通信制高校・大学生向けキャリア支援サイト「通キャリ！」",
    "description": "日大中退→起業失敗→24歳無職→ #通信制大学 入学&高卒として就活→教育系ITベンチャーマナボでインターン→25歳の新卒としてマイナビ（医療福祉保育領域）→コンサル/27歳/45単位/時々高校でキャリア教育授業のお手伝い/音大生のキャリア支援/#そうだんドットミー アドバイザー / 通信生進路支援サイト #通キャリ！",
    "url": "https://t.co/FzHVgjCSV6",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/FzHVgjCSV6",
            "expanded_url": "http://bit.ly/2HGGTHS",
            "display_url": "bit.ly/2HGGTHS",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": []
      }
    },
    "protected": false,
    "followers_count": 931,
    "friends_count": 1291,
    "listed_count": 7,
    "created_at": "Tue Mar 28 23:22:02 +0000 2017",
    "favourites_count": 3589,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 1276,
    "lang": null,
    "status": {
      "created_at": "Tue Apr 14 16:31:53 +0000 2020",
      "id": 1250099467174310000,
      "id_str": "1250099467174309889",
      "text": "昨年、進路に関する授業をやらせて頂いた埼玉県のとある定時制高校に、本年10月頃にお伺いし、全校生徒120人の前でお話しする機会を頂きました😌\n\nとっても恐縮＆光栄＆コロナ落ち着くか心配…😂\n\n何を話そうかな☺️\n\n仕事も通信制大学… https://t.co/UxwqVhOOw2",
      "truncated": true,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/UxwqVhOOw2",
            "expanded_url": "https://twitter.com/i/web/status/1250099467174309889",
            "display_url": "twitter.com/i/web/status/1…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 5,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "F5F8FA",
    "profile_background_image_url": null,
    "profile_background_image_url_https": null,
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1245022636364587008/C1KJblmi_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1245022636364587008/C1KJblmi_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/846864988417409025/1567488960",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 1905267835,
    "id_str": "1905267835",
    "name": "金田謙太 / youknit",
    "screen_name": "kenta_crape",
    "location": "Sapporo→Florida→Tokyo→",
    "description": "\"まだ気づかない価値創り出す\" withly代表┃チームの温度を上げるプラットフォーム『youknit（ユニット）』(https://t.co/osCm67HPkA)の開発と、コンセプトマーケティング事業を行っています。┃札幌出身⇛フロリダ大学マーケ卒⇛DeNA⇛SHOWROOM(海外展開)⇛withly創業もうすぐ3期目",
    "url": "https://t.co/QHhPWoWir9",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/QHhPWoWir9",
            "expanded_url": "https://thisis-me.com/profile/1",
            "display_url": "thisis-me.com/profile/1",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": [
          {
            "url": "https://t.co/osCm67HPkA",
            "expanded_url": "http://you-knit.com",
            "display_url": "you-knit.com",
            "indices": [
              59,
              82
            ]
          }
        ]
      }
    },
    "protected": false,
    "followers_count": 1368,
    "friends_count": 364,
    "listed_count": 16,
    "created_at": "Wed Sep 25 19:52:28 +0000 2013",
    "favourites_count": 6411,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 1221,
    "lang": null,
    "status": {
      "created_at": "Wed Apr 15 05:52:39 +0000 2020",
      "id": 1250300986897268700,
      "id_str": "1250300986897268736",
      "text": "@satoshimuc ですよね！元気出るデジタル活用考えましょう！",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "satoshimuc",
            "name": "太田智@株式会社オフィス・ムック代表取締役",
            "id": 297765869,
            "id_str": "297765869",
            "indices": [
              0,
              11
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
      "in_reply_to_status_id": 1250286522957324300,
      "in_reply_to_status_id_str": "1250286522957324288",
      "in_reply_to_user_id": 297765869,
      "in_reply_to_user_id_str": "297765869",
      "in_reply_to_screen_name": "satoshimuc",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme5/bg.gif",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme5/bg.gif",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1243504116602527744/rqFGwlWy_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1243504116602527744/rqFGwlWy_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1905267835/1585013069",
    "profile_link_color": "FAB81E",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 1092375008280637400,
    "id_str": "1092375008280637440",
    "name": "安部泰洋",
    "screen_name": "abeyasu0912",
    "location": "東京 新宿区",
    "description": "株式会社フロムスクラッチ/CEO/「スマートデータ社会の実現」を目指しマーケティングプラットフォーム『b→dash』の開発に勤しんでおります/麻雀/筋トレ",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": false,
    "followers_count": 131,
    "friends_count": 36,
    "listed_count": 0,
    "created_at": "Mon Feb 04 10:51:12 +0000 2019",
    "favourites_count": 13,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 8,
    "lang": null,
    "status": {
      "created_at": "Mon Apr 08 14:31:12 +0000 2019",
      "id": 1115260811432190000,
      "id_str": "1115260811432189958",
      "text": "@folio_kai b→dashで分析して。。。",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "folio_kai",
            "name": "甲斐 真一郎",
            "id": 903950928318828500,
            "id_str": "903950928318828544",
            "indices": [
              0,
              10
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": 1115251088691613700,
      "in_reply_to_status_id_str": "1115251088691613696",
      "in_reply_to_user_id": 903950928318828500,
      "in_reply_to_user_id_str": "903950928318828544",
      "in_reply_to_screen_name": "folio_kai",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1092378975098232832/BxevY-Td_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1092378975098232832/BxevY-Td_normal.jpg",
    "profile_link_color": "1B95E0",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 882455030384664600,
    "id_str": "882455030384664577",
    "name": "エリンギ@b→dash",
    "screen_name": "fs_erngi",
    "location": "",
    "description": "#ViVi 公認インフルエンサー兼 #早稲女 を無事卒業しました。データマーケティングプラットフォーム\"b→dash\"を提供する #フロムスクラッチ というスタートアップの #マーケター をやってます。 #BtoB #データマーケティング #Tweetは個人の見解です #麺がすき",
    "url": "https://t.co/QLsneTP1La",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/QLsneTP1La",
            "expanded_url": "https://peing.net/ja/fs_erngi?event=0",
            "display_url": "peing.net/ja/fs_erngi?ev…",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": []
      }
    },
    "protected": false,
    "followers_count": 825,
    "friends_count": 154,
    "listed_count": 6,
    "created_at": "Wed Jul 05 04:24:09 +0000 2017",
    "favourites_count": 1677,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 364,
    "lang": null,
    "status": {
      "created_at": "Tue Apr 14 16:07:02 +0000 2020",
      "id": 1250093212636549000,
      "id_str": "1250093212636549120",
      "text": "@osamu1982 コロナが落ち着いたら、激辛マーケ部再開しましょ。。！",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "osamu1982",
            "name": "山本 長武 @激辛マーケ部🌶🌶",
            "id": 188452341,
            "id_str": "188452341",
            "indices": [
              0,
              10
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": 1250092828933288000,
      "in_reply_to_status_id_str": "1250092828933287940",
      "in_reply_to_user_id": 188452341,
      "in_reply_to_user_id_str": "188452341",
      "in_reply_to_screen_name": "osamu1982",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1115435661572464640/bIIe0vvx_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1115435661572464640/bIIe0vvx_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/882455030384664577/1501776551",
    "profile_link_color": "F58EA8",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 1312952514,
    "id_str": "1312952514",
    "name": "ふるかわ",
    "screen_name": "k_f_sci",
    "location": "",
    "description": "東京",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": true,
    "followers_count": 272,
    "friends_count": 329,
    "listed_count": 1,
    "created_at": "Fri Mar 29 07:43:25 +0000 2013",
    "favourites_count": 980,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 1260,
    "lang": null,
    "status": {
      "created_at": "Fri Mar 27 10:52:30 +0000 2020",
      "id": 1243491077308309500,
      "id_str": "1243491077308309504",
      "text": "@UmekoMy 辛辣でﾜﾛﾀ",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "UmekoMy",
            "name": "ｲﾄｳ",
            "id": 1266319164,
            "id_str": "1266319164",
            "indices": [
              0,
              8
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
      "in_reply_to_status_id": 1243168237845508000,
      "in_reply_to_status_id_str": "1243168237845508096",
      "in_reply_to_user_id": 1266319164,
      "in_reply_to_user_id_str": "1266319164",
      "in_reply_to_screen_name": "UmekoMy",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "C0DEED",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/3681318384/1ee6c500b04c1663c2e2d0c3eae68052_normal.jpeg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/3681318384/1ee6c500b04c1663c2e2d0c3eae68052_normal.jpeg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1312952514/1410422077",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 320236538,
    "id_str": "320236538",
    "name": "なぁこ",
    "screen_name": "nusanaak0",
    "location": "",
    "description": "しがにいます",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": true,
    "followers_count": 307,
    "friends_count": 335,
    "listed_count": 2,
    "created_at": "Sun Jun 19 15:14:44 +0000 2011",
    "favourites_count": 739,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 10558,
    "lang": null,
    "status": {
      "created_at": "Sun Mar 08 14:24:08 +0000 2020",
      "id": 1236658968790851600,
      "id_str": "1236658968790851585",
      "text": "RT @vcsh0: お宝音源久しぶりだね\nAttitude/Mrs. GREEN APPLE\n#二宮和也 #ベイスト https://t.co/jn9k6bYuFZ",
      "truncated": false,
      "entities": {
        "hashtags": [
          {
            "text": "二宮和也",
            "indices": [
              48,
              53
            ]
          },
          {
            "text": "ベイスト",
            "indices": [
              54,
              59
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [],
        "media": [
          {
            "id": 1236645175583072300,
            "id_str": "1236645175583072257",
            "indices": [
              60,
              83
            ],
            "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "url": "https://t.co/jn9k6bYuFZ",
            "display_url": "pic.twitter.com/jn9k6bYuFZ",
            "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
            "type": "photo",
            "sizes": {
              "small": {
                "w": 680,
                "h": 462,
                "resize": "fit"
              },
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "medium": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              },
              "large": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              }
            },
            "source_status_id": 1236645271892717600,
            "source_status_id_str": "1236645271892717568",
            "source_user_id": 1089078467088441300,
            "source_user_id_str": "1089078467088441344"
          }
        ]
      },
      "extended_entities": {
        "media": [
          {
            "id": 1236645175583072300,
            "id_str": "1236645175583072257",
            "indices": [
              60,
              83
            ],
            "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "url": "https://t.co/jn9k6bYuFZ",
            "display_url": "pic.twitter.com/jn9k6bYuFZ",
            "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
            "type": "video",
            "sizes": {
              "small": {
                "w": 680,
                "h": 462,
                "resize": "fit"
              },
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "medium": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              },
              "large": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              }
            },
            "source_status_id": 1236645271892717600,
            "source_status_id_str": "1236645271892717568",
            "source_user_id": 1089078467088441300,
            "source_user_id_str": "1089078467088441344",
            "video_info": {
              "aspect_ratio": [
                443,
                301
              ],
              "duration_millis": 140000,
              "variants": [
                {
                  "bitrate": 2176000,
                  "content_type": "video/mp4",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/886x602/p0y7D5KPYzMBH0K0.mp4?tag=10"
                },
                {
                  "content_type": "application/x-mpegURL",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/pl/H7MGg5QwgauP_J_B.m3u8?tag=10"
                },
                {
                  "bitrate": 256000,
                  "content_type": "video/mp4",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/396x270/-x1ZrOvNI6tA-qaK.mp4?tag=10"
                },
                {
                  "bitrate": 832000,
                  "content_type": "video/mp4",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/528x360/TkOXSieQJSnuC9hK.mp4?tag=10"
                }
              ]
            },
            "additional_media_info": {
              "monetizable": false
            }
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "created_at": "Sun Mar 08 13:29:43 +0000 2020",
        "id": 1236645271892717600,
        "id_str": "1236645271892717568",
        "text": "お宝音源久しぶりだね\nAttitude/Mrs. GREEN APPLE\n#二宮和也 #ベイスト https://t.co/jn9k6bYuFZ",
        "truncated": false,
        "entities": {
          "hashtags": [
            {
              "text": "二宮和也",
              "indices": [
                37,
                42
              ]
            },
            {
              "text": "ベイスト",
              "indices": [
                43,
                48
              ]
            }
          ],
          "symbols": [],
          "user_mentions": [],
          "urls": [],
          "media": [
            {
              "id": 1236645175583072300,
              "id_str": "1236645175583072257",
              "indices": [
                49,
                72
              ],
              "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "url": "https://t.co/jn9k6bYuFZ",
              "display_url": "pic.twitter.com/jn9k6bYuFZ",
              "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
              "type": "photo",
              "sizes": {
                "small": {
                  "w": 680,
                  "h": 462,
                  "resize": "fit"
                },
                "thumb": {
                  "w": 150,
                  "h": 150,
                  "resize": "crop"
                },
                "medium": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                },
                "large": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                }
              }
            }
          ]
        },
        "extended_entities": {
          "media": [
            {
              "id": 1236645175583072300,
              "id_str": "1236645175583072257",
              "indices": [
                49,
                72
              ],
              "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "url": "https://t.co/jn9k6bYuFZ",
              "display_url": "pic.twitter.com/jn9k6bYuFZ",
              "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
              "type": "video",
              "sizes": {
                "small": {
                  "w": 680,
                  "h": 462,
                  "resize": "fit"
                },
                "thumb": {
                  "w": 150,
                  "h": 150,
                  "resize": "crop"
                },
                "medium": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                },
                "large": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                }
              },
              "video_info": {
                "aspect_ratio": [
                  443,
                  301
                ],
                "duration_millis": 140000,
                "variants": [
                  {
                    "bitrate": 2176000,
                    "content_type": "video/mp4",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/886x602/p0y7D5KPYzMBH0K0.mp4?tag=10"
                  },
                  {
                    "content_type": "application/x-mpegURL",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/pl/H7MGg5QwgauP_J_B.m3u8?tag=10"
                  },
                  {
                    "bitrate": 256000,
                    "content_type": "video/mp4",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/396x270/-x1ZrOvNI6tA-qaK.mp4?tag=10"
                  },
                  {
                    "bitrate": 832000,
                    "content_type": "video/mp4",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/528x360/TkOXSieQJSnuC9hK.mp4?tag=10"
                  }
                ]
              },
              "additional_media_info": {
                "monetizable": false
              }
            }
          ]
        },
        "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 7793,
        "favorite_count": 26249,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "ja"
      },
      "is_quote_status": false,
      "retweet_count": 7793,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "C0DEED",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/810490396673392640/2iYF1FxX_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/810490396673392640/2iYF1FxX_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/320236538/1482070945",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  }
]
let sample_followers = [
  {
    "id": 742980947021303800,
    "id_str": "742980947021303808",
    "name": "【公式】 予約投稿・アカウント管理なら SocialDog (ソーシャルドッグ)",
    "screen_name": "SocialDog_JP",
    "location": "",
    "description": "Twitterアカウント運用ツール「SocialDog」公式アカウント／\n アップデート、障害情報をお知らせします。AutoScale, Inc.が運営しています。お問い合わせはサイト内チャットフォームよりお願いいたします！\niPhone/Androidアプリ:  https://t.co/ZGoLggbBlQ",
    "url": "https://t.co/3HbGgmdT2v",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/3HbGgmdT2v",
            "expanded_url": "https://social-dog.net/?utm_source=twitter&utm_medium=twitter&utm_campaign=socialdog_twitter_profile",
            "display_url": "social-dog.net/?utm_source=tw…",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": [
          {
            "url": "https://t.co/ZGoLggbBlQ",
            "expanded_url": "http://go.onelink.me/DKtw/twitter",
            "display_url": "go.onelink.me/DKtw/twitter",
            "indices": [
              133,
              156
            ]
          }
        ]
      }
    },
    "protected": false,
    "followers_count": 22794,
    "friends_count": 17629,
    "listed_count": 90,
    "created_at": "Wed Jun 15 07:23:56 +0000 2016",
    "favourites_count": 4703,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 3418,
    "lang": null,
    "status": {
      "created_at": "Tue Apr 14 04:43:01 +0000 2020",
      "id": 1249921075993067500,
      "id_str": "1249921075993067520",
      "text": "緊急メンテナンスは、13:40までに無事終了いたしました。\nご協力いただきましてありがとうございました。\n#SocialDog #SocialDog障害情報",
      "truncated": false,
      "entities": {
        "hashtags": [
          {
            "text": "SocialDog",
            "indices": [
              53,
              63
            ]
          },
          {
            "text": "SocialDog障害情報",
            "indices": [
              64,
              78
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": []
      },
      "source": "<a href=\"https://social-dog.net/\" rel=\"nofollow\">SocialDog for Twitter</a>",
      "in_reply_to_status_id": 1249918048649138200,
      "in_reply_to_status_id_str": "1249918048649138177",
      "in_reply_to_user_id": 742980947021303800,
      "in_reply_to_user_id_str": "742980947021303808",
      "in_reply_to_screen_name": "SocialDog_JP",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 2,
      "favorite_count": 4,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1196728732305637376/hpCbW6dc_normal.png",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1196728732305637376/hpCbW6dc_normal.png",
    "profile_link_color": "E0542F",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 846864988417409000,
    "id_str": "846864988417409025",
    "name": "ジョン（サラリーマン大学生・慶應通信経済71期生）",
    "screen_name": "keiotsushin71th",
    "location": "⬇︎通信制高校・大学生向けキャリア支援サイト「通キャリ！」",
    "description": "日大中退→起業失敗→24歳無職→ #通信制大学 入学&高卒として就活→教育系ITベンチャーマナボでインターン→25歳の新卒としてマイナビ（医療福祉保育領域）→コンサル/27歳/45単位/時々高校でキャリア教育授業のお手伝い/音大生のキャリア支援/#そうだんドットミー アドバイザー / 通信生進路支援サイト #通キャリ！",
    "url": "https://t.co/FzHVgjCSV6",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/FzHVgjCSV6",
            "expanded_url": "http://bit.ly/2HGGTHS",
            "display_url": "bit.ly/2HGGTHS",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": []
      }
    },
    "protected": false,
    "followers_count": 931,
    "friends_count": 1291,
    "listed_count": 7,
    "created_at": "Tue Mar 28 23:22:02 +0000 2017",
    "favourites_count": 3589,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 1276,
    "lang": null,
    "status": {
      "created_at": "Tue Apr 14 16:31:53 +0000 2020",
      "id": 1250099467174310000,
      "id_str": "1250099467174309889",
      "text": "昨年、進路に関する授業をやらせて頂いた埼玉県のとある定時制高校に、本年10月頃にお伺いし、全校生徒120人の前でお話しする機会を頂きました😌\n\nとっても恐縮＆光栄＆コロナ落ち着くか心配…😂\n\n何を話そうかな☺️\n\n仕事も通信制大学… https://t.co/UxwqVhOOw2",
      "truncated": true,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https://t.co/UxwqVhOOw2",
            "expanded_url": "https://twitter.com/i/web/status/1250099467174309889",
            "display_url": "twitter.com/i/web/status/1…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 5,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "F5F8FA",
    "profile_background_image_url": null,
    "profile_background_image_url_https": null,
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1245022636364587008/C1KJblmi_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1245022636364587008/C1KJblmi_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/846864988417409025/1567488960",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 1905267835,
    "id_str": "1905267835",
    "name": "金田謙太 / youknit",
    "screen_name": "kenta_crape",
    "location": "Sapporo→Florida→Tokyo→",
    "description": "\"まだ気づかない価値創り出す\" withly代表┃チームの温度を上げるプラットフォーム『youknit（ユニット）』(https://t.co/osCm67HPkA)の開発と、コンセプトマーケティング事業を行っています。┃札幌出身⇛フロリダ大学マーケ卒⇛DeNA⇛SHOWROOM(海外展開)⇛withly創業もうすぐ3期目",
    "url": "https://t.co/QHhPWoWir9",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/QHhPWoWir9",
            "expanded_url": "https://thisis-me.com/profile/1",
            "display_url": "thisis-me.com/profile/1",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": [
          {
            "url": "https://t.co/osCm67HPkA",
            "expanded_url": "http://you-knit.com",
            "display_url": "you-knit.com",
            "indices": [
              59,
              82
            ]
          }
        ]
      }
    },
    "protected": false,
    "followers_count": 1368,
    "friends_count": 364,
    "listed_count": 16,
    "created_at": "Wed Sep 25 19:52:28 +0000 2013",
    "favourites_count": 6411,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 1221,
    "lang": null,
    "status": {
      "created_at": "Wed Apr 15 05:52:39 +0000 2020",
      "id": 1250300986897268700,
      "id_str": "1250300986897268736",
      "text": "@satoshimuc ですよね！元気出るデジタル活用考えましょう！",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "satoshimuc",
            "name": "太田智@株式会社オフィス・ムック代表取締役",
            "id": 297765869,
            "id_str": "297765869",
            "indices": [
              0,
              11
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
      "in_reply_to_status_id": 1250286522957324300,
      "in_reply_to_status_id_str": "1250286522957324288",
      "in_reply_to_user_id": 297765869,
      "in_reply_to_user_id_str": "297765869",
      "in_reply_to_screen_name": "satoshimuc",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme5/bg.gif",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme5/bg.gif",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1243504116602527744/rqFGwlWy_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1243504116602527744/rqFGwlWy_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1905267835/1585013069",
    "profile_link_color": "FAB81E",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 1092375008280637400,
    "id_str": "1092375008280637440",
    "name": "安部泰洋",
    "screen_name": "abeyasu0912",
    "location": "東京 新宿区",
    "description": "株式会社フロムスクラッチ/CEO/「スマートデータ社会の実現」を目指しマーケティングプラットフォーム『b→dash』の開発に勤しんでおります/麻雀/筋トレ",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": false,
    "followers_count": 131,
    "friends_count": 36,
    "listed_count": 0,
    "created_at": "Mon Feb 04 10:51:12 +0000 2019",
    "favourites_count": 13,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 8,
    "lang": null,
    "status": {
      "created_at": "Mon Apr 08 14:31:12 +0000 2019",
      "id": 1115260811432190000,
      "id_str": "1115260811432189958",
      "text": "@folio_kai b→dashで分析して。。。",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "folio_kai",
            "name": "甲斐 真一郎",
            "id": 903950928318828500,
            "id_str": "903950928318828544",
            "indices": [
              0,
              10
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": 1115251088691613700,
      "in_reply_to_status_id_str": "1115251088691613696",
      "in_reply_to_user_id": 903950928318828500,
      "in_reply_to_user_id_str": "903950928318828544",
      "in_reply_to_screen_name": "folio_kai",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1092378975098232832/BxevY-Td_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1092378975098232832/BxevY-Td_normal.jpg",
    "profile_link_color": "1B95E0",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 882455030384664600,
    "id_str": "882455030384664577",
    "name": "エリンギ@b→dash",
    "screen_name": "fs_erngi",
    "location": "",
    "description": "#ViVi 公認インフルエンサー兼 #早稲女 を無事卒業しました。データマーケティングプラットフォーム\"b→dash\"を提供する #フロムスクラッチ というスタートアップの #マーケター をやってます。 #BtoB #データマーケティング #Tweetは個人の見解です #麺がすき",
    "url": "https://t.co/QLsneTP1La",
    "entities": {
      "url": {
        "urls": [
          {
            "url": "https://t.co/QLsneTP1La",
            "expanded_url": "https://peing.net/ja/fs_erngi?event=0",
            "display_url": "peing.net/ja/fs_erngi?ev…",
            "indices": [
              0,
              23
            ]
          }
        ]
      },
      "description": {
        "urls": []
      }
    },
    "protected": false,
    "followers_count": 825,
    "friends_count": 154,
    "listed_count": 6,
    "created_at": "Wed Jul 05 04:24:09 +0000 2017",
    "favourites_count": 1677,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 364,
    "lang": null,
    "status": {
      "created_at": "Tue Apr 14 16:07:02 +0000 2020",
      "id": 1250093212636549000,
      "id_str": "1250093212636549120",
      "text": "@osamu1982 コロナが落ち着いたら、激辛マーケ部再開しましょ。。！",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "osamu1982",
            "name": "山本 長武 @激辛マーケ部🌶🌶",
            "id": 188452341,
            "id_str": "188452341",
            "indices": [
              0,
              10
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": 1250092828933288000,
      "in_reply_to_status_id_str": "1250092828933287940",
      "in_reply_to_user_id": 188452341,
      "in_reply_to_user_id_str": "188452341",
      "in_reply_to_screen_name": "osamu1982",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 1,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "000000",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/1115435661572464640/bIIe0vvx_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1115435661572464640/bIIe0vvx_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/882455030384664577/1501776551",
    "profile_link_color": "F58EA8",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "has_extended_profile": true,
    "default_profile": false,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 1312952514,
    "id_str": "1312952514",
    "name": "ふるかわ",
    "screen_name": "k_f_sci",
    "location": "",
    "description": "東京",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": true,
    "followers_count": 272,
    "friends_count": 329,
    "listed_count": 1,
    "created_at": "Fri Mar 29 07:43:25 +0000 2013",
    "favourites_count": 980,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 1260,
    "lang": null,
    "status": {
      "created_at": "Fri Mar 27 10:52:30 +0000 2020",
      "id": 1243491077308309500,
      "id_str": "1243491077308309504",
      "text": "@UmekoMy 辛辣でﾜﾛﾀ",
      "truncated": false,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [
          {
            "screen_name": "UmekoMy",
            "name": "ｲﾄｳ",
            "id": 1266319164,
            "id_str": "1266319164",
            "indices": [
              0,
              8
            ]
          }
        ],
        "urls": []
      },
      "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
      "in_reply_to_status_id": 1243168237845508000,
      "in_reply_to_status_id_str": "1243168237845508096",
      "in_reply_to_user_id": 1266319164,
      "in_reply_to_user_id_str": "1266319164",
      "in_reply_to_screen_name": "UmekoMy",
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 0,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "C0DEED",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/3681318384/1ee6c500b04c1663c2e2d0c3eae68052_normal.jpeg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/3681318384/1ee6c500b04c1663c2e2d0c3eae68052_normal.jpeg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1312952514/1410422077",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  },
  {
    "id": 320236538,
    "id_str": "320236538",
    "name": "なぁこ",
    "screen_name": "nusanaak0",
    "location": "",
    "description": "しがにいます",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": true,
    "followers_count": 307,
    "friends_count": 335,
    "listed_count": 2,
    "created_at": "Sun Jun 19 15:14:44 +0000 2011",
    "favourites_count": 739,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 10558,
    "lang": null,
    "status": {
      "created_at": "Sun Mar 08 14:24:08 +0000 2020",
      "id": 1236658968790851600,
      "id_str": "1236658968790851585",
      "text": "RT @vcsh0: お宝音源久しぶりだね\nAttitude/Mrs. GREEN APPLE\n#二宮和也 #ベイスト https://t.co/jn9k6bYuFZ",
      "truncated": false,
      "entities": {
        "hashtags": [
          {
            "text": "二宮和也",
            "indices": [
              48,
              53
            ]
          },
          {
            "text": "ベイスト",
            "indices": [
              54,
              59
            ]
          }
        ],
        "symbols": [],
        "user_mentions": [],
        "urls": [],
        "media": [
          {
            "id": 1236645175583072300,
            "id_str": "1236645175583072257",
            "indices": [
              60,
              83
            ],
            "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "url": "https://t.co/jn9k6bYuFZ",
            "display_url": "pic.twitter.com/jn9k6bYuFZ",
            "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
            "type": "photo",
            "sizes": {
              "small": {
                "w": 680,
                "h": 462,
                "resize": "fit"
              },
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "medium": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              },
              "large": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              }
            },
            "source_status_id": 1236645271892717600,
            "source_status_id_str": "1236645271892717568",
            "source_user_id": 1089078467088441300,
            "source_user_id_str": "1089078467088441344"
          }
        ]
      },
      "extended_entities": {
        "media": [
          {
            "id": 1236645175583072300,
            "id_str": "1236645175583072257",
            "indices": [
              60,
              83
            ],
            "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
            "url": "https://t.co/jn9k6bYuFZ",
            "display_url": "pic.twitter.com/jn9k6bYuFZ",
            "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
            "type": "video",
            "sizes": {
              "small": {
                "w": 680,
                "h": 462,
                "resize": "fit"
              },
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "medium": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              },
              "large": {
                "w": 886,
                "h": 602,
                "resize": "fit"
              }
            },
            "source_status_id": 1236645271892717600,
            "source_status_id_str": "1236645271892717568",
            "source_user_id": 1089078467088441300,
            "source_user_id_str": "1089078467088441344",
            "video_info": {
              "aspect_ratio": [
                443,
                301
              ],
              "duration_millis": 140000,
              "variants": [
                {
                  "bitrate": 2176000,
                  "content_type": "video/mp4",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/886x602/p0y7D5KPYzMBH0K0.mp4?tag=10"
                },
                {
                  "content_type": "application/x-mpegURL",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/pl/H7MGg5QwgauP_J_B.m3u8?tag=10"
                },
                {
                  "bitrate": 256000,
                  "content_type": "video/mp4",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/396x270/-x1ZrOvNI6tA-qaK.mp4?tag=10"
                },
                {
                  "bitrate": 832000,
                  "content_type": "video/mp4",
                  "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/528x360/TkOXSieQJSnuC9hK.mp4?tag=10"
                }
              ]
            },
            "additional_media_info": {
              "monetizable": false
            }
          }
        ]
      },
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "created_at": "Sun Mar 08 13:29:43 +0000 2020",
        "id": 1236645271892717600,
        "id_str": "1236645271892717568",
        "text": "お宝音源久しぶりだね\nAttitude/Mrs. GREEN APPLE\n#二宮和也 #ベイスト https://t.co/jn9k6bYuFZ",
        "truncated": false,
        "entities": {
          "hashtags": [
            {
              "text": "二宮和也",
              "indices": [
                37,
                42
              ]
            },
            {
              "text": "ベイスト",
              "indices": [
                43,
                48
              ]
            }
          ],
          "symbols": [],
          "user_mentions": [],
          "urls": [],
          "media": [
            {
              "id": 1236645175583072300,
              "id_str": "1236645175583072257",
              "indices": [
                49,
                72
              ],
              "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "url": "https://t.co/jn9k6bYuFZ",
              "display_url": "pic.twitter.com/jn9k6bYuFZ",
              "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
              "type": "photo",
              "sizes": {
                "small": {
                  "w": 680,
                  "h": 462,
                  "resize": "fit"
                },
                "thumb": {
                  "w": 150,
                  "h": 150,
                  "resize": "crop"
                },
                "medium": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                },
                "large": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                }
              }
            }
          ]
        },
        "extended_entities": {
          "media": [
            {
              "id": 1236645175583072300,
              "id_str": "1236645175583072257",
              "indices": [
                49,
                72
              ],
              "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1236645175583072257/pu/img/5qalaJCBHkLfmNNO.jpg",
              "url": "https://t.co/jn9k6bYuFZ",
              "display_url": "pic.twitter.com/jn9k6bYuFZ",
              "expanded_url": "https://twitter.com/vcsh0/status/1236645271892717568/video/1",
              "type": "video",
              "sizes": {
                "small": {
                  "w": 680,
                  "h": 462,
                  "resize": "fit"
                },
                "thumb": {
                  "w": 150,
                  "h": 150,
                  "resize": "crop"
                },
                "medium": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                },
                "large": {
                  "w": 886,
                  "h": 602,
                  "resize": "fit"
                }
              },
              "video_info": {
                "aspect_ratio": [
                  443,
                  301
                ],
                "duration_millis": 140000,
                "variants": [
                  {
                    "bitrate": 2176000,
                    "content_type": "video/mp4",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/886x602/p0y7D5KPYzMBH0K0.mp4?tag=10"
                  },
                  {
                    "content_type": "application/x-mpegURL",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/pl/H7MGg5QwgauP_J_B.m3u8?tag=10"
                  },
                  {
                    "bitrate": 256000,
                    "content_type": "video/mp4",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/396x270/-x1ZrOvNI6tA-qaK.mp4?tag=10"
                  },
                  {
                    "bitrate": 832000,
                    "content_type": "video/mp4",
                    "url": "https://video.twimg.com/ext_tw_video/1236645175583072257/pu/vid/528x360/TkOXSieQJSnuC9hK.mp4?tag=10"
                  }
                ]
              },
              "additional_media_info": {
                "monetizable": false
              }
            }
          ]
        },
        "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 7793,
        "favorite_count": 26249,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "ja"
      },
      "is_quote_status": false,
      "retweet_count": 7793,
      "favorite_count": 0,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "ja"
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "C0DEED",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/810490396673392640/2iYF1FxX_normal.jpg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/810490396673392640/2iYF1FxX_normal.jpg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/320236538/1482070945",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": true,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  }
]

saveToFfs("test2",sample_follows,sample_followers)
// 引数: オブジェクトの配列、オブジェクトの配列、String
 async function update (userID, token, tokenSecret) {
  // ここにffsの関数入れる
  const client = twitter.initWithToken(token, tokenSecret);
  let followerList = [];
  let followList = [];
  const options = {};
  options.userID = userID;
  options.count = 200;
  options.cursor = -1;
  try {
    do {
      await client.get('followers/list', options)
        .then((response) => {
          followerList = followerList.concat(response.users);
          options.cursor = response.next_cursor_str;
        });
    } while (options.cursor != 0);

    // カーソルをリセット
    options.cursor = -1;

    do {
      await client.get('friends/list', options)
        .then((response) => {
          followList = followList.concat(response.users);
          options.cursor = response.next_cursor_str;
        });
    } while (options.cursor != 0);

    saveToFfs(userID, followList, followerList);
  } catch (err) {
    console.log(err);
  }
}

function get (userID, start_date, end_date) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);
  start_date = new Date(start_date);
  end_date = new Date(end_date);

  const result = {
    follows_count: {},
    new_follows_count: {},
    deleted_follows_count: {},
    followers_count: {},
    new_followers_count: {},
    deleted_followers_count: {},
    ff_ratio: {},
  };
  if (fs.existsSync(filename)) {
    console.log('json file exist');
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const key = Object.keys(jsonObject);
    // １日ずつ処理
    for (var item of key) {
      if (typeof jsonObject[item] === 'object') {
         var date = new Date(item);
        if (start_date <= date && date <= end_date) {
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'follows_count')) {
            result.follows_count[item] = jsonObject[item].follows_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'new_follows_count')) {
            result.new_follows_count[item] = jsonObject[item].new_follows_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'deleted_follows_count')) {
            result.deleted_follows_count[item] = jsonObject[item].deleted_follows_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'followers_count')) {
            result.followers_count[item] = jsonObject[item].followers_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'new_followers_count')) {
            result.new_followers_count[item] = jsonObject[item].new_followers_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'deleted_followers_count')) {
            result.deleted_followers_count[item] = jsonObject[item].deleted_followers_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'ff_ratio')) {
            result.ff_ratio[item] = jsonObject[item].ff_ratio;
          }
        }
      }
    }
  } else {
    console.log('json file does not exist');
  }
  return result;
}


// ffsに保存するようの関数
function saveToFfs(userID, followsObject, followersObject) {
  const followsCount = followsObject.length;
  const followersCount = followersObject.length;

  // 実行日付を取得
  const date = new Date();
  const today = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;

  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  let jsonObject = {};
  let short_follows = [];
  let short_followers = [];

  // followsObjectとfollowersObjectを削る

  for(item of followsObject){
    let tmp = {
      "id":item.id,
      "id_str":item.id_str,
      "name":item.name,
      "screen_name":item.screen_name,
      "description":item.description,
      "followers_count":item.followers_count,
      "friends_count":item.friends_count,
      "listed_count":item.listed_count,
      "created_at":item.created_at,
      "favourites_count":item.favourites_count,
      "statuses_count":item.statuses_count,
      "status":{
        "created_at":item.status.created_at,
        "id":item.status.id,
        "id_str":item.status.id_str,
        "text":item.status.text
      },
      "profile_image_url":item.profile_image_url
    }
    short_follows.push(tmp)
  }
  for(item of followersObject){
    let tmp = {
      "id":item.id,
      "id_str":item.id_str,
      "name":item.name,
      "screen_name":item.screen_name,
      "description":item.description,
      "followers_count":item.followers_count,
      "friends_count":item.friends_count,
      "listed_count":item.listed_count,
      "created_at":item.created_at,
      "favourites_count":item.favourites_count,
      "statuses_count":item.statuses_count,
      "status":{
        "created_at":item.status.created_at,
        "id":item.status.id,
        "id_str":item.status.id_str,
        "text":item.status.text
      },
      "profile_image_url":item.profile_image_url
    }
    short_followers.push(tmp)
  }

  // console.log(short_follows);

  // そのユーザーのJsonファイルがあるかの確認xx
  if (fs.existsSync(filename)) {
    console.log('json file exist');
    // jsonから日付取得,今日の日付のデータがあるかの確認
    var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const k = Object.keys(obj);

    if (k.indexOf(today) === -1) {
      // 今日のデータがない場合には、今日のデータ＆前日との比較データを追記
      console.log("this is today's first data");
      const o = (Object.values(obj)).slice(-1)[0].follows;
      var diff_follow = diff.ObjectArrays(o, short_follows);
      const o2 = (Object.values(obj)).slice(-1)[0].followers;
      var diff_follower = diff.ObjectArrays(o2, short_followers);

      const ratio = (Math.round((followersCount / followsCount) * 100)) / 100;
      jsonObject = obj;

      jsonObject[today] = {
        follows: short_follows,
        new_follows: diff_follow.onlyObjArr2,
        deleted_follows: diff_follow.onlyObjArr1,
        followers: short_followers,
        new_followers: diff_follower.onlyObjArr2,
        deleted_followers: diff_follower.onlyObjArr1,
        follows_count: followsCount,
        new_follows_count: diff_follow.onlyObjArr2.length,
        deleted_follows_count: diff_follow.onlyObjArr1.length,
        followers_count: followersCount,
        new_followers_count: diff_follower.onlyObjArr2.length,
        deleted_followers_count: diff_follower.onlyObjArr1.length,
        ff_ratio: ratio.toFixed(2),
      };
    } else { // 今日のデータがあるときは何もしない
      console.log("today's data is already existing.");
      jsonObject = obj;
    }
  } else { // ユーザーのJsonファイルがないときは新しく作成してデータ追加
    const ratio = (Math.round((followersCount / followsCount) * 100)) / 100;

    jsonObject.created_date = today;
    jsonObject[today] = {
      follows: short_follows,
      followers: short_followers,
      follows_count: followsCount,
      followers_count: followersCount,
      ff_ratio: ratio.toFixed(2),
    };
  }

  saveToJson(filename, jsonObject);
}

// 書き出し用の関数
function saveToJson(filename, object) {
  fs.writeFile(filename, JSON.stringify(object), (err) => {
    // 書き出しに失敗した場合
    if (err) {
      console.log(`エラーが発生しました。${err}`);
      throw err;
    }
    // 書き出しに成功した場合
    else {
      console.log('ファイルが正常に書き出しされました');
    }
  });
}



module.exports = {
  get: get,
  update: update,
};
