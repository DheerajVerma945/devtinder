import React, { useEffect } from 'react';
import axios from 'axios';

function Feed() {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://devtinder0backend.onrender.com/profile/view",
          { withCredentials: true } 
        );
        console.log("Response data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };
  
    getData();
  }, []);
  

  return (
    <div>
      Feed page
    </div>
  );
}

export default Feed;
