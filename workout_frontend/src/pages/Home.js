import React from 'react';
import { useEffect ,useState} from 'react';


const Home = () => {
   const [workouts,setWorkouts] = useEffect(null)

   useEffect(() => { 
      const fetchWorkouts = async() => { 
         const response = await fetch('http://localhost:3000/api/workouts')
         const json = await response.json() //json is a array of workouts

         if (response.ok) {
            setWorkouts(json) //json is a array of workouts
         }
      }
      fetchWorkouts()
   },[])

   return (
      <div className="home">
         <div className="workouts">
            {workouts && workouts.map(()=>(
               <p key={workouts._id}>{ workouts.title}</p>
            ))}
       </div>
      </div>
   );
}

export default Home;
