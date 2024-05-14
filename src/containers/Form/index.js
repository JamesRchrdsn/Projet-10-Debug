import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      type: value,
    }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      if (
        !formData.nom.trim() ||
        !formData.prenom.trim() ||
        !formData.type.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        setError("Tous les champs doivent être remplis.");
        return;
      }

      setSending(true);
      setError("");

      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        setFormData({
          nom: "",
          prenom: "",
          type: "",
          email: "",
          message: "",
        });
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [formData, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            name="nom"
            value={formData.nom}
            placeholder=""
            label="Nom"
            onChange={handleChange}
          />
          <Field
            name="prenom"
            value={formData.prenom}
            placeholder=""
            label="Prénom"
            onChange={handleChange}
          />
          <Select
            name="type"
            value={formData.type}
            selection={["Personel", "Entreprise"]}
            onChange={handleSelectChange}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            name="email"
            value={formData.email}
            placeholder=""
            label="Email"
            onChange={handleChange}
          />
          {error && <p className="error">{error}</p>}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            value={formData.message}
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
