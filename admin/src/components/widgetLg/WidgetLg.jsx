import "./widgetLg.scss";
import Table from "../table/Table";
import useFetch from "../../hooks/useFetch";

const WidgetLg = () => {
    const {
        data, loading, error
    } = useFetch('/orders/all?new=true', 'userRequest');

    return (
        <div className="widgetLg">
            {
                loading ? (
                    "Loading..."
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    <>
                        <span className="widgetLgTitle">Latest Transactions</span>
                        <div className="tableContainer">
                            <Table data={data} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default WidgetLg;