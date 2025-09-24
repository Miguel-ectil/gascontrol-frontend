// src/lib/csv.ts
export function downloadCSV(rows: Record<string, any>[], filename = "export.csv") {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map(r => keys.map(k => `"${(r[k] ?? "").toString().replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
