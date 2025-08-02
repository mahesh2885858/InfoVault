# InfoVault

A secure and user-friendly Android application for storing your sensitive information like card details and passwords, built with React Native.

## Features

- 🔐 **Secure Storage**: Safely store your card details and passwords
- 🎨 **Pleasant UI**: Modern and intuitive user interface using Eva Design
- 📱 **Mobile-First**: Optimized for Android devices
- 📋 **Clipboard Integration**: Easy copy-paste functionality
- 🧭 **Smooth Navigation**: Drawer and stack navigation for seamless user experience
- 💾 **Local Storage**: Secure local data persistence with AsyncStorage

## Technologies Used

---

- **React Native** - Cross-platform mobile development
- **React Navigation** - Navigation library with drawer and stack navigators
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Icon library
- **Clipboard** - Copy-paste functionality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Java Development Kit (JDK)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd InfoVault
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. For Android development, ensure you have Android Studio set up with proper SDK and emulator.

### Running the App

1. Start the Metro bundler:

   ```bash
   npm start
   ```

2. Run on Android:

   ```bash
   npm run android
   ```

3. Run on iOS (if configured):
   ```bash
   npm run ios
   ```

## Development

### Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Run the app on Android
- `npm run ios` - Run the app on iOS
- `npm test` - Run tests with coverage
- `npm run lint` - Run ESLint for code quality
- `npm run check-dependencies` - Check dependency alignment
- `npm run fix-dependencies` - Fix dependency issues

### Project Structure

```
InfoVault/
├── src/                 # Source code
├── android/             # Android-specific code
├── ios/                 # iOS-specific code (if applicable)
├── App.tsx              # Main app component
├── index.js            # App entry point
└── package.json        # Dependencies and scripts
```

## Security Note

This application is designed to store sensitive information locally on your device. Please ensure:

- Your device is secured with appropriate lock mechanisms
- Regular backups of important data
- Keep the app updated for security patches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues or questions, please create an issue in the repository.
