import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';


export default function App() {
  const [image, setImage] = useState(null);

  return (
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Load Image" onPress={() => {
        setImage('https://example.com/image.jpg');
      }} />
    </View>
  );
}