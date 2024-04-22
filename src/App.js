import React, { useState } from 'react';

const MyForm = () => {
  
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Response:', response);
      if (response.ok) {
        console.log('Data sent to MongoDB!');
        alert('Data sent to MongoDB!');
      } else {
        throw new Error('Failed to send data to MongoDB');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending data to MongoDB');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;





