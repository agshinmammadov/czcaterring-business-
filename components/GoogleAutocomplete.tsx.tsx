import React, { useRef, useEffect, useState } from 'react';

declare global {
  interface Window {
    initAutocomplete: any;
  }
}

type AddressComponents = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

interface GoogleAutocompleteProps {
  onAddressSelected?: (addressComponents: AddressComponents) => void;
}

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({ onAddressSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [acceptedZips, setAcceptedZips] = useState([0]); 
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await fetch(
        "https://gist.githubusercontent.com/turalus/8890c7e87f8274d7df062b16d4818dfd/raw/90ddd447d92f37f6768a0a3569afd7093c98cbcd/er_api_response.json"
      );
      const data = await res.json();
      setAcceptedZips(data.data.accepted_zips)
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    window.initAutocomplete = () => {
      if (!inputRef.current) return;

      const newYorkBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.477399, -79.761436), // New York state's northwest point
        new google.maps.LatLng(45.015864, -71.777492) // New York state's southeast point
      );
  
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        bounds: newYorkBounds,
        strictBounds: true,
        componentRestrictions: { country: 'US' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.address_components) {
          return;
        }

        let street = '';
        let city = '';
        let state = '';
        let zip = '';

        for (const component of place.address_components) {
          if (component.types.includes('street_number')) {
            street = `${component.long_name} `;
          } else if (component.types.includes('route')) {
            street += component.long_name;
          } else if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.short_name;
          } else if (component.types.includes('postal_code')) {
            zip = component.long_name;
          }
        }

        let unknownComponents = [];
        const addressElement = document.getElementById('address');

        if (!street) unknownComponents.push('street');
        if (!city) unknownComponents.push('city');
        if (!state) unknownComponents.push('state');
        if (!zip) unknownComponents.push('zip');

        if (addressElement && unknownComponents.length > 0) {
          addressElement.style.borderColor = "red";
          alert(`Unknown ${unknownComponents.join(', ')} address. Please type full address.`);
          return;
        } else if (addressElement) {
          addressElement.style.borderColor = "#E5E7EB";
        }
        
        if (acceptedZips[0] !== 0 && !acceptedZips.includes(Number(zip)) && addressElement) {
          addressElement.style.borderColor = "red";
          alert("Sorry, but currently we don't cover your area.");
          return;
        } else if (addressElement) {
          addressElement.style.borderColor = "#E5E7EB";
        }

        onAddressSelected && onAddressSelected({ street, city, state, zip });
      });
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAqLiHZtGTzYAmJkhBmZnGfOTrB5fBRSvw&libraries=places&callback=initAutocomplete`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <input ref={inputRef} type="text" id='address' placeholder="Enter your address" className='border-2 w-full rounded-full p-2' required/>;
};

export default GoogleAutocomplete