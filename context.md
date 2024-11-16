# Life App Project

## Overview:
Life App is a React Native mobile application built with Expo, designed to help users manage and upload their daily JSON reports and visualize life tracking data. The app will have two core features:
1. **JSON File Management and Uploading**: Receive JSON data, format it, and share it with a cloud service.
2. **Dashboards for Life Data Visualization**: (Planned for future implementation).

## Feature 1: JSON File Management and Uploading
### Requirements:
1. **Input Options**:
   - Users can input JSON data via:
     - A text field for directly pasting JSON text.
     - A file upload mechanism to select an existing JSON file.

2. **Date and Type Selection**:
   - Allow users to specify a date for the JSON file:
     - Default to the current date.
     - Provide a date picker for easy selection.
   - Let users specify the type of the JSON report:
     - Predefined options: "Exercise", "Nutrition", "Routine", "Mental".
     - Allow custom text for non-standard types.

3. **File Formatting and Naming**:
   - The app should:
     - Parse the input JSON to validate syntax.
     - Format the file name as:
       `YYYY-MM-DD_<Type>.json`
       Example: `2024-11-15_Exercise.json`

4. **Sharing to Cloud Services**:
   - Use the React Native `Sharing` API to open the sharing options for:
     - Google Drive.
     - OneDrive.
     - Other supported cloud apps.

### Considerations:
- Ensure that files are correctly formatted before sharing.
- Provide error messages for invalid JSON or missing inputs (e.g., no date or type).
- Allow the user to preview the JSON file before sharing.

---

## Feature 2: Dashboards for Life Data Visualization (Planned)
### Requirements:
1. **Data Retrieval**:
   - Retrieve and process JSON files from the cloud or local storage.
   - Parse data into categories for visualization:
     - Exercise: Display training metrics.
     - Nutrition: Caloric intake, hydration.
     - Routine: Task duration, procrastination vs planned.
     - Mental: Mood trends, key events, sentiment analysis.

2. **Visualization**:
   - Use a library like `react-native-chart-kit` or `Victory` for:
     - Bar charts for task durations.
     - Line charts for mood trends.
     - Pie charts for time distribution (work vs relax vs procrastination).

3. **Filters**:
   - Allow users to filter data by date range or type (Exercise, Nutrition, etc.).
   - Provide toggles for showing/hiding specific metrics.

### Considerations:
- Ensure compatibility with future data formats.
- Optimize performance for large datasets.

---

## Technical Stack:
- **Framework**: React Native with Expo.
- **State Management**: Use Context API or Redux for managing app state.
- **Storage**:
  - Local storage for temporary files: `expo-file-system`.
  - Sharing API for file uploads: `expo-sharing`.
- **UI Components**:
  - Expo UI components (`expo/react-native`) for basic UI.
  - Third-party libraries for advanced UI (e.g., date picker, modals).
- **File Handling**:
  - Use `JSON.stringify()` for formatting JSON.
  - Validate JSON using `try...catch` with `JSON.parse()`.
- **Testing**:
  - Use Jest and React Native Testing Library for unit testing.
  - Manual testing on Android and iOS for file sharing compatibility.

## Key Libraries:
1. **Core Libraries**:
   - `expo-sharing`: For file sharing.
   - `expo-file-system`: For local file handling.
   - `react-native-paper` or `react-native-elements`: For UI components.

2. **Future Visualization Libraries**:
   - `react-native-chart-kit` or `Victory`: For dashboard visualizations.

3. **Utility Libraries**:
   - `dayjs` or `date-fns`: For date formatting.
   - `yup` or `ajv`: For JSON validation schema (optional).

---

## User Flow:
1. **JSON File Management**:
   - Open the app → Paste JSON data or upload file.
   - Choose a date and type for the JSON.
   - Preview the formatted file.
   - Click "Share" to open sharing options.

2. **(Future) Dashboard Visualization**:
   - Open app → Navigate to "Dashboard".
   - Select category and date range.
   - View interactive charts and summaries.

## Notes for Copilot:
- Focus on modular components:
  - `JSONInput`: Handles input validation and formatting.
  - `DateTypePicker`: Manages date and type selection.
  - `FilePreview`: Displays the formatted JSON.
  - `ShareButton`: Handles sharing functionality.
- Make code reusable and extensible for future features.
- Prioritize clean and user-friendly UI.

---

## Initial Milestones:
1. Implement JSON input (text and file).
2. Add date and type selection.
3. Format and preview JSON files.
4. Enable sharing functionality.
5. Set up GitHub repo with clear README and basic documentation.
