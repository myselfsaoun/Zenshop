import './home.scss';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Featured from '../../components/featured/Featured'
import AreaChart from '../../components/areaChart/AreaChart'
import LineChart from '../../components/lineChart/LineChart'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { useState, useEffect, useMemo } from 'react';
import { userRequest } from '../../utils/makeRequest';


const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => (
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  ), []);

  useEffect(() => {
    console.log("Refreshed!!");
    const hasRefreshed = localStorage.getItem('hasRefreshedAdmin');

    if (!hasRefreshed) {
      localStorage.setItem('hasRefreshedAdmin', 'true');
      window.location.reload();
    }
  }, []);

  // set user stats
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        console.log("home: ", res.data);
        res.data.map(item =>
          setUserStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total }
          ])
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    getStats();
  }, [MONTHS]);


  return (
    <div className='home'>
      <FeaturedInfo />

      {/* <div className="charts">
        <Featured />
        <AreaChart aspect={2 / 1} title="Last 6  Months (Revenue)" />
      </div> */}

      <LineChart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />

      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home;


