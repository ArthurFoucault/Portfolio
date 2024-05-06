function showGameCenterModal() {
    document.getElementById("gamecenter").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function hideGameCenterModal() {
    document.getElementById("gamecenter").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function showRFTG_Modal() {
  document.getElementById("RFTG").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hideRFTG_Modal() {
  document.getElementById("RFTG").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function showoffreCollective_Modal() {
  document.getElementById("offreCollective").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hideoffreCollective_Modal() {
  document.getElementById("offreCollective").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function showStructurAll_Modal() {
  document.getElementById("StructurAll").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hideStructurAll_Modal() {
  document.getElementById("StructurAll").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function showPopix_Modal() {
  document.getElementById("Popix").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hidePopix_Modal() {
  document.getElementById("Popix").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function showBPA_Modal() {
  document.getElementById("BPA").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function hideBPA_Modal() {
  document.getElementById("BPA").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function ouvrirGameCenterPDF() {
  var cheminFichierWord = '../pdf/documentation_projet/GameCenter.pdf';

  window.open(cheminFichierWord, '_blank');
}

function ouvrirRFTGPDF() {
  var cheminFichierWord = '../pdf/documentation_projet/RFTG.pdf';

  window.open(cheminFichierWord, '_blank');
}

function ouvrirStructurAllPDF() {
  var cheminFichierWord = '../pdf/documentation_projet/StructurAll.pdf';

  window.open(cheminFichierWord, '_blank');
}

function ouvrirPopixPDF() {
  var cheminFichierWord = '../pdf/documentation_projet/Popix.pdf';

  window.open(cheminFichierWord, '_blank');
}

function ouvriroffreCollectivePDF() {
  var cheminFichierWord = '../pdf/documentation_projet/offreCollective.pdf';

  window.open(cheminFichierWord, '_blank');
}

function ouvrirBPAPDF() {
  var cheminFichierWord = '../pdf/documentation_projet/BPA.pdf';

  window.open(cheminFichierWord, '_blank');
}