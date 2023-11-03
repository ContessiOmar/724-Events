import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {

  it("a list a people is displayed", () => { // Test pour verifier la presence d'une personne dans la liste des collaborateurs.
    render(< Home />);
    expect(screen.getByTestId("listOfPeople")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
  });

  it("a footer is displayed", () => { // Test pour verifier la presence de l'adresse dans le footer
    render(< Home />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => { // Test pour verifier la presence de la derniere prestation
    render(< Home />);
    waitFor(() => {
      expect(screen.getByTestId("lastEvent")).toBeInTheDocument();
      expect(screen.getByRole('date')).toBeInTheDocument();
    });
  });
});
