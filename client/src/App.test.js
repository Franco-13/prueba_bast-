import { render, screen } from "@testing-library/react";
import store from "./redux/store";
import { Provider } from "react-redux";
import AnimalRegistry from "./pages/AnimalRegistry";

test("should renders an button element with the legend 'registrar nuevo animal'", () => {
  render(
    <Provider store={store}>
      <AnimalRegistry />
    </Provider>
  );
  const addNewRegistrationButton = screen.getByRole("button", {
    name: /registrar nuevo animal/i,
  });

  expect(addNewRegistrationButton).toBeInTheDocument();
});
