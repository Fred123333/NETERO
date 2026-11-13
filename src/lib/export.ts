export function toCsv(rows: (string | number | null | undefined)[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const value = cell === null || cell === undefined ? "" : String(cell);
          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(";")
    )
    .join("\r\n");
}

export function downloadFile(fileName: string, content: string, mime = "text/csv;charset=utf-8;") {
  const blob = new Blob(["\uFEFF" + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadCsv(fileName: string, rows: (string | number | null | undefined)[][]) {
  downloadFile(fileName, toCsv(rows));
}

export function openPrintableReport(title: string, sections: { heading: string; lines: string[] }[]) {
  const printable = window.open("", "_blank", "width=900,height=1000");
  if (!printable) return false;
  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const body = sections
    .map(
      (section) => `
        <section>
          <h2>${escape(section.heading)}</h2>
          <ul>${section.lines.map((line) => `<li>${escape(line)}</li>`).join("")}</ul>
        </section>`
    )
    .join("");
  printable.document.write(`<!doctype html>
    <html lang="fr"><head><meta charset="utf-8" /><title>${escape(title)}</title>
    <style>
      *{box-sizing:border-box}
      body{font-family:Inter,Arial,sans-serif;color:#111;margin:40px;}
      header{border-bottom:2px solid #111;padding-bottom:16px;margin-bottom:24px;}
      h1{font-size:22px;margin:0 0 6px;}
      p.meta{font-size:11px;color:#555;margin:0;}
      section{margin-bottom:22px;}
      h2{font-size:13px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px;}
      ul{margin:0;padding-left:18px;font-size:12px;line-height:1.7;}
      footer{margin-top:32px;border-top:1px solid #ddd;padding-top:12px;font-size:10px;color:#777;}
    </style></head>
    <body>
      <header>
        <h1>NETERO ADMIN — ${escape(title)}</h1>
        <p class="meta">Généré le ${new Date().toLocaleString("fr-FR")} • Console système v2.1 Enterprise</p>
      </header>
      ${body}
      <footer>Rapport confidentiel — Netero Infrastructure OS. Données de démonstration.</footer>
      <script>window.onload = function(){ window.print(); };</script>
    </body></html>`);
  printable.document.close();
  return true;
}
