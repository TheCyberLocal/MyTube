export const exportNotes = async (userId) => {
  try {
    const response = await fetch(`/api/export-notes?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to export notes");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MyTube_Notes.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up URL object
  } catch {
    alert("An error occurred while exporting notes.");
  }
};
