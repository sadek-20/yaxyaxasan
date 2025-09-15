import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetallFunctionQuery } from "../store/dynamicApi";

function Dashboard() {
  const { data: transactionsData = [], isLoading: transactionsLoading } =
    useGetallFunctionQuery({
      url: "/transactions/user",
    });

  // --- Calculate summary from transactionsData ---
  const summary = transactionsData.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.totalIncome += t.amount;
      } else if (t.type === "expense") {
        acc.totalExpense += t.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0, netBalance: 0 }
  );
  summary.netBalance = summary.totalIncome - summary.totalExpense;

  // --- Group by month for chart data ---
  const chartMap = {};
  transactionsData.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });
    if (!chartMap[month]) {
      chartMap[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === "income") chartMap[month].income += t.amount;
    if (t.type === "expense") chartMap[month].expense += t.amount;
  });
  const chartData = Object.values(chartMap);

  // --- Recent transactions (latest 5) ---
  const recentTransactions = [...transactionsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-gradient-to-br from-success to-green-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Income</p>
              <p className="text-3xl font-bold">
                ${summary.totalIncome.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card bg-gradient-to-br from-danger to-red-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Total Expense</p>
              <p className="text-3xl font-bold">
                ${summary.totalExpense.toLocaleString()}
              </p>
            </div>
            <TrendingDown className="w-12 h-12 text-red-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-gradient-to-br from-primary to-blue-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Net Balance</p>
              <p className="text-3xl font-bold">
                ${summary.netBalance.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-200" />
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Income vs Expense Trend
        </h2>
        <div className="h-80">
          {transactionsLoading ? (
            <p className="text-gray-500">Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={3}
                  name="Expense"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Transactions
        </h2>
        {transactionsLoading ? (
          <p className="text-gray-500">Loading transactions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Description
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
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
                      {transaction.imageUrl && (
                        <img
                          src={transaction.imageUrl}
                          alt="Receipt"
                          className="w-8 h-8 rounded-lg object-cover mx-auto"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
