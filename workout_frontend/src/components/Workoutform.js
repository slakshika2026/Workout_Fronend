import { useState } from 'react';

const WorkoutForm = () => {
   const [title, setTitle] = useState("");
   const [load, setLoad] = useState("");
   const [reps, setReps] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Validation
      if (!title || !load || !reps) {
         setError('All fields are required');
         return;
      }

      const workout = {
         title,
         load: parseFloat(load), // Ensure load is a number
         reps: parseInt(reps)     // Ensure reps is a number
      };

      try {
         const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const json = await response.json();

         if (!response.ok) {
            setError(json.error || 'Something went wrong');
         } else {
            // Clear form on success
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('New workout added successfully');
         }
      } catch (err) {
         setError('Failed to connect to the server');
      }
   };

   return (
      <form className="create" onSubmit={handleSubmit}>
         <h3>Add a new Workout</h3>

         <label>Exercise Title:</label>
         <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
         />

         <label>Load (in kg):</label>
         <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
         />

         <label>Reps:</label>
         <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
         />

         <button type="submit">Add Workout</button>
         {error && <div className="error">{error}</div>}
      </form>
   );
};

export default WorkoutForm;
