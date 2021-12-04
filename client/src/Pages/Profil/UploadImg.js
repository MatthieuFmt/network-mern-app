import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPicture } from "../../actions/userAction";

export default function UploadImg({ userData }) {
  const [file, setFile] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  const submitPicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
    setIsChanged(false);
  };

  const changePicture = (e) => {
    setFile(e);
    setIsChanged(true);
  };

  return (
    <form className="upload-picture" onSubmit={submitPicture}>
      {!isChanged ? (
        <label htmlFor="file" className="change-img" aria-label="image">
          <i className="far fa-image"></i>
        </label>
      ) : (
        <button type="submit" className="change-img" aria-label="envoyer">
          <i className="fas fa-check"></i>
        </button>
      )}

      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => changePicture(e.target.files[0])}
      />
    </form>
  );
}
