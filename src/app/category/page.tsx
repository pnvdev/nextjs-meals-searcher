import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const mealsCategories = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const { categories } = await mealsCategories.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meal Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((item) => (
          <Link
            href={`/category/${item.strCategory}`}
            key={item.strCategory}
            className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.strCategoryThumb}
                layout="fill"
                objectFit="cover"
                alt={item.strMeal}
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 h-20 w-96">
                {item.strCategory}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
