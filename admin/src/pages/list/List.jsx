import './list.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { userRequest } from '../../utils/makeRequest';
import { toast } from 'react-toastify';

const List = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [lists, setLists] = useState([]);

  const { data, loading, error } = useFetch(
    `/${path}/all?new=true`,
    (path === "users" || path === "orders") && "userRequest"
  );

  // set data
  useEffect(() => {
    setLists(data);
  }, [data]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(`/${path}/${id}`);
      
      if (res.data?.status !== 200) {
        return toast.error("Something went wrong!", { autoClose: 3000 });
      }

      toast.success(res.data?.message, { autoClose: 2000 });

      setLists(lists.filter(list => list._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // create action column
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} className='link'>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      }
    }
  ]

  return (
    <div className='list'>
      {
        loading ? (
          "Loading please wait..."
        ) : error ? (
          "Something went wrong!!"
        ) : (
          <div className="datatable">
            <div className="datatableTitle">
              <span>{path}</span>
              {
                path !== "orders" && (
                  <Link to={`/${path}/new`} className='link linkStyle'>
                    <button> Add New</button>
                  </Link>
                )
              }
            </div>
            <DataGrid
              rows={lists}
              columns={columns.concat(actionColumn)}
              disableRowSelectionOnClick
              disableSelectionOnClick
              pageSize={10}
              getRowId={row => row._id}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        )
      }
    </div>
  )
}

export default List;