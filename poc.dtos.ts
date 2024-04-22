/**
 * Represents the data transfer object for searching customers by chrono client.
 */
export interface SearchCustomerByChronoClientDto {
  chronoClient: string;
  codeFichierPartenaire: string;
}

/**
 * Represents the data transfer object for searching customers.
 */

export interface SearchCustomerDto {
  chronoClient?: string,
  codeFichierPartenaire: string,
  codePostal?: string,
  dateDerniereCommandeFrom?: Date,
  dateDerniereCommandeTo?: Date,
  nom?: string,
  prenom?: string,
  ville?: string,
}


/**
 * Represents the data transfer object for customer search results.
 */
export interface CustomerSearchResultDto {
  chronoClient: string,
  codeFichierPartenaire: string,
  codePostal: string,
  dateDerniereCommande: Date
  nom: string,
  prenom: string,
  ville: string,
}


/**
 * Represents the data transfer object for code and label results.
 */
export interface CodeLabelResultDto {
  code: string;
  label: string;
}

/**
 * Represents the data transfer object for offer reference results.
 */
export interface OffreReferenceResultDto {
  codeCampagne: number;
  codeOffre: string;
  codeProduit: string;
  dateDerniereModification: Date;
  libelleOffre: string;
}


// interface ProductSearchDto


export interface SearchProductDto {
  code : string;
  libelle : string;
  commentaires ?: string;
  Offres : number;
}

export interface ProductSearchResultDto {
  code : string;
  libelle : string;
  commentaires ?: string;
  Offres : number;
}


export interface SearchProductByCodeDto {
  code : string;
  libelle : string;
   
}


