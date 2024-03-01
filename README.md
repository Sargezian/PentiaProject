# PentiaProject
This is a simple chat application that includes login functionality and the possibility to join some predefined chat
rooms.

The app was developed using Google Firebase, React Native CLI for the framework & TypeScript as the main Programming Language. 

# Requirements

### Splash Screen - Accepttest:
- [x] As a user I would like a nice and clean splash screen while the application loads.
- [x] Splash loads while the application is loading up.  
- [x] When finish next screen should fade in. 
- [x] A. If you are logged in, go to Chat rooms
- [x] B. If you are not logged in, go to Login screen
 
### Login screen - Accepttest:
- [x] As a user I would like to be able to login using my social login accounts.
- [x] A. Facebook
- [x] B. Google

### Chat rooms - Accepttest:
- [x] As a user I would like to be shown a list of available rooms. The list is sorted by newest message.
- [x] A list is shown with the name and a short description of each room.
- [x] Each row have a chevron icon to the right indicating i can press.
- [x] The list is sorted by newest message. 
- [ ] I can pull to refresh to reload the list.
- [x] Pressing a room takes me to the send and receive screen

### Send and receive messages - Accepttest:
- [x] As a user I would like to be able to send and receive messages inside a chat room.
- [x] Last 50 messages is loaded when chat room is opened.
- [ ] Scroll to load more messages. 
- [x] When a message is received it is automatically added to the list. 
- [x] An input field at the bottom of the view should be shown. 
- [x] A. When pressed the keyboard opens.
- [x] B. When message entered and user presses “Send” / “Enter” the message is sent and added to the list.
- [x] A message consists of: Avatar of sender, Name of sender, Message date & Message text. 

### Push functionality - Accepttest:
- [ ] As a user I would like to receive a push message when a new message is added to a room that I have participated in.
- [x] When i write a message inside a room, then i am asked if i want to have notifications from that room. 
- [ ] Every time someone writes a message in the room, a push message is sent to me. 
- [ ] When the user presses a push message, he or she should be taken directly to the room/message (using deep links).

### Upload of images to chat room - Accepttest:
- [x] As a user I would like to be able to upload an image to a chat room.
- [x] I can upload image from camera.  
- [x] I can upload image from phone gallery. 
- [x] Image is shown in the chat room in the same flow as messages. 

# Screenshots

### App Icons
![assets/READMEScreenshots/AppIcon1.png](assets/READMEScreenshots/AppIcon1.png)
![assets/READMEScreenshots/AppIcon2.png](assets/READMEScreenshots/AppIcon2.png)

### Splash Screen
![assets/READMEScreenshots/SplashScreen.png](assets/READMEScreenshots/SplashScreen.png)

### Login
![assets/READMEScreenshots/Login.png](assets/READMEScreenshots/Login.png)

### Facebook/Google Login
![assets/READMEScreenshots/FaceGoogle.png](assets/READMEScreenshots/FaceGoogle.png)

### ChatRoom
![assets/READMEScreenshots/ChatRoom.png](assets/READMEScreenshots/ChatRoom.png)

### Notification
![assets/READMEScreenshots/Notification.png](assets/READMEScreenshots/Notification.png)

### Send Receive Messages
![assets/READMEScreenshots/SendReceive.png](assets/READMEScreenshots/SendReceive.png)

# Libraries

### @react-native-async-storage/async-storage
- Used to store user userInfo on the device & remember users, so that they can log in automatically after splashscreen.
### @react-native-firebase/app
- Used to enable firebase services
### @react-native-firebase/auth @react-native-google-signin/google-signin
### react-native-fbsdk-next
- Used for login authentication though firebase for Facebook and Google login
### @react-native-firebase/database
- Used to store messages by the use of Firebase Realtime Database.
### @react-native-firebase/storage
- Used to store images that was sent in the chatrooms into Firebase Cloud Storage
### @react-navigation/native @react-navigation/native @react-navigation/stack
- Used to for navigation in the app @types/react-native
- Used for TypeScript react-native-image-crop-picker
- Used for selecting images from library or camera
### react-native-splash-screen
- Used for splash-screen functionality
