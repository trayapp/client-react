import React from "react";
import { MdChevronRight, MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { LOAD_HOSTELS } from "../../GraphQL/queries/user";

export const HostelListComponent = ({ setShowHostelList, className }) => {
  const { data, loading } = useQuery(LOAD_HOSTELS);
  const [hostelList, setHostelList] = React.useState([]);

  React.useEffect(() => {
    if (!loading && data) {
      setHostelList(data.hostels);
    }
  }, [data, loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={className}
    >
      <fieldset className="flex gap-2 w-[15rem]">
        <label htmlFor="gender" className="text-lg font-semibold text-gray-100">Gender:</label>
        <select id="gender" className="border-none outline-none focus:outline-none bg-gray-800 w-full text-slate-200 rounded-md px-3 py-2">
        <option value="male">Male</option>
        <option value="female">Female</option>
        </select>
      </fieldset>
      <fieldset className="flex gap-2 w-[15rem]">
        <label htmlFor="hostel" className="text-lg font-semibold text-gray-100">Hostel:</label>
        <select id="hostel" className="border-none outline-none focus:outline-none bg-gray-800 w-full text-slate-200 rounded-md px-3 py-2">
          {hostelList &&
            hostelList.length > 0 &&
            hostelList.map((hostel, idx) => (
              <option value={hostel.shortName}>{hostel.name}</option>
            ))}
        </select>
      </fieldset>
    </motion.div>
  );
};
const Checkout = ({ options, setShow, total }) => {
  const [filter, setFilter] = React.useState("1");
  const [price, setPrice] = React.useState(options[0].price);
  const [selectedHostel, setSelectedHostel] = React.useState(null);
  const [showHostelList, setShowHostelList] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col"
    >
      {filter === "0" && showHostelList && (
        <HostelListComponent
          setShowHostelList={setShowHostelList}
          setSelectedHostel={setSelectedHostel}
          selectedHostel={selectedHostel}
          className="w-full h-full z-20 border-b flex flex-col gap-1 items-center justify-center"
        />
      )}
      <div className="w-full h-[50%] flex flex-col gap-3 transition-all duration-150 justify-center items-center">
        {filter === "0" && showHostelList ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MdChevronRight
              onClick={() => setShowHostelList(false)}
              style={{ transform: "rotate(90deg)" }}
              className="fill-slate-100 cursor-pointer hover:fill-red-400 w-8 h-8"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MdClose
              onClick={() => {
                setShow(false);
                setFilter("");
              }}
              className="fill-slate-100 cursor-pointer hover:fill-red-400 w-8 h-8"
            />
          </motion.div>
        )}
        <h3 className="text-white text-2xl font-semibold border-b">
          Select Delivary Location:
        </h3>
        <div className="bg-gray-800 shadow-lg w-[80%] gap-3 flex flex-col py-2 px-4 rounded-md">
          {options &&
            options.length > 0 &&
            options.map((n, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer justify-start gap-4"
              >
                <input
                  type="checkbox"
                  id={n?.name}
                  checked={filter === `${idx}` ? true : false}
                  onChange={() => {
                    setPrice(n?.price);
                    setFilter(`${idx}`);
                    if (idx === 0) {
                      setShowHostelList(true);
                    }
                  }}
                  className="w-[35px] cursor-pointer rounded-full"
                />
                <label
                  htmlFor={n?.name}
                  className="text-lg cursor-pointer font-semibold capitalize text-white"
                >
                  {n?.name}
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-400 text-lg">Sub Total</p>
          <p className="text-gray-400 text-lg">₦{total}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-400 text-lg">Location</p>
          <p className="text-gray-400 text-lg">{options[0].name}</p>
        </div>
        <div className="w-full border-b border-gray-600 my-2"></div>

        <div className="w-full flex items-center justify-between">
          <p className="text-gray-200 text-xl font-semibold">Total</p>
          <p className="text-gray-200 text-xl font-semibold">
            ₦{price + total}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          className="w-full p-2 rounded-full bg-gradient-to-tr from-emerald-400 
                    to-emerald-600 text-gray-50 text-lg my-2 hover:shadow-lg"
        >
          Pay Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Checkout;
