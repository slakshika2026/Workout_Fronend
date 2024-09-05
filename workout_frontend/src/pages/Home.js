import React, { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/Workoutform';



const Home = () => {
   const [workouts, setWorkouts] = useState(null);

   useEffect(() => {
      const fetchWorkouts = async () => {
         try {
            const response = await fetch('/api/workouts');
            const json = await response.json(); // json is an array of workouts

            if (response.ok) {
               setWorkouts(json); // Set the workouts state with the fetched data
            } else {
               console.error('Failed to fetch workouts:', json);
            }
         } catch (error) {
            console.error('An error occurred while fetching workouts:', error);
         }
      };

      fetchWorkouts();
   }, []); // Dependency array to run the effect once

   return (
      <div className="home">
         <div className="workouts">
            {workouts && workouts.map((workout) => (
               <WorkoutDetails
                  key={workout._id}
                  workout={workout}
               />


            ))}
         </div>
         <WorkoutForm />
      </div>
   );
}

export default Home;
