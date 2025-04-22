import hospital from '../assets/svgIcons/Hospital.png';
import ambulance from '../assets/svgIcons/Ambulance.png';
import emergency from '../assets/svgIcons/Emergency.png';
import microscope from '../assets/svgIcons/Microscope.png';
import labReports from '../assets/svgIcons/LabReports.png';

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
    src: hospital,
    alt: 'hospitalIcon',
  },
  {
    name: 'Ambulance',
    src: ambulance,
    alt: 'ambulance',
  },
  {
    name: 'Emergency',
    src: emergency,
    alt: 'emergency',
  },
];

export const labsItems = [
  {
    name: 'Book',
    src: microscope,
    alt: 'lab',
  },
  {
    name: 'Reports',
    src: labReports,
    alt: 'LabReports',
  },
];

export const insuranceItems = [
  {
    name: 'Book insurance',
    src: 'https://img.icons8.com/fluency/48/security-checked--v1.png',
    alt: 'insurance',
  },
  {
    name: 'My insurance',
    src: 'https://img.icons8.com/?size=100&id=E4VmOrv6BZqd&format=png&color=000000',
    alt: 'myInsurance',
  },
];
