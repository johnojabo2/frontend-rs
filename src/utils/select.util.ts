export const customStyles = (from: boolean, to: boolean) => {
  return {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      background: state.isSelected ? "#1B5430" : "white",
      color: state.isSelected ? "#f2f2f2" : "#1F2937",
      cursor: "pointer",
      ":hover": { background: "#F0FDF4", color: "#1F2937" },
    }),
    clearIndicator: (defaultStyles: any) => ({
      ...defaultStyles,
      cursor: "pointer",
      ":hover": { color: "#DC2626" },
    }),
    dropdownIndicator: (defaultStyles: any) => ({
      ...defaultStyles,
      cursor: "pointer",
      display: "none",
      ":hover": { color: "white" },
    }),
    input: (defaultStyles: any) => ({
      ...defaultStyles,
      caretColor: "transparent",
      border: "none",
    }),
    menu: (defaultStyles: any) => ({
      ...defaultStyles,
      background: "rgba(0 0 0 .8)",
    }),
    noOptionsMessage: (defaultStyles: any) => ({
      ...defaultStyles,
      background: "#374151",
      color: "white",
    }),
    singleValue: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      fontWeight: "bold",
      paddingTop: "1.2rem",
      color: state.isFocused || state.isSelected ? "#374156" : to || from ? "#DC2626": "#374156",
      width: "100%",
    }),
    control: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      borderRadius: "10px",
      boxShadow: to || from ?  "#DC2626" : "#1B5430",
      border: `1px solid ${to || from ?  "#DC2626" : state.isSelected || state.isFocused ? "#1B5430" : "#9CA3AF"}`,
      ":hover": {
        border: `1px solid ${to || from ? '#DC2626' : '#1B5430'}`,
      },
    }),
    container: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      borderRadius: "10px",
      boxShadow: to || from ?  "#DC2626" : "#1B5430",
      border: `1px solid ${to || from ?  "#DC2626" : state.isSelected || state.isFocused ? "#1B5430" : "#9CA3AF"}`,

      ":hover": {
        border: `1px solid ${to || from ? '#DC2626' : '#1B5430'}`,
      },
    }),
  };
};
