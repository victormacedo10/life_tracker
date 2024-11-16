# **Life App**

A React Native application built with Expo to manage and upload daily JSON reports and, in the future, visualize life tracking data through dashboards.

---

## **Features**

### **Current Features**
1. **Input Page**:
   - Select a date for the JSON report (default: current date).
   - Choose a report type (Exercise, Nutrition, Routine, Mental, or Custom).
   - Input JSON data via a text editor or import from a file.
   - Validate the JSON format and share it with your preferred cloud service.
   
### **Planned Features**
1. **Home Page**:
   - Display dashboards to visualize life tracking data.
   - Charts and summaries for categories such as Exercise, Nutrition, Routine, and Mental health.
2. **Settings Page**:
   - Link a data file for dashboard visualization.
   - Customize default report types and JSON file naming conventions.

---

## **Getting Started**

### **Prerequisites**
1. Node.js (v14 or later).
2. Expo CLI:
   ```bash
   npm install -g expo-cli
   ```
3. Git.

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/life-app.git
   cd life-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo server:
   ```bash
   npx expo start
   ```

4. Scan the QR code with the Expo Go app (iOS or Android) to run the app on your device.

---

## **Project Structure**

```
life-app/
├── assets/                 # Static assets (images, fonts, etc.)
├── components/             # Reusable React Native components
├── navigation/             # Navigation setup for Tab Navigator
├── screens/                # Screen components for Home, Input, and Settings
├── utils/                  # Utility functions and helpers
├── App.js                  # Entry point of the application
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
└── context.md              # Context for GitHub Copilot
```

---

## **How to Use**

### **Input Page**
1. Select the date for the JSON report using the calendar picker.
2. Choose a report type from the dropdown menu:
   - If "Custom" is selected, provide a name for the custom report type.
3. Paste JSON data into the text editor or import a file using the "Import" button.
4. Validate and upload the JSON file using the "Upload" button:
   - If the JSON is invalid, an error message will be displayed.
   - If valid, the app formats the file and opens sharing options.

---

## **Dependencies**

### **Core Libraries**
- **React Native**: Framework for building mobile applications.
- **Expo**: Toolkit for React Native development.
- **React Navigation**: Navigation for the app.
- **react-native-paper**: UI components for styling.

### **Utilities**
- **expo-document-picker**: For selecting JSON files.
- **expo-sharing**: For sharing files with cloud services.
- **react-native-calendars**: For calendar picker functionality.
- **dayjs**: For date formatting.

---

## **Planned Enhancements**
1. **Home Page**: Add dashboards to visualize user data.
2. **Data Linking**: Allow linking to cloud-stored JSON files for analysis.
3. **Customization**: Add options for report types and naming conventions.

---

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your fork and submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For questions or feedback, feel free to reach out:
- **Email**: your.email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
