import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await fetch(
    `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.slug}`
  );
  const { meals } = await response.json();

  if (!meals) return <p>Meal not found</p>;

  const meal = meals[0];

  const ingredients = Object.entries(meal)
    .filter(([key, value]) => key.includes("strIngredient") && value)
    .map(([_, value]) => value);

  const measures = Object.entries(meal)
    .filter(([key, value]) => key.includes("strMeasure") && value)
    .map(([_, value]) => value);

  const { searchParams } = meal.strYoutube ? new URL(meal.strYoutube) : "";
  const ytVideoId = searchParams ? searchParams.get("v") : "";
  console.log(ytVideoId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          src={meal.strMealThumb}
          width={700}
          height={700}
          alt={meal.strMeal}
          className="m-auto h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-102"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            {meal.strMeal}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div>
              <span className="text-sm text-gray-600">Category: </span>
              <Link
                href={`/category/${meal.strCategory}`}
                className="font-medium text-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 hover:border-gray-400"
              >
                {meal.strCategory}
              </Link>
            </div>
            <div>
              <span className="text-sm text-gray-600">Location: </span>
              <Link
                href={`/area/${meal.strArea}`}
                className="font-medium text-gray-800 border border-gray-300 rounded-lg px-4 py-2 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 hover:border-gray-400"
              >
                {meal.strArea}
              </Link>
            </div>
          </div>
          <Section title="Instructions">
            <p className="text-lg text-gray-700 leading-relaxed">
              {meal.strInstructions}
            </p>
          </Section>
          <Section title="Ingredients">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={index}
                  ingredient={ingredient}
                  measure={measures[index]}
                />
              ))}
            </div>
          </Section>
          {ytVideoId ? (
            <Section title="Video Tutorial">
              <div className="relative pt-16 pb-10">
                <iframe
                  className="w-full h-64 md:h-96 rounded-lg shadow-lg"
                  src={`https://www.youtube.com/embed/${ytVideoId}`}
                  title="Meal Preparation Video"
                  allowFullScreen
                />
              </div>
            </Section>
          ) : (
            <></>
          )}
          {meal.strSource ? (
            <Section title="Source">
              <div className="flex items-center text-gray-700">
                {/* <span className="font-medium mr-2">{"Source"}:</span> */}
                <Link href={meal.strSource} target="_blank">
                  {meal.strSource}
                </Link>
              </div>
            </Section>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="border-t-2 border-gray-300 mb-4 w-16"></div>
      {children}
    </div>
  );
}

function IngredientItem({
  ingredient,
  measure,
}: {
  ingredient: string;
  measure: string;
}) {
  return (
    <div className="flex items-center text-gray-700">
      <span className="font-medium mr-2">{ingredient}:</span>
      <span>{measure}</span>
    </div>
  );
}
