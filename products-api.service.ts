import { AxiosInstance } from "axios"
import { AbstractApiService } from "./abstract-api.service"
import {ProductSearchResultDto, WorkDone } from "@formation/shared-lib"



export class ProductsApiService extends AbstractApiService {

  constructor(axiosInstance: AxiosInstance, serviceApiBaseUrl: string) {
    super(axiosInstance, serviceApiBaseUrl);
  }

  // Get all products
  public async getProducts(): Promise<WorkDone<ProductSearchResultDto[]>> {
    return this.doGet('');
  }

// Get a product by its code

  public async getProductByCode(code: string): Promise<WorkDone<ProductSearchResultDto>> {
    return this.doGet('/' + code);
  }

  // Create a product

  public async createProduct(product: ProductSearchResultDto): Promise<WorkDone<ProductSearchResultDto>> {
    return this.doPost('', product);
  }
  // Update a product
  public async updateProduct(code: string, updatedData: Partial<ProductSearchResultDto>): Promise<WorkDone<ProductSearchResultDto>> {
    return this.doPut('/' + code, updatedData);
  }
  // Delete a product
  public async deleteProduct(code: string): Promise<WorkDone<void>> {
    return this.doDelete('/' + code);
  }

  // Search criteria libelle
  public async searchProductByLibelle(libelle: string, code: string): Promise<WorkDone<ProductSearchResultDto[]>> {
    return this.doGet('/search/' + libelle);
  }

  /*

  // Get a product by its libelleux
  public async getProductByListByCriteria (searchCriterias ?: ISearchDto< SearchProductByCodeDto>): Promise<WorkDone<IPaginatedListDto<ProductSearchResultDto>>> {
    return this.doGet('/search/multi-criterias', { searchCriterias })
  }
  */

}
