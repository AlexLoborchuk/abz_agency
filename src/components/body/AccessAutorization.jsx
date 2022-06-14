import AutorizationImage from "../../assets/body/success-image.svg";

export const AccessAutorization = (props) => {
  return (
    <div>
      <div className="bodyContainer">
        <h2 className="bodyContainer__title">
          {props.IdentificatedUser.message}
        </h2>
        <div className="bodyContainer__image">
          <img src={AutorizationImage} alt="Autorization" />
        </div>
      </div>
      <div className="bodyContainer__footer">
        © abz.agency specially for the test task
      </div>
    </div>
  );
};
