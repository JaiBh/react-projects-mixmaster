import { useLoaderData, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail,id"],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data.drinks;
    },
  };
};

const Cocktail = () => {
  const { id } = useLoaderData();

  const { data: drink } = useQuery(singleCocktailQuery(id));

  if (!drink) {
    toast.error("oops, there was an error");
    return <Navigate to="/"></Navigate>;
  }
  const {
    strAlcoholic: info,
    strGlass: glass,
    strDrink: name,
    strCategory: category,
    strInstructions: instructions,
    strDrinkThumb: image,
  } = drink[0];

  const validIngredients = Object.keys(drink[0])
    .filter((key) => key.startsWith("strIngredient") && drink[0][key] !== null)
    .map((item) => drink[0][item]);
  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {validIngredients.map((ingredient, index) => {
              return (
                <span className="ing" key={ingredient}>
                  {ingredient}
                  {index < validIngredients.length - 1 && ", "}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
