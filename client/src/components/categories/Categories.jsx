import React from "react";
import "./categories.scss";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Categories = () => {
    const { data } = useFetch(`/categories/all`);

    return (
        <div className="categories">
            <h2>Categories</h2>
            <div className="categoriesWrapper">
                {
                    data && data.map(item => (
                        <div className="catCard" key={item?._id}>
                            <img
                                src={item?.img}
                                alt=""
                            />
                            <button>
                                <Link
                                    className="link"
                                    to={`/products/${item?.title}`}
                                >
                                    {item?.title}
                                </Link>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Categories;


// const Categories = () => {
//     const [cat, setCat] = useState([{}]);
//     const { data } = useFetch(`/categories/all`);

//     useEffect(() => {
//         const demoCat = [];
//         data && data.map(d => (
//             demoCat.push({
//                 title: d.title,
//                 img: d.img
//             })
//         ))
//         setCat(demoCat);
//     }, [data]);

//     const categories = {
//         col1: {
//             row1: {
//                 title: cat[0]?.title,
//                 img: cat[0]?.img
//             },
//             row2: {
//                 title: cat[1]?.title,
//                 img: cat[1]?.img
//             }
//         },
//         col2: {
//             row1: {
//                 title: cat[2]?.title,
//                 img: cat[2]?.img
//             }
//         },
//         col3: {
//             row1: {
//                 col1: {
//                     title: cat[2]?.title,
//                     img: cat[2]?.img
//                 },
//                 col2: {
//                     title: cat[2]?.title,
//                     img: cat[2]?.img
//                 }
//             },
//             row2: {
//                 title: cat[2]?.title,
//                 img: cat[2]?.img
//             }
//         }
//     }

//     const { col1, col2, col3 } = categories;

//     return (
//         <div className="categories">
//             <div className="col">
//                 <div className="row">
//                     <img
//                         src={col1.row1.img}
//                         alt=""
//                     />
//                     <button>
//                         <Link
//                             className="link"
//                             to={`/products/${col1.row1.title}`}
//                         >
//                             {col1.row1.title}
//                         </Link>
//                     </button>
//                 </div>
//                 <div className="row">
//                     <img
//                         src={col1.row2.img}
//                         alt=""
//                     />
//                     <button>
//                         <Link
//                             className="link"
//                             to={`/products/${col1.row2.title}`}
//                         >
//                             {col1.row2.title}
//                         </Link>
//                     </button>
//                 </div>
//             </div>
//             <div className="col">
//                 <div className="row">
//                     {" "}
//                     <img
//                         src={col2.row1.img}
//                         alt=""
//                     />
//                     <button>
//                         <Link
//                             className="link"
//                             to={`/products/${col2.row1.title}`}
//                         >
//                             {col2.row1.title}
//                         </Link>
//                     </button>
//                 </div>
//             </div>
//             <div className="col col-l">
//                 <div className="row">
//                     <div className="col">
//                         <div className="row">
//                             <img
//                                 src={col3.row1.col1.img}
//                                 alt=""
//                             />
//                             <button>
//                                 <Link
//                                     className="link"
//                                     to={`/products/${col3.row1.col1.title}`}
//                                 >
//                                     {col3.row1.col1.title}
//                                 </Link>
//                             </button>
//                         </div>
//                     </div>
//                     <div className="col">
//                         <div className="row">
//                             {" "}
//                             <img
//                                 src={col3.row1.col2.img}
//                                 alt=""
//                             />
//                             <button>
//                                 <Link
//                                     className="link"
//                                     to={`/products/${col3.row1.col2.title}`}
//                                 >
//                                     {col3.row1.col2.title}
//                                 </Link>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <img
//                         src={col3.row2.img}
//                         alt=""
//                     />
//                     <button>
//                         <Link
//                             className="link"
//                             to={`/products/${col3.row2.title}`}
//                         >
//                             {col3.row2.title}
//                         </Link>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };