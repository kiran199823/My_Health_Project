import {
  faHospital,
  faTruckMedical,
  faKitMedical,
  faFile,
  faMicroscope,
  faFileWaveform,
  faFileMedical
} from '@fortawesome/free-solid-svg-icons';

export const getRedirectPath = (buttonName) => {
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
    src: 'https://img.icons8.com/fluency/48/hospital.png',
    alt: 'hospital'
  },
  {
    name: 'Ambulance',
    src: 'https://img.icons8.com/fluency/48/ambulance.png',
    alt: 'ambulance'
  },
  {
    name: 'Emergency',
    src: 'https://img.icons8.com/fluency/48/siren.png',
    alt: 'emergency'
  }
];

export const labsItems = [
  {
    name: 'Lab booking',
    src: 'https://img.icons8.com/fluency/48/microscope.png',
    alt: 'lab'
  },
  {
    name: 'View reports',
    src: 'https://img.icons8.com/fluency/48/graph-report.png',
    alt: 'reports'
  }
];

export const insuranceItems = [
  {
    name: 'Book insurance',
    src: 'https://img.icons8.com/fluency/48/security-checked--v1.png',
    alt: 'insurance'
  },
  {
    name: 'My insurance',
    src: 'https://img.icons8.com/?size=100&id=E4VmOrv6BZqd&format=png&color=000000',
    alt: 'myInsurance'
  }
];
