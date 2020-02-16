importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyC_8WxLr5xragQaTi0oUYxZurz3YHFOXnY",
    projectId: "enflora-bd52d",
    messagingSenderId: "5020590411",
    appId: "1:5020590411:web:4f8f60dbf0e4a29312c8ce"
});

const messaging = firebase.messaging();