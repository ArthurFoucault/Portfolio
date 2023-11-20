function scrollToTop() {
    // Obtenez la position actuelle de défilement
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  
    if (currentScroll > 0) {
      // Si nous ne sommes pas déjà en haut, faites défiler la page
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentScroll - (currentScroll / 10)); // Réglez la vitesse en modifiant le diviseur ici
    }
  }

// Fonction pour charger le fichier Excel
function loadExcel(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";

  xhr.onload = function (e) {
      var arraybuffer = xhr.response;
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      var workbook = XLSX.read(bstr, { type: "binary" });
      var sheet_name_list = workbook.SheetNames;
      var sheet = workbook.Sheets[sheet_name_list[0]];

      // Convertir les données en HTML avec une plage de colonnes de A à H
      var htmlTable = sheet_to_html_with_range(sheet, { editable: false, display: true, range: 'A1:H' + XLSX.utils.decode_range(sheet["!ref"]).e.r });

      // Supprimer les cellules vides en dessous du tableau
      var tableContainer = document.createElement('div');
      tableContainer.innerHTML = htmlTable;
      cleanTable(tableContainer);

      // Ajouter la classe pour les cellules qui contiennent uniquement un "X"
      markCheckedCells(tableContainer);

      document.getElementById("excel-preview").innerHTML = tableContainer.innerHTML;
  };

  xhr.send();
}

function sheet_to_html_with_range(sheet, opts) {
  var range = XLSX.utils.decode_range(opts.range);
  var HTML = '<table xmlns:x="urn:schemas-microsoft-com:office:excel" style="vnd.ms-excel.numberformat:@;">';

  // Stocke les cellules fusionnées pour les réutiliser dans le HTML
  var mergedCells = sheet["!merges"] || [];

  for (var R = range.s.r; R <= range.e.r; ++R) {
      HTML += '<tr>';
      for (var C = range.s.c; C <= range.e.c; ++C) {
          var cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
          var cell = sheet[cell_ref];

          // Vérifie si la cellule est fusionnée
          var mergedCell = getMergedCell(mergedCells, R, C);

          if (mergedCell && mergedCell.s.r === R && mergedCell.s.c === C) {
              // La cellule est la cellule de départ de la fusion, utilise rowspan et colspan
              var rowspan = ' rowspan="' + (mergedCell.e.r - mergedCell.s.r + 1) + '"';
              var colspan = ' colspan="' + (mergedCell.e.c - mergedCell.s.c + 1) + '"';
              HTML += '<td' + rowspan + colspan + ' style="' + getCellStyle(cell) + '">' + XLSX.utils.format_cell(cell) + '</td>';
          } else if (!mergedCell) {
              // La cellule n'est pas fusionnée, utilise une cellule normale
              HTML += '<td style="' + getCellStyle(cell) + '">' + XLSX.utils.format_cell(cell) + '</td>';
          }
      }
      HTML += '</tr>';
  }
  HTML += '</table>';
  return HTML;
}

function cleanTable(container) {
  var table = container.querySelector('table');
  if (table) {
      var rows = table.getElementsByTagName('tr');
      for (var i = rows.length - 1; i >= 0; i--) {
          if (!hasTextContent(rows[i])) {
              rows[i].parentNode.removeChild(rows[i]);
          }
      }
  }
}

function hasTextContent(element) {
  return element.textContent.trim().length > 0;
}

function getMergedCell(mergedCells, row, col) {
  for (var i = 0; i < mergedCells.length; i++) {
      var mergedCell = mergedCells[i];
      if (row >= mergedCell.s.r && row <= mergedCell.e.r && col >= mergedCell.s.c && col <= mergedCell.e.c) {
          return mergedCell;
      }
  }
  return null;
}

function markCheckedCells(container) {
  var cells = container.querySelectorAll('td');
  cells.forEach(function (cell) {
      if (cell.textContent.trim() === 'X') {
          cell.style.backgroundColor = 'lightblue';
      }
  });
}

function getCellStyle(cell) {
  if (!cell || !cell.s) return '';

  var style = cell.s;
  var cssStyle = '';

  if (style.fill && style.fill.type === 'pattern' && style.fill.pattern === 'solid') {
    cssStyle += 'background-color:' + style.fill.fgColor.rgb.substring(2) + ';';
  }
  if (style.font && style.font.color && style.font.color.rgb) {
    cssStyle += 'color:' + style.font.color.rgb.substring(2) + ';';
  }

  // Appliquer des styles spécifiques en fonction de la largeur de l'écran
  var screenWidth = window.innerWidth;

  if (screenWidth <= 1040) {
    cssStyle += 'font-size: 14px;';
  }

  if (screenWidth <= 800) {
    cssStyle += 'font-size: 12px;';
  }

  if (screenWidth <= 700) {
    cssStyle += 'font-size: 10px;';
  }

  if (screenWidth <= 500) {
    cssStyle += 'font-size: 8px;';
    cssStyle += 'padding: 2px;';
  }

  return cssStyle;
}

// Charger le fichier Excel au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  var excelUrl = "https://arthurfoucault.github.io/Portfolio/Excel/6- Annexe 6-1 - Tableau de synthèse - Epreuve E4 - BTS SIO 2023.xlsx";
  loadExcel(excelUrl);
});

function showGameCenterModal() {
    document.getElementById("gamecenter").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function hideGameCenterModal() {
    document.getElementById("gamecenter").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function showRFTG_Modal() {
  document.getElementById("gamecenter").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hideRFTG_Modal() {
  document.getElementById("gamecenter").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}