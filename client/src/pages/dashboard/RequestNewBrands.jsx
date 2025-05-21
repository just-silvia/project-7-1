import { useState } from "react";
import CustomButton from "../../components/shared/CustomButton";
import CustomModal from "../../components/dashboard/CustomModal";

const RequestNewBrands = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        <>
            <div>
                <CustomButton onClick={() => setIsOpen(io => !io)}>
                    New Request
                </CustomButton>
            </div>
            
            { /* Custom modal - da non modificare */ }
            <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <h2 className="text-2xl font-semibold mb-4">New Brand Request</h2>

                {submitted && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        Riquest sent successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Applicant name</label>
                        <input
                            type="text"
                            name="applicantName"
                            value={form.applicantName}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Brand name</label>
                        <input
                            type="text"
                            name="trademarkName"
                            value={form.trademarkName}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Submission date</label>
                        <input
                            type="date"
                            name="submissionDate"
                            value={form.submissionDate}
                            onChange={handleChange}
                            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <CustomButton type="submit">Send request</CustomButton>
                </form>
            </CustomModal>
        </>
    );
};

export default RequestNewBrands;
