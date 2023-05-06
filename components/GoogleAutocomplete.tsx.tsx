import React, { useRef, useEffect } from 'react';

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

  useEffect(() => {
    window.initAutocomplete = () => {
      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current);

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
          const componentType = component.types[0];

          switch (componentType) {
            case 'street_number':
              street = `${component.long_name} `;
              break;
            case 'route':
              street += component.long_name;
              break;
            case 'locality':
              city = component.long_name;
              break;
            case 'administrative_area_level_1':
              state = component.short_name;
              break;
            case 'postal_code':
              zip = component.long_name;
              break;
          }
        }

        let unknownComponents = [];

        if (!street) unknownComponents.push('street');
        if (!city) unknownComponents.push('city');
        if (!state) unknownComponents.push('state');
        if (!zip) unknownComponents.push('zip');

        if (unknownComponents.length > 0) {
          alert(`Unknown ${unknownComponents.join(', ')} address. Please type full address.`);
          return;
        }

        const acceptedZips = [10001, 10012, 10014, 10010, 10011, 10018, 10003, 10016, 10009];

        if (!acceptedZips.includes(Number(zip))) {
          alert("Sorry, but currently we don't cover your area.");
          return;
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

  return <input ref={inputRef} type="text" placeholder="Enter your address" className='border-2 w-full rounded-full p-2'/>;
};

export default GoogleAutocomplete;


