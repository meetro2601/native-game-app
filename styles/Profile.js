import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  headerMid: {
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "#000000",
    textAlign: "center",
    // fontFamily: Roboto,
    fontSize: 24,
  },
  font20: { fontSize: 24 },
  headerRight: {
    //borderRadius: "50%",
    padding: 0,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  defaultImg: {
    alignSelf: "center",
    marginTop: 16,
    height: 100,
    width: 100,
  },
  formLabel: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
    height: 50,
    position: "relative",
    borderRadius: 20,
    alignSelf: "center",
  },
  formLabelIcon: {
    flexDirection: "row-reverse",
    position: "relative",
    height: 60,
  },
  fromControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 0.5,
    height: 54,
    borderColor: "#D3CFCF",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "bold",
  },
  formInput: {
    borderWidth: 0,
    opacity: 1,
    borderRadius: 20,
    //borderWidth:1,
    backgroundColor: "#FAFCFF",
    width: "100%",
  },
  submitBtn: {
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#157BF2",
    height: 74,
    marginTop: 30,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginHorizontal: 12,
    marginTop: 4,
  },
  submitBtnText: {
    color: "#FFFCFC",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: 700,
  },
  button: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    fontFamily: "Roboto",
    alignItems: "center",
    width: "100%",
    height: 60,
    fontWeight: 400,
  },
  buttonPrimary: {
    color: "#ffffff",
    backgroundColor: "#157BF2",
    borderRadius: 30,
    justifyContent: "center",
    shadowColor: "rgba(21, 123, 242, 0.25)",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
  },
});
