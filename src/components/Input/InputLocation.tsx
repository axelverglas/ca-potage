"use client";
import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

interface LocationInputProps {
  value?: any;
  onChange: (value: any) => void;
  error?: string;
}

export default function InputLocation({
  value,
  onChange,
  error,
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleSelect = async (address: any) => {
    const results = await geocodeByPlaceId(address.value.place_id);

    const location = {
      label: address.label,
      value: {
        description: address.label,
        place_id: address.value.place_id,
      },
      coordinates: {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      },
    };

    setInputValue(location);
    onChange(location);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div>
      <label className="mb-2 block" htmlFor="location">
        Localisation
      </label>
      <div className="relative" style={{ zIndex: 10000 }}>
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
          selectProps={{
            value: inputValue,
            onChange: handleSelect,
            placeholder: "Recherchez une adresse...",
            styles: {
              control: (provided) => ({
                ...provided,
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "transparent",
                border: error ? "1px solid #EF4444" : "1px solid #2CAA5C",
                padding: "8px",
                outline: "none",
                boxShadow: "none",
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: "0",
              }),
              input: (provided) => ({
                ...provided,
                margin: "0",
                padding: "0",
              }),
              indicatorsContainer: (provided) => ({
                ...provided,
                display: "none",
              }),
            },
          }}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
