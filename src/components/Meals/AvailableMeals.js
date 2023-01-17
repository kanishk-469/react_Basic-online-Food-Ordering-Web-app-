import { useEffect,useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = (props) => {
 const [meals, setMeals] = useState([]);
 const [isLoading, setIsLoading]= useState(true);
 const [errorHttp, setErrorHttp]= useState();

  useEffect(()=>{

  const fetchMeals = async ()=>{ 

  const response = await fetch('https://your-firebase-Path.com/meals.json');
   
  if(!response.ok){
    throw new Error('Something Went Wrong');

  }
  const responseData = await response.json();
  const loadedMeals = [];

for (const key in responseData)
  loadedMeals.push({
    id: key,
    name: responseData[key].name,
    description: responseData[key].description,
    price: responseData[key].price
   });
   setMeals(loadedMeals);
   setIsLoading(false);

};

fetchMeals().catch(error=> {
  setIsLoading(false);
  setErrorHttp(error.message);
});

},[]);

if(isLoading){
  return (
  <section className={classes.MealsLoading}>
     <p>Loading...</p>
  </section>);
}

if(errorHttp){
  return(
  <section className= {classes.ErrorHttp}>
    <p>{errorHttp}</p>
  </section>);
}
     

  const mealsList = meals.map((meal) => (
    <MealItem
    id={meal.id} // this is new! 
    key={meal.id}
    name={meal.name} 
    description={meal.description}
    price={meal.price} 
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
      <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
