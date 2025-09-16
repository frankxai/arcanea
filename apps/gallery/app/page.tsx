import samples from "../data/samples.json";

export default function Page() {
  return (
    <div>
      <header className="panel rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Arcanea Gallery</h1>
        <p className="muted">A curated selection of images and videos. Replace with live feed later.</p>
      </header>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map((item) => (
          <div key={item.id} className="panel rounded-xl overflow-hidden">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.title} className="w-full h-56 object-cover" />
            ) : (
              <video src={item.url} controls className="w-full h-56 object-cover" />
            )}
            <div className="p-4">
              <div className="font-semibold">{item.title}</div>
              <div className="muted text-sm">{item.prompt}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

