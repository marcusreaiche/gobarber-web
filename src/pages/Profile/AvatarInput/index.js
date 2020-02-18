import React, { useState, useRef, useEffect } from "react";
import { useField } from "@rocketseat/unform";

import api from "../../../services/api";
import { Container } from "./styles";

export default function AvatarInput() {
  const { defaultValue, registerField } = useField("avatar");

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: "avatar_id",
        ref: ref.current,
        path: "dataset.file",
      });
    }
    console.log(ref);
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    // Whenever the input changes, we call the api's "/files" route sending the image
    const data = new FormData();
    data.append("file", e.target.files[0]);

    const response = await api.post("/files", data);
    const { avatar_id } = response.data;
    setPreview(response.data.file.url);
    setFile(avatar_id);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={preview || "https://api.adorable.io/avatars/face/4/3/0/00ff00"}
          alt="Avatar"
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
