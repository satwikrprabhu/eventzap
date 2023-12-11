import React from 'react';

const CustomerRatingComponent: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h2 className="text-4xl font-bold mb-8">CUSTOMER RATING</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: 'AMWAY', message: 'Thank you for endeavoring over the last 10 days to complete all the 101 city events. As we end this journey here, we look forward to opening a new chapter where we may come together once again to deliver a new success story!' },
          { name: 'DOVER', message: 'The endless hours that you have spent worrying on this project & the professionalism that you have shown has impressed us immensely. Your diligence, dedication and attention to detail has helped our event to be a grand success!' },
          { name: 'Arundhati Rao', message: 'Arranged a day’s outing for the kids of Shanthibhavan. Was so well managed. Anitha was personally present and made sure that everything went like clockwork. Sajjad, Guru, Harvin did an outstanding job! Unbelievable level of ownership and commitment!! Will repeat next year thanks to Bala, Anitha and Team' },
          { name: 'EAGLEVIEW', message: 'Thank you for your partnership in pulling off a fantastic Annual Day event for us at Eagle View. All arrangements ranging from the LED backdrop to the MC, stage and lighting, choreography and make up and last but not the least the high energy DJ ended the event on a high note! This event has certainly set a high benchmark for the quality of events as we move ahead!' },
          { name: 'SCHNEIDER', message: 'We would like to extend our appreciation for the amazing done by you & the etiner team at Dreams Events and services' },
          { name: 'TESCO', message: 'Thank you Bala and Priyanka for the wonderful Event. Would like to extend our thanks to the entire team at Dreams Events and Services!' },
        ].map((customer, index) => (
          <div key={index} className="bg-indigo-500 p-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            <p className="text-2xl font-bold mb-4">{customer.name}</p>
            <p>{customer.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRatingComponent;
