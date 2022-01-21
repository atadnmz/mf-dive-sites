import React from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import coordinates from './coordinates';
import 'leaflet/dist/leaflet.css';
type AppProps = {
  message: string;
};

const Map = ({ message }: AppProps) => {
  const pathOptions = { color: 'red' };
  const center: LatLngExpression = [38.5, 26.87];

  return (
    <div>
      <MapContainer center={center} zoom={7} style={{ height: '100vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Polygon pathOptions={pathOptions} positions={coordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
