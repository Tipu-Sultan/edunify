"use client";
import React, { useState } from 'react';

const page = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Add API endpoint for data submission
    // For example, you can use the fetch API or axios
    const apiUrl = '/api/addschool';
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data submitted successfully:', data);
        // You can perform additional actions after successful submission
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        // Handle errors accordingly
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Contact:
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default page;
