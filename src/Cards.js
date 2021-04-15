import Button from "./Button";

// TODO: split Card (individual) and the heading into separate components

export default function Cards() {
  const searchResults = [
    {
      id: 1,
      country: "United States of America",
      href: "https://teleport.org/cities/boise/",
      city: "Boise",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      preview:
        "Boise, Idaho, is among the top cities with a free business environment. According to our city rankings, this is a good place to live with high ratings in housing, healthcare and environmental quality.",
    },
    {
      id: 2,
      country: "Peru",
      href: "https://teleport.org/cities/lima/",
      city: "Lima",
      imageUrl:
        "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      preview:
        "Lima, Peru, is characterized by reasonably priced housing. Our data reflects that this city has a good ranking in cost of living and leisure & culture.",
    },
    {
      id: 3,
      country: "Portugal",
      href: "https://teleport.org/cities/lisbon/",
      city: "Lisbon",
      imageUrl:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      preview:
        "Lisbon, one of the oldest cities in the world, is a charming mix of Paris and San Francisco—at a fraction of the price. It offers a relaxed and tolerant environment with great local cuisine. Its central areas are best navigated by foot, allowing you to enjoy the grand architecture and pleasant climate, while its affordable public transportation system offers easy access to the rest of the city.",
    },
  ];

  return (
    <div className="relative bg-gray-50 py-16">
      <div className="relative">
        <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Here are some places you might like to visit
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
          {searchResults.map((post) => (
            <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">{post.city}</p>
                  <div className="block mt-2">
                    <p className="text-sm font-medium text-cyan-600">{post.country}</p>
                    <p className="mt-3 text-base text-gray-500">{post.preview}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <a href={post.href}>
                    <Button text={`Learn more about ${post.city}`}></Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
