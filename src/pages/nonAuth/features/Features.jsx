import { featuresData } from "../../../lib/constants";

const FeaturesSection = () => {
  return (
    <section id="features" className="mt-24 px-6 md:px-20">
      <h3 className="text-3xl font-bold text-center mb-10">Features</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {featuresData.map((f) => (
          <div
            key={f.id}
            className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="flex justify-center mb-3">{f.icon}</div>
            <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
