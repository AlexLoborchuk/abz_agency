import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AccessAutorization } from "./AccessAutorization";

export const PostRequestComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const [phone_number, setPhoneNumber] = useState("");
  const [image, setImg] = useState();
  const [IdentificatedUser, setIdentificatedUser] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, setToken] = useState();

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Token: token,
    },
  };

  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then((resp) => {
        setToken(resp.data.token);
      });
  }, []);

  const onSubmit = (data) => {
    const user = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      position_id: Number(data.position_id),
      photo: image,
    };

    axios
      .post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        user,
        config
      )
      .then((resp) => {
        setIdentificatedUser(resp.data);
      })
      .catch((err) => setIdentificatedUser(err.response.data));

    setPhoneNumber(data.phone);
  };

  const onImageChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      setImg(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="bodyRequestConteiner" id="sign up">
      <h2 className="bodyContainer__title">Working with POST request</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bodyRequestConteiner__form form"
      >
        <div>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 60,
                message: "Must be max 60 chars",
              },
              minLength: {
                value: 2,
                message: "Must be min 2 chars",
              },
            })}
            placeholder="Your name"
            className={classNames("bodyRequestConteiner__input", {
              ["bodyRequestConteiner__inputError "]: errors.name,
            })}
          />
          {errors.name?.message && (
            <p className="bodyRequestConteiner__errorText error ">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                message: "Please enter a valid email",
              },
              maxLength: {
                value: 100,
                message: "must be max 100 chars",
              },
              minLength: {
                value: 2,
                message: "must be min 2 chars",
              },
            })}
            placeholder="Email"
            className={classNames("bodyRequestConteiner__input", {
              ["bodyRequestConteiner__inputError "]: errors.email,
            })}
          />
          {errors.email?.message && (
            <p className="bodyRequestConteiner__errorText error ">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[\+]{0,1}380([0-9]{9})$/,
                message: "Please enter a valid phone number",
              },
            })}
            placeholder="Phone"
            // onChange={(e) => {
            //   setPhoneNumber(e.target.value);
            // }}
            className={classNames("bodyRequestConteiner__input", {
              ["bodyRequestConteiner__inputError "]: errors.phone,
            })}
          />
          {errors.phone?.message && (
            <p className="bodyRequestConteiner__errorText error">
              {errors.phone?.message}
            </p>
          )}
        </div>
        {phone_number === "" ? (
          <div className="bodyRequestConteiner_phone">+38 (XXX) XXX-XX-XX</div>
        ) : (
          <div className="bodyRequestConteiner_phone">{phone_number}</div>
        )}

        <div className="bodyRequestConteiner__radioBlock">
          <label className="bodyRequestConteiner__radioText">
            Select your position
          </label>
          <div>
            <input
              type="radio"
              value="3"
              {...register("position_id", { required: true, min: 1 })}
              className="bodyRequestConteiner__radio"
            />
            <label className="bodyRequestConteiner__radioText">
              Frontend developer
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="1"
              {...register("position_id", { required: true, min: 1 })}
              className="bodyRequestConteiner__radio"
            />
            <label className="bodyRequestConteiner__radioText">
              Backend developer
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="2"
              {...register("position_id", { required: true, min: 1 })}
              className="bodyRequestConteiner__radio"
            />
            <label className="bodyRequestConteiner__radioText">Designer</label>
          </div>
          <div>
            <input
              type="radio"
              value="4"
              {...register("position_id", { required: true, min: 1 })}
              className="bodyRequestConteiner__radio"
            />
            <label className="bodyRequestConteiner__radioText">QA</label>
          </div>
        </div>
        {errors.position_id?.message && (
          <p className="bodyRequestConteiner__errorText error">
            Please choise your position
          </p>
        )}
        <div>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="User Photo"
              className="bodyRequestConteiner__userPhoto"
            />
          ) : (
            <label className="bodyRequestConteiner__textUpload ">Upload</label>
          )}
          <label
            htmlFor="file-input"
            className={classNames("inputPhoto", {
              ["bodyRequestConteiner__inputError "]: errors.photo,
            })}
          >
            Upload your photo
          </label>

          <input
            type="file"
            id="file-input"
            className=" bodyRequestConteiner__inputFile"
            {...register("photo" /*, { required: "Photo is required" }*/)}
            onChange={onImageChange}
          />
          {/* {errors.photo?.message && (
            <p className="bodyRequestConteiner__errorText error ">
              {errors.photo?.message}
            </p>
          )} */}
        </div>
        <div className="buttonText">
          <input
            type="submit"
            value="Sing up"
            className={classNames(
              "headerContainer__buttonText buttonRegister",
              {
                ["headerContainer__buttonText_disabled"]: !isDirty || !isValid,
              }
            )}
            disabled={!isDirty || !isValid}
          />
        </div>
      </form>
      {IdentificatedUser ? (
        <AccessAutorization IdentificatedUser={IdentificatedUser} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
