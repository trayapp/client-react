import React from "react";
import { MdChevronRight, MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { LOAD_HOSTELS } from "../../GraphQL/queries/user";
import { convertNumberToLetter, createRange } from "../../utils";

export const HostelListComponent = ({
  setSelectedHostel,
  className,
  setShowHostelList,
  selectedHostel,
}) => {
  const { data, loading } = useQuery(LOAD_HOSTELS, {
    fetchPolicy: "network-only",
  });
  const [hostelList, setHostelList] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const genders = ["MALE", "FEMALE", "OTHERS"];
  const [currentGender, setCurrentGender] = React.useState(
    `${selectedHostel !== null ? selectedHostel.gender : ``}`
  );
  const [currentHostel, setCurrentHostel] = React.useState(
    `${selectedHostel !== null ? selectedHostel.hostel : ``}`
  );
  const [currentFloor, setCurrentFloor] = React.useState(
    `${selectedHostel !== null ? selectedHostel.room.split(";")[0] : ``}`
  );
  const [currentRoom, setCurrentRoom] = React.useState(
    `${
      selectedHostel !== null
        ? selectedHostel.room.split(";")[1].split(" ")[1]
        : ``
    }`
  );
  const selectClass = `border-none outline-none focus:shadow-lg shadow-2xl active:shadow-lg cursor-pointer focus:outline-none bg-gray-800 w-full text-slate-200 rounded-md px-3 py-2`;
  let hostelData;
  hostelData = React.useRef(hostelData);
  React.useEffect(() => {
    if (currentHostel !== "" && currentFloor !== "" && currentRoom !== "") {
      hostelData.current = {
        gender: currentGender,
        hostel: currentHostel,
        room: `${currentFloor};Room ${currentRoom}`,
      };
    }
    if (!loading && data) {
      setHostelList(data.hostels);
    }
  }, [
    currentFloor,
    currentGender,
    currentHostel,
    currentRoom,
    data,
    hostelData,
    loading,
  ]);
  const handleForm = (action) => {
    if (action) {
      setShowHostelList(false);
      setSelectedHostel(hostelData.current);
    }
  };
  return (
    <>
      {showAlert && (
        <div className="w-full h-screen z-50 backdrop-blur-sm fixed top-0 bottom-0 bg-overlay flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="bg-primary rounded-lg shadow-md w-[15rem]"
          >
            <p className="text-base font-semibold py-3 px-6 capitalize">
              Set selected hostel as default
            </p>
            <div className="border-t w-full h-1 border-orange-300"></div>
            <div className="flex gap-1 px-2 justify-end items-end">
              <button
                onClick={() => handleForm("yes")}
                className="text-lg font-semibold capitalize py-2 px-4 transition-all duration-100 hover:shadow-none shadow-md rounded-lg my-2 bg-orange-400 hover:bg-orange-500"
              >
                yes
              </button>
              <button
                onClick={() => handleForm("no")}
                className="text-lg font-semibold capitalize py-2 px-4 rounded-full transition-all duration-150 hover:bg-slate-200 my-2"
              >
                no
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={className}
      >
        <fieldset className="flex gap-2 w-[15rem]">
          <label htmlFor="gender" className="sr-only">
            Gender:
          </label>
          <select
            id="gender"
            value={currentGender}
            onChange={(e) => {
              setCurrentHostel("");
              setCurrentFloor("");
              setCurrentRoom("");
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
              <label htmlFor="hostel" className="sr-only">
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
                    className="sr-only"
                  >
                    {currentHostel.split(";")[1] === "true"
                      ? "Floor:"
                      : "Flat:"}
                  </label>
                  <select
                    id={
                      currentHostel.split(";")[1] === "true" ? "floor" : "flat"
                    }
                    className={selectClass}
                    value={currentFloor}
                    onChange={(e) => setCurrentFloor(e.target.value)}
                  >
                    <option value="" disabled defaultValue="">
                      Select{" "}
                      {currentHostel.split(";")[1] === "true"
                        ? "Floor"
                        : "Flat"}
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
                  <>
                    <motion.fieldset
                      initial={{ scale: 0.85 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.85 }}
                      className="flex gap-2 w-[15rem]"
                    >
                      <label htmlFor="room-no" className="sr-only">
                        Room No:
                      </label>
                      <input
                        className={`${selectClass} cursor-text no-arrows`}
                        min="1"
                        type="number"
                        value={currentRoom}
                        placeholder="Room Number"
                        onChange={(e) => setCurrentRoom(e.target.value)}
                        id="room-no"
                      />
                    </motion.fieldset>
                    {currentRoom !== "" && (
                      <motion.fieldset
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                      >
                        <motion.button
                          whileTap={{ scale: 0.75 }}
                          className="bg-gradient-to-tr hover:from-slate-400 hover:to-slate-300 from-gray-400 to-gray-300 px-4 py-3 my-2
                            text-lg font-semibold transition-all duration-150 w-[15rem] border-none shadow-2xl"
                          onClick={() => setShowAlert(true)}
                          type="submit"
                        >
                          Done
                        </motion.button>
                      </motion.fieldset>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </motion.div>
    </>
  );
};
const Checkout = ({ options, setShow, total }) => {
  const [filter, setFilter] = React.useState("portal");
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
      {/* HOSTEL LISTER */}
      {filter === "hostel" && showHostelList && (
        <HostelListComponent
          setShowHostelList={setShowHostelList}
          setSelectedHostel={setSelectedHostel}
          selectedHostel={selectedHostel}
          className="w-full h-full rounded-b-2xl flex my-4 flex-col gap-1 items-center justify-center"
        />
      )}
      <div className={`w-full h-full mt-2 duration-100 flex flex-col`}>
        <div className="w-full h-[50%] flex flex-col gap-3 transition-all duration-150 justify-center items-center">
          {filter === "hostel" && showHostelList ? (
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
                    checked={filter === `${n?.name}` ? true : false}
                    onChange={() => {
                      setPrice(n?.price);
                      setFilter(`${n?.name}`);
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
              showHostelList && filter === "hostel" ? "translateY(100vh)" : "none"
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
            <p className="text-gray-300 select-text text-lg capitalize">
              {selectedHostel !== null && filter === "hostel"
                ? `${selectedHostel?.hostel.split(";")[0]} ${
                    selectedHostel.room.split(";")[0]
                  } ${selectedHostel.room.split(";")[1]}`
                : filter}
            </p>
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
