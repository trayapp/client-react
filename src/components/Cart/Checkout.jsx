import React from "react";
import { MdChevronRight, MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { LOAD_HOSTELS } from "../../GraphQL/queries/user";
import { convertNumberToLetter, createRange } from "../../utils";

export const HostelListComponent = ({ setSelectedHostel, className }) => {
  const { data, loading } = useQuery(LOAD_HOSTELS, {
    fetchPolicy: "network-only",
  });
  const [hostelList, setHostelList] = React.useState([]);
  const genders = ["MALE", "FEMALE", "OTHERS"];
  const [currentGender, setCurrentGender] = React.useState("");
  const [currentHostel, setCurrentHostel] = React.useState("");
  const [currentFloor, setCurrentFloor] = React.useState("");
  const [currentRoom, setCurrentRoom] = React.useState("");
  const selectClass = `border-none outline-none cursor-pointer focus:outline-none bg-gray-800 w-full text-slate-200 rounded-md px-3 py-2`;
  let hostelData;
  hostelData = React.useRef(hostelData);
  React.useEffect(() => {
    if (currentHostel !== "" && currentFloor !== "" && currentRoom !== "") {
      hostelData.current = {
        name:
          currentHostel.split(";") &&
          currentHostel.split(";").length > 0 &&
          currentHostel.split(";")[1],
        room: `${currentFloor}-Room${currentRoom}`,
      };
    }
    if (!loading && data) {
      setHostelList(data.hostels);
    }
  }, [currentFloor, currentHostel, currentRoom, data, hostelData, loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={className}
    >
      <fieldset className="flex gap-2 w-[15rem]">
        <label htmlFor="gender" className="text-lg font-semibold text-gray-100">
          Gender:
        </label>
        <select
          id="gender"
          value={currentGender}
          onChange={(e) => {
            setCurrentHostel("");
            setCurrentGender(e.target.value);
          }}
          className={selectClass}
        >
          <option value="" disabled defaultValue="">
            Select Gender
          </option>
          {genders.map((gender, idx) => (
            <option key={idx} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </fieldset>
      {currentGender !== "" && (
        <>
          <motion.fieldset
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: -0.85 }}
            className="flex gap-2 w-[15rem] cursor-pointer"
          >
            <label
              htmlFor="hostel"
              className="text-lg font-semibold text-gray-100"
            >
              Hostel:
            </label>
            <select
              id="hostel"
              className={selectClass}
              value={currentHostel}
              onChange={(e) => setCurrentHostel(e.target.value)}
            >
              <option value="" disabled defaultValue="">
                Select Hostel
              </option>
              {hostelList &&
                hostelList.length > 0 &&
                hostelList
                  ?.filter((n) => n.gender === currentGender)
                  .map((hostel, idx) => (
                    <option
                      key={idx}
                      value={`${hostel.shortName};${hostel.isFloor};${hostel.floorCount}`}
                    >
                      {hostel.name}
                    </option>
                  ))}
            </select>
          </motion.fieldset>
          {currentHostel !== "" && (
            <>
              <motion.fieldset
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: -0.85 }}
                className="flex gap-2 w-[15rem] cursor-pointer"
              >
                <label
                  htmlFor={
                    currentHostel.split(";")[1] === "true" ? "floor" : "flat"
                  }
                  className="text-lg font-semibold text-gray-100"
                >
                  {currentHostel.split(";")[1] === "true" ? "Floor:" : "Flat:"}
                </label>
                <select
                  id={currentHostel.split(";")[1] === "true" ? "floor" : "flat"}
                  className={selectClass}
                  value={currentFloor}
                  onChange={(e) => setCurrentFloor(e.target.value)}
                >
                  <option value="" disabled defaultValue="">
                    Select{" "}
                    {currentHostel.split(";")[1] === "true" ? "Floor" : "Flat"}
                  </option>
                  {createRange(1, parseInt(currentHostel.split(";")[2])).map(
                    (n, idx) => (
                      <option
                        key={idx}
                        value={
                          currentHostel.split(";")[1] === "true"
                            ? `floor ${convertNumberToLetter(n)}`
                            : `flat ${n}`
                        }
                      >
                        {currentHostel.split(";")[1] === "true"
                          ? `floor ${convertNumberToLetter(n)}`
                          : `flat ${n}`}
                      </option>
                    )
                  )}
                </select>
              </motion.fieldset>
              {currentFloor !== "" && (
                <motion.fieldset
                  initial={{ scale: -0.85 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.85 }}
                  className="flex gap-2 w-[15rem]"
                >
                  <label
                    htmlFor="room-no"
                    className="text-lg font-semibold text-gray-100"
                  >
                    Room No:
                  </label>
                  <input
                    className={selectClass}
                    type="number"
                    value={currentRoom}
                    onChange={(e) => setCurrentRoom(e.target.value)}
                    id="room-no"
                  />
                </motion.fieldset>
              )}
            </>
          )}
        </>
      )}
    </motion.div>
  );
};
const Checkout = ({ options, setShow, total }) => {
  const [filter, setFilter] = React.useState("1");
  const [price, setPrice] = React.useState(options[1].price);
  const [selectedHostel, setSelectedHostel] = React.useState(null);
  const [showHostelList, setShowHostelList] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col overflow-y-hidden"
    >
      {filter === "0" && showHostelList && (
        <HostelListComponent
          setShowHostelList={setShowHostelList}
          setSelectedHostel={setSelectedHostel}
          selectedHostel={selectedHostel}
          className="w-full h-full border-b flex flex-col gap-1 items-center justify-center"
        />
      )}
      <div
        className={`w-full h-full mt-2 duration-100 flex flex-col`}
      >
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
                className="fill-slate-100 z-30 cursor-pointer hover:fill-red-400 w-8 h-8"
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
        {/* Total Area */}
        <div
          style={{
            transform: `${
              showHostelList && filter === "0" ? "translateY(100vh)" : "none"
            }`,
          }}
          className="w-full flex-1 bg-cartTotal transition-all duration-100 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2"
        >
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
      </div>
    </motion.div>
  );
};

export default Checkout;
