import Image from "next/image";
import Link from "next/link";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const mealsCategory = await fetch(
    `http://www.themealdb.com/api/json/v1/1/filter.php?a=${params.slug}`
  );
  const { meals }: { meals: Meal[] } = await mealsCategory.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {params.slug} Meals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((item) => (
          <Link
            href={`/meal/${item.idMeal}`}
            key={item.idMeal}
            className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative h-48 w-96">
              <Image
                src={item.strMealThumb}
                layout="fill"
                objectFit="cover"
                alt={item.strMeal}
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 h-20">
                {item.strMeal}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
