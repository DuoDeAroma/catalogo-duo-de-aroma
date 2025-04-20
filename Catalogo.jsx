import { useState } from "react";
import * as XLSX from "xlsx";

export default function Catalogo() {
  const [perfumes, setPerfumes] = useState([]);

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setPerfumes(json);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <img src="/logo-duo-aroma.png" alt="Dúo de aroma" width="100" />
        <h1>Dúo de aroma</h1>
        <p>Subí tu archivo Excel para actualizar el catálogo</p>
        <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
      </div>

      {perfumes.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No hay perfumes cargados.</p>
      )}

      {perfumes.map((perfume, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginBottom: 30,
            border: "1px solid #ddd",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <img src={perfume.Imagen} alt={perfume.Nombre} width="100" height="140" style={{ objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>{perfume.Nombre}</h2>
            <p style={{ whiteSpace: "pre-line", fontSize: 14, color: "#555" }}>{perfume.Descripcion}</p>
            <p style={{ fontWeight: "bold", fontSize: 16 }}>₡{Number(perfume.Precio).toLocaleString()}</p>
          </div>
          <a
            href="https://wa.me/50685985335"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#facc15",
              padding: "10px 16px",
              borderRadius: 8,
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}