"use client";

import { use, useEffect, useState } from "react";
import {
  Hotel,
  ShoppingBag,
  Users,
  DollarSign,
} from "lucide-react";
import localClient from "@/app/lib/localClient";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipContentProps,
  TooltipIndex,
} from 'recharts';
import axios from "axios";



const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          
    
        </>
      )}
    </div>
  );
};

const AdminDashboard = ( {isAnimationActive = true,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) => {
  const [stats, setStats] = useState({
    hotels: 10,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const data = localClient.get("dashboard_stats");
    if (data) setStats(data);
  }, []);

  const cards = [
    {
      title: "Total Hotels",
      value: stats.hotels,
      icon: Hotel,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.revenue}`,
      icon: DollarSign,
      color: "bg-orange-500",
    },
  ];
const[data, setData]= useState([])

  const fetchProduct= async()=>{
    const {data}=await axios.get(' https://api.escuelajs.co/api/v1/products')
    const categoryMap={}
    data.map((item)=>{
      if(categoryMap[item.category.name]){
        categoryMap[item.category.name]++
      }else{
        categoryMap[item.category.name]=1
      }
    })
    const output = Object.entries(categoryMap).map(item=>{
       return {category:item[0] ,productQuantity:item[1]}
    })

    setData(output)
  }

  useEffect(()=>{
    fetchProduct()
  },[])


  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your platform
        </p>
      </div>

 <BarChart
      style={{ width: '100%', maxWidth: '300px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 0,
      
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="category" />
      <YAxis width="auto" />
      <Tooltip content={CustomTooltip} isAnimationActive={isAnimationActive} defaultIndex={defaultIndex} />
      <Legend />
      <Bar dataKey="productQuantity" barSize={20} fill="#8884d8" isAnimationActive={isAnimationActive} />
    </BarChart>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${card.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="  bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>🏨 New hotel added</li>
          <li>🛒 Order placed by customer</li>
          <li>👤 New user registered</li>
          <li>💰 Payment received</li>
        </ul>

 
      </div>
    </div>
  );
};

export default AdminDashboard;
