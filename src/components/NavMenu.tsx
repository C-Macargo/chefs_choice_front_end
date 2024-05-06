import Link from "next/link";

export default function NavMenu() {
  const menuItems = [
    { title: "Create Product/Category", path: "/create-product-category" },
    { title: "Create Menu", path: "/create-menu" },
    { title: "Product List", path: "/product-list" },
    { title: "Current Menu", path: "/menu-now" },
  ];

  return (
    <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12 ">
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-xl">
        <div className="p-6 sm:p-16">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-center text-2xl text-white font-bold">
              Chefs Choice
              <br />
              Main Menu
            </h2>
          </div>
          <div className="mt-16 flex flex-wrap justify-center space-x-4">
            {menuItems.map(({ title, path }, index) => (
              <button
                key={index}
                className="group h-10 px-4 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <Link href={path}>
                    <span className="block font-semibold tracking-wide text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      {title}
                    </span>
                  </Link>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
