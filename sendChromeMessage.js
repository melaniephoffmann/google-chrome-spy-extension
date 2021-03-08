export default (payload) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, (response) => {
      if (response) {
        resolve(response);
      } else {
        reject("browserAction not open");
      }
    });
  });
};
