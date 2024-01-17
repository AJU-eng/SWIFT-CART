import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  YearlySales,
  downloadReport,
  getOrders,
  getTotalData,
  monthlySales,
  weeklySales,
} from "../../../redux/features/AdminSlice";
// import {LineChart,XAxis,Tooltip,CartesianGrid,Line,YAxis} from "recharts"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// import ReportModal from "./reportModal";
import {jsPDF} from "jspdf"
import autotable from "jspdf-autotable"
function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.admin.sales);
  const [visible,setVisible]=useState(false)
  


    
  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Sales This Week",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)", // Set your desired background color
        borderColor: "rgba(75,192,192,1)", // Set your desired border color
        borderWidth: 1,
      },
    ],
  });

 

  const TotalDatas = useSelector((state) => state.admin.TotalData);
  useEffect(() => {
    dispatch(getTotalData());
    dispatch(weeklySales());
    dispatch(getOrders())
  }, [dispatch]);

  useEffect(() => {
    if (TotalDatas) {
      console.log(TotalDatas);
    }
    if (data) {
      setChartData({
        labels: data.map((item) => item.product),
        datasets: [
          {
            label: "Total Sales This Week",
            data: data.map((item) => item.totalSales),
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [TotalDatas, data]);
  return (
    <div>
      {/* <p>DashBoard</p> */}
      <div>
        <div className="flex justify-end mr-10 ">
          <button className="bg-blue-400 w-32 pb-1 text-center text-white rounded-md pt-1" onClick={()=>setVisible(true)}>Download CSV</button>
        </div>
        <div className="flex justify-around">
          <div className="w-60 h-36 bg-white rounded-lg shadow-lg mt-7">
            <p className="text-center font-serif text-slate-600 text-lg pt-3">
              Total Pending Orders
            </p>
            <p className="text-center pt-4 text-3xl text-slate-600">
              {TotalDatas.TotalPendings}
            </p>
          </div>
          <div className="w-60 h-36 bg-white shadow-md mt-7 rounded-lg">
            <p className="text-center text-slate-600 font-serif text-lg pt-3">
              Total Shipped Orders
            </p>
            <p className="text-center pt-4 text-3xl text-slate-600">
              {TotalDatas.TotalShipped}
            </p>
          </div>
          <div className="w-60 h-36 bg-white mt-7 rounded-lg shadow-lg">
            <p className="text-center font-serif text-slate-600 text-lg pt-3">
              Total Customers
            </p>
            <p className="text-center pt-4 text-3xl text-slate-600">
              {TotalDatas.TotalUser}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-14 mt-12">
        <select
          name=""
          className="font-serif border text-lg pb-1 text-center border-slate-500 text-slate-600 w-28 px-3"
          onChange={(e) =>
            e.target.value === "weekly"
              ? dispatch(weeklySales())
              : e.target.value === "monthly"
              ? dispatch(monthlySales())
              : dispatch(YearlySales())
          }
          id=""
        >
          <option value="weekly">weekly</option>
          <option value="monthly">monthly</option>
          <option value="">yearly</option>
        </select>
      </div>
      <div className="w-full h-80 mt-3 mx-10">
        <Bar data={chartData} />
      </div>
      {/* <ReportModal visible={visible}/> */}
    </div>
  );
}

export default Dashboard;
