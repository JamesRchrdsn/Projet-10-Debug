import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import React from "react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Message")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      const { container } = render(<Form onSuccess={onSuccess} />);

      fireEvent.change(container.querySelector('[placeholder="Nom"]'), {
        target: { value: "Test" },
      });
      fireEvent.change(container.querySelector('[placeholder="Prénom"]'), {
        target: { value: "Utilisateur" },
      });
      fireEvent.change(container.querySelector('[placeholder="Email"]'), {
        target: { value: "testutilisateur@example.com" },
      });
      fireEvent.change(container.querySelector('[name="message"]'), {
        target: { value: "Message de test" },
      });
      const collapseButton = screen.getByTestId("collapse-button-testid");
      fireEvent.click(collapseButton);

      await waitFor(() => {
        expect(screen.getByTestId("collapse-button-testid")).toHaveAttribute(
          "aria-expanded",
          "true"
        );
      });

      const personalOption = await waitFor(() =>
        screen.getByTestId("option-Personel")
      );
      fireEvent.click(personalOption);

      const submitButton = screen.getByTestId("button-test-id");

      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.findByText("En cours"));
      });

      await waitFor(() => {
        // eslint-disable-next-line no-console
        console.log(
          "Nombre d'appels à onSuccess :",
          onSuccess.mock.calls.length
        );
        expect(onSuccess).toHaveBeenCalled();
      });
    });
  });
});
