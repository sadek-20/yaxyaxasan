import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for the dashboard
const mockData = {
  summary: {
    totalIncome: 12450,
    totalExpense: 8750,
    netBalance: 3700
  },
  chartData: [
    { month: 'Jan', income: 8000, expense: 6000 },
    { month: 'Feb', income: 9500, expense: 7200 },
    { month: 'Mar', income: 11000, expense: 8500 },
    { month: 'Apr', income: 10200, expense: 7800 },
    { month: 'May', income: 12450, expense: 8750 },
  ],
  recentTransactions: [
    {
      id: 1,
      type: 'income',
      amount: 3500,
      description: 'Salary Payment',
      date: '2025-01-15',
      imageUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=64'
    },
    {
      id: 2,
      type: 'expense',
      amount: 120,
      description: 'Grocery Shopping',
      date: '2025-01-14',
      imageUrl: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=64'
    },
    {
      id: 3,
      type: 'expense',
      amount: 50,
      description: 'Gas Station',
      date: '2025-01-13',
      imageUrl: 'https://images.pexels.com/photos/33488/gasoline-gas-station-fuel-refuel.jpg?auto=compress&cs=tinysrgb&w=64'
    },
    {
      id: 4,
      type: 'income',
      amount: 250,
      description: 'Freelance Project',
      date: '2025-01-12',
      imageUrl: 'https://images.pexels.com/photos/7681087/pexels-photo-7681087.jpeg?auto=compress&cs=tinysrgb&w=64'
    },
  ]
}

function Dashboard() {
  const { summary, chartData, recentTransactions } = mockData

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your financial overview.</p>
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
              <p className="text-3xl font-bold">${summary.totalIncome.toLocaleString()}</p>
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
              <p className="text-3xl font-bold">${summary.totalExpense.toLocaleString()}</p>
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
              <p className="text-3xl font-bold">${summary.netBalance.toLocaleString()}</p>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Income vs Expense Trend</h2>
        <div className="h-80">
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
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{transaction.description}</td>
                  <td className={`py-4 px-4 text-right font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-danger'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
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
      </motion.div>
    </div>
  )
}

export default Dashboard