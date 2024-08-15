import React from 'react';
import './style.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // default styles from react-tabs, overrided in css file
import Appointment from './Appointment';

const BookingContainer = () => {
  return (
    <div className="bookingContainer">
      <Tabs>
        <div className="headingContainer">
          <div className="heading">
            <p>Booking</p>
          </div>

          <TabList>
            <Tab>Hospital</Tab>
            <Tab>Ambulance</Tab>
            <Tab>Emergency</Tab>
          </TabList>
        </div>
        <TabPanel>
          <Appointment />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BookingContainer;
