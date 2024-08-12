import Link from "next/link";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealsProps {
  searchParams: {
    query?: string;
  };
}

export async function Meals({ searchParams }: MealsProps) {
  const { query } = searchParams;
  const search = query || "";
  const mealsCategories = await fetch(
    `http://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const { meals }: { meals: Meal[] } = await mealsCategories.json();

  if (meals && meals.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.slice(0, 20).map((item) => (
          <Link
            href={`/meal/${item.idMeal}`}
            key={item.idMeal}
            className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.strMealThumb}
                layout="fill"
                objectFit="cover"
                alt={item.strMeal}
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 h-20 w-96">
                {item.strMeal}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}
