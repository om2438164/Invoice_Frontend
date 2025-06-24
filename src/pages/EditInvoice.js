import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { invoices } from '../services/api';
import { motion } from 'framer-motion';
import { FaFileInvoiceDollar, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    invoiceId: '',
    productName: '',
    dueDate: '',
    issuedDate: '',
    productPrice: '',
    quantity: '',
    status: 'PENDING',
  });

  const fetchInvoice = useCallback(async () => {
    try {
      const response = await invoices.getAll();
      const invoice = response.data.find((inv) => inv.id === Number(id));
      if (invoice) {
        setFormData({
          invoiceId: invoice.invoiceId,
          productName: invoice.productName,
          dueDate: invoice.dueDate.split('T')[0],
          issuedDate: invoice.issuedDate.split('T')[0],
          productPrice: invoice.productPrice.toString(),
          quantity: invoice.quantity.toString(),
          status: invoice.status,
        });
      }
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch invoice');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await invoices.update(Number(id), {
        ...formData,
        productPrice: parseFloat(formData.productPrice),
        quantity: parseInt(formData.quantity),
      });
      navigate('/invoices');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update invoice');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center space-x-3 mb-8">
          <FaFileInvoiceDollar className="text-4xl text-indigo-600" />
          <h1 className="text-3xl font-bold text-indigo-900">Edit Invoice</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
            >
              <div className="flex items-center">
                <FaTimes className="mr-2" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice ID
                </label>
                <input
                  type="text"
                  name="invoiceId"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-gray-50"
                  value={formData.invoiceId}
                  onChange={handleChange}
                  disabled
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issued Date
                </label>
                <input
                  type="date"
                  name="issuedDate"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={formData.issuedDate}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Price
                </label>
                <input
                  type="number"
                  name="productPrice"
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={formData.productPrice}
                  onChange={handleChange}
                  placeholder="Enter Price"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="md:col-span-2"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                </select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-end space-x-4 mt-8"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/invoices')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
              >
                <FaArrowLeft />
                <span>Back to Invoices</span>
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <FaSave />
                <span>Update Invoice</span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditInvoice; 