import "./featuredInfo.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../utils/makeRequest";

const FeaturedInfo = () => {
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try{
                const res = await userRequest.get("/orders/income");
                setIncome(res.data);
                setPerc( (res.data[1]?.total*100) / res.data[0]?.total - 100 );
            } catch(err) {
                console.log(err.message)
            }
        }
        getIncome();
    }, []);

    // console.log(income[1]?.total);

    return (
        <div className="featuredInfo">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$1200</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(perc) || 2.4} 
                        {
                            perc < 0 ? (
                                <ArrowDownward className="featuredIcon negative" />
                            ) : (
                                <ArrowUpward className="featuredIcon" />
                            )
                        }
                  
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,415</span>
                    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,225</span>
                    <span className="featuredMoneyRate">
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}

export default FeaturedInfo;