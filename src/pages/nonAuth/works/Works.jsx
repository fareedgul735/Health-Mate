import { stepsData } from "../../../lib/constants";

const HowItWorks = () => {
  return (
    <section id="how" className="mt-24 px-6 md:px-20 text-center">
      <h3 className="text-3xl font-bold mb-10">How It Works</h3>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {stepsData.map((s) => (
          <div
            key={s.step}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6"
          >
            <div className="text-4xl font-bold text-sky-600 mb-2">
              {s.step}.
            </div>
            <h4 className="font-semibold text-lg">{s.title}</h4>
            <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
