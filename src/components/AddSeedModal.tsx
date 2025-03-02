'use client';
import { useState } from "react";

export default function AddSeedModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    variedad: "",
    año: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/add-seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Semilla añadida correctamente');
        setFormData({ nombre: "", variedad: "", año: "" });
        onClose();
      } else {
        alert('Error al añadir la semilla');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error); 
      alert('Ocurrió un error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-olive-100 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-olive-900 mb-4">Añadir nueva semilla</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-olive-900">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border border-olive-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-olive-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-olive-900">Variedad</label>
            <input
              type="text"
              name="variedad"
              value={formData.variedad}
              onChange={handleChange}
              required
              className="w-full border border-olive-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-olive-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-olive-900">Año</label>
            <input
              type="text"
              name="año"
              value={formData.año}
              onChange={handleChange}
              required
              className="w-full border border-olive-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-olive-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg shadow-md text-olive-100 ${isSubmitting ? "bg-gray-500" : "bg-olive-800 hover:bg-olive-900"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Añadiendo..." : "Añadir Semilla"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
