# 🎬 Movie App - React Native

A modern, feature-rich movie discovery application built with React Native and Expo, featuring trending movies, search functionality, user authentication, and a beautiful UI powered by NativeWind (Tailwind CSS).

## ✨ Features

- **🎭 Movie Discovery**: Browse trending and latest movies from TMDB API
- **🔍 Advanced Search**: Search through 300+ movies with real-time results
- **👤 User Authentication**: Secure sign-in/sign-up with JWT tokens
- **💾 Save Favorites**: Save and manage your favorite movies
- **📱 Cross-Platform**: Works on iOS, Android, and Web
- **🎨 Modern UI**: Beautiful, responsive design with NativeWind styling
- **⚡ Performance**: Optimized with React Native Reanimated and Expo

## 🚀 Tech Stack

### Frontend

- **React Native** 0.79.6 - Cross-platform mobile development
- **Expo** 53.0.22 - Development platform and tools
- **TypeScript** - Type-safe development
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based routing system
- **React Native Reanimated** - Smooth animations

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing

### APIs & Services

- **TMDB API** - Movie database and information
- **Appwrite** - Backend-as-a-Service integration

## 📱 Screenshots

The app features a beautiful, modern interface with:

- Home screen with trending and latest movies
- Search functionality with real-time results
- User profile and authentication screens
- Movie detail pages with comprehensive information
- Saved movies collection

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd react-native/movie-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Run on your preferred platform**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 🔧 Backend Setup

1. **Navigate to server directory**

   ```bash
   cd ../server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
movie-app/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab navigation
│   └── movies/            # Movie detail pages
├── components/             # Reusable UI components
├── services/               # API and external services
├── constants/              # App constants and utilities
├── interfaces/             # TypeScript type definitions
├── assets/                 # Images, fonts, and icons
└── tailwind.config.js     # NativeWind configuration

server/
├── controllers/            # Route controllers
├── models/                 # Database models
├── routes/                 # API routes
├── middleware.js           # Custom middleware
└── server.js              # Main server file
```

## 🎯 Key Components

- **AuthContext**: Manages user authentication state
- **MovieCard**: Displays movie information in cards
- **SearchBar**: Handles movie search functionality
- **TrendingMovies**: Shows trending movies carousel
- **LatestMovies**: Displays latest movie releases
- **ProfileCard**: User profile information display

## 🔌 API Integration

The app integrates with:

- **TMDB API**: For movie data, trending movies, and search
- **Custom Backend**: For user authentication and data persistence
- **Appwrite**: For additional backend services

## 🎨 Styling

- **NativeWind**: Tailwind CSS for React Native
- **Custom Components**: Beautiful, reusable UI components
- **Responsive Design**: Optimized for different screen sizes
- **Modern UI**: Clean, intuitive user interface

## 🚀 Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint for code quality

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android
- ✅ Web (React Native Web)

## 🔐 Authentication

The app features a complete authentication system:

- User registration and login
- JWT token-based authentication
- Secure password handling with bcrypt
- Protected routes and user sessions

## 🎬 Movie Features

- Browse trending movies
- Search through movie database
- View detailed movie information
- Save favorite movies
- Track search history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) community for the excellent framework
- [NativeWind](https://www.nativewind.dev/) for bringing Tailwind CSS to React Native

## 📞 Support

If you have any questions or need help, please open an issue in the repository or contact the development team.

---

**Made with ❤️ using React Native and Expo**
