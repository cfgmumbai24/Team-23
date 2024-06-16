import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdArrowRight } from "react-icons/md";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { BarChart, Wallet, Brush, Wrench, Settings } from "lucide-react";

function Cluster_Dashboard() {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Macbook",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
  //     image:
  //       "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  //   },
  //   {
  //     id: 2,
  //     name: "Macbook",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
  //     image:
  //       "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  //   },
  //   {
  //     id: 2,
  //     name: "Macbook",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
  //     image:
  //       "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  //   },
  //   {
  //     id: 2,
  //     name: "Macbook",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
  //     image:
  //       "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  //   },
  // ];

  const [createProductTranslate, setCreateProductTranslate] = useState("full");

  const handleCreateProductPosition = () => {
    setCreateProductTranslate((prev) => (prev === "full" ? "0" : "full"));
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "1",
    length: "",
    breadth: "",
    weight: "",
    unitCost: "",
    timeToMake: "",
    status: "true",
    quantity: "",
    color: "",
    creatorId: "",
    localId: "",
    keywordIds: "",
  });

  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    files.forEach((file, index) => {
      data.append(`file${index}`, file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Product created successfully");
        setFormData({
          title: "",
          description: "",
          category: "1",
          length: "",
          breadth: "",
          weight: "",
          unitCost: "",
          timeToMake: "",
          status: "true",
          quantity: "",
          color: "",
          // creatorId: "",
          // localId: "",
          keywordIds: "",
        });
        setFiles([]);
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onEdit = (id) => {
    console.log("Edit product", id);
  };

  const onDelete = (id) => {
    console.log("Delete product", id);
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/product/products"
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <>
      <div>
        <div
          className={`text-white absolute top-0 ${
            createProductTranslate === "full"
              ? "-translate-y-full"
              : "translate-y-0"
          } z-10 w-full bg-black flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 transition-transform duration-500 ease-in-out`}
        >
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-white">
              Product Details Form
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Please fill in the product details below.
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="text-base font-medium text-gray-300"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="Sample Product"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="text-base font-medium text-gray-300"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      placeholder="This is a sample product description."
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="text-base font-medium text-gray-300"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="Sample Product"
                      id="title"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="length"
                    className="text-base font-medium text-gray-300"
                  >
                    Length (cm)
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="number"
                      placeholder="10"
                      id="length"
                      value={formData.length}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="breadth"
                    className="text-base font-medium text-gray-300"
                  >
                    Breadth (cm)
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="number"
                      placeholder="5"
                      id="breadth"
                      value={formData.breadth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="weight"
                    className="text-base font-medium text-gray-300"
                  >
                    Weight (kg)
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="number"
                      placeholder="2"
                      id="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="unitCost"
                    className="text-base font-medium text-gray-300"
                  >
                    Unit Cost ($)
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="number"
                      placeholder="100"
                      id="unitCost"
                      value={formData.unitCost}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="timeToMake"
                    className="text-base font-medium text-gray-300"
                  >
                    Time to Make (days)
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="number"
                      placeholder="2"
                      id="timeToMake"
                      value={formData.timeToMake}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="text-base font-medium text-gray-300"
                  >
                    Status
                  </label>
                  <div className="mt-2">
                    <select
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="text-base font-medium text-gray-300"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="number"
                      placeholder="50"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="color"
                    className="text-base font-medium text-gray-300"
                  >
                    Color
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="Red"
                      id="color"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="creatorId"
                    className="text-base font-medium text-gray-300"
                  >
                    Creator ID
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="60c72b2f9b1e8c6d88a8d1d1"
                      id="creatorId"
                      value={formData.creatorId}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="localId"
                    className="text-base font-medium text-gray-300"
                  >
                    Local ID
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="60c72b2f9b1e8c6d88a8d1d2"
                      id="localId"
                      value={formData.localId}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="keywordIds"
                    className="text-base font-medium text-gray-300"
                  >
                    Keyword IDs
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="60c72b2f9b1e8c6d88a8d1d3, 60c72b2f9b1e8c6d88a8d1d4"
                      id="keywordIds"
                      value={formData.keywordIds}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-base font-medium text-gray-300">
                    Upload Images
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onclick={handleSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Submit Product Details
                    <MdArrowRight className="ml-2" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateProductPosition}
                    className="inline-flex w-full items-center justify-center rounded-md bg-red-600 px-3.5 py-2.5 font-semibold leading-7 text-white mt-2 hover:bg-red-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex">
        <aside className="flex h-screen flex-col overflow-y-auto border-r bg-white p-5 w-[20%] sticky top-0">
          <a href="#">
            <img
              src="https://www.myehaat.in/s/609e53c38fa6f71798cbe26e/6296fbbadb6221f24d38bcc5/jpm-logo-120x120.png"
              alt=""
              style={{ width: "20%" }}
            />
          </a>
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6">
              <div className="space-y-3">
                <label className="px-3 text-xs font-semibold uppercase text-gray-300">
                  Analytics
                </label>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <BarChart className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Dashboard</span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Wallet className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Sales</span>
                </a>
              </div>

              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-gray-300">
                  Customization
                </label>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Brush className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Themes</span>
                </a>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Setting</span>
                </a>
              </div>
            </nav>
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <a href="#" className="flex items-center text-gray-600">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="Your avatar"
                />
                <span className="mx-2 text-sm font-medium">Team-23-Cluster</span>
              </a>
              <a
                href="#"
                className="transform rounded-full bg-gray-100 p-2 text-gray-500 transition-colors duration-300 hover:text-gray-700"
              >
                <Settings className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
              <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Money
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  ₹53k
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+55%</strong>&nbsp;than
                  last week
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
              <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Users
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  2,300
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+3%</strong>&nbsp;than last
                  month
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
              <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  New Clients
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  3,462
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-red-500">-2%</strong>&nbsp;than
                  yesterday
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start my-8 py-6 bg-white border rounded-xl">
            <button
              className="border p-2 mx-10 flex items-center gap-x-1 font-semibold rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
              onClick={handleCreateProductPosition}
            >
              <FaPlus className="text-xl text-green-500" /> Add Product
            </button>

            <div className="flex flex-wrap gap-4 w-full px-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative w-full sm:w-[300px] m-4 rounded-md border bg-gray-100 hover:shadow-lg transition duration-300"
                >
                  <img
                    src={product.images[0] || "https://via.placeholder.com/300"} // Fallback to placeholder if no image
                    alt={product.title}
                    className="h-[200px] w-full rounded-t-md object-cover"
                  />
                  <div className="p-4">
                    <h1 className="text-lg font-semibold">{product.title}</h1>
                    <p className="mt-1 text-sm text-gray-600">
                      {truncateText(product.description, 15)}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product.id)}
                      className="flex items-center justify-center rounded-full bg-blue-500 p-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      title="Edit"
                    >
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
                      className="flex items-center justify-center rounded-full bg-red-500 p-2 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      title="Remove"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Cluster_Dashboard;
