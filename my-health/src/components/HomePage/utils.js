import {
  faHospital,
  faTruckMedical,
  faKitMedical,
  faFile,
  faMicroscope,
  faFileWaveform,
  faFileMedical
} from '@fortawesome/free-solid-svg-icons';

export const gerRedirectPath = (buttonName) => {
  switch (buttonName) {
    case 'Hospital':
      return '/hospital-booking';
    case 'Ambulance':
      return '/ambulance-booking';
    case 'Emergency':
      return '/emergency-booking';
  }
};

export const bookingItems = [
  {
    name: 'Hospital',
    icon: faHospital
  },
  {
    name: 'Ambulance',
    icon: faTruckMedical
  },
  {
    name: 'Emergency',
    icon: faKitMedical
  }
];

export const labsItems = [
  {
    name: 'Lab booking',
    icon: faMicroscope
  },
  {
    name: 'View reports',
    icon: faFile
  }
];

export const insuranceItems = [
  {
    name: 'Book insurance',
    icon: faFileMedical
  },
  {
    name: 'My insurance',
    icon: faFileWaveform
  }
];
