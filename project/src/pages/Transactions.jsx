import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  X,
  Upload,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  useCreateFuctionMutation,
  useGetallFunctionQuery,
  useUpdateFunctionMutation,
} from "../store/dynamicApi";
import Swal from "sweetalert2";

function Transactions() {
  const [transactions, setTransactions] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
  });
  const { data: transactionsData = [], isLoading: transactionsLoading } =
    useGetallFunctionQuery({
      url: "/transactions/user",
    });

  useEffect(() => {
    if (!transactionsLoading) {
      setTransactions(transactionsData);
    }
  }, [transactionsLoading]);

  const [
    createFuntion,
    { isError: CIsError, error: Cerror, data: CData, isLoading: CIsLoading },
  ] = useCreateFuctionMutation();

  const [
    updateFunction,
    { isError: UIsError, error: Uerror, data: UData, isLoading: UIsLoading },
  ] = useUpdateFunctionMutation();

  useEffect(() => {
    const showAlert = async (message, icon = "error") => {
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: icon,
        title: message,
        padding: "10px 20px",
      });
    };

    if (CIsError) {
      showAlert(Cerror?.data?.message);
    }

    if (UIsError) {
      showAlert(Uerror?.data?.message);
    }

    if (CData) {
      showAlert(CData?.message, "success");
    }

    if (UData) {
      showAlert(UData?.message, "success");
    }
  }, [CIsError, Cerror, CData, UIsError, Uerror, UData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file, // save the real file object instead of local URL
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    const data = new FormData();
    data.append("type", formData.type);
    data.append("amount", formData.amount);
    data.append("description", formData.description);
    data.append("date", formData.date);
    if (formData.imageUrl) {
      data.append("image", formData.imageUrl); // send file to backend
    }

    createFuntion({ url: "/transactions", formData: data }).unwrap();

    setFormData({
      type: "expense",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      imageUrl: "",
    });
    setIsModalOpen(false);
  };

  const exportToExcel = () => {
    const exportData = transactions?.map((t) => ({
      Date: new Date(t.date).toLocaleDateString(),
      Type: t?.type.charAt(0).toUpperCase() + t?.type?.slice(1),
      Description: t?.description,
      Amount: t?.amount,
      "Net Amount": t?.type === "income" ? t?.amount : -t?.amount,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  const totalIncome = transactions
    ?.filter((t) => t.type === "income")
    ?.reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    ?.filter((t) => t.type === "expense")
    ?.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">Manage your income and expenses</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToExcel}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export to Excel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-success to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Income</p>
              <p className="text-2xl font-bold">
                ${totalIncome?.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-danger to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Total Expense</p>
              <p className="text-2xl font-bold">
                ${totalExpense?.toLocaleString()}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Net Balance</p>
              <p className="text-2xl font-bold">
                ${(totalIncome - totalExpense)?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-medium text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700">
                  Type
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700">
                  Description
                </th>
                <th className="text-right py-4 px-4 font-medium text-gray-700">
                  Amount
                </th>
                <th className="text-center py-4 px-4 font-medium text-gray-700">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">
                    {transaction.description}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-semibold ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {transaction.imageUrl ? (
                      <img
                        src={transaction.imageUrl}
                        alt="Receipt"
                        className="w-10 h-10 rounded-lg object-cover mx-auto cursor-pointer hover:scale-110 transition-transform"
                        onClick={() =>
                          window.open(transaction.imageUrl, "_blank")
                        }
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add Transaction
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receipt/Proof (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-primary hover:text-blue-600"
                    >
                      Click to upload receipt
                    </label>
                    {formData.imageUrl && (
                      <p className="text-sm text-green-600 mt-2">
                        Image uploaded!
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Add Transaction
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Transactions;
