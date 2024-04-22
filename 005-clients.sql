CREATE TABLE IF NOT EXISTS Customer (
  chronoClient VARCHAR(255) PRIMARY KEY,
  codeFichierPartenaire VARCHAR(255) NOT NULL,
  codePostal VARCHAR(255),
  dateDerniereCommande TIMESTAMP,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  ville VARCHAR(255) NOT NULL,
  CONSTRAINT unique_chronoClient UNIQUE (chronoClient)
);
