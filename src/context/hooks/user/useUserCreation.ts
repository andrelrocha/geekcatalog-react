import { useState } from "react";

export default function useUserCreation() {

  const [uri, setUri] = useState("");
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [showTerms, setShowTerms] = useState(false)
  const [isAccepted, setIsAccepted] = useState('')

  const handleProfilePicture = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const blobData = new Blob([reader.result as ArrayBuffer], { type: file.type });
        const blobUrl = URL.createObjectURL(blobData);
        setUri(blobUrl);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return {
    uri,
    setUri,
    isPasswordClicked,
    setIsPasswordClicked,
    handleProfilePicture,
    showTerms,
    setShowTerms,
    isAccepted,
    setIsAccepted
  };
}