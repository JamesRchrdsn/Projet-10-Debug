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

      await act(async () => {
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
      });

      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await waitFor(() =>
        expect(screen.getByText("En cours")).toBeInTheDocument()
      );
      await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    });
  });
});
