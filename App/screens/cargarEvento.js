import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Switch, Alert, Modal, TouchableOpacity } from 'react-native';
import categoryApi from '../api/categoryApi';
import locationsApi from '../api/locationsApi';
import eventsApi from '../api/eventsApi';

const CargarEvento = ({ route }) => {
  const { token } = route.params;
  const [form, setForm] = useState({
    name: '',
    description: '',
    id_event_category: '',
    id_event_location: '',
    start_date: '',
    duration_in_minutes: '',
    price: '',
    enabled_for_enrollment: false,
    max_assistance: '',
    id_creator_user: '',
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // New state for success modal

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.get_Category();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await locationsApi.get_Locations(token);
        setLocations(response.data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };

    fetchCategories();
    fetchLocations();
  }, [token]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.id_event_category) newErrors.id_event_category = 'Event category is required';
    if (!form.id_event_location) newErrors.id_event_location = 'Event location is required';
    if (!form.start_date) newErrors.start_date = 'Start date is required';
    if (!form.duration_in_minutes || isNaN(form.duration_in_minutes) || form.duration_in_minutes <= 0)
      newErrors.duration_in_minutes = 'Duration must be a positive number';
    if (!form.price || isNaN(form.price) || form.price <= 0) newErrors.price = 'Price must be a positive number';
    if (!form.max_assistance || isNaN(form.max_assistance) || form.max_assistance <= 0)
      newErrors.max_assistance = 'Max assistance must be a positive number';
    if (!form.id_creator_user || isNaN(form.id_creator_user)) newErrors.id_creator_user = 'Creator user ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      // Show the modal instead of submitting directly
      setModalVisible(true);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await eventsApi.create_Events(form, token);
      console.log('Event creation response:', response);
      setModalVisible(false);
      setSuccessModalVisible(true); // Show success modal
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'There was an error creating the event.');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSuccessClose = () => {
    setSuccessModalVisible(false);
    // Optionally, navigate away or reset the form here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Form</Text>

      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={form.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <Text>Event Category:</Text>
      <Picker
        selectedValue={form.id_event_category}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('id_event_category', itemValue)}
      >
        <Picker.Item label="Select a category" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
      {errors.id_event_category && <Text style={styles.error}>{errors.id_event_category}</Text>}

      <Text>Event Location:</Text>
      <Picker
        selectedValue={form.id_event_location}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('id_event_location', itemValue)}
      >
        <Picker.Item label="Select a location" value="" />
        {locations.map((location) => (
          <Picker.Item key={location.id} label={location.name} value={location.id} />
        ))}
      </Picker>
      {errors.id_event_location && <Text style={styles.error}>{errors.id_event_location}</Text>}

      <Text>Start Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={form.start_date}
        onChangeText={(text) => handleInputChange('start_date', text)}
      />
      {errors.start_date && <Text style={styles.error}>{errors.start_date}</Text>}

      <Text>Duration (in minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={form.duration_in_minutes}
        onChangeText={(text) => handleInputChange('duration_in_minutes', text)}
      />
      {errors.duration_in_minutes && <Text style={styles.error}>{errors.duration_in_minutes}</Text>}

      <Text>Price:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={form.price}
        onChangeText={(text) => handleInputChange('price', text)}
      />
      {errors.price && <Text style={styles.error}>{errors.price}</Text>}

      <Text>Enabled for Enrollment:</Text>
      <Switch
        value={form.enabled_for_enrollment}
        onValueChange={(value) => handleInputChange('enabled_for_enrollment', value)}
      />

      <Text>Max Assistance:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={form.max_assistance}
        onChangeText={(text) => handleInputChange('max_assistance', text)}
      />
      {errors.max_assistance && <Text style={styles.error}>{errors.max_assistance}</Text>}

      <Text>Creator User ID:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={form.id_creator_user}
        onChangeText={(text) => handleInputChange('id_creator_user', text)}
      />
      {errors.id_creator_user && <Text style={styles.error}>{errors.id_creator_user}</Text>}

      <Button title="Submit" onPress={handleSubmit} />

      {/* Modal for confirmation */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Event Creation</Text>
            <Text>Name: {form.name}</Text>
            <Text>Description: {form.description}</Text>
            <Text>Category: {categories.find(cat => cat.id === form.id_event_category)?.name}</Text>
            <Text>Location: {locations.find(loc => loc.id === form.id_event_location)?.name}</Text>
            <Text>Start Date: {form.start_date}</Text>
            <Text>Duration: {form.duration_in_minutes} minutes</Text>
            <Text>Price: ${form.price}</Text>
            <Text>Enabled for Enrollment: {form.enabled_for_enrollment ? 'Yes' : 'No'}</Text>
            <Text>Max Assistance: {form.max_assistance}</Text>
            <Text>Creator User ID: {form.id_creator_user}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for success */}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Evento creado exitosamente</Text>
            <Text>Tu evento fue creado exitosamente.</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSuccessClose}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
      container: {
      flex: 1,
      padding: 40,
      backgroundColor: '#fafafa',
    },
    title: {
      fontSize: 32,
      fontWeight: '900',
      marginBottom: 30,
      color: '#2c3e50',
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderColor: '#3498db',
      borderWidth: 2,
      marginBottom: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: '#ecf0f1',
    },
    picker: {
      height: 60,
      width: '100%',
      marginBottom: 15,
      borderWidth: 2,
      borderColor: '#3498db',
      borderRadius: 10,
      backgroundColor: '#ecf0f1',
    },
    error: {
      color: '#e74c3c',
      marginBottom: 15,
      fontSize: 16,
      fontStyle: 'italic',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
      width: '90%',
      padding: 30,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 20,
      color: '#2980b9',
    },
    modalButtons: {
      flexDirection: 'row',
      marginTop: 30,
    },
    modalButton: {
      marginHorizontal: 20,
      padding: 15,
      backgroundColor: '#27ae60',
      borderRadius: 8,
    },
    modalButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '500',
    },
  
  
});

export default CargarEvento;