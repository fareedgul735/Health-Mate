import { faqData } from "../../../lib/constants";

const FAQSection = () => {
  return (
    <section id="faq" className="mt-24 px-6 md:px-20 text-center">
      <h3 className="text-3xl font-bold mb-10">Frequently Asked Questions</h3>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        {faqData.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-lg text-sky-700 mb-2">{faq.q}</h4>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
