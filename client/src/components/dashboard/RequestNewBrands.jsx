import { useState } from "react";
import CustomButton from "../../components/shared/CustomButton";

const NewTrademarkRequest = () => {
  const [form, setForm] = useState({
    applicantName: "",
    trademarkName: "",
    description: "",
    category: "",
    submissionDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const isValid = Object.values(form).every((field) => field.trim() !== "");
    if (!isValid) {
      alert("Per favore compila tutti i campi.");
      return;
    }

    // Qui andrebbe la chiamata API o la logica per salvare la richiesta
    console.log("Nuova richiesta marchio:", form);

    setSubmitted(true);
    setForm({
      applicantName: "",
      trademarkName: "",
      description: "",
      category: "",
      submissionDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-light flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Richiesta Nuovo Marchio</h2>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Richiesta inviata con successo!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome richiedente</label>
            <input
              type="text"
              name="applicantName"
              value={form.applicantName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nome marchio</label>
            <input
              type="text"
              name="trademarkName"
              value={form.trademarkName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrizione</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data di presentazione</label>
            <input
              type="date"
              name="submissionDate"
              value={form.submissionDate}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <CustomButton type="submit">Invia Richiesta</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default NewTrademarkRequest;
