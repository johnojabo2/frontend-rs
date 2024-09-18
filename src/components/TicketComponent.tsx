import { setTicketId, showPrintoutModal, showTicketModal } from "../store/slices/general.slice";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { getAllUserTickets, updateTicket } from "../store/actions";
import { formatDate } from "../utils/formatdate.util";
import { constant } from "../configs/constant.config";
import TicketDetailModal from "./TicketDetailModal";
import styles from "../styles/Tickets.module.scss";
import { AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import { CgPrinter } from "react-icons/cg";
import PDFPrintout from "./PDFPrintout";
import Pagination from "./Pagination";

const TicketComponent = () => {
  const ticketArrData = useAppSelector((state) => state.ticket.ticketArrData);
  const showPrintOut = useAppSelector((state) => state.general.showPrintOut);
  const showModal = useAppSelector((state) => state.general.showModal);
  const isLoading = useAppSelector((state) => state.ticket.isLoading);
  const totalPgs = useAppSelector((state) => state.ticket.totalPages);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const user = useAppSelector((state) => state.auth.userData);
  const successUpd = useAppSelector((state) => state.ticket.successUpd);
  const successCan = useAppSelector((state) => state.ticket.successCan);
  const hasError = useAppSelector((state) => state.ticket.error);
  const [currentPg, setCurrentPg] = useState(1);
  const isPDFViewLoaded = useAppSelector(
    (state) => state.general.isPDFViewLoading
  );
  const { uploadLogo, FLWPUBKTest } = constant;
  const dispatch = useAppDispatch();
  const labels =
    role === "User"
      ? ["Ticket ID", "Date", "From", "To", "Seat(s)", "Amount", "Status"]
      : [
          "Ticket ID",
          "Date",
          "From",
          "To",
          "Seat(s)",
          "Amount",
          "Status",
          "User",
        ];

  const tableData = ticketArrData
    ? ticketArrData.map((data) => {
        return {
          id: data.id,
          slug: data.slug,
          date: formatDate(data.date),
          from: data.from,
          to: data.to,
          seat: `${data.seat}`,
          amount: data.amount,
          status: data.status,
          user: data?.user?.matricNo,
        };
      })
    : [];

  const config = {
    public_key: FLWPUBKTest,
    tx_ref: "",
    amount: 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email as string,
      phone_number: user?.phone as string,
      name: `${user?.firstName} ${user?.lastName}` as string,
    },
    customizations: {
      title: "RideSmart",
      description: "Payment for Ticket",
      logo: uploadLogo,
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay",
    callback: (response: any) => {
      const data = response;
      console.log("RES => ", response);
      if (data.status === "successful" || data.status === "completed") {
        dispatch(
          updateTicket({
            tx_ref: data.tx_ref,
            transaction_id: `${data.transaction_id}`,
          })
        );
      }

      closePaymentModal();
    },
    onClose: () => {
      if (successUpd) dispatch(getAllUserTickets({ limit: 10, page: 1 }));
    },
  };

  const viewModal = (id: string) => {
    dispatch(setTicketId(id));
    dispatch(showTicketModal(true));
  };

  const viewPrintModal = (id: string) => {
    dispatch(setTicketId(id));
    dispatch(showPrintoutModal(true));
  };

  useEffect(() => {
    dispatch(getAllUserTickets({ limit: 9, page: currentPg }));
  }, [dispatch, successCan, successUpd, currentPg]);

  const handlePageChange = (page: number) => {
    setCurrentPg(page);
  };

  return (
    <>
      {showModal && <TicketDetailModal />}
      {showPrintOut && <PDFPrintout />}
      {showPrintOut && !isPDFViewLoaded && (
        <>
          <button
            className={styles.btn_close}
            onClick={() => dispatch(showPrintoutModal(false))}
          >
            Close
          </button>
          <button
            className={styles.desktop_btn_close}
            onClick={() => dispatch(showPrintoutModal(false))}
          >
            Close
          </button>
        </>
      )}

      <div className={styles.dashTable}>
        {isLoading ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            Ticket loading, Please Wait...
          </h1>
        ) : hasError ? (
          <h1 className="text-[#09483D] font-bold text-2xl text-center">
            An error occured...
          </h1>
        ) : (
          <>
            {tableData.length === 0 ? (
              <h1 className="text-[#09483D] font-bold text-2xl text-center">
                {role === "User"
                  ? "No Ticket Booked Yet!"
                  : "No Ticket verified Yet!"}
              </h1>
            ) : (
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
                  <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                      {labels.map((lbl, i) => (
                        <th
                          key={i.toString()}
                          scope="col"
                          className="py-3 px-2"
                        >
                          <div className="flex items-center">
                            {lbl}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-1 w-3 h-3"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 320 512"
                            >
                              <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                            </svg>
                          </div>
                        </th>
                      ))}
                      <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, i) => (
                      <tr key={i.toString()} className={styles.dashTableTR}>
                        <th
                          scope="row"
                          className="py-4 px-2 text-gray-900 whitespace-nowrap flex items-center"
                        >
                          {item.id}
                        </th>
                        <td className="py-1 px-2 text-gray-900">{item.date}</td>
                        <td className="py-1 px-2 text-gray-900">{item.from}</td>
                        <td className="py-1 px-2 text-gray-900">{item.to}</td>
                        <td className="py-1 px-2 text-gray-900">{item.seat}</td>
                        <td className="py-1 px-2 text-gray-900">
                          {item.amount}
                        </td>
                        <td
                          className={`py-1 px-3 flex items-center ml-3 text-gray-200`}
                        >
                          <p
                            className={`w-fit py px-1 rounded-md ${
                              item.status === "Paid"
                                ? "bg-green-500"
                                : item.status === "Cancelled"
                                ? "bg-red-500"
                                : item.status === "Refunded"
                                ? "bg-orange-500"
                                : item.status === "Used"
                                ? "bg-blue-500"
                                : item.status === "Active"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {item.status}
                          </p>
                        </td>
                        {role === "Driver" && (
                          <td className="py-1 px-2 text-gray-900">
                            {item.user}
                          </td>
                        )}
                        <td className="py-4 px-4 text-gray-900">
                          <span className="flex items-center space-x-1">
                            <AiOutlineEye
                              size={"1.2rem"}
                              onClick={() => viewModal(item.id)}
                              className="mr-2 cursor-pointer text-[#09483D] hover:text-green-600"
                            />
                            <CgPrinter
                              size={"1.2rem"}
                              onClick={() => viewPrintModal(item.id)}
                              className="cursor-pointer text-blue-300 hover:text-blue-600"
                            />
                          </span>
                        </td>
                        {role === "User" && (
                          <td>
                            <FlutterWaveButton
                              {...fwConfig}
                              tx_ref={item.id}
                              amount={+item.amount}
                              className={styles.btn_pay}
                              disabled={item.status !== "Active"}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {!hasError && !isLoading && totalPgs > 1 && (
        <Pagination
          totalPages={totalPgs}
          currentPage={currentPg}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default TicketComponent;
