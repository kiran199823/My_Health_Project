import React from 'react';

const Appointment = () => {
  return (
    <div className='appointmentContainer'>
      <div>
        <input placeholder='State' className='appointmentInputs'/>
        <input placeholder='District' className='appointmentInputs'/>
      </div>
      <div>
        <input placeholder='Hospital' className='appointmentInputs'/>
        <input placeholder='Specialist' className='appointmentInputs'/>
      </div>
      <div>
        <input placeholder='Doctor' className='appointmentInputs' />
        <button>Find</button>
      </div>
    </div>
  );
};

export default Appointment;
