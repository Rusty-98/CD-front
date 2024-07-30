# Code Discuss

[![Code Discuss Logo](https://cd-front-xi.vercel.app/favicon.ico)](https://cd-front-xi.vercel.app/)

**Code Discuss** is a platform for real-time collaborative code editing with integrated voice chat features. It supports multiple programming languages, enabling seamless discussions and collaboration on code in a modern, responsive environment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- 🔄 **Real-time Collaborative Editing**: Work on code together in real-time.
- 🎙️ **Voice Chat**: Communicate with collaborators via voice chat.
- 🌐 **Multi-language Support**: Discuss and edit code in various programming languages.
- 🎨 **Syntax Highlighting**: Improved code readability with syntax highlighting.
- 🔒 **User Authentication**: Secure user registration and login.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Voice Chat**: WebRTC

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/codediscuss.git
2. **Navigate to the project directory:**

   ```bash
   cd codediscuss
3. **Install backend dependencies:**

   ```bash
   cd server
   npm install

4. **Install frontend dependencies:**
   
   ```bash
   cd ../client
   npm install

5. **Set up environment variables:**

Create a .env file in the server directory and add the following:

   ```bash
   MONGO_URI=your_mongodb_uri
