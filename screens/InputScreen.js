import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Dimensions, Alert, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function InputScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reportType, setReportType] = useState('Exercise');
  const [customReportType, setCustomReportType] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [isEditable, setIsEditable] = useState(true);

  const handleImport = async () => {
    console.log('Entered handleImport');
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: false
      });
      console.log(result);
      if (result.canceled === false) {
        console.log('File selected:', result.uri);
        const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
        try {
          // Validate JSON format
          JSON.parse(fileContent);
          setJsonData(fileContent);
        } catch (e) {
          Alert.alert('Invalid JSON file format');
        }
      }
    } catch (error) {
      console.log('Error importing file:', error);
      Alert.alert('Error importing file: ' + error.message);
    }
  };

  const handleUpload = async () => {
    if (!jsonData.trim()) {
      Alert.alert('Error', 'Please enter JSON data');
      return;
    }

    console.log('Set Date:', date.toISOString());

    try {
      // Validate JSON format
      const parsedData = JSON.parse(jsonData);
      
      // Format filename using date and type
      const dateStr = new Date(date.toDateString()).toISOString().split('T')[0];
      const type = reportType === 'Custom' ? customReportType : reportType;
      const fileName = `${dateStr}_${type}.json`;
      
      // Create temporary file
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(parsedData, null, 2)
      );

      // Check if sharing is available
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Share JSON File'
      });

    } catch (error) {
      if (error instanceof SyntaxError) {
        Alert.alert('Error', 'Invalid JSON format. Please check your input.');
      } else {
        Alert.alert('Error', `Failed to share file: ${error.message}`);
      }
    }
  };

  const handleClearAll = () => {
    setJsonData('');
  };

  const handleCheckJson = () => {
    if (!jsonData.trim()) {
      Alert.alert('Error', 'Please enter JSON data to validate');
      return;
    }
    try {
      const parsedData = JSON.parse(jsonData);
      // Format the JSON with 2 spaces indentation
      const formattedJson = JSON.stringify(parsedData, null, 2);
      setJsonData(formattedJson);
      Alert.alert('Success', 'Valid JSON format');
    } catch (error) {
      Alert.alert('Error', 'Invalid JSON format');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <Picker
          selectedValue={reportType}
          onValueChange={(itemValue) => setReportType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Exercise" value="Exercise" />
          <Picker.Item label="Nutrition" value="Nutrition" />
          <Picker.Item label="Routine" value="Routine" />
          <Picker.Item label="Mental" value="Mental" />
          <Picker.Item label="Custom" value="Custom" />
        </Picker>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setShowDatePicker(true)}
        >
          <Entypo name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {reportType === 'Custom' && (
        <TextInput
          placeholder="Enter custom report type"
          value={customReportType}
          onChangeText={setCustomReportType}
          style={styles.customInput}
        />
      )}
      <View style={styles.controlsContainer}>
        <View style={styles.switchContainer}>
          <Text>Edit</Text>
          <Switch
            value={isEditable}
            onValueChange={setIsEditable}
          />
        </View>
        <TouchableOpacity style={styles.controlButton} onPress={handleCheckJson}>
          <Text>Check JSON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleClearAll}>
          <Text>Clear All</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Enter JSON data"
        value={jsonData}
        onChangeText={setJsonData}
        multiline
        editable={isEditable}
        style={[styles.jsonInput, !isEditable && styles.disabledInput]}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleImport}>
          <Text>Import</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(4),
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: responsiveFontSize(2),
    flex: 1,
    textAlign: 'center',
  },
  dateButton: {
    padding: 0,
  },
  picker: {
    width: responsiveWidth(50),
  },
  customInput: {
    height: responsiveHeight(6),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: responsiveHeight(2),
    borderRadius: 5,
  },
  jsonInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: responsiveWidth(2),
    textAlignVertical: 'top',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  button: {
    paddingVertical: responsiveWidth(3),
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    width: responsiveWidth(45),
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  controlButton: {
    paddingVertical: responsiveWidth(3),
    marginHorizontal: responsiveWidth(1),
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    width: responsiveWidth(32),
    alignItems: 'center',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
});
