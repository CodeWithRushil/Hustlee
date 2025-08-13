import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  AreaChart,
  Area
} from 'recharts';

const MentorAnalytics = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalStudents: 0,
    completedSessions: 0,
    averageRating: 0,
    responseTime: 0,
    sessionDistribution: [],
    studentProgress: [],
    revenueTrend: [],
    satisfactionTrend: [],
    responseTimeTrend: [],
    timeZoneDistribution: [],
    peakHours: []
  });
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('completed');
  const [timeRange, setTimeRange] = useState('month'); // month, quarter, year

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`https://hustlee-9d22.onrender.com/api/mentor/analytics?timeRange=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Mock data for demonstration
      setStats({
        totalEarnings: 2500,
        totalStudents: 12,
        completedSessions: 45,
        averageRating: 4.8,
        responseTime: 15,
        sessionDistribution: [
          { name: 'Web Development', value: 35 },
          { name: 'Data Science', value: 25 },
          { name: 'Mobile Development', value: 20 },
          { name: 'UI/UX Design', value: 15 },
          { name: 'Others', value: 5 }
        ],
        studentProgress: [
          { month: 'Jan', completed: 4, inProgress: 2 },
          { month: 'Feb', completed: 6, inProgress: 3 },
          { month: 'Mar', completed: 8, inProgress: 4 },
          { month: 'Apr', completed: 7, inProgress: 5 },
          { month: 'May', completed: 9, inProgress: 3 },
          { month: 'Jun', completed: 11, inProgress: 4 }
        ],
        revenueTrend: [
          { month: 'Jan', revenue: 1200 },
          { month: 'Feb', revenue: 1800 },
          { month: 'Mar', revenue: 2200 },
          { month: 'Apr', revenue: 1900 },
          { month: 'May', revenue: 2500 },
          { month: 'Jun', revenue: 2800 }
        ],
        satisfactionTrend: [
          { month: 'Jan', rating: 4.5 },
          { month: 'Feb', rating: 4.6 },
          { month: 'Mar', rating: 4.7 },
          { month: 'Apr', rating: 4.8 },
          { month: 'May', rating: 4.8 },
          { month: 'Jun', rating: 4.9 }
        ],
        responseTimeTrend: [
          { month: 'Jan', time: 25 },
          { month: 'Feb', time: 22 },
          { month: 'Mar', time: 20 },
          { month: 'Apr', time: 18 },
          { month: 'May', time: 15 },
          { month: 'Jun', time: 12 }
        ],
        timeZoneDistribution: [
          { name: 'EST', value: 35 },
          { name: 'PST', value: 25 },
          { name: 'GMT', value: 20 },
          { name: 'IST', value: 15 },
          { name: 'Others', value: 5 }
        ],
        peakHours: [
          { hour: '9 AM', sessions: 5 },
          { hour: '10 AM', sessions: 8 },
          { hour: '11 AM', sessions: 6 },
          { hour: '12 PM', sessions: 4 },
          { hour: '1 PM', sessions: 3 },
          { hour: '2 PM', sessions: 7 },
          { hour: '3 PM', sessions: 9 },
          { hour: '4 PM', sessions: 6 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-lg font-semibold">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          className="text-sm font-medium"
        >{`${value} sessions`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#666"
          className="text-sm"
        >
          {`(${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm" style={{ color: entry.color }}>
                {entry.name}: {entry.value} sessions
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const chartVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="rounded-full h-12 w-12 border-b-2 border-purple-500"
        />
      </div>
    );
  }

  const metrics = [
    {
      name: 'Total Earnings',
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Total Students',
      value: stats.totalStudents,
      icon: UserGroupIcon,
      change: '+5%',
      changeType: 'positive'
    },
    {
      name: 'Completed Sessions',
      value: stats.completedSessions,
      icon: ChartBarIcon,
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: StarIcon,
      change: '+0.2',
      changeType: 'positive'
    },
    {
      name: 'Response Time',
      value: `${stats.responseTime} min`,
      icon: ClockIcon,
      change: '-3 min',
      changeType: 'positive'
    },
    {
      name: 'Session Completion',
      value: '92%',
      icon: CheckCircleIcon,
      change: '+2%',
      changeType: 'positive'
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex justify-end space-x-2">
        {['month', 'quarter', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === range
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <motion.div
            key={metric.name}
            variants={itemVariants}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow duration-300"
          >
            <dt>
              <div className="absolute rounded-md bg-purple-500 p-3">
                <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{metric.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </p>
            </dd>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Revenue Trend */}
        <motion.div
          variants={chartVariants}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Satisfaction Trend */}
        <motion.div
          variants={chartVariants}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Satisfaction</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.satisfactionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Response Time Trend */}
        <motion.div
          variants={chartVariants}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Response Time Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.responseTimeTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Session Distribution */}
        <motion.div
          variants={chartVariants}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Session Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={stats.sessionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {stats.sessionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Peak Hours */}
        <motion.div
          variants={chartVariants}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Peak Session Hours</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Time Zone Distribution */}
        <motion.div
          variants={chartVariants}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Time Zones</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.timeZoneDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.timeZoneDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorAnalytics; 
