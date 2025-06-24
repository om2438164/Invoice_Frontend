import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { invoices } from '../services/api';
import { motion } from 'framer-motion';
import { FaFileInvoiceDollar, FaPrint, FaArrowLeft, FaRupeeSign } from 'react-icons/fa';

const ShowInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await invoices.getAll();
        const foundInvoice = response.data.find((inv) => inv.id === Number(id));
        if (foundInvoice) {
          setInvoice(foundInvoice);
        } else {
          setError('Invoice not found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch invoice');
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  if (!invoice) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 print:shadow-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-3">
              <FaFileInvoiceDollar className="text-4xl text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-600 mt-1">#{invoice.invoiceId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                <span className="font-semibold">Issue Date:</span>{' '}
                {new Date(invoice.issuedDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Due Date:</span>{' '}
                {new Date(invoice.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2 text-gray-600">Product</th>
                  <th className="py-2 text-right text-gray-600">Quantity</th>
                  <th className="py-2 text-right text-gray-600">Price</th>
                  <th className="py-2 text-right text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 text-gray-800">{invoice.productName}</td>
                  <td className="py-4 text-right text-gray-800">{invoice.quantity}</td>
                  <td className="py-4 text-right text-gray-800">
                    <span className="inline-flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {invoice.productPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 text-right text-gray-800">
                    <span className="inline-flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {(invoice.productPrice * invoice.quantity).toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              Total Amount:{' '}
              <span className="inline-flex items-center">
                <FaRupeeSign className="mr-1" />
                {(invoice.productPrice * invoice.quantity).toFixed(2)}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Status:{' '}
              <span
                className={`font-semibold ${
                  invoice.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {invoice.status}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-8 print:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/invoices')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <FaArrowLeft />
              <span>Back to Invoices</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <FaPrint />
              <span>Print Invoice</span>
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center print:mt-4"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 print:shadow-none">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm">
                © 2025 Invoice System. All rights reserved.
              </p>
              <div className="mt-2 flex justify-center space-x-4">
                <span className="text-gray-500 text-xs">Terms of Service</span>
                <span className="text-gray-500 text-xs">Privacy Policy</span>
                <span className="text-gray-500 text-xs">Contact Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShowInvoice; 