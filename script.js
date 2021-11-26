const search=document.getElementById("search");
const submit=document.getElementById('submit');
const random=document.getElementById("random");
const mealElement=document.getElementById("meals");
const resultHeading=document.getElementById("resultHeading");
const singleMealElement=document.getElementById("singleMeal");

function searchMeal(e)
{
    e.preventDefault();
    singleMealElement.innerHTML="";
    console.log(search.value);
    const mealName=search.value;
    if(mealName!="")
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((res) => res.json())
        .then((data) =>
        {
            if(document.getElementById("headerDiv").classList.contains("heightCls")==false)
            {
                document.getElementById("headerDiv").classList.add("heightCls");
            } 
            resultHeading.innerHTML=`<h2> Search Result for ${mealName}`;
            if(data.meals===null)
            {
                document.body.style.overflowY = "hidden";
                resultHeading.innerHTML=`<h2> There are no results for ${mealName}`;
                mealElement.innerHTML="";
            }
            else
            {
                document.body.style.overflowY = "scroll";
                document.getElementById("headerDiv").classList.remove("heightCls");
                mealElement.innerHTML=data.meals.map(
                   (meal) =>
                    `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="mealInfo" data-mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `
                )
                .join("");
            }
        });
    }
    else
    {
        search.focus();
    }
}

submit.addEventListener('submit',searchMeal);