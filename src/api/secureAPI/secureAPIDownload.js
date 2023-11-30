import axios from "axios";

export default async function secureAPIDownload(endpoint, fileName) {
  const fullEndpoint = `${process.env.REACT_APP_BACKEND}${endpoint}`;

  try {
    const response = await axios.get(fullEndpoint, {
      responseType: "blob",
    });

    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      return { successFlag: true, message: "File exported successfully" };
    } else {
      console.error("Error downloading file. Status code:", response.status);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
  }

  return { successFlag: false, message: "File export failed" };
}
