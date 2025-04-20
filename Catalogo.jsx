
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo-duo-aroma.png"
          alt="Dúo de aroma"
          className="w-32 h-32 mb-4"
        />
        <h1 className="text-3xl font-bold">Dúo de aroma</h1>
        <p className="text-sm text-gray-600 mt-2">
          Subí tu archivo Excel para actualizar el catálogo
        </p>
        <Input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          className="mt-4 w-full max-w-xs"
        />
      </div>

      {perfumes.length === 0 && (
        <p className="text-center text-gray-500">No hay perfumes cargados.</p>
      )}

      {perfumes.map((perfume, index) => (
        <Card key={index} className="mb-6">
          <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4">
            <img
              src={perfume.Imagen}
              alt={perfume.Nombre}
              className="w-32 h-40 object-contain"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{perfume.Nombre}</h2>
              <p className="whitespace-pre-line text-sm text-gray-600">
                {perfume.Descripcion}
              </p>
              <p className="text-lg font-bold mt-2">
                ₡{Number(perfume.Precio).toLocaleString()}
              </p>
            </div>
            <a
              href="https://wa.me/50685985335"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                WhatsApp
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
