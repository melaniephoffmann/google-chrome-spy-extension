

// chrome.runtime.sendMessage({
//   url: window.location.href,
// });

chrome.runtime.sendMessage({
  url: window.location.href,
});

console.log(window.location.hostname, 'CONSOLE:LOG:HOSTNAME')
console.log(window.location.host, 'CONSOLE:LOG:HOSTNAME')
console.log(window.location.href, 'CONSOLE:LOG:HOSTNAME')
// var port = chrome.extension.connect({
//   name: "Sample Communication",
// });
// port.postMessage("Hi BackGround");
// port.onMessage.addListener(function (msg) {


//   msg.forEach(function (msg) {
//     console.log("message recieved_" + msg);
//     const div = document.createElement("p");
//     div.textContent = `${msg}`;
//     document.body.append(div);
   
//   });
// });