import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { setIsPDFViewLoading } from "../store/slices/general.slice";
import { dateFormat, timeFormat } from "../utils/formatdate.util";
import { titleCase } from "../utils/titlecase.util";
import style from "../styles/Tickets.module.scss";
import React from "react";

// Define your styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingLeft: 40,
  },
  logo: {
    marginBottom: 20,
    width: 120,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailHead: {
    display: "flex",
    flexDirection: "row",
  },
  detailHeadLeft: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "normal",
    color: "gray",
  },
  detailHeadRight: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "extrabold",
  },
  detailItem: {
    padding: 4,
    fontSize: 12,
  },
  tableContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
  },
  tableLeft: {
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    color: "gray",
  },
  tableRight: {
    flexDirection: "column",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    fontStyle: "bold",
  },
  tableCell: {
    borderColor: "#cccccc",
    borderWidth: 1,
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

const PDFPrintout: React.FC = () => {
  const ticketArrData = useAppSelector((state) => state.ticket.ticketArrData);
  const ticketId = useAppSelector((state) => state.general.ticketId);
  const data = ticketArrData?.find((item) => item.id === ticketId);
  const dispatch = useAppDispatch();

  const handlePDFLoaded = () => {
    dispatch(setIsPDFViewLoading(false));
  };

  return (
    <div className={style.pdf_doc} onLoad={handlePDFLoaded}>
      <PDFViewer style={{ width: "100vw", height: "100vh" }}>
        <Document>
          <Page size="A5" style={styles.page}>
            {/* Logo */}
            <Image src="../logo.png" style={styles.logo} />

            {/* Header */}
            <Text style={styles.header}>Ticket Receipt</Text>
            <View style={styles.detailHead}>
              <View style={styles.detailHeadLeft}>
                <Text style={styles.detailItem}>Date</Text>
                <Text style={styles.detailItem}>Time</Text>
                <Text style={styles.detailItem}>Ticket ID</Text>
              </View>
              <View style={styles.detailHeadRight}>
                <Text style={styles.detailItem}>{dateFormat(data?.date as string)}</Text>
                <Text style={styles.detailItem}>{timeFormat(data?.date as string)}</Text>
                <Text style={styles.detailItem}>{data?.id}</Text>
              </View>
            </View>

            {/* Table */}
            <View style={styles.tableContainer}>
              {/* Table Left */}
              <View style={styles.tableLeft}>
                <Text style={styles.tableCell}>Trans. ID</Text>
                <Text style={styles.tableCell}>Payer Name</Text>
                <Text style={styles.tableCell}>Payer Email</Text>
                <Text style={styles.tableCell}>Payer MatricNo</Text>
                <Text style={styles.tableCell}>Payer Phone</Text>
                <Text style={styles.tableCell}>Payment Type</Text>
                <Text style={styles.tableCell}>Ticket Status</Text>
                <Text style={styles.tableCell}>From</Text>
                <Text style={styles.tableCell}>To</Text>
                <Text style={styles.tableCell}>Seat(s)</Text>
                <Text style={styles.tableCell}>Price</Text>
                <Text style={styles.tableCell}>Amount</Text>
              </View>

              {/* Table Right */}
              <View style={styles.tableRight}>
                <Text style={styles.tableCell}>{data?.trans_id || "None"}</Text>
                <Text style={styles.tableCell}>{`${data?.user.firstName} ${data?.user.lastName}`}</Text>
                <Text style={styles.tableCell}>{data?.user.email}</Text>
                <Text style={styles.tableCell}>{data?.user.matricNo}</Text>
                <Text style={styles.tableCell}>{data?.user.phone}</Text>
                <Text style={styles.tableCell}>{data?.status === "Active" ? "Yet to pay" : titleCase(data?.payment_type as string)}</Text>
                <Text style={styles.tableCell}>{data?.status}</Text>
                <Text style={styles.tableCell}>{data?.from}</Text>
                <Text style={styles.tableCell}>{data?.to}</Text>
                <Text style={styles.tableCell}>{data?.seat}</Text>
                <Text style={styles.tableCell}>{`${+(data?.amount as string)/(data?.seat as number)}`}</Text>
                <Text style={styles.tableCell}>{data?.amount}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PDFPrintout;
