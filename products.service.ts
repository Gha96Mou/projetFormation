import { Offre } from './../../../libs/servers-lib/dist/.prisma/client/index.d';
import { PrismaService } from "@formation/servers-lib/dist/services";
import { LoggerService } from '@formation/servers-lib/dist/services'
import { ProductSearchResultDto, WorkDone } from "@formation/shared-lib";
import { Injectable } from '@nestjs/common';
import { skip } from "rxjs";
import productSchema from "src/ZodSchemas/productShemas";
import { z } from 'zod'; // Import Zod for validation

@Injectable()
export class ProductsService {
  

  constructor (
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService
  ) {
    this.logger.info('ProductsService created')
  }




  async fetchAllProducts(): Promise<WorkDone<ProductSearchResultDto[]>> {
    //const skip = (page - 1) * pageSize; // Calculate offset based on page and page size
    const products = await this.prismaService.produit.findMany({
     // take: pageSize,
      //skip,
    });

    const mappedProducts: Promise<ProductSearchResultDto>[] = products.map(async (produit) => {
      const Offres = await this.prismaService.offre.count({
        where: {
          codeProduit: produit.code
        }
      });

      return {
        code: produit.code,
        libelle: produit.libelle,
        commentaires: produit.commentaires,
        Offres: Offres
      };
    });

    const resolvedProducts: ProductSearchResultDto[] = await Promise.all(mappedProducts);

    return WorkDone.buildOk(resolvedProducts);
  }






    async findOne (code : string): Promise<WorkDone<ProductSearchResultDto>> {
    const produit = await this.prismaService.produit.findUnique({
      where: {
        code
      }
    });

    if (!produit) {
      return WorkDone.buildError("Product not found");
    }

    return WorkDone.buildOk({
      code: produit.code,
      libelle: produit.libelle, 
      commentaires: produit.commentaires,
      Offres: 0
      
    });
  }
  






  
 // Créer un produit avec libellé et commentaire
 async createProduct(productData: ProductSearchResultDto): Promise<WorkDone<ProductSearchResultDto>> {
  try {  

    const validationResult = productSchema.safeParse(productData); // Validate data
    
    if (!validationResult.success) {
      const errors = (validationResult as unknown as z.ZodError).format().toString() // Format validation errors
      return WorkDone.buildError(`Validation errors: ${errors}`);
    }

    const { code, libelle, commentaires } = validationResult.data; // Access validated data

    const existingProduct = await this.prismaService.produit.findUnique({
      where: { code },
    });
    if (existingProduct) {
      return WorkDone.buildError("Product with code '" + code + "' already exists.");
    }

    const createdProduct = await this.prismaService.produit.create({
      data: {
        code,
        libelle,
        commentaires: commentaires || '',
      },
    });
  
    const offerCount = await this.prismaService.offre.count({
      where: {
        codeProduit: createdProduct.code,
      },
    });
  
    return WorkDone.buildOk({
      code: createdProduct.code,
      libelle: createdProduct.libelle,
      commentaires: createdProduct.commentaires,
      Offres: offerCount, // Use the fetched offer count
    }, "The product was created successfully");
  }
  catch (error) {
    return WorkDone.buildError("Failed to create product: " + error.message);
  }
 }





// Mettre à jour un produit
async updateProduct(
  code: string,
  updatedData: {
    libelle?: string;
    commentaires?: string;
  }
): Promise<WorkDone<ProductSearchResultDto>> {
  try {
    // Fetch existing product data
    const existingProduct = await this.prismaService.produit.findUnique({
      where: {
        code,
      },
    });

    if (!existingProduct) {
      return WorkDone.buildError("Product with code '" + code + "' not found.");
    }

    // Prepare updated data with existing values and new updates
    const updatedProductData = {
      code: existingProduct.code, // Keep code unchanged
      libelle: updatedData.libelle ?? existingProduct.libelle, // Use updated libelle or existing if not provided
      commentaires: updatedData.commentaires ?? existingProduct.commentaires, // Use updated commentaires or existing if not provided
      // Keep Offres unchanged
    
    };

    // Perform the update using the updated data
    const updatedProduct = await this.prismaService.produit.update({
      where: {
        code,
      },
      data: updatedProductData,
    });

    const offerCount = await this.prismaService.offre.count({
      where: {
        codeProduit: updatedProduct.code,
      },
    });

    return WorkDone.buildOk({
      code: updatedProduct.code,
      libelle: updatedProduct.libelle,
      commentaires: updatedProduct.commentaires,
      Offres: offerCount, // Use the fetched offer count
    });
  } catch (error) {
    return WorkDone.buildError("Failed to update product: " + error.message);
  }
}
















// Supprimer un produit
async deleteProduct(code: string): Promise<WorkDone<undefined>> {
  try {
    await this.prismaService.produit.delete({
      where: {
        code,
      },
    });

    return WorkDone.buildOk(undefined);
  } catch (error) {
    return WorkDone.buildError("Failed to delete product: " + error.message);
  }
}


// Search criteria libelle 
async findMany(searchCriterias: ProductSearchResultDto): Promise<WorkDone<ProductSearchResultDto[]>> {
  const products = await this.prismaService.produit.findMany({
    where: {
      libelle: {
        equals: searchCriterias.libelle, 
        startsWith: searchCriterias.libelle,
        mode: 'insensitive',
      },
      code: {
        startsWith : searchCriterias.code,
        equals: searchCriterias.code,
        mode: 'insensitive',
      }
    }
  });

  const transformedProducts = products.map(product => ({
    ...product,
    Offres: 0,
  }));

  return WorkDone.buildOk(transformedProducts);
}



}
