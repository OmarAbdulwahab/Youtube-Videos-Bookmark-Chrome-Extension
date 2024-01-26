(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];

  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime),
    };

    currentVideoBookmarks = await fetchBookmarks();

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter(
        (b) => b.time != value
      );
      chrome.storage.sync.set({
        [currentVideo]: JSON.stringify(currentVideoBookmarks),
      });

      response(currentVideoBookmarks);
    }
  });

  newVideoLoaded();
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};
/*
(() => {
  let youtubeLeftControls, youtubePlayer; // for accessing the controls and the youtube player to manipulate them
  let currentVideo = "";
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter(
        (b) => b.time != value
      );
      chrome.storage.sync.set({
        [currentVideo]: JSON.stringify(currentVideoBookmarks),
      });

      response(currentVideoBookmarks);
    }
  });

  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    // console.log(bookmarkBtnExists);
    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    // const description = `Bookmark at ${getTime(currentTime)}`;
    const newBookmark = {
      time: currentTime,
      //   desc: `Bookmark at ${getTime(currentTime)}`,
      desc: "Bookmark at " + getTime(currentTime),
      //   desc: description,
    };
    console.log(newBookmark);
    // console.log(getTime(currentTime));

    currentVideoBookmarks = await fetchBookmarks();

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };

  newVideoLoaded();
})();

const getTime = (t) => {
  let date = new Date(0);
  date.setSeconds(1);

  //   return date.toISOString().substr(11, 0);
  return date.toISOString().substring(11, 19);
};

*/

// (() => {
//     let youtubeLeftControls, youtubePlayer;
//     let currentVideo = "";
//     let currentVideoBookmarks = [];

//     chrome.runtime.onMessage.addListener((obj, sender, response) => {
//         const { type, value, videoId } = obj;

//         if (type === "NEW") {
//             currentVideo = videoId;
//             newVideoLoaded();
//         }
//     });

//     const newVideoLoaded = () => {
//         const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
//         console.log(bookmarkBtnExists);

//         if (!bookmarkBtnExists) {
//             const bookmarkBtn = document.createElement("img");

//             bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
//             bookmarkBtn.className = "ytp-button " + "bookmark-btn";
//             bookmarkBtn.title = "Click to bookmark current timestamp";

//             youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
//             youtubePlayer = document.getElementsByClassName("video-stream")[0];

//             youtubeLeftControls.append(bookmarkBtn);
//             bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
//         }
//     }

//     const addNewBookmarkEventHandler = () => {
//         const currentTime = youtubePlayer.currentTime;
//         const newBookmark = {
//             time: currentTime,
//             desc: "Bookmark at " + getTime(currentTime),
//         };
//         console.log(newBookmark);

//         chrome.storage.sync.set({
//             [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
//         });
//     }

//     newVideoLoaded();
// })();

// const getTime = t => {
//     var date = new Date(0);
//     date.setSeconds(1);

//     return date.toISOString().substr(11, 0);
// }
