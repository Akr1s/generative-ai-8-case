import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import userEvent from "@testing-library/user-event";

const getFirstNameTextbox = () =>
  screen.getByRole("textbox", {
    name: "First Name*",
  });
const getLastNameTextbox = () =>
  screen.getByRole("textbox", {
    name: "Last Name*",
  });
const getEmailTextbox = () =>
  screen.getByRole("textbox", {
    name: "Email*",
  });
const getMessageTextbox = () =>
  screen.getByRole("textbox", {
    name: "Message*",
  });
const getSubmitButton = () =>
  screen.getByRole("button", {
    name: "Submit",
  });

describe("App", () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  it("should disable submit button if user did not enter eny values", () => {
    renderComponent();

    expect(getSubmitButton()).toBeDisabled();
  });

  it("should show validation error if user did not enter first name", () => {
    renderComponent();

    userEvent.click(getFirstNameTextbox());
    userEvent.tab();

    expect(screen.getByText("this field is required")).toBeInTheDocument();
  });

  it("should show validation error if user did not enter last name", () => {
    renderComponent();

    userEvent.click(getLastNameTextbox());
    userEvent.tab();

    expect(screen.getByText("this field is required")).toBeInTheDocument();
  });

  it("should show validation error if user provided incorrect email", () => {
    renderComponent();

    userEvent.type(getEmailTextbox(), "incorrect");
    userEvent.tab();

    expect(screen.getByText("invalid email address")).toBeInTheDocument();
  });

  it("should show validation error if message contains less than 10 symbols", () => {
    const message = "test";
    renderComponent();

    userEvent.type(getMessageTextbox(), message);
    userEvent.tab();

    expect(
      screen.getByText("message should contain at least 10 symbols")
    ).toBeInTheDocument();
  });

  it("should show saved values if user clicked submit button", () => {
    const firstName = "name";
    const lastName = "surname";
    const email = "test@mail.com";
    const message = "long message";
    jest.spyOn(window, "alert").mockImplementation(() => null);
    renderComponent();

    userEvent.type(getFirstNameTextbox(), firstName);
    userEvent.type(getLastNameTextbox(), lastName);
    userEvent.type(getEmailTextbox(), email);
    userEvent.type(getMessageTextbox(), message);
    userEvent.click(getSubmitButton());

    expect(screen.getByRole("cell", { name: firstName })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: lastName })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: email })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: message })).toBeInTheDocument();
  });
});
