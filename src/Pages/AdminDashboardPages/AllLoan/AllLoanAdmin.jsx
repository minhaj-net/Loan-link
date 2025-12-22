import { useState, useEffect } from "react";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DataTable = () => {
  const [data, setLoans] = useState([]);
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
  //     title: 'Product Design Workshop',
  //     interest: 'Design',
  //     category: 'Workshop',
  //     createdBy: 'John Doe',
  //     showOnHome: true
  //   },
  //   {
  //     id: 2,
  //     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
  //     title: 'Web Development Course',
  //     interest: 'Programming',
  //     category: 'Course',
  //     createdBy: 'Jane Smith',
  //     showOnHome: false
  //   },
  //   {
  //     id: 3,
  //     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
  //     title: 'Digital Marketing Seminar',
  //     interest: 'Marketing',
  //     category: 'Seminar',
  //     createdBy: 'Mike Johnson',
  //     showOnHome: true
  //   },
  //   {
  //     id: 4,
  //     image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop',
  //     title: 'Photography Basics',
  //     interest: 'Photography',
  //     category: 'Course',
  //     createdBy: 'Sarah Wilson',
  //     showOnHome: true
  //   },
  //   {
  //     id: 5,
  //     image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
  //     title: 'Business Strategy',
  //     interest: 'Business',
  //     category: 'Workshop',
  //     createdBy: 'David Brown',
  //     showOnHome: false
  //   }
  // ]);
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("https://loan-link-server-sable.vercel.app/all-loans");
        setLoans(res.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        //
      }
    };
    fetchLoans();
  }, []);
  console.log(data);
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== "undefined") {
      import("aos").then((AOS) => {
        AOS.init({
          duration: 800,
          once: true,
        });
      });
    }
  }, []);

  const handleUpdate = (id) => {
    console.log("Update clicked for id:", id);
    // Update logic here
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for id:", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://loan-link-server-sable.vercel.app/all-loans/${id}`)
          .then((res) => {
            if (res.data.message === "Course deleted successfully") {
              setLoans((prevCourses) =>
                prevCourses.filter((course) => course._id !== id)
              );
              toast.success("✅ Course deleted successfully!");

              Swal.fire({
                title: "Deleted!",
                text: "Your course has been deleted.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              toast.error(" Course not found!");
            }
          })
          .catch(() => {
            toast.error(" Failed to delete course!");
          });
      }
    });

    // Delete logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Data Management Table
        </h1>

        <div
          className="overflow-x-auto bg-white rounded-2xl shadow-2xl"
          data-aos="fade-up"
        >
          <table className="table w-full">
            <thead>
              <tr className="bg-linear-to-r from-purple-500 to-pink-500 text-white">
                <th className="text-center">Image</th>
                <th>Title</th>
                <th>Interest</th>
                <th>Category</th>
                <th>Created By</th>
                <th className="text-center">Show on Home</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-purple-50 transition-colors duration-200"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <td className="text-center">
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-lg ring ring-purple-300 ring-offset-2">
                          <img src={item.loanImage} alt={item.loanTitle} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-gray-800">
                      {item.loanTitle}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {item.interestRate}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-secondary badge-outline">
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-purple-500 text-white rounded-full w-8">
                          {/* <span className="text-xs">
                            {item.createdBy
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span> */}
                        </div>
                      </div>
                      {/* <span className="text-sm font-medium text-gray-700">
                        {item.createdBy}
                      </span> */}
                    </div>
                  </td>
                  <td className="text-center">
                    {item.showOnHome ? (
                      <div className="flex justify-center">
                        <Eye className="text-green-500" size={20} />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <EyeOff className="text-gray-400" size={20} />
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`update-loans/${item._id}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdate(item.id)}
                        className="btn btn-sm btn-info btn-outline"
                        title="Update"
                      >
                        <Edit size={16} />
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-error btn-outline"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-gray-600"
        >
          <p>
            Total Items:{" "}
            <span className="font-bold text-purple-600">{data.length}</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DataTable;
